import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function CuisinePage() {
  const cuisineFeatures = [
    {
      title: '四季折々の会席料理',
      description: '季節の食材を活かした伝統的な会席料理で、日本の食文化の真髄をお楽しみいただけます。',
      icon: '🍱',
    },
    {
      title: '地元の新鮮食材',
      description: '地元の農家から直接仕入れた新鮮な野菜や、近海で獲れた魚介類を使用しています。',
      icon: '🥬',
    },
    {
      title: '料理長の技',
      description: '30年以上の経験を持つ料理長が、一つひとつ心を込めて調理いたします。',
      icon: '👨‍🍳',
    },
  ];

  const cuisineTypes = [
    {
      name: '朝食',
      description: '一日の始まりに、心と体を温める和食の朝食をお楽しみください。',
      image: animeImages.cuisine.kaisekiCourse,
      fallback: fallbackImages.cuisine,
      features: ['季節の小鉢', '焼き魚', '味噌汁', 'ご飯'],
    },
    {
      name: '夕食',
      description: '一日の疲れを癒す、贅沢な会席料理をお楽しみください。',
      image: animeImages.cuisine.chefCooking,
      fallback: fallbackImages.ryokan,
      features: ['前菜', '刺身', '焼き物', '煮物', 'ご飯', 'デザート'],
    },
    {
      name: '季節の特別料理',
      description: '四季折々の食材を使用した特別な料理をご用意しております。',
      image: animeImages.cuisine.seasonalDishes,
      fallback: fallbackImages.onsen,
      features: ['春：桜鯛', '夏：鮎', '秋：松茸', '冬：蟹'],
    },
  ];

  const chefInfo = {
    name: '料理長 田中 誠一',
    experience: '30年以上の経験を持つ料理長',
    philosophy: '地元の旬の食材を活かし、日本の伝統的な調理法と現代的なアレンジを融合させた料理をお届けします。',
    specialties: ['会席料理', '懐石料理', '季節の創作料理'],
  };

  const diningRooms = [
    {
      name: '個室「月影」',
      description: '渓谷を望む完全個室。特別な記念日や接待に最適です。',
      capacity: '2〜6名様',
      image: animeImages.cuisine.privateRoom,
      fallback: fallbackImages.ryokan,
    },
    {
      name: '個室「桜」',
      description: '落ち着いた雰囲気の個室。カップルや少人数での食事に最適です。',
      capacity: '2〜4名様',
      image: animeImages.cuisine.cherryRoom,
      fallback: fallbackImages.cuisine,
    },
    {
      name: '大広間「渓谷」',
      description: '広々とした空間で、グループでの食事をお楽しみいただけます。',
      capacity: '10〜20名様',
      image: animeImages.cuisine.largeHall,
      fallback: fallbackImages.ryokan,
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
              backgroundImage: `url(${animeImages.cuisine.kaisekiCourse})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                お料理
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                四季折々の会席料理で、
                <br />
                日本の伝統と現代の味わいをお楽しみください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 料理長紹介 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                料理長からのご挨拶
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-2">
                    {chefInfo.name}
                  </h3>
                  <p className="text-cha-600 font-medium">
                    {chefInfo.experience}
                  </p>
                </div>
                
                <p className="text-sumi-600 leading-relaxed text-lg">
                  {chefInfo.philosophy}
                </p>

                <div>
                  <h4 className="font-serif-jp text-lg font-medium text-sumi-900 mb-3">
                    得意分野
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {chefInfo.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cha-100 text-cha-700 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                style={{
                  backgroundImage: `url(${animeImages.cuisine.kaisekiCourse})`,
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                <p className="font-serif-jp text-lg font-medium text-sumi-900">
                  「一期一会の料理で、心を癒す時間を。」
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料理のコンセプト */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              料理のコンセプト
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              地元の旬の食材を使用し、日本の伝統的な調理法と現代的なアレンジを融合させた料理をお届けします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cha-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                地産地消
              </h3>
              <p className="text-sumi-600 leading-relaxed">
                地元の農家から直接仕入れた新鮮な食材を使用し、地域の味わいをお届けします。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cha-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍃</span>
              </div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                四季折々
              </h3>
              <p className="text-sumi-600 leading-relaxed">
                季節の移ろいを感じられるよう、旬の食材と季節感のある盛り付けでお楽しみいただきます。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cha-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                美しい盛り付け
              </h3>
              <p className="text-sumi-600 leading-relaxed">
                視覚的にも美しい盛り付けで、五感を刺激する料理体験をお届けします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 季節の会席料理 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              季節の会席料理
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              四季折々の食材を使用した会席料理をご用意しております。
              季節の移ろいを感じながら、日本の伝統的な味わいをお楽しみください。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {cuisineTypes.map((cuisineType, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${cuisineType.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif-jp text-2xl font-medium text-white">
                      {cuisineType.name}
                    </h3>
                    <p className="text-kincha-100 text-sm">
                      {cuisineType.description}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                      主な料理
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {cuisineType.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cha-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-sumi-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif-jp text-lg font-medium text-sumi-900 mb-2">
                      特徴
                    </h4>
                    <div className="space-y-1">
                      {cuisineType.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cha-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-sumi-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お食事処 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              お食事処
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              渓谷を望む美しい景色と共に、落ち着いた雰囲気でお食事をお楽しみいただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diningRooms.map((room, index) => (
              <div
                key={index}
                className="bg-kincha-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${room.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif-jp text-xl font-medium text-white">
                      {room.name}
                    </h3>
                    <p className="text-kincha-100 text-sm">
                      {room.capacity}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sumi-600 leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ご予約 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-6">
            ご予約・お問い合わせ
          </h2>
          <p className="text-sumi-600 mb-8">
            会席料理のご予約やご質問がございましたら、お気軽にお問い合わせください。
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
              href="/Ryokan-HP/contact/"
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