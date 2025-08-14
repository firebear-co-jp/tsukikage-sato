import Link from 'next/link';
import { animeImages } from '@/config/images';

export default function FeaturesSection() {
  const features = [
    {
      id: 'onsen',
      title: '温泉',
      subtitle: '自家源泉かけ流し',
      description: '渓谷を望む露天風呂で、千年の湯に心を癒されてください。自家源泉かけ流しの温泉は、疲れを癒し、心身をリフレッシュさせます。',
      image: animeImages.onsen.outdoorView,
      href: '/onsen',
      features: ['自家源泉かけ流し', '渓谷を望む露天風呂', '貸切風呂あり'],
    },
    {
      id: 'cuisine',
      title: 'お料理',
      subtitle: '四季折々の会席料理',
      description: '地元の旬の食材を使用した会席料理。料理長が心を込めて作る一品一品が、日本の四季と伝統の味わいをお届けします。',
      image: animeImages.cuisine.kaisekiCourse,
      href: '/cuisine',
      features: ['地産地消', '季節の会席料理', '個室での食事'],
    },
    {
      id: 'rooms',
      title: 'お部屋',
      subtitle: '静寂の贅沢空間',
      description: '渓谷の景色を望む和室で、日本の伝統的な空間をお楽しみください。露天風呂付き客室や和洋室など、お好みに合わせてお選びいただけます。',
      image: animeImages.rooms.tatamiInterior,
      href: '/rooms',
      features: ['渓谷を望む和室', '露天風呂付き客室', '和洋室'],
    },
  ];

  return (
    <section className="py-20 bg-kincha-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
            月影の郷の魅力
          </h2>
          <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
            創業100年の歴史が育んだ、温泉、料理、空間。
            それぞれが織りなす一期一会の体験をお楽しみください。
          </p>
        </div>

        {/* 魅力紹介カード */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* 画像 */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${feature.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                
                {/* 特徴タグ */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-kincha-50/90 backdrop-blur-sm text-sumi-900 text-xs font-medium rounded-full">
                    {feature.subtitle}
                  </span>
                </div>

                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-sumi-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* コンテンツ */}
              <div className="p-6">
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sumi-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* 特徴リスト */}
                <div className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-sumi-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* 詳細リンク */}
                <Link
                  href={feature.href}
                  className="inline-flex items-center text-cha-600 hover:text-cha-700 font-medium transition-colors duration-200 group/link"
                >
                  詳しく見る
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
                            href="/tsukikage-sato/concept"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            すべての魅力を見る
          </Link>
        </div>
      </div>
    </section>
  );
} 