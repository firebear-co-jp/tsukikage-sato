// 環境に応じて動的にリンクを生成するユーティリティ関数

export function getLink(path: string): string {
  // クライアントサイドでホスト名を確認して環境を判定
  const isProduction = typeof window !== 'undefined' 
    ? window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    : process.env.NODE_ENV === 'production';
  
  // 本番環境（GitHub Pages）では /tsukikage-sato プレフィックスが必要
  // ローカル開発では不要
  const basePath = isProduction ? '/tsukikage-sato' : '';
  
  // パスが既に / で始まっている場合はそのまま使用
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  const result = `${basePath}${cleanPath}`;
  
  // デバッグ用ログ（開発時のみ）
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log(`getLink(${path}): ${result} (isProduction: ${isProduction})`);
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
