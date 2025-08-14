import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function RoomsPage() {
  const roomFeatures = [
    {
      title: '和室の落ち着き',
      description: '伝統的な和室で、日本の美意識と機能性を兼ね備えた空間をお楽しみいただけます。',
      icon: '🏮',
    },
    {
      title: '渓谷を望む景色',
      description: '四季折々の渓谷の景色を眺めながら、心身ともに癒される時間をお過ごしください。',
      icon: '🏔️',
    },
    {
      title: '露天風呂付き客室',
      description: 'プライベートな露天風呂付きの特別な客室で、至福の時間をお過ごしください。',
      icon: '🛁',
    },
  ];

  const roomTypes = [
    {
      name: '和室',
      description: '伝統的な和室で、日本の美意識と機能性を兼ね備えた空間です。',
      image: animeImages.rooms.tatamiInterior,
      fallback: fallbackImages.ryokan,
      capacity: '2〜4名様',
      size: '10畳',
      price: '32,000円〜',
      features: ['10畳の広々とした空間', '渓谷を望む景色', '和風の内装'],
    },
    {
      name: '露天風呂付き客室',
      description: 'プライベートな露天風呂付きの特別な客室です。',
      image: animeImages.rooms.luxuryWithBath,
      fallback: fallbackImages.onsen,
      capacity: '2〜3名様',
      size: '12畳',
      price: '45,000円〜',
      features: ['専用露天風呂', '広々とした和室', '最高級のサービス'],
    },
    {
      name: '特別室',
      description: '渓谷を一望できる特別な客室で、至福の時間をお過ごしください。',
      image: animeImages.rooms.valleyView,
      fallback: fallbackImages.cuisine,
      capacity: '2〜4名様',
      size: '15畳',
      price: '65,000円〜',
      features: ['渓谷を一望', '広々とした空間', '特別な内装'],
    },
  ];

  const roomPolicies = [
    {
      title: 'チェックイン・チェックアウト',
      items: [
        'チェックイン: 15:00〜',
        'チェックアウト: 〜10:00',
        '早めのチェックイン、遅めのチェックアウトはご相談ください',
      ],
    },
    {
      title: 'お支払い',
      items: [
        '現金、クレジットカード、電子マネーでのお支払いに対応',
        '事前決済プランもございます',
        '消費税込みの料金表示',
      ],
    },
    {
      title: 'キャンセルポリシー',
      items: [
        '宿泊日の3日前まで: 無料',
        '宿泊日の2日前: 宿泊料金の30%',
        '宿泊日の前日: 宿泊料金の50%',
        '宿泊当日: 宿泊料金の100%',
      ],
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
              backgroundImage: `url(${animeImages.rooms.tatamiInterior})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                お部屋
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                渓谷を望む静寂な空間で、
                <br />
                心身ともに癒される特別な時間をお過ごしください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* お部屋の特徴 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              お部屋の特徴
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              すべてのお部屋から渓谷の景色を眺められ、温泉と会席料理をお楽しみいただけます。
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {roomFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
        </div>
      </section>

      {/* お部屋タイプ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              お部屋タイプ
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お客様のご要望に合わせて、様々なお部屋タイプをご用意しております。
            </p>
          </div>

          <div className="space-y-12">
            {roomTypes.map((room, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="space-y-6">
                    {/* プレミアムバッジ */}
                    {/* Removed premium badge as it's not in the new roomTypes */}

                    <div>
                      <h3 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                        {room.name}
                      </h3>
                      <p className="text-sumi-600 leading-relaxed text-lg mb-6">
                        {room.description}
                      </p>
                    </div>

                    {/* 基本情報 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-kincha-50 rounded-lg p-4">
                        <p className="text-sumi-600 text-sm">定員</p>
                        <p className="font-medium text-sumi-900">{room.capacity}</p>
                      </div>
                      <div className="bg-kincha-50 rounded-lg p-4">
                        <p className="text-sumi-600 text-sm">広さ</p>
                        <p className="font-medium text-sumi-900">{room.size}</p>
                      </div>
                    </div>

                    {/* 価格 */}
                    <div className="bg-cha-50 rounded-lg p-4">
                      <p className="text-sumi-600 text-sm">料金</p>
                      <p className="font-serif-jp text-2xl font-medium text-cha-600">
                        {room.price}
                      </p>
                      <p className="text-sumi-600 text-sm">（2名様1室・税込）</p>
                    </div>

                    {/* 特徴 */}
                    <div>
                      <h4 className="font-serif-jp text-lg font-medium text-sumi-900 mb-3">
                        特徴
                      </h4>
                      <div className="space-y-2">
                        {room.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                            <span className="text-sumi-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>



                    {/* 予約ボタン */}
                    <div className="pt-4">
                      <a
                        href="/tsukikage-sato/plans/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        ご予約はこちら
                      </a>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div
                    className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${room.image})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 利用案内 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              利用案内
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              ご宿泊に関する詳細な情報をご案内いたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomPolicies.map((policy, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-6">
                  {policy.title}
                </h3>
                <div className="space-y-3">
                  {policy.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cha-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sumi-700 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cha-600 to-cha-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-white mb-6">
            特別なお部屋で至福の時間を
          </h2>
          <p className="text-kincha-100 mb-8 text-lg">
            渓谷を望む静寂な空間で、心身ともに癒される特別な時間をお過ごしください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tsukikage-sato/plans/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cha-600 font-medium rounded-full hover:bg-kincha-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              ご宿泊プランを見る
            </a>
            <a
              href="/tsukikage-sato/contact/"
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