'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationWidget from '@/components/ReservationWidget';
import { animeImages, fallbackImages } from '@/config/images';

export default function PlansPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'romantic', label: '記念日' },
    { id: 'gourmet', label: 'グルメ' },
    { id: 'relax', label: '癒し' },
    { id: 'family', label: 'ファミリー' },
    { id: 'solo', label: '一人旅' },
  ];

  const plans = [
    {
      id: 'romantic-special',
      title: '記念日特別プラン',
      subtitle: '特別な日を彩る',
      description: '大切な記念日を月影の郷でお過ごしください。露天風呂付き客室と特別な会席料理で、思い出に残る時間をお届けします。',
      image: animeImages.plans.romanticCouple,
      fallback: fallbackImages.ryokan,
      price: '45,000',
      priceNote: '〜（2名様1室）',
      features: ['露天風呂付き客室', '特別会席料理', '記念日デコレーション', 'シャンパンサービス'],
      href: '/plans/romantic-special/',
      category: 'romantic',
      popular: true,
    },
    {
      id: 'gourmet-seasonal',
      title: '季節の会席プラン',
      subtitle: '四季の味覚を堪能',
      description: '地元の旬の食材を使用した会席料理を存分にお楽しみください。料理長が心を込めて作る一品一品が、日本の四季をお届けします。',
      image: animeImages.plans.gourmetDining,
      fallback: fallbackImages.cuisine,
      price: '38,000',
      priceNote: '〜（2名様1室）',
      features: ['渓谷を望む和室', '季節の会席料理', '地産地消メニュー', '個室での食事'],
      href: '/plans/gourmet-seasonal/',
      category: 'gourmet',
    },
    {
      id: 'relax-onsen',
      title: '温泉癒しプラン',
      subtitle: '温泉で心身をリフレッシュ',
      description: '自家源泉かけ流しの温泉で、日々の疲れを癒してください。渓谷を望む露天風呂で、心身ともにリフレッシュできます。',
      image: animeImages.plans.healingOnsen,
      fallback: fallbackImages.onsen,
      price: '32,000',
      priceNote: '〜（2名様1室）',
      features: ['渓谷を望む和室', '貸切風呂利用', '温泉効能説明', 'リラクゼーション'],
      href: '/plans/relax-onsen/',
      category: 'relax',
    },
    {
      id: 'family-friendly',
      title: 'ファミリープラン',
      subtitle: '家族で楽しむ温泉旅',
      description: 'お子様からご年配の方まで、家族全員でお楽しみいただけるプランです。安心・安全な環境で、思い出作りをお手伝いします。',
      image: animeImages.plans.familyHappy,
      fallback: fallbackImages.ryokan,
      price: '35,000',
      priceNote: '〜（4名様1室）',
      features: ['和洋室', 'お子様メニュー', '貸切風呂利用', '家族向けアメニティ'],
      href: '/plans/family-friendly/',
      category: 'family',
    },
    {
      id: 'solo-healing',
      title: '一人旅癒しプラン',
      subtitle: '自分だけの贅沢時間',
      description: '一人旅だからこそ味わえる贅沢な時間をお過ごしください。静寂の中で自分を見つめ直す、特別な体験をお届けします。',
      image: animeImages.plans.soloTraveler,
      fallback: fallbackImages.ryokan,
      price: '28,000',
      priceNote: '〜（1名様）',
      features: ['渓谷を望む和室', '一人用会席料理', '貸切風呂利用', '読書スペース'],
      href: '/plans/solo-healing/',
      category: 'solo',
    },
    {
      id: 'premium-suite',
      title: 'プレミアムスイートプラン',
      subtitle: '最高級の贅沢体験',
      description: '月影の郷の最高級プラン。露天風呂付きスイートルームと、料理長が心を込めて作る特別な会席料理で、至福の時間をお過ごしください。',
      image: animeImages.plans.premiumLuxury,
      fallback: fallbackImages.ryokan,
      price: '65,000',
      priceNote: '〜（2名様1室）',
      features: ['露天風呂付きスイート', '特別会席料理', '専用コンシェルジュ', 'シャンパンサービス'],
      href: '/plans/premium-suite/',
      category: 'romantic',
      premium: true,
    },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? plans 
    : plans.filter(plan => plan.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${animeImages.plans.romanticCouple})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                ご宿泊プラン
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                お客様のご要望に合わせて、様々なプランをご用意しております。
                特別な記念日から、日常の癒しまで、お好みに合わせてお選びください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 空室検索ウィジェット */}
      <section className="py-12 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReservationWidget />
        </div>
      </section>

      {/* プラン一覧 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* カテゴリフィルター */}
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-8">
              プラン一覧
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-cha-600 text-white shadow-lg'
                      : 'bg-kincha-100 text-sumi-700 hover:bg-kincha-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* プランカード */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-kincha-100 relative"
              >
                {/* 人気・プレミアムバッジ */}
                {plan.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-hi-500 text-white text-xs font-medium rounded-full">
                      人気
                    </span>
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-kincha-600 to-cha-600 text-white text-xs font-medium rounded-full">
                      プレミアム
                    </span>
                  </div>
                )}

                {/* 画像 */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${plan.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                  
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
                  <a
                    href={plan.href}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-cha-600 to-cha-700 text-white text-sm font-medium rounded-lg hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    詳細を見る
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 結果が0件の場合 */}
          {filteredPlans.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sumi-600 text-lg">
                選択されたカテゴリのプランが見つかりませんでした。
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-6 py-3 bg-cha-600 text-white rounded-full hover:bg-cha-700 transition-colors duration-200"
              >
                すべてのプランを見る
              </button>
            </div>
          )}
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-6">
            ご不明な点がございましたら
          </h2>
          <p className="text-sumi-600 mb-8">
            プランについてご不明な点やご質問がございましたら、お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:000-0000-0000"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="text-lg mr-2">📞</span>
              000-0000-0000
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 