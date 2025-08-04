import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function FacilitiesPage() {
  const facilities = [
    {
      name: '温泉大浴場',
      description: '地下1,200mから湧き出る天然温泉をそのままかけ流しでお楽しみいただけます。',
      image: animeImages.onsen.indoorBath,
      fallback: fallbackImages.onsen,
      hours: '6:00〜24:00',
      features: ['男女別浴場', '露天風呂', '貸切風呂', 'サウナ'],
    },
    {
      name: 'レストラン「月影」',
      description: '渓谷を望む絶景の中で、四季折々の会席料理をお楽しみいただけます。',
      image: animeImages.facilities.restaurant,
      fallback: fallbackImages.cuisine,
      hours: '朝食: 7:00〜9:00 / 夕食: 18:00〜20:00',
      features: ['個室あり', '渓谷を望む景色', '季節の会席料理', '地産地消メニュー'],
    },
    {
      name: 'ロビー・ラウンジ',
      description: 'チェックイン前後やお食事の合間に、ゆったりとお過ごしいただけます。',
      image: animeImages.facilities.lobby,
      fallback: fallbackImages.ryokan,
      hours: '24時間利用可能',
      features: ['渓谷を望む景色', '無料Wi-Fi', 'コーヒー・お茶サービス', '読書スペース'],
    },
    {
      name: '売店',
      description: '地元の特産品や温泉関連商品、お土産などをご購入いただけます。',
      image: animeImages.facilities.shop,
      fallback: fallbackImages.cuisine,
      hours: '8:00〜20:00',
      features: ['地元特産品', '温泉関連商品', 'お土産', '日用品'],
    },
  ];

  const services = [
    {
      icon: '🚗',
      title: '送迎サービス',
      description: '最寄り駅からの送迎サービスを無料でご利用いただけます。事前にご予約ください。',
    },
    {
      icon: '🧳',
      title: '荷物預かり',
      description: 'チェックイン前やチェックアウト後の荷物預かりサービスをご利用いただけます。',
    },
    {
      icon: '📱',
      title: 'Wi-Fi',
      description: '館内全域で無料Wi-Fiをご利用いただけます。',
    },
    {
      icon: '🅿️',
      title: '駐車場',
      description: '宿泊者様は無料で駐車場をご利用いただけます。大型車両も対応可能です。',
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
              backgroundImage: `url(${animeImages.facilities.gardenLobby})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                館内のご案内
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                快適な滞在のために、
                <br />
                館内の施設・サービスをご案内いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 館内施設 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              館内施設
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お客様の快適な滞在のために、様々な施設をご用意しております。
            </p>
          </div>

          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                    {facility.name}
                  </h3>
                  <p className="text-sumi-600 leading-relaxed text-lg mb-6">
                    {facility.description}
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 mb-6">
                    <p className="text-sumi-600 text-sm">営業時間</p>
                    <p className="font-medium text-sumi-900">{facility.hours}</p>
                  </div>

                  <div>
                    <h4 className="font-serif-jp text-lg font-medium text-sumi-900 mb-3">
                      特徴
                    </h4>
                    <div className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sumi-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div
                    className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${facility.image})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サービス */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              サービス
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お客様の快適な滞在のために、様々なサービスをご提供しております。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-sumi-600 leading-relaxed">
                  {service.description}
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
            快適な滞在をお約束します
          </h2>
          <p className="text-kincha-100 mb-8 text-lg">
            館内の施設・サービスを存分にお楽しみいただき、心に残る思い出を作りませんか。
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