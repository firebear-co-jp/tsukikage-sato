import Link from 'next/link';
import { animeImages } from '@/config/images';

export default function NewsSection() {
  const news = [
    {
      id: 1,
      date: '2024.08.01',
      category: 'お知らせ',
      title: '夏の特別プラン「涼やか会席」のご案内',
      excerpt: '夏の暑さを忘れられる、涼やかな会席料理をご用意いたしました。地元の夏野菜を使用した...',
      href: '/news/1',
    },
    {
      id: 2,
      date: '2024.07.25',
      category: 'イベント',
      title: '七夕の夕べ 特別イベント開催',
      excerpt: '7月7日に七夕の夕べ特別イベントを開催いたします。短冊に願いを込めて、ロマンチックな...',
      href: '/news/2',
    },
    {
      id: 3,
      date: '2024.07.20',
      category: '温泉',
      title: '温泉効能について',
      excerpt: '当館の温泉は、神経痛、筋肉痛、関節痛、五十肩、運動麻痺、関節のこわばり、うちみ...',
      href: '/news/3',
    },
    {
      id: 4,
      date: '2024.07.15',
      category: 'お料理',
      title: '7月の旬の食材',
      excerpt: '7月は夏野菜が美味しい季節です。当館では、地元で採れた新鮮な夏野菜を使用した...',
      href: '/news/4',
    },
  ];

  // Instagram投稿データ
  const instagramPosts = [
    {
      id: 1,
      image: animeImages.instagram.onsenSunset,
      title: '温泉の夕暮れ',
      likes: '1.2k',
    },
    {
      id: 2,
      image: animeImages.instagram.kaisekiDish,
      title: '会席料理',
      likes: '856',
    },
    {
      id: 3,
      image: animeImages.instagram.tatamiMorning,
      title: '和室の朝',
      likes: '1.5k',
    },
    {
      id: 4,
      image: animeImages.instagram.gardenSeasonal,
      title: '庭園の四季',
      likes: '2.1k',
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
    <section className="py-20 bg-kincha-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
            お知らせ
          </h2>
          <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
            月影の郷からの最新情報をお届けいたします。
            季節のイベントや特別プラン、温泉や料理に関する情報など、お見逃しなく。
          </p>
        </div>

        {/* お知らせ一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-kincha-100"
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <time className="text-sumi-500 text-sm font-medium">
                  {item.date}
                </time>
              </div>

              {/* タイトル */}
              <h3 className="font-serif-jp text-lg font-medium text-sumi-900 mb-3 group-hover:text-cha-600 transition-colors duration-200">
                {item.title}
              </h3>

              {/* 抜粋 */}
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
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
                            href="/tsukikage-sato/news"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
          >
            すべてのお知らせを見る
          </Link>
        </div>

        {/* Instagramギャラリー */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
              Instagram
            </h3>
            <p className="font-sans-jp text-lg text-sumi-600">
              月影の郷の日常をお届け
            </p>
          </div>

          {/* Instagram投稿 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {instagramPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${post.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* いいね数 */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-red-500 text-sm">❤️</span>
                      <span className="text-sumi-700 text-xs font-medium">{post.likes}</span>
                    </div>
                  </div>

                  {/* タイトル */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-sumi-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {post.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <a
                href="#"
                className="inline-flex items-center text-cha-600 hover:text-cha-700 font-medium transition-colors duration-200"
              >
                <span className="text-lg mr-2">📷</span>
                @tsukikage_sato をフォロー
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 