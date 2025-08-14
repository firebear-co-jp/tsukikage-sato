// 環境に応じて動的にリンクを生成するユーティリティ関数

export function getLink(path: string): string {
  // Next.jsのbasePath設定を使用（next.config.jsで設定）
  let basePath = '';
  
  if (typeof window !== 'undefined') {
    // クライアントサイドでは window.__NEXT_DATA__ から basePath を取得
    // TypeScriptエラーを回避するため、any型でキャスト
    const nextData = (window as any).__NEXT_DATA__;
    basePath = nextData?.basePath || '';
  } else {
    // サーバーサイドでは環境変数から判定
    basePath = process.env.NODE_ENV === 'production' ? '/tsukikage-sato' : '';
  }
  
  // パスが既に / で始まっている場合はそのまま使用
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  const result = `${basePath}${cleanPath}`;
  
  // デバッグ用ログ（開発時のみ）
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log(`getLink(${path}): ${result} (basePath: ${basePath})`);
  }
  
  return result;
}

// 画像パス用の関数（Next.jsのbasePath設定を使用）
export function getImagePath(path: string): string {
  // Next.jsのbasePath設定を使用（next.config.jsで設定）
  let basePath = '';
  
  if (typeof window !== 'undefined') {
    // クライアントサイドでは window.__NEXT_DATA__ から basePath を取得
    // TypeScriptエラーを回避するため、any型でキャスト
    const nextData = (window as any).__NEXT_DATA__;
    basePath = nextData?.basePath || '';
  } else {
    // サーバーサイドでは環境変数から判定
    basePath = process.env.NODE_ENV === 'production' ? '/tsukikage-sato' : '';
  }
  
  // パスが既に / で始まっている場合はそのまま使用
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  const result = `${basePath}${cleanPath}`;
  
  // デバッグ用ログ（開発時のみ）
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log(`getImagePath(${path}): ${result} (basePath: ${basePath})`);
  }
  
  return result;
}

// よく使用されるリンクの定数
export const LINKS = {
  HOME: () => getLink('/'),
  CONCEPT: () => getLink('/concept'),
  ONSEN: () => getLink('/onsen'),
  CUISINE: () => getLink('/cuisine'),
  ROOMS: () => getLink('/rooms'),
  PLANS: () => getLink('/plans'),
  FACILITIES: () => getLink('/facilities'),
  SIGHTSEEING: () => getLink('/sightseeing'),
  ACCESS: () => getLink('/access'),
  CONTACT: () => getLink('/contact'),
  RESERVATION: () => getLink('/reservation'),
  FAQ: () => getLink('/faq'),
  PRIVACY: () => getLink('/privacy'),
  TERMS: () => getLink('/terms'),
  NEWS: () => getLink('/news'),
} as const;
