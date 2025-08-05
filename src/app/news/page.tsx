import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages } from '@/config/images';

export default function NewsPage() {
  const news = [
    {
      id: 1,
      date: '2024.08.01',
      category: 'お知らせ',
      title: '夏の特別プラン「涼やか会席」のご案内',
      excerpt: '夏の暑さを忘れられる、涼やかな会席料理をご用意いたしました。地元の夏野菜を使用した...',
      href: '/news/1/',
      image: animeImages.cuisine.seasonalDishes,
    },
    {
      id: 2,
      date: '2024.07.25',
      category: 'イベント',
      title: '七夕の夕べ 特別イベント開催',
      excerpt: '7月7日に七夕の夕べ特別イベントを開催いたします。短冊に願いを込めて、ロマンチックな...',
      href: '/news/2/',
      image: animeImages.main.ryokanNight,
    },
    {
      id: 3,
      date: '2024.07.20',
      category: '温泉',
      title: '温泉効能について',
      excerpt: '当館の温泉は、神経痛、筋肉痛、関節痛、五十肩、運動麻痺、関節のこわばり、うちみ...',
      href: '/news/3/',
      image: animeImages.onsen.outdoorView,
    },
    {
      id: 4,
      date: '2024.07.15',
      category: 'お料理',
      title: '7月の旬の食材',
      excerpt: '7月は夏野菜が美味しい季節です。当館では、地元で採れた新鮮な夏野菜を使用した...',
      href: '/news/4/',
      image: animeImages.cuisine.chefCooking,
    },
    {
      id: 5,
      date: '2024.07.10',
      category: 'お知らせ',
      title: '新型コロナウイルス感染症対策について',
      excerpt: 'お客様の安全と安心を最優先に考え、新型コロナウイルス感染症対策を徹底してまいります...',
      href: '/news/5/',
      image: animeImages.facilities.gardenLobby,
    },
    {
      id: 6,
      date: '2024.07.05',
      category: 'イベント',
      title: '夏の星空観賞会開催',
      excerpt: '澄んだ空気の中で、美しい星空を眺める特別な時間をお過ごしください。専門ガイドによる...',
      href: '/news/6/',
      image: animeImages.main.ryokanNight,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'お知らせ':
        return 'bg-cha-500 text-white';
      case 'イベント':
        return 'bg-hi-500 text-white';
      case '温泉':
        return 'bg-ai-500 text-white';
      case 'お料理':
        return 'bg-kincha-600 text-white';
      default:
        return 'bg-sumi-500 text-white';
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${animeImages.main.ryokanNight})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                お知らせ
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                月影の郷からの最新情報をお届けいたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ一覧 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* 画像 */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />
                  
                  {/* カテゴリタグ */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* 日付 */}
                  <div className="absolute bottom-4 right-4">
                    <time className="text-white text-sm font-medium bg-sumi-900/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      {item.date}
                    </time>
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="p-6">
                  <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3 group-hover:text-cha-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  <p className="text-sumi-600 text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {/* 詳細リンク */}
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-cha-600 hover:text-cha-700 font-medium text-sm transition-colors duration-200 group/link"
                  >
                    続きを読む
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
              </article>
            ))}
          </div>

          {/* ページネーション */}
          <div className="mt-16 text-center">
            <div className="flex justify-center items-center space-x-2">
              <span className="px-4 py-2 text-sumi-600">1</span>
              <span className="px-4 py-2 text-sumi-400">2</span>
              <span className="px-4 py-2 text-sumi-400">3</span>
              <span className="px-4 py-2 text-sumi-400">...</span>
              <span className="px-4 py-2 text-sumi-400">10</span>
            </div>
          </div>

          {/* 戻るボタン */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
            >
              ← トップページに戻る
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 