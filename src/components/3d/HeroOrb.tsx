import { useRef, useEffect } from "react";

type Vec3 = [number, number, number];

function rxv(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function ryv(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function rzv(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
}
function proj(p: Vec3, fl: number, cx: number, cy: number) {
  const d = fl / (fl + p[2] + 300);
  return { x: cx + p[0] * d, y: cy + p[1] * d, scale: d };
}

function fibSphere(n: number, r: number): Vec3[] {
  const ga = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = ga * i;
    return [r * rad * Math.cos(t), r * y, r * rad * Math.sin(t)];
  });
}

function makeRing(n: number, r: number): Vec3[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [r * Math.cos(a), 0, r * Math.sin(a)];
  });
}

const RINGS = [
  { pts: makeRing(96, 190), rx: Math.PI / 2.1, rz: 0, baseOp: 0.55 },
  { pts: makeRing(96, 225), rx: Math.PI / 2.1, rz: Math.PI / 3, baseOp: 0.35 },
  { pts: makeRing(64, 168), rx: Math.PI / 5.5, rz: Math.PI / 4.5, baseOp: 0.22 },
];

const SPHERE_PTS = fibSphere(64, 168);
const PARTICLE_META = SPHERE_PTS.map((_, i) => ({
  size: 1.0 + (i % 3) * 1.3,
  baseOp: 0.18 + (i % 5) * 0.12,
  phase: i * 0.43,
}));

export const HeroOrb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const FL = 900;
    let rotX = 0.3, rotY = 0;
    let tRotX = 0.3, tRotY = 0;
    let autoY = 0, time = 0;
    let raf: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(canvas.offsetWidth * dpr);
      canvas.height = Math.round(canvas.offsetHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width * 0.5);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height * 0.5);
      tRotY = dx * 0.42;
      tRotX = 0.3 - dy * 0.28;
    };
    window.addEventListener("mousemove", onMouse);

    function transform(p: Vec3): Vec3 {
      return ryv(rxv(p, rotX), rotY);
    }

    function drawRing(
      pts: Vec3[], rx: number, rz: number, baseOp: number,
      cx: number, cy: number
    ) {
      const projected = pts.map((p) => {
        const rp = transform(rzv(rxv(p, rx), rz));
        return { ...proj(rp, FL, cx, cy), z: rp[2] };
      });

      // Two-pass glow: wide dim pass then sharp bright pass
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        projected.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        if (pass === 0) {
          ctx.strokeStyle = `rgba(115,199,255,${(baseOp * 0.25).toFixed(3)})`;
          ctx.lineWidth = 5;
        } else {
          ctx.strokeStyle = `rgba(115,199,255,${baseOp.toFixed(3)})`;
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();
      }
    }

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      time += 0.007;
      autoY += 0.0022;
      rotX += (tRotX - rotX) * 0.04;
      rotY += (tRotY + autoY - rotY) * 0.04;

      ctx.clearRect(0, 0, w, h);

      // Atmospheric outer glow
      const atm = ctx.createRadialGradient(cx, cy, 80, cx, cy, 280);
      atm.addColorStop(0, "rgba(115,199,255,0.10)");
      atm.addColorStop(0.5, "rgba(115,199,255,0.04)");
      atm.addColorStop(1, "rgba(115,199,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 280, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // Project + sort particles
      const particles = SPHERE_PTS.map((p, i) => {
        const rp = transform(p);
        const pp = proj(rp, FL, cx, cy);
        const breathe = 0.82 + 0.18 * Math.sin(time + PARTICLE_META[i].phase);
        const depthFactor = Math.max(0.05, (rp[2] + 300) / 600);
        return {
          x: pp.x, y: pp.y, z: rp[2],
          size: PARTICLE_META[i].size * pp.scale * breathe,
          op: PARTICLE_META[i].baseOp * depthFactor * (pp.scale + 0.4),
        };
      }).sort((a, b) => a.z - b.z);

      const SPHERE_R = 95;

      // Back particles
      for (const p of particles) {
        if (p.z >= 0) continue;
        const r = Math.max(0.4, p.size);
        const op = Math.min(0.85, p.op);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(115,199,255,${op.toFixed(3)})`;
        if (r > 1.4) { ctx.shadowBlur = r * 4; ctx.shadowColor = "rgba(115,199,255,0.65)"; }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Rings
      for (const ring of RINGS) {
        drawRing(ring.pts, ring.rx, ring.rz, ring.baseOp, cx, cy);
      }

      // Sphere halo
      const halo = ctx.createRadialGradient(cx, cy, SPHERE_R * 0.8, cx, cy, SPHERE_R * 2);
      halo.addColorStop(0, "rgba(115,199,255,0.18)");
      halo.addColorStop(0.45, "rgba(115,199,255,0.07)");
      halo.addColorStop(1, "rgba(115,199,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, SPHERE_R * 2, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Sphere body
      const lx = cx - SPHERE_R * 0.32;
      const ly = cy - SPHERE_R * 0.38;
      const body = ctx.createRadialGradient(lx, ly, SPHERE_R * 0.04, cx, cy, SPHERE_R);
      body.addColorStop(0, "rgba(220,242,255,0.97)");
      body.addColorStop(0.22, "rgba(165,219,255,0.93)");
      body.addColorStop(0.52, "rgba(115,199,255,0.86)");
      body.addColorStop(0.78, "rgba(38,122,195,0.72)");
      body.addColorStop(1, "rgba(8,26,50,0.55)");
      ctx.beginPath();
      ctx.arc(cx, cy, SPHERE_R, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.shadowBlur = 45;
      ctx.shadowColor = "rgba(115,199,255,0.5)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Specular highlight
      const spec = ctx.createRadialGradient(lx, ly, 0, lx + 12, ly + 10, SPHERE_R * 0.75);
      spec.addColorStop(0, "rgba(255,255,255,0.72)");
      spec.addColorStop(0.28, "rgba(255,255,255,0.22)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, SPHERE_R, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      // Rim light
      ctx.beginPath();
      ctx.arc(cx, cy, SPHERE_R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(165,219,255,0.38)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(115,199,255,0.55)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Front particles
      for (const p of particles) {
        if (p.z < 0) continue;
        const r = Math.max(0.4, p.size);
        const op = Math.min(0.9, p.op);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(115,199,255,${op.toFixed(3)})`;
        if (r > 1.4) { ctx.shadowBlur = r * 5; ctx.shadowColor = "rgba(115,199,255,0.8)"; }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default HeroOrb;
