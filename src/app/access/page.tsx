import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function AccessPage() {
  const accessMethods = [
    {
      icon: '🚃',
      title: '電車でのアクセス',
      description: '最寄り駅からのアクセス方法をご案内いたします。',
      routes: [
        {
          line: '○○線',
          station: '○○駅',
          time: '徒歩10分',
          details: '○○駅の東口を出て、○○通りを北に進みます。○○交差点を右折し、○○通りを東に進むと右手にございます。',
        },
        {
          line: '○○線',
          station: '○○駅',
          time: '徒歩15分',
          details: '○○駅の南口を出て、○○通りを東に進みます。○○交差点を左折し、○○通りを北に進むと左手にございます。',
        },
      ],
    },
    {
      icon: '🚗',
      title: 'お車でのアクセス',
      description: '高速道路からのアクセス方法をご案内いたします。',
      routes: [
        {
          line: '○○IC',
          station: '',
          time: '車で30分',
          details: '○○ICを降りて、○○国道を○○方面に向かいます。○○交差点を右折し、○○県道を進むと右手にございます。',
        },
        {
          line: '○○IC',
          station: '',
          time: '車で45分',
          details: '○○ICを降りて、○○国道を○○方面に向かいます。○○交差点を左折し、○○県道を進むと左手にございます。',
        },
      ],
    },
    {
      icon: '✈️',
      title: '空港からのアクセス',
      description: '最寄り空港からのアクセス方法をご案内いたします。',
      routes: [
        {
          line: '○○空港',
          station: '',
          time: '車で90分',
          details: '○○空港からレンタカーまたはタクシーをご利用ください。○○IC経由でお越しいただけます。',
        },
      ],
    },
  ];

  const parkingInfo = {
    capacity: '20台',
    fee: '宿泊者様無料',
    size: '大型車両対応可能',
    reservation: '事前予約推奨',
    features: ['24時間利用可能', '防犯カメラ完備', '照明完備', '雪道対応'],
  };

  const shuttleService = {
    available: true,
    stations: ['○○駅', '○○駅'],
    hours: '9:00〜18:00',
    frequency: '1時間に1本',
    reservation: '事前予約必須',
    fee: '無料',
  };

  const nearbyFacilities = [
    {
      name: 'コンビニエンスストア',
      distance: '徒歩3分',
      description: '24時間営業のコンビニエンスストアがございます。',
    },
    {
      name: 'ガソリンスタンド',
      distance: '車で5分',
      description: '最寄りのガソリンスタンドです。',
    },
    {
      name: '病院',
      distance: '車で10分',
      description: '最寄りの病院です。緊急時は救急車をご利用ください。',
    },
    {
      name: '銀行',
      distance: '徒歩8分',
      description: '最寄りの銀行です。ATMもございます。',
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
              backgroundImage: `url(${animeImages.access.mountainRoad})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                交通案内
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                月影の郷へのアクセス方法を
                <br />
                詳しくご案内いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 基本情報 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                基本情報
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                    所在地
                  </h3>
                  <div className="space-y-2 text-sumi-600">
                    <p>〒000-0000</p>
                    <p>○○県○○市○○町○○-○○</p>
                    <p>渓谷の湯 旅館『月影の郷』</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                    連絡先
                  </h3>
                  <div className="space-y-2 text-sumi-600">
                    <p>TEL: 000-0000-0000</p>
                    <p>FAX: 000-0000-0000</p>
                    <p>受付時間: 9:00〜21:00</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                    最寄り駅
                  </h3>
                  <div className="space-y-2 text-sumi-600">
                    <p>○○線 ○○駅 徒歩10分</p>
                    <p>○○線 ○○駅 徒歩15分</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                style={{
                  backgroundImage: `url(${animeImages.access.map})`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* アクセス方法 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              アクセス方法
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お客様のご利用方法に合わせて、様々なアクセス方法をご案内いたします。
            </p>
          </div>

          <div className="space-y-16">
            {accessMethods.map((method, index) => (
              <div key={index} className="bg-kincha-50 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="text-4xl">{method.icon}</div>
                  <div>
                    <h3 className="font-serif-jp text-2xl font-medium text-sumi-900">
                      {method.title}
                    </h3>
                    <p className="text-sumi-600">{method.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {method.routes.map((route, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-serif-jp text-lg font-medium text-sumi-900">
                          {route.line} {route.station && route.station}
                        </h4>
                        <span className="text-cha-600 font-medium">{route.time}</span>
                      </div>
                      <p className="text-sumi-600 text-sm leading-relaxed">
                        {route.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 駐車場 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              駐車場
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お車でお越しのお客様のために、駐車場をご用意しております。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sumi-600 text-sm">収容台数</p>
                  <p className="font-medium text-sumi-900 text-lg">{parkingInfo.capacity}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sumi-600 text-sm">料金</p>
                  <p className="font-medium text-sumi-900 text-lg">{parkingInfo.fee}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sumi-600 text-sm">対応車両</p>
                  <p className="font-medium text-sumi-900 text-lg">{parkingInfo.size}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sumi-600 text-sm">予約</p>
                  <p className="font-medium text-sumi-900 text-lg">{parkingInfo.reservation}</p>
                </div>
              </div>

              <div>
                <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-3">
                  駐車場の特徴
                </h3>
                <div className="space-y-2">
                  {parkingInfo.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sumi-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                style={{
                  backgroundImage: `url(${animeImages.access.parking})`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 送迎サービス */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              送迎サービス
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              最寄り駅からの送迎サービスをご利用いただけます。
            </p>
          </div>

          <div className="bg-kincha-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                  対応駅
                </h3>
                <div className="space-y-1">
                  {shuttleService.stations.map((station, idx) => (
                    <p key={idx} className="text-sumi-600">{station}</p>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🕐</div>
                <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                  運行時間
                </h3>
                <p className="text-sumi-600">{shuttleService.hours}</p>
                <p className="text-sumi-600 text-sm">{shuttleService.frequency}</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                  ご利用方法
                </h3>
                <p className="text-sumi-600">{shuttleService.reservation}</p>
                <p className="text-sumi-600">{shuttleService.fee}</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                送迎サービスを予約する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 周辺施設 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              周辺施設
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お客様の快適な滞在のために、周辺の便利な施設をご案内いたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nearbyFacilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                  {facility.name}
                </h3>
                <p className="text-cha-600 font-medium mb-3">{facility.distance}</p>
                <p className="text-sumi-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cha-600 to-cha-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-white mb-6">
            お気軽にお越しください
          </h2>
          <p className="text-kincha-100 mb-8 text-lg">
            様々なアクセス方法から、お客様に最適な方法をお選びください。
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