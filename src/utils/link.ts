// 環境に応じて動的にリンクを生成するユーティリティ関数

export function getLink(path: string): string {
  // 本番環境（GitHub Pages）では /tsukikage-sato プレフィックスが必要
  // ローカル開発では不要
  const basePath = process.env.NODE_ENV === 'production' ? '/tsukikage-sato' : '';
  
  // パスが既に / で始まっている場合はそのまま使用
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${cleanPath}`;
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
