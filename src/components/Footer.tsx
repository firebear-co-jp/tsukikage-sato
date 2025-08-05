import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { href: '/Ryokan-HP/concept/', label: '月影の郷の魅力' },
      { href: '/Ryokan-HP/onsen/', label: '温泉' },
      { href: '/Ryokan-HP/cuisine/', label: 'お料理' },
      { href: '/Ryokan-HP/rooms/', label: 'お部屋' },
    ],
    plans: [
      { href: '/Ryokan-HP/plans/', label: 'ご宿泊プラン' },
      { href: '/Ryokan-HP/facilities/', label: '館内のご案内' },
      { href: '/Ryokan-HP/sightseeing/', label: '周辺観光' },
      { href: '/Ryokan-HP/access/', label: '交通案内' },
    ],
    support: [
      { href: '/Ryokan-HP/faq/', label: 'よくあるご質問' },
      { href: '/Ryokan-HP/contact/', label: 'お問い合わせ' },
      { href: '/Ryokan-HP/privacy/', label: 'プライバシーポリシー' },
      { href: '/Ryokan-HP/terms/', label: '利用規約' },
    ],
  };

  return (
    <footer className="bg-sumi-950 text-kincha-50">
      {/* メインフッター */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 旅館情報 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-kincha-400 to-cha-500 rounded-full opacity-80"></div>
                <div className="absolute inset-1.5 bg-sumi-950 rounded-full flex items-center justify-center">
                  <span className="text-kincha-50 font-serif-jp text-sm font-medium">月</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif-jp text-lg font-medium text-kincha-50">
                  渓谷の湯 旅館
                </h3>
                <p className="font-serif-jp text-sm text-kincha-200 -mt-1">
                  月影の郷
                </p>
              </div>
            </div>
            <p className="text-kincha-200 text-sm leading-relaxed mb-6">
              創業100年を迎える老舗旅館。自家源泉かけ流しの温泉と四季折々の会席料理で、静寂の贅沢をお楽しみください。
            </p>
            <div className="space-y-2 text-sm text-kincha-200">
              <p>〒000-0000</p>
              <p>○○県○○市○○町○○-○○</p>
              <p>TEL: 000-0000-0000</p>
              <p>受付時間: 9:00〜21:00</p>
            </div>
          </div>

          {/* 旅館について */}
          <div>
            <h4 className="font-serif-jp text-lg font-medium text-kincha-50 mb-6 border-b border-kincha-700 pb-2">
              旅館について
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kincha-200 hover:text-kincha-50 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ご宿泊・サービス */}
          <div>
            <h4 className="font-serif-jp text-lg font-medium text-kincha-50 mb-6 border-b border-kincha-700 pb-2">
              ご宿泊・サービス
            </h4>
            <ul className="space-y-3">
              {footerLinks.plans.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kincha-200 hover:text-kincha-50 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h4 className="font-serif-jp text-lg font-medium text-kincha-50 mb-6 border-b border-kincha-700 pb-2">
              サポート
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kincha-200 hover:text-kincha-50 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SNS・お問い合わせ */}
        <div className="mt-12 pt-8 border-t border-kincha-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-kincha-200 text-sm mb-2">お電話でのお問い合わせ</p>
                <a
                  href="tel:000-0000-0000"
                  className="text-2xl font-serif-jp font-medium text-kincha-50 hover:text-kincha-200 transition-colors duration-200"
                >
                  000-0000-0000
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-kincha-400 text-sm">Follow us</span>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-kincha-800 hover:bg-kincha-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <span className="text-kincha-200 text-lg">📷</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-kincha-800 hover:bg-kincha-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <span className="text-kincha-200 text-lg">📘</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-kincha-800 hover:bg-kincha-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <span className="text-kincha-200 text-lg">🐦</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="bg-sumi-900 border-t border-kincha-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-kincha-300 text-sm">
              © {currentYear} 渓谷の湯 旅館『月影の郷』. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-kincha-300">
              <Link href="/Ryokan-HP/privacy/" className="hover:text-kincha-200 transition-colors duration-200">
                プライバシーポリシー
              </Link>
              <span>|</span>
              <Link href="/Ryokan-HP/terms/" className="hover:text-kincha-200 transition-colors duration-200">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 