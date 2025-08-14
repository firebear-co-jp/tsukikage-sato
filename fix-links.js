const fs = require('fs');
const path = require('path');

// 修正対象のファイルとパターン
const filesToFix = [
  'src/app/facilities/page.tsx',
  'src/app/cuisine/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/concept/page.tsx',
  'src/app/rooms/page.tsx',
  'src/app/plans/page.tsx',
  'src/app/sightseeing/page.tsx',
  'src/app/contact/thank-you/page.tsx',
  'src/components/NewsDetailClient.tsx'
];

// 修正パターン
const patterns = [
  { from: 'href="/contact"', to: 'href={LINKS.CONTACT()}' },
  { from: 'href="/plans"', to: 'href={LINKS.PLANS()}' },
  { from: 'href="/news"', to: 'href={LINKS.NEWS()}' },
  { from: 'href="/onsen"', to: 'href={LINKS.ONSEN()}' },
  { from: 'href="/cuisine"', to: 'href={LINKS.CUISINE()}' },
  { from: 'href="/privacy"', to: 'href={LINKS.PRIVACY()}' },
  { from: 'href="/terms"', to: 'href={LINKS.TERMS()}' },
  { from: 'href="/faq"', to: 'href={LINKS.FAQ()}' },
  { from: 'href="/concept"', to: 'href={LINKS.CONCEPT()}' },
  { from: 'href="/rooms"', to: 'href={LINKS.ROOMS()}' },
  { from: 'href="/facilities"', to: 'href={LINKS.FACILITIES()}' },
  { from: 'href="/sightseeing"', to: 'href={LINKS.SIGHTSEEING()}' },
  { from: 'href="/access"', to: 'href={LINKS.ACCESS()}' },
  { from: 'href="/reservation"', to: 'href={LINKS.RESERVATION()}' },
  { from: 'href="/"', to: 'href={LINKS.HOME()}' }
];

// インポート文を追加するパターン
const importPattern = "import { LINKS } from '@/utils/link';";

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // インポート文が既に存在するかチェック
    if (!content.includes("import { LINKS } from '@/utils/link'")) {
      // 最初のimport文の後に追加
      const importMatch = content.match(/import.*from.*['"];?\n/);
      if (importMatch) {
        const insertIndex = content.indexOf(importMatch[0]) + importMatch[0].length;
        content = content.slice(0, insertIndex) + importPattern + '\n' + content.slice(insertIndex);
      }
    }
    
    // パターンを適用
    patterns.forEach(pattern => {
      content = content.replace(new RegExp(pattern.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), pattern.to);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Link fixing completed!');
