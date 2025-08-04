import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function OnsenPage() {
  const onsenFeatures = [
    {
      title: '自家源泉かけ流し',
      description: '当館の温泉は、地下1,200mから湧き出る天然温泉をそのままかけ流しでお楽しみいただけます。',
      icon: '💧',
    },
    {
      title: '渓谷を望む露天風呂',
      description: '四季折々の渓谷の景色を眺めながら、心身ともに癒される時間をお過ごしください。',
      icon: '🏔️',
    },
    {
      title: '貸切風呂',
      description: 'ご家族やカップルでゆっくりとお楽しみいただける貸切風呂もご用意しております。',
      icon: '🛁',
    },
  ];

  const onsenTypes = [
    {
      name: '大浴場',
      description: '広々とした空間で、ゆったりと温泉をお楽しみいただけます。',
      image: animeImages.onsen.largePublicBath,
      fallback: fallbackImages.onsen,
      features: ['広々とした空間', '渓谷を望む景色', '男女別浴場'],
    },
    {
      name: '露天風呂',
      description: '自然の中に佇む露天風呂で、四季の移ろいを感じながら温泉をお楽しみください。',
      image: animeImages.onsen.outdoorView,
      fallback: fallbackImages.ryokan,
      features: ['自然の中の露天風呂', '四季の景色', '星空を眺める'],
    },
    {
      name: '貸切風呂',
      description: 'ご家族やカップルでゆっくりとお楽しみいただける貸切風呂です。',
      image: animeImages.onsen.privateBath,
      fallback: fallbackImages.cuisine,
      features: ['完全プライベート', '予約制', '追加料金不要'],
    },
  ];

  const onsenEffects = [
    '神経痛',
    '筋肉痛',
    '関節痛',
    '五十肩',
    '運動麻痺',
    '関節のこわばり',
    'うちみ',
    'くじき',
    '慢性消化器病',
    '痔疾',
    '冷え性',
    '病後回復期',
    '疲労回復',
    '健康増進',
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
              backgroundImage: `url(${animeImages.onsen.valleyView})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                温泉
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                千年の湯に、心をほどく。
                <br />
                自家源泉かけ流しの温泉で、心身ともに癒されてください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 温泉の特徴 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              温泉の特徴
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              当館の温泉は、地下1,200mから湧き出る天然温泉をそのままかけ流しでお楽しみいただけます。
              渓谷を望む露天風呂で、四季の移ろいを感じながら心身を癒してください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onsenFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-sumi-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 泉質・効能 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                泉質・効能
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                    泉質
                  </h3>
                  <p className="text-sumi-600 leading-relaxed">
                    単純温泉（低張性・弱アルカリ性温泉）
                    <br />
                    温度: 42.3℃
                    <br />
                    pH: 8.2
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                    効能
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {onsenEffects.map((effect, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-sumi-700">{effect}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                style={{
                  backgroundImage: `url(${animeImages.onsen.relaxation})`,
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                <p className="font-serif-jp text-lg font-medium text-sumi-900">
                  「千年の湯に、心をほどく。」
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 温泉施設 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              温泉施設
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              大浴場、露天風呂、貸切風呂など、様々な温泉施設をご用意しております。
              お好みに合わせてお選びください。
            </p>
          </div>

          <div className="space-y-12">
            {onsenTypes.map((type, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                    {type.name}
                  </h3>
                  <p className="text-sumi-600 leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sumi-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div
                    className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${type.image})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 利用案内 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              利用案内
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-kincha-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-4">🕐</div>
              <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                営業時間
              </h3>
              <p className="text-sumi-600 text-sm">
                6:00〜24:00
                <br />
                （最終入浴 23:30）
              </p>
            </div>

            <div className="bg-kincha-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                利用対象
              </h3>
              <p className="text-sumi-600 text-sm">
                宿泊者限定
                <br />
                （日帰り入浴不可）
              </p>
            </div>

            <div className="bg-kincha-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-4">🛁</div>
              <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                貸切風呂
              </h3>
              <p className="text-sumi-600 text-sm">
                予約制
                <br />
                追加料金不要
              </p>
            </div>

            <div className="bg-kincha-50 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-4">🧴</div>
              <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                アメニティ
              </h3>
              <p className="text-sumi-600 text-sm">
                シャンプー・リンス
                <br />
                ボディソープ完備
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 