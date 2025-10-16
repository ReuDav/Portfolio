// utils/getWebClientInfo.ts
export async function getWebClientInfo() {
  try {
    // 🌐 Külső IP lekérése (pl. https://api.ipify.org/json)
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();

    // 🧠 Browser info
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const online = navigator.onLine;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const colorDepth = window.screen.colorDepth;

    // 💾 Performance info (nem minden browser támogatja)
    const hardwareConcurrency = navigator.hardwareConcurrency || null;
    const deviceMemory = (navigator as any).deviceMemory || null;

    // 🧱 Browser type + engine (egyszerű UA parser)
    const browserInfo = parseUserAgent(ua);

    // 📦 Összeállított adat
    return {
      ipAddress: ipData?.ip ?? 'unknown',
      userAgent: ua,
      browser: browserInfo.browser,
      browserVersion: browserInfo.version,
      os: browserInfo.os,
      platform,
      language,
      timezone,
      online,
      screenWidth,
      screenHeight,
      colorDepth,
      hardwareConcurrency,
      deviceMemory,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ getWebClientInfo() error:', error);
    return { error: String(error) };
  }
}

/**
 * Egyszerű user agent parser (browser + OS + verzió)
 */
function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let version = 'Unknown';
  let os = 'Unknown';

  // Böngésző detektálás
  if (ua.includes('Edg')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome')) browser = 'Google Chrome';
  else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
  else if (ua.includes('Safari')) browser = 'Apple Safari';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';

  // Verzió
  const versionMatch = ua.match(/(Chrome|Firefox|Safari|Edg|OPR)\/([\d.]+)/);
  if (versionMatch) version = versionMatch[2];

  // Operációs rendszer
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { browser, version, os };
}