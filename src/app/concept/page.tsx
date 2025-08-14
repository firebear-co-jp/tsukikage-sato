import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function ConceptPage() {
  const features = [
    {
      icon: '🏔️',
      title: '渓谷を望む絶景',
      description: '四季折々の渓谷の景色を眺めながら、心身ともに癒される特別な時間をお過ごしください。',
      image: animeImages.onsen.valleyView,
      fallback: fallbackImages.ryokan,
    },
    {
      icon: '♨️',
      title: '自家源泉かけ流し温泉',
      description: '地下1,200mから湧き出る天然温泉をそのままかけ流しでお楽しみいただけます。',
      image: animeImages.onsen.naturalSpring,
      fallback: fallbackImages.onsen,
    },
    {
      icon: '🍽️',
      title: '四季折々の会席料理',
      description: '地元の旬の食材を使用し、日本の伝統的な調理法と現代的なアレンジを融合させた料理をお届けします。',
      image: animeImages.cuisine.kaisekiCourse,
      fallback: fallbackImages.cuisine,
    },
    {
      icon: '🌙',
      title: '月影の静寂',
      description: '都会の喧騒から離れ、月影の下で静寂な時間をお過ごしください。',
      image: animeImages.main.ryokanNight,
      fallback: fallbackImages.ryokan,
    },
  ];

  const values = [
    {
      title: '一期一会',
      description: 'お客様一人ひとりとの出会いを大切にし、心を込めたおもてなしをお届けします。',
    },
    {
      title: '地産地消',
      description: '地元の食材を使用し、地域の味わいと文化をお届けします。',
    },
    {
      title: '持続可能性',
      description: '環境に配慮した運営で、未来の世代にも美しい自然を残します。',
    },
  ];

  const history = [
    {
      year: '1985',
      title: '創業',
      description: '渓谷の美しい自然に魅了され、この地に旅館を開業しました。',
    },
    {
      year: '1995',
      title: '温泉発見',
      description: '地下1,200mから天然温泉が湧き出ることを発見し、温泉旅館として生まれ変わりました。',
    },
    {
      year: '2005',
      title: 'リニューアル',
      description: 'お客様により快適な時間をお過ごしいただけるよう、館内をリニューアルしました。',
    },
    {
      year: '2020',
      title: '新館オープン',
      description: '渓谷を望む新館をオープンし、より多くのお客様にお越しいただけるようになりました。',
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${animeImages.sightseeing.landscape})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                月影の郷の魅力
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-3xl">
                渓谷の静寂と温泉の恵みが織りなす、
                <br />
                特別な時間をお過ごしください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* コンセプト */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                コンセプト
              </h2>
              <div className="space-y-6">
                <p className="text-sumi-600 leading-relaxed text-lg">
                  月影の郷は、都会の喧騒から離れた渓谷の静寂の中で、心身ともに癒される特別な時間をお過ごしいただくための旅館です。
                </p>
                <p className="text-sumi-600 leading-relaxed text-lg">
                  地下1,200mから湧き出る天然温泉、地元の旬の食材を使用した会席料理、そして四季折々の渓谷の景色。
                  これらが織りなす至福の時間で、お客様の心に残る思い出を作らせていただきます。
                </p>
                <p className="text-sumi-600 leading-relaxed text-lg">
                  「一期一会」の精神で、お客様一人ひとりとの出会いを大切にし、心を込めたおもてなしをお届けします。
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                style={{
                  backgroundImage: `url(${animeImages.onsen.outdoorView})`,
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                <p className="font-serif-jp text-lg font-medium text-sumi-900">
                  「渓谷の静寂と温泉の恵みが織りなす、特別な時間を。」
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4つの魅力 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                4つの魅力
              </h2>
              <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
                月影の郷がお客様にお届けする、4つの特別な魅力をご紹介いたします。
              </p>
            </div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sumi-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div
                    className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${feature.image})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 私たちの価値観 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              私たちの価値観
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              月影の郷が大切にしている3つの価値観をご紹介いたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-sumi-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 歴史 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              歴史
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              月影の郷の歩みをご紹介いたします。
            </p>
          </div>

          <div className="relative">
            {/* タイムラインの線 */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-cha-200 hidden lg:block"></div>

            <div className="space-y-12">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:space-x-8 space-y-4 lg:space-y-0`}
                >
                  {/* デスクトップ用のタイムライン */}
                  <div className="hidden lg:block lg:w-1/2">
                    <div className={`p-6 bg-white rounded-2xl shadow-lg ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    }`}>
                      <div className="text-cha-600 font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sumi-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* タイムラインの点 */}
                  <div className="hidden lg:block relative z-10">
                    <div className="w-4 h-4 bg-cha-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  {/* モバイル用のコンテンツ */}
                  <div className="lg:hidden w-full">
                    <div className="p-6 bg-white rounded-2xl shadow-lg">
                      <div className="text-cha-600 font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sumi-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cha-600 to-cha-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-white mb-6">
            月影の郷で特別な時間を
          </h2>
          <p className="text-kincha-100 mb-8 text-lg">
            渓谷の静寂と温泉の恵みが織りなす、心に残る思い出を作りませんか。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/plans"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cha-600 font-medium rounded-full hover:bg-kincha-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              ご宿泊プランを見る
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-cha-600 transition-all duration-200"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 