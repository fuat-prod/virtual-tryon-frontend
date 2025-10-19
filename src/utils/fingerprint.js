import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise = null;

/**
 * Device fingerprint oluştur
 */
export async function getDeviceFingerprint() {
  try {
    // FingerprintJS instance'ı oluştur (sadece bir kez)
    if (!fpPromise) {
      fpPromise = FingerprintJS.load();
    }

    const fp = await fpPromise;
    const result = await fp.get();

    return {
      deviceId: result.visitorId,
      deviceInfo: {
        browser: getBrowser(),
        os: getOS(),
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        device_type: getDeviceType(),
        country: null // Backend'de IP'den alınacak
      }
    };
  } catch (error) {
    console.error('Fingerprint error:', error);
    // Fallback: localStorage'dan random ID
    let fallbackId = localStorage.getItem('device_id');
    if (!fallbackId) {
      fallbackId = `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('device_id', fallbackId);
    }
    
    return {
      deviceId: fallbackId,
      deviceInfo: {
        browser: getBrowser(),
        os: getOS(),
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        device_type: getDeviceType()
      }
    };
  }
}

function getBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

function getOS() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}