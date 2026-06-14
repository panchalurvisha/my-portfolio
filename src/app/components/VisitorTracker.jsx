'use client';

import { useEffect } from 'react';

function getOS(ua) {
  if (/windows phone/i.test(ua)) return 'Windows Phone';
  if (/win/i.test(ua))           return 'Windows';
  if (/iphone|ipod/i.test(ua))  return 'iOS';
  if (/ipad/i.test(ua))          return 'iPadOS';
  if (/android/i.test(ua))       return 'Android';
  if (/mac/i.test(ua))           return 'macOS';
  if (/cros/i.test(ua))          return 'ChromeOS';
  if (/linux/i.test(ua))         return 'Linux';
  return 'Unknown';
}

function getBrowser(ua) {
  if (/edg\//i.test(ua))          return 'Edge';
  if (/opr\//i.test(ua))          return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung';
  if (/firefox\//i.test(ua))      return 'Firefox';
  if (/fxios/i.test(ua))          return 'Firefox';
  if (/crios/i.test(ua))          return 'Chrome';
  if (/chrome\//i.test(ua))       return 'Chrome';
  if (/safari\//i.test(ua))       return 'Safari';
  if (/msie|trident/i.test(ua))   return 'IE';
  return 'Unknown';
}

function getDeviceId() {
  try {
    const key = '_vid';
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID?.() ?? (Math.random().toString(36).slice(2) + Date.now().toString(36));
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return null;
  }
}

// Fire at most once per 3 days per device
function shouldTrack() {
  try {
    const key = '_vt';
    if (document.cookie.split(';').some(c => c.trim().startsWith(key + '='))) return false;
    const exp = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=1; expires=${exp}; path=/; SameSite=Lax`;
    return true;
  } catch {
    return true;
  }
}

export default function VisitorTracker() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return;
    if (!shouldTrack()) return;

    const ua = navigator.userAgent;

    const payload = {
      deviceId: getDeviceId(),
      os:       getOS(ua),
      browser:  getBrowser(ua),
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  }, []);

  return null;
}
