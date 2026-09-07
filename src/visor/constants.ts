/**
 * Permanent Video and Media Configuration
 */
export const VIDEO_CONFIG = {
  // Hero Video (Intro to Transformation)
  HERO_GOOGLE_DRIVE_URL:
    'https://drive.google.com/file/d/1g9eqlgA3ZBQe_SBcu7SXJfsLPQ3EXXXK/view?usp=sharing',
  HERO_FILE_ID: '1g9eqlgA3ZBQe_SBcu7SXJfsLPQ3EXXXK',
  HERO_API_PROXY: '/api/video?id=1g9eqlgA3ZBQe_SBcu7SXJfsLPQ3EXXXK',

  // Second Video (Features to What's Inside VISOR)
  FEATURES_GOOGLE_DRIVE_URL:
    'https://drive.google.com/file/d/1Gga1upu5VWZXAn-rth_PPAIKsXZVY6k7/view?usp=sharing',
  FEATURES_FILE_ID: '1Gga1upu5VWZXAn-rth_PPAIKsXZVY6k7',
  FEATURES_API_PROXY: '/api/video?id=1Gga1upu5VWZXAn-rth_PPAIKsXZVY6k7',
};

// Default permanent video sources
export const PERMANENT_VIDEO_URL = VIDEO_CONFIG.HERO_API_PROXY;
export const SECOND_VIDEO_URL = VIDEO_CONFIG.FEATURES_API_PROXY;
