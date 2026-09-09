import { useEffect, useRef, useState, useCallback, RefObject } from 'react';
import * as MP4Box from 'mp4box';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 8000;

interface FrameItem {
  ts: number; // in microseconds
  blob: Blob;
}

interface UseVideoScrubReturn {
  scrollProgress: number;
  canvasLive: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

// Phones cannot render a paused, never-played video and struggle with
// frame-accurate seeking, so there the clip simply plays as an ambient loop.
function isMobileScrub(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
}

export function resolveVideoUrl(url: string): string {
  if (!url) return '/hero.mp4';
  if (url === '/hero.mp4' || url.includes('hero.mp4')) return '/hero.mp4';
  if (url === '/features.mp4' || url.includes('features.mp4')) return '/features.mp4';
  const gdriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    const id = gdriveMatch[1];
    if (id === '1g9eqlgA3ZBQe_SBcu7SXJfsLPQ3EXXXK') {
      return '/hero.mp4';
    }
    if (id === '1Gga1upu5VWZXAn-rth_PPAIKsXZVY6k7') {
      return '/features.mp4';
    }
    return `/api/video?id=${id}`;
  }
  if (url.startsWith('/api/video')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return `/api/video?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export function useVideoScrub(videoSrc: string): UseVideoScrubReturn {
  const resolvedSrc = resolveVideoUrl(videoSrc);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Internal scrub state in refs for smooth rAF performance
  const bankRef = useRef<FrameItem[]>([]);
  const lruRef = useRef<Map<number, ImageBitmap>>(new Map());
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const readyRef = useRef(false);
  const buildingRef = useRef(false);
  const revertedRef = useRef(false);
  const lastRafTimeRef = useRef(performance.now());
  const activeBitmapIndexRef = useRef<number | null>(null);

  // Binary search for nearest frame in bank
  const findNearestFrameIndex = useCallback((targetUs: number): number => {
    const bank = bankRef.current;
    if (!bank || bank.length === 0) return -1;
    let low = 0;
    let high = bank.length - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (bank[mid]!.ts < targetUs) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    if (low >= bank.length) return bank.length - 1;
    if (low === 0) return 0;
    return Math.abs(bank[low]!.ts - targetUs) < Math.abs(bank[low - 1]!.ts - targetUs)
      ? low
      : low - 1;
  }, []);

  // LRU cache eviction and frame warmup
  const getBitmapForIndex = useCallback(async (index: number): Promise<ImageBitmap | null> => {
    const bank = bankRef.current;
    if (!bank || index < 0 || index >= bank.length) return null;

    const lru = lruRef.current;
    if (lru.has(index)) {
      const bitmap = lru.get(index)!;
      // Refresh recency by re-inserting
      lru.delete(index);
      lru.set(index, bitmap);
      return bitmap;
    }

    try {
      const frame = bank[index];
      const bitmap = await createImageBitmap(frame!.blob);
      lru.set(index, bitmap);

      // Evict oldest if exceeding LRU_MAX
      if (lru.size > LRU_MAX) {
        const oldestKey = lru.keys().next().value;
        if (oldestKey !== undefined && oldestKey !== activeBitmapIndexRef.current) {
          const old = lru.get(oldestKey);
          old?.close?.();
          lru.delete(oldestKey);
        }
      }

      // Pre-warm neighboring frames (i - 1 .. i + 2)
      for (let offset = -1; offset <= 2; offset++) {
        const neighborIdx = index + offset;
        if (
          neighborIdx >= 0 &&
          neighborIdx < bank.length &&
          neighborIdx !== index &&
          !lru.has(neighborIdx)
        ) {
          createImageBitmap(bank[neighborIdx]!.blob)
            .then((warmBitmap) => {
              if (!lruRef.current.has(neighborIdx)) {
                lruRef.current.set(neighborIdx, warmBitmap);
                if (lruRef.current.size > LRU_MAX) {
                  const evictKey = lruRef.current.keys().next().value;
                  if (
                    evictKey !== undefined &&
                    evictKey !== index &&
                    evictKey !== activeBitmapIndexRef.current
                  ) {
                    lruRef.current.get(evictKey)?.close?.();
                    lruRef.current.delete(evictKey);
                  }
                }
              }
            })
            .catch(() => {});
        }
      }

      return bitmap;
    } catch {
      return null;
    }
  }, []);

  // Compute scroll progress p in [0, 1] relative to the container's position on the page
  const getProgress = useCallback((): number => {
    const container = containerRef.current;
    if (!container) return 0;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const maxScroll = container.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    const currentScrollOffset = window.scrollY - containerTop;
    return Math.min(1, Math.max(0, currentScrollOffset / maxScroll));
  }, []);

  // Frame Bank builder using MP4Box & WebCodecs VideoDecoder
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobileScrub() || typeof window.VideoDecoder === 'undefined') {
      revertedRef.current = true;
      return;
    }

    let isAborted = false;
    let decoder: VideoDecoder | null = null;
    let watchdogTimer: NodeJS.Timeout | null = null;

    const startDecoding = async (hardwareAccel: HardwareAcceleration = 'no-preference') => {
      if (buildingRef.current || readyRef.current || revertedRef.current) return;
      buildingRef.current = true;

      // Fall back quickly when browser-side frame decoding is unavailable.
      watchdogTimer = setTimeout(() => {
        if (!readyRef.current && !isAborted) {
          revertedRef.current = true;
          buildingRef.current = false;
          setCanvasLive(false);
        }
      }, WATCHDOG);

      try {
        const response = await fetch(resolvedSrc, { mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        if (isAborted) return;

        const mp4boxfile = MP4Box.createFile();
        const pendingFrames: FrameItem[] = [];

        // Helper to extract description box payload
        const getDescription = (track: any): ArrayBuffer | undefined => {
          try {
            const entry = track.mdia?.minf?.stbl?.stsd?.entries?.[0];
            const box = entry?.avcC || entry?.hvcC || entry?.vpcC || entry?.av1C;
            if (box) {
              const stream = new MP4Box.DataStream(undefined, 0, (MP4Box.DataStream as any).BIG_ENDIAN);
              box.write(stream);
              return new Uint8Array(stream.buffer, 8).buffer;
            }
          } catch (e) {
            console.warn('Failed to extract codec description', e);
          }
          return undefined;
        };

        mp4boxfile.onReady = async (info: any) => {
          if (isAborted) return;
          const videoTrack = info.videoTracks?.[0];
          if (!videoTrack) {
            revertedRef.current = true;
            return;
          }

          if (videoTrack.duration && videoTrack.timescale) {
            durationRef.current = videoTrack.duration / videoTrack.timescale;
          }

          const description = getDescription(mp4boxfile.getTrackById(videoTrack.id));
          const codec = videoTrack.codec;

          let decodeQueueCount = 0;
          const framePromises: Promise<void>[] = [];

          decoder = new VideoDecoder({
            output: (videoFrame: VideoFrame) => {
              decodeQueueCount--;
              const timestamp = videoFrame.timestamp;
              const displayWidth = videoFrame.displayWidth;
              const displayHeight = videoFrame.displayHeight;

              const processPromise = (async () => {
                try {
                  let blob: Blob | null = null;
                  if (typeof OffscreenCanvas !== 'undefined') {
                    const offscreen = new OffscreenCanvas(displayWidth, displayHeight);
                    const ctx = offscreen.getContext('2d');
                    if (ctx) {
                      ctx.drawImage(videoFrame, 0, 0);
                      blob = await offscreen.convertToBlob({ type: 'image/webp', quality: 0.82 });
                    }
                  } else {
                    const canvas = document.createElement('canvas');
                    canvas.width = displayWidth;
                    canvas.height = displayHeight;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.drawImage(videoFrame, 0, 0);
                      blob = await new Promise<Blob | null>((resolve) =>
                        canvas.toBlob(resolve, 'image/webp', 0.82)
                      );
                    }
                  }

                  if (blob) {
                    pendingFrames.push({ ts: timestamp, blob });
                  }
                } finally {
                  videoFrame.close();
                }
              })();

              framePromises.push(processPromise);
            },
            error: () => {
              // Some browsers expose WebCodecs but reject this MP4's avcC data.
              // Stop immediately and use the reliable video-seeking path.
              revertedRef.current = true;
              buildingRef.current = false;
              if (watchdogTimer) clearTimeout(watchdogTimer);
              setCanvasLive(false);
            },
          });

          const config: VideoDecoderConfig = {
            codec,
            hardwareAcceleration: hardwareAccel,
          };
          if (description) config.description = description;

          try {
            decoder.configure(config);
          } catch (configErr) {
            console.warn('Decoder configure failed, trying without description', configErr);
            decoder.configure({ codec, hardwareAcceleration: hardwareAccel });
          }

          mp4boxfile.onSamples = async (trackId: number, ref: any, samples: any[]) => {
            if (isAborted) return;
            for (const sample of samples) {
              if (isAborted) break;

              // Throttle with LEAD so decode doesn't outrun blob encoding
              while (decodeQueueCount >= LEAD && !isAborted) {
                await new Promise((r) => setTimeout(r, 10));
              }

              const chunk = new EncodedVideoChunk({
                type: sample.is_sync ? 'key' : 'delta',
                timestamp: (sample.cts * 1e6) / sample.timescale,
                duration: (sample.duration * 1e6) / sample.timescale,
                data: sample.data,
              });

              if (decoder && decoder.state !== 'closed') {
                decodeQueueCount++;
                decoder.decode(chunk);
              } else {
                break;
              }
            }
          };

          mp4boxfile.setExtractionOptions(videoTrack.id, null, { nbSamples: 1000 });
          mp4boxfile.start();

          // Wait for all samples to decode and flush
          try {
            await decoder.flush();
            await Promise.all(framePromises);

            if (isAborted) return;

            // Sort bank by timestamp
            pendingFrames.sort((a, b) => a.ts - b.ts);
            bankRef.current = pendingFrames;
            readyRef.current = pendingFrames.length > 0;
            buildingRef.current = false;

            if (watchdogTimer) clearTimeout(watchdogTimer);
          } catch (flushErr) {
            revertedRef.current = true;
            buildingRef.current = false;
            if (watchdogTimer) clearTimeout(watchdogTimer);
            setCanvasLive(false);
          }
        };

        mp4boxfile.onError = (err: any) => {
          console.warn('MP4Box parse error:', err);
          revertedRef.current = true;
        };

        const fileBuffer = arrayBuffer as any;
        fileBuffer.fileStart = 0;
        mp4boxfile.appendBuffer(fileBuffer);
        mp4boxfile.flush();
      } catch (fetchErr) {
        console.warn('Failed to build frame bank, falling back to video seek:', fetchErr);
        revertedRef.current = true;
      }
    };

    // Build frame bank after window load or next tick
    if (document.readyState === 'complete') {
      startDecoding();
    } else {
      window.addEventListener('load', () => startDecoding(), { once: true });
    }

    return () => {
      isAborted = true;
      if (watchdogTimer) clearTimeout(watchdogTimer);
      if (decoder && decoder.state !== 'closed') {
        try {
          decoder.close();
        } catch {}
      }
      lruRef.current.forEach((bm) => bm.close?.());
      lruRef.current.clear();
      bankRef.current = [];
    };
  }, [videoSrc]);

  // Video duration and initial frame priming
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // On phones/tablets: play the clip as a muted ambient loop so the visuals
    // are actually painted (a paused, never-played video stays blank there).
    if (isMobileScrub()) {
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      const kick = () => {
        video.play().catch(() => {});
      };
      kick();
      video.addEventListener('loadeddata', kick);
      document.addEventListener('touchstart', kick, { once: true, passive: true });
      return () => {
        video.removeEventListener('loadeddata', kick);
        document.removeEventListener('touchstart', kick);
      };
    }


    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    };

    const handleCanPlay = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      durationRef.current = video.duration;
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, []);

  // Main rAF Scrub Loop
  useEffect(() => {
    let rafId: number;
    let isMounted = true;
    let lastEmittedProgress = -1;
    let lastDrawnIndex = -1;
    let ctx: CanvasRenderingContext2D | null = null;
    let canvasLiveLocal = false;
    const decoding = new Set<number>();
    let inView = true;

    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (container && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) inView = entry.isIntersecting;
        },
        { rootMargin: '100% 0px' }
      );
      observer.observe(container);
    }



    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileAmbient = isMobileScrub();

    const updateFrame = (now: number) => {
      if (!isMounted) return;

      const deltaSeconds = (now - lastRafTimeRef.current) / 1000;
      lastRafTimeRef.current = now;
      const dt = Math.min(0.1, deltaSeconds > 0 ? deltaSeconds : 0.016);

      const p = getProgress();
      // Only re-render React when the progress meaningfully changes.
      if (Math.abs(p - lastEmittedProgress) > 0.0005) {
        lastEmittedProgress = p;
        setScrollProgress(p);
      }

      const dur = durationRef.current;
      if (dur > 0) {
        const target = p * dur;
        targetTimeRef.current = target;

        if (reduceMotionQuery.matches) {
          currentTimeRef.current = target;
        } else {
          currentTimeRef.current += (target - currentTimeRef.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(target - currentTimeRef.current) < SNAP) {
            currentTimeRef.current = target;
          }
        }

        const current = currentTimeRef.current;

        // Draw nearest frame from decoded bank if ready
        if (!inView) {
          // Off-screen: skip decoding/drawing entirely to keep the visible scene smooth.
        } else if (readyRef.current && bankRef.current.length > 0 && canvasRef.current) {
          const nearestIdx = findNearestFrameIndex(current * 1e6);
          if (nearestIdx >= 0) {
            activeBitmapIndexRef.current = nearestIdx;
            const lru = lruRef.current;
            const cached = lru.get(nearestIdx);

            if (cached) {
              if (nearestIdx !== lastDrawnIndex) {
                const canvas = canvasRef.current;
                if (canvas.width !== cached.width || canvas.height !== cached.height) {
                  canvas.width = cached.width;
                  canvas.height = cached.height;
                  ctx = null;
                }
                if (!ctx) ctx = canvas.getContext('2d', { alpha: false });
                if (ctx) {
                  ctx.drawImage(cached, 0, 0, canvas.width, canvas.height);
                  lastDrawnIndex = nearestIdx;
                  // keep recency
                  lru.delete(nearestIdx);
                  lru.set(nearestIdx, cached);
                  if (!canvasLiveLocal) {
                    canvasLiveLocal = true;
                    setCanvasLive(true);
                  }
                }
              }
            } else if (!decoding.has(nearestIdx)) {
              // Decode off the critical path — never block the rAF frame.
              decoding.add(nearestIdx);
              getBitmapForIndex(nearestIdx)
                .catch(() => null)
                .finally(() => decoding.delete(nearestIdx));
            }
          }
        } else if (videoRef.current) {
          // Fallback: video element seeking
          const video = videoRef.current;
          if (!video.seeking && Math.abs(video.currentTime - current) > 0.02) {
            video.currentTime = Math.min(video.duration || dur, Math.max(0, current));
          }
        }
      }

      rafId = requestAnimationFrame(updateFrame);
    };

    lastRafTimeRef.current = performance.now();
    rafId = requestAnimationFrame(updateFrame);

    const handleResize = () => {
      const p = getProgress();
      setScrollProgress(p);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getProgress, findNearestFrameIndex, getBitmapForIndex]);

  return {
    scrollProgress,
    canvasLive,
    videoRef,
    canvasRef,
    containerRef,
  };
}
