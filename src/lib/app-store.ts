/**
 * App store download links.
 *
 * TODO: Replace APP_STORE_URL with the real App Store URL once it is available.
 * The current value is a placeholder that redirects to the download section.
 */
export const APP_STORE_URL = "https://apps.apple.com/app/visor-fitness";
export const APP_STORE_DEEP_LINK = "itms-apps://apps.apple.com/app/visor-fitness";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.visor.app";
export const GOOGLE_PLAY_DEEP_LINK = "market://details?id=com.visor.app";

export const handleAppStoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  if (isIOS) {
    e.preventDefault();
    window.location.href = APP_STORE_DEEP_LINK;
  }
};

export const handleGooglePlayClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isAndroid) {
    e.preventDefault();
    window.location.href = GOOGLE_PLAY_DEEP_LINK;
  }
};
