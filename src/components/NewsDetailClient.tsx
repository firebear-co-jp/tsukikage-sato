'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages } from '@/config/images';

export default function NewsDetailClient() {
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
          <li>トマト</li>
          <li>ナス</li>
          <li>キュウリ</li>
          <li>ピーマン</li>
          <li>オクラ</li>
          <li>枝豆</li>
        </ul>
        
        <p>これらの食材を使用した、夏にぴったりの料理をご用意しております。ぜひお楽しみください。</p>
      `,
      image: animeImages.cuisine.chefCooking,
    },
    '5': {
      date: '2024.07.10',
      category: 'お知らせ',
      title: '新型コロナウイルス感染症対策について',
      content: `
        <p>お客様に安心してお過ごしいただけるよう、新型コロナウイルス感染症対策を徹底しております。</p>
        
        <h3>当館の対策</h3>
        <ul>
          <li>スタッフのマスク着用</li>
          <li>定期的な消毒・換気</li>
          <li>ソーシャルディスタンスの確保</li>
          <li>検温の実施</li>
          <li>手洗い・消毒の徹底</li>
        </ul>
        
        <h3>お客様へのお願い</h3>
        <ul>
          <li>マスクの着用</li>
          <li>手洗い・消毒の徹底</li>
          <li>体調不良の際はご連絡ください</li>
        </ul>
        
        <p>ご理解とご協力をお願いいたします。</p>
      `,
      image: animeImages.facilities.lobby,
    },
    '6': {
      date: '2024.07.05',
      category: 'イベント',
      title: '夏の星空観賞会開催',
      content: `
        <p>澄んだ空気の中で、美しい星空を眺める特別な時間をお過ごしください。専門ガイドによる解説付きで、夏の星座や天の川を楽しむことができます。</p>
        
        <h3>イベント内容</h3>
        <ul>
          <li>専門ガイドによる星座解説</li>
          <li>天体望遠鏡での観察</li>
          <li>夏の星座の紹介</li>
          <li>天の川の観察</li>
          <li>星空写真の撮影指導</li>
        </ul>
        
        <h3>開催日時</h3>
        <p>2024年7月20日、8月3日、8月17日<br>
        19:00〜21:00（雨天の場合は翌日に延期）</p>
        
        <h3>料金</h3>
        <p>お一人様 5,000円（税込）<br>
        宿泊者様は3,000円（税込）</p>
        
        <h3>定員</h3>
        <p>各回20名様（先着順）</p>
        
        <h3>持ち物</h3>
        <ul>
          <li>防寒具（夜は冷えます）</li>
          <li>カメラ（任意）</li>
          <li>虫除けスプレー</li>
        </ul>
        
        <p>ご予約はお電話またはお問い合わせフォームからお願いいたします。</p>
      `,
      image: animeImages.main.ryokanNight,
    },
  };

  const news = newsData[newsId as keyof typeof newsData];

  if (!news) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                お知らせが見つかりません
              </h1>
              <p className="font-sans-jp text-lg text-sumi-600 mb-8">
                指定されたお知らせは存在しません。
              </p>
                              <Link
                  href="/news/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cha-600 hover:bg-cha-700 transition-colors duration-200"
                >
                お知らせ一覧に戻る
              </Link>
            </div>
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
      <section className="relative pt-20 pb-16">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${news.image})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-cha-600 text-white text-sm font-medium rounded-full">
                {news.category}
              </span>
            </div>
            <h1 className="font-serif-jp text-4xl md:text-5xl font-medium mb-4">
              {news.title}
            </h1>
            <p className="font-sans-jp text-lg text-kincha-100">
              {news.date}
            </p>
          </div>
        </div>
      </section>

      {/* お知らせ詳細 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div 
              className="font-sans-jp text-sumi-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
          
          <div className="mt-12 pt-8 border-t border-kincha-200">
                          <Link
                href="/news/"
                className="inline-flex items-center px-6 py-3 border border-cha-600 text-cha-600 font-medium rounded-md hover:bg-cha-600 hover:text-white transition-colors duration-200"
              >
              ← お知らせ一覧に戻る
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 