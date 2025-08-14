import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages } from '@/config/images';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${animeImages.contact.hero})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                お問い合わせ
                <br />
                ありがとうございます
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                内容を確認の上、担当者よりご連絡いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* サンクユーメッセージ */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-8xl mb-8">🎉</div>
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-8">
              お問い合わせ
              <br />
              ありがとうございます
            </h2>
            
            <div className="space-y-6 text-sumi-600 leading-relaxed mb-12">
              <p className="text-lg">
                お問い合わせいただき、誠にありがとうございます。
              </p>
              <p>
                内容を確認の上、担当者よりご連絡いたします。
                <br />
                通常2〜3営業日以内にご返信いたします。
              </p>
              <p>
                ご記入いただいたメールアドレスに確認メールをお送りしております。
                <br />
                ご確認ください。
              </p>
            </div>

            <div className="bg-kincha-100 rounded-xl p-6 mb-12">
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                お問い合わせ内容について
              </h3>
              <div className="space-y-2 text-sm text-sumi-600">
                <p>• ご宿泊やご予約について</p>
                <p>• 温泉やお料理について</p>
                <p>• アクセスや交通について</p>
                <p>• その他ご不明な点について</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sumi-600">
                お急ぎの場合は、お電話でもお気軽にお問い合わせください。
              </p>
              <a
                href="tel:000-0000-0000"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-lg mr-2">📞</span>
                000-0000-0000
              </a>
              <p className="text-sumi-500 text-sm">受付時間: 9:00〜21:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* 次のステップ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              月影の郷をもっと知る
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-2xl mx-auto leading-relaxed">
              お問い合わせの返信をお待ちの間、月影の郷の魅力をご覧ください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/plans/"
              className="group bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3 group-hover:text-cha-600 transition-colors duration-200">
                ご宿泊プラン
              </h3>
              <p className="text-sumi-600 text-sm">
                お客様のご要望に合わせた様々なプランをご用意しております。
              </p>
            </Link>

            <Link
              href="/onsen/"
              className="group bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">♨️</div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3 group-hover:text-cha-600 transition-colors duration-200">
                温泉
              </h3>
              <p className="text-sumi-600 text-sm">
                自家源泉かけ流しの温泉で、心身ともにリフレッシュできます。
              </p>
            </Link>

            <Link
              href="/cuisine/"
              className="group bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3 group-hover:text-cha-600 transition-colors duration-200">
                お料理
              </h3>
              <p className="text-sumi-600 text-sm">
                地元の旬の食材を使用した会席料理をお楽しみいただけます。
              </p>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
