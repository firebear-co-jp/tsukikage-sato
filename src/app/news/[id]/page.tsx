'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages } from '@/config/images';

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id as string;

  // お知らせデータ
  const newsData = {
    '1': {
      date: '2024.08.01',
      category: 'お知らせ',
      title: '夏の特別プラン「涼やか会席」のご案内',
      content: `
        <p>夏の暑さを忘れられる、涼やかな会席料理をご用意いたしました。地元の夏野菜を使用した、見た目も涼やかな料理をお楽しみください。</p>
        
        <h3>涼やか会席の特徴</h3>
        <ul>
          <li>地元の夏野菜をふんだんに使用</li>
          <li>見た目も涼やかな盛り付け</li>
          <li>夏にぴったりの冷たいデザート</li>
          <li>お部屋での個室でのお食事</li>
        </ul>
        
        <h3>料金</h3>
        <p>お一人様 15,000円（税込）</p>
        
        <h3>期間</h3>
        <p>2024年8月1日〜8月31日</p>
        
        <p>ご予約はお電話またはお問い合わせフォームからお願いいたします。</p>
      `,
      image: animeImages.cuisine.seasonalDishes,
    },
    '2': {
      date: '2024.07.25',
      category: 'イベント',
      title: '七夕の夕べ 特別イベント開催',
      content: `
        <p>7月7日に七夕の夕べ特別イベントを開催いたします。短冊に願いを込めて、ロマンチックな夜をお過ごしください。</p>
        
        <h3>イベント内容</h3>
        <ul>
          <li>短冊に願い事を書いて笹に飾る</li>
          <li>七夕特別会席料理</li>
          <li>星空観賞会</li>
          <li>和装での記念撮影</li>
        </ul>
        
        <h3>料金</h3>
        <p>お一人様 20,000円（税込）</p>
        
        <h3>開催日時</h3>
        <p>2024年7月7日 18:00〜21:00</p>
        
        <p>ご予約は先着順となります。お早めにお申し込みください。</p>
      `,
      image: animeImages.main.ryokanNight,
    },
    '3': {
      date: '2024.07.20',
      category: '温泉',
      title: '温泉効能について',
      content: `
        <p>当館の温泉は、神経痛、筋肉痛、関節痛、五十肩、運動麻痺、関節のこわばり、うちみ、くじき、慢性消化器病、痔疾、冷え性、病後回復期、疲労回復、健康増進に効果があるとされています。</p>
        
        <h3>泉質</h3>
        <ul>
          <li>泉質名：単純温泉</li>
          <li>源泉温度：42.3℃</li>
          <li>pH値：7.2（中性）</li>
          <li>湧出量：毎分200リットル</li>
        </ul>
        
        <h3>効能</h3>
        <ul>
          <li>神経痛・筋肉痛・関節痛の緩和</li>
          <li>五十肩・運動麻痺の改善</li>
          <li>慢性消化器病の改善</li>
          <li>冷え性の改善</li>
          <li>疲労回復・健康増進</li>
        </ul>
        
        <p>※効能には個人差があります。体調にご注意の上、ご利用ください。</p>
      `,
      image: animeImages.onsen.outdoorView,
    },
    '4': {
      date: '2024.07.15',
      category: 'お料理',
      title: '7月の旬の食材',
      content: `
        <p>7月は夏野菜が美味しい季節です。当館では、地元で採れた新鮮な夏野菜を使用した料理をお楽しみいただけます。</p>
        
        <h3>7月の旬の食材</h3>
        <ul>
          <li>トマト - 甘みと酸味のバランスが絶妙</li>
          <li>ナス - 油との相性が良く、焼きナスや揚げナスで</li>
          <li>キュウリ - さっぱりとした食感で夏にぴったり</li>
          <li>オクラ - ネバネバ成分で夏バテ防止</li>
          <li>ピーマン - ビタミンCが豊富</li>
        </ul>
        
        <h3>今月の特別メニュー</h3>
        <ul>
          <li>トマトの冷製スープ</li>
          <li>ナスの田楽</li>
          <li>キュウリの酢の物</li>
          <li>オクラの天ぷら</li>
          <li>ピーマンの肉詰め</li>
        </ul>
        
        <p>地元の農家さんから直接仕入れている新鮮な食材で、夏の味覚をお楽しみください。</p>
      `,
      image: animeImages.cuisine.chefCooking,
    },
  };

  const news = newsData[newsId as keyof typeof newsData];

  if (!news) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20 pb-20 bg-kincha-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif-jp text-4xl font-medium text-sumi-900 mb-6">
              お知らせが見つかりません
            </h1>
            <p className="text-sumi-600 mb-8">
              お探しのお知らせは存在しないか、削除された可能性があります。
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
            >
              トップページに戻る
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${news.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-block px-3 py-1 bg-cha-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {news.category}
                </span>
                <time className="text-kincha-100 text-sm font-medium">
                  {news.date}
                </time>
              </div>
              <h1 className="font-serif-jp text-4xl md:text-5xl font-light leading-tight">
                {news.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ詳細 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-sumi-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </article>

          {/* 戻るボタン */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
            >
              ← トップページに戻る
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 