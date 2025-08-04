import Link from 'next/link';
import { animeImages } from '@/config/images';

export default function PlansSection() {
  const plans = [
    {
      id: 'romantic-special',
      title: '記念日プラン',
      subtitle: '特別な日を彩る',
      description: '大切な記念日を月影の郷でお過ごしください。露天風呂付き客室と特別な会席料理で、思い出に残る時間をお届けします。',
      image: animeImages.plans.romanticCouple,
      price: '45,000',
      priceNote: '〜（2名様1室）',
      features: ['露天風呂付き客室', '特別会席料理', '記念日デコレーション', 'シャンパンサービス'],
      href: '/plans/romantic-special',
      category: '記念日',
    },
    {
      id: 'gourmet-seasonal',
      title: 'グルメプラン',
      subtitle: '四季の味覚を堪能',
      description: '地元の旬の食材を使用した会席料理を存分にお楽しみください。料理長が心を込めて作る一品一品が、日本の四季をお届けします。',
      image: animeImages.plans.gourmetDining,
      price: '38,000',
      priceNote: '〜（2名様1室）',
      features: ['渓谷を望む和室', '季節の会席料理', '地産地消メニュー', '個室での食事'],
      href: '/plans/gourmet-seasonal',
      category: 'グルメ',
    },
    {
      id: 'relax-onsen',
      title: '癒しプラン',
      subtitle: '温泉で心身をリフレッシュ',
      description: '自家源泉かけ流しの温泉で、日々の疲れを癒してください。渓谷を望む露天風呂で、心身ともにリフレッシュできます。',
      image: animeImages.plans.healingOnsen,
      price: '32,000',
      priceNote: '〜（2名様1室）',
      features: ['渓谷を望む和室', '貸切風呂利用', '温泉効能説明', 'リラクゼーション'],
      href: '/plans/relax-onsen',
      category: '癒し',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
            おすすめのご宿泊プラン
          </h2>
          <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
            お客様のご要望に合わせて、様々なプランをご用意しております。
            特別な記念日から、日常の癒しまで、お好みに合わせてお選びください。
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-kincha-100"
            >
              {/* 画像 */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${plan.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                
                {/* カテゴリタグ */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-cha-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {plan.category}
                  </span>
                </div>

                {/* 価格 */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-sumi-900 font-serif-jp text-lg font-medium">
                      ¥{plan.price}
                    </p>
                    <p className="text-sumi-600 text-xs">
                      {plan.priceNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* コンテンツ */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-cha-600 text-sm font-medium">
                    {plan.subtitle}
                  </p>
                </div>
                
                <p className="text-sumi-600 text-sm leading-relaxed mb-4">
                  {plan.description}
                </p>

                {/* 特徴リスト */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-sumi-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 詳細リンク */}
                <Link
                  href={plan.href}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-cha-600 to-cha-700 text-white text-sm font-medium rounded-lg hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
          >
            すべてのプランを見る
          </Link>
        </div>
      </div>
    </section>
  );
} 