'use client';

import { LINKS } from '@/utils/link';

export default function TestLinksPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">リンクテストページ</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">生成されるリンク:</h2>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>HOME: {LINKS.HOME}</li>
            <li>CONTACT: {LINKS.CONTACT}</li>
            <li>PLANS: {LINKS.PLANS}</li>
            <li>RESERVATION: {LINKS.RESERVATION}</li>
            <li>FAQ: {LINKS.FAQ}</li>
            <li>PRIVACY: {LINKS.PRIVACY}</li>
            <li>TERMS: {LINKS.TERMS}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">画像パス:</h2>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Contact Hero: /images/anime-style/contact-hero.webp</li>
            <li>Main Ryokan: /images/anime-style/main-ryokan-night.webp</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">環境情報:</h2>
          <p>NODE_ENV: {process.env.NODE_ENV}</p>
          <p>Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</p>
          <p>URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">テストリンク:</h2>
          <div className="space-x-4">
            <a href={LINKS.CONTACT} className="text-blue-600 hover:underline">お問い合わせ</a>
            <a href={LINKS.PLANS} className="text-blue-600 hover:underline">プラン</a>
            <a href={LINKS.RESERVATION} className="text-blue-600 hover:underline">予約</a>
          </div>
        </div>
      </div>
    </div>
  );
}
