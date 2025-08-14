import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function SightseeingPage() {
  const spots = [
    {
      name: '○○渓谷',
      description: '四季折々の美しい景色を楽しめる、日本有数の渓谷です。春の新緑、夏の清流、秋の紅葉、冬の雪景色と、季節ごとに異なる表情をお楽しみいただけます。',
      image: animeImages.sightseeing.valley,
      fallback: fallbackImages.ryokan,
      distance: '徒歩5分',
      features: ['四季折々の景色', 'ハイキングコース', '写真スポット', '自然観察'],
    },
    {
      name: '○○神社',
      description: '千年以上の歴史を持つ古社。境内には大きな杉の木が立ち並び、神秘的な雰囲気を醸し出しています。縁結びや商売繁盛のご利益で知られています。',
      image: animeImages.sightseeing.shrine,
      fallback: fallbackImages.ryokan,
      distance: '徒歩15分',
      features: ['歴史的建造物', '縁結びのご利益', '季節の祭り', 'パワースポット'],
    },
    {
      name: '○○温泉街',
      description: '江戸時代から続く温泉街。古い街並みと新しい温泉施設が調和した、情緒あふれる温泉地です。足湯や温泉巡りをお楽しみいただけます。',
      image: animeImages.sightseeing.onsenTown,
      fallback: fallbackImages.onsen,
      distance: '車で10分',
      features: ['温泉街散策', '足湯体験', '地元グルメ', 'お土産店'],
    },
    {
      name: '○○山',
      description: '標高1,000mの山。登山道が整備されており、初心者でも安心して登山をお楽しみいただけます。山頂からの眺望は絶景です。',
      image: animeImages.sightseeing.mountain,
      fallback: fallbackImages.ryokan,
      distance: '車で20分',
      features: ['登山', '絶景ポイント', '自然観察', 'ピクニック'],
    },
  ];

  const activities = [
    {
      icon: '🚶',
      title: 'ハイキング',
      description: '渓谷沿いのハイキングコースで、四季折々の自然をお楽しみいただけます。',
      duration: '1〜3時間',
      difficulty: '初級〜中級',
    },
    {
      icon: '🚴',
      title: 'サイクリング',
      description: 'レンタサイクルで周辺の観光スポットを巡るサイクリングコースをご用意しています。',
      duration: '2〜4時間',
      difficulty: '初級',
    },
    {
      icon: '🎣',
      title: '釣り',
      description: '清流での釣り体験。地元のガイドが丁寧にご案内いたします。',
      duration: '3〜5時間',
      difficulty: '初級〜中級',
    },
    {
      icon: '📸',
      title: '写真撮影',
      description: 'プロカメラマンによる写真撮影ツアー。思い出を美しい写真に残します。',
      duration: '1〜2時間',
      difficulty: '初級',
    },
  ];

  const seasons = [
    {
      season: '春',
      description: '桜の季節。渓谷沿いの桜並木が美しく、お花見を楽しめます。',
      highlights: ['桜の開花', '新緑の渓谷', '春の山菜', '野鳥観察'],
      image: animeImages.sightseeing.spring,
      fallback: fallbackImages.ryokan,
    },
    {
      season: '夏',
      description: '清流と緑が美しい季節。川遊びや避暑地として人気です。',
      highlights: ['川遊び', '避暑地', '夏野菜', '夕涼み'],
      image: animeImages.sightseeing.summer,
      fallback: fallbackImages.ryokan,
    },
    {
      season: '秋',
      description: '紅葉の季節。渓谷全体が赤や黄色に染まり、絶景をお楽しみいただけます。',
      highlights: ['紅葉狩り', '秋の味覚', '紅葉ライトアップ', '秋祭り'],
      image: animeImages.sightseeing.autumn,
      fallback: fallbackImages.ryokan,
    },
    {
      season: '冬',
      description: '雪景色の美しい季節。静寂な冬の渓谷で、特別な時間をお過ごしください。',
      highlights: ['雪景色', '温泉', '冬の味覚', '静寂'],
      image: animeImages.sightseeing.winter,
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
                周辺観光
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                四季折々の美しい景色と、
                <br />
                豊かな自然をお楽しみください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 観光スポット */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              観光スポット
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              月影の郷周辺の観光スポットをご紹介いたします。
            </p>
          </div>

          <div className="space-y-16">
            {spots.map((spot, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-2">
                        {spot.name}
                      </h3>
                      <p className="text-cha-600 font-medium">{spot.distance}</p>
                    </div>
                    
                    <p className="text-sumi-600 leading-relaxed text-lg">
                      {spot.description}
                    </p>

                    <div>
                      <h4 className="font-serif-jp text-lg font-medium text-sumi-900 mb-3">
                        見どころ
                      </h4>
                      <div className="space-y-2">
                        {spot.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                            <span className="text-sumi-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div
                    className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${spot.image})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* アクティビティ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              アクティビティ
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              自然を満喫できる様々なアクティビティをご用意しております。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{activity.icon}</div>
                <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                  {activity.title}
                </h3>
                <p className="text-sumi-600 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sumi-600">所要時間:</span>
                    <span className="font-medium text-sumi-900">{activity.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sumi-600">難易度:</span>
                    <span className="font-medium text-sumi-900">{activity.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四季の魅力 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              四季の魅力
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              季節ごとに異なる表情を見せる、周辺の自然をご紹介いたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasons.map((season, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${season.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif-jp text-2xl font-medium text-white">
                      {season.season}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sumi-600 leading-relaxed mb-4">
                    {season.description}
                  </p>
                  <div className="space-y-2">
                    {season.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cha-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-sumi-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 観光案内 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              観光案内
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              観光に関するご案内やお手伝いをいたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-kincha-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                観光マップ
              </h3>
              <p className="text-sumi-600 leading-relaxed mb-4">
                周辺の観光スポットを詳しくご案内するマップをご用意しています。
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 bg-cha-600 text-white text-sm font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                ダウンロード
              </a>
            </div>

            <div className="bg-kincha-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                ガイドサービス
              </h3>
              <p className="text-sumi-600 leading-relaxed mb-4">
                地元のガイドが丁寧にご案内いたします。事前にご予約ください。
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 bg-cha-600 text-white text-sm font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                お問い合わせ
              </a>
            </div>

            <div className="bg-kincha-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                送迎サービス
              </h3>
              <p className="text-sumi-600 leading-relaxed mb-4">
                観光スポットへの送迎サービスもご利用いただけます。
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 bg-cha-600 text-white text-sm font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                ご予約
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cha-600 to-cha-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-white mb-6">
            自然と共に特別な時間を
          </h2>
          <p className="text-kincha-100 mb-8 text-lg">
            四季折々の美しい景色と豊かな自然の中で、心に残る思い出を作りませんか。
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