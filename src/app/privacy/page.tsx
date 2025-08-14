import Header from '@/components/Header';
import { LINKS } from '@/utils/link';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. 個人情報の取得について',
      content: [
        '当館では、お客様のご宿泊やサービス提供のために必要な範囲で個人情報を取得いたします。',
        '取得する個人情報には、氏名、住所、電話番号、メールアドレス、宿泊履歴などが含まれます。',
        '個人情報の取得は、適法かつ公正な手段により行います。',
      ],
    },
    {
      title: '2. 個人情報の利用目的について',
      content: [
        '取得した個人情報は、以下の目的で利用いたします：',
        '• ご宿泊の予約・確認・管理',
        '• お客様へのサービス提供',
        '• お客様からのお問い合わせへの対応',
        '• 当館のサービス向上のための分析',
        '• 法令に基づく対応',
      ],
    },
    {
      title: '3. 個人情報の管理について',
      content: [
        '当館では、お客様の個人情報を適切に管理し、以下の措置を講じます：',
        '• 個人情報への不正アクセス、紛失、漏洩、改ざん、破壊を防ぐための措置',
        '• 個人情報を取り扱う従業員への教育・監督',
        '• 個人情報の取り扱いを委託する場合の適切な監督',
      ],
    },
    {
      title: '4. 個人情報の第三者提供について',
      content: [
        '当館では、以下の場合を除き、お客様の個人情報を第三者に提供いたしません：',
        '• お客様の同意がある場合',
        '• 法令に基づく場合',
        '• 人の生命、身体、財産の保護のために必要な場合',
        '• 公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合',
      ],
    },
    {
      title: '5. 個人情報の開示・訂正・利用停止について',
      content: [
        'お客様は、当館に対して以下の請求を行うことができます：',
        '• 個人情報の開示',
        '• 個人情報の訂正・追加・削除',
        '• 個人情報の利用停止・消去',
        'これらの請求については、法令に基づき適切に対応いたします。',
      ],
    },
    {
      title: '6. クッキー（Cookie）の使用について',
      content: [
        '当館のウェブサイトでは、お客様により良いサービスを提供するためにクッキーを使用することがあります。',
        'クッキーの使用を希望されない場合は、ブラウザの設定でクッキーを無効にすることができます。',
        'ただし、クッキーを無効にした場合、一部の機能が正常に動作しない可能性があります。',
      ],
    },
    {
      title: '7. アクセス解析ツールについて',
      content: [
        '当館のウェブサイトでは、Google Analyticsを使用してアクセス解析を行っています。',
        'Google Analyticsは、クッキーを使用してデータを収集します。',
        '収集されたデータは、Googleのプライバシーポリシーに基づいて管理されます。',
      ],
    },
    {
      title: '8. プライバシーポリシーの変更について',
      content: [
        '当館では、必要に応じてこのプライバシーポリシーを変更することがあります。',
        '重要な変更がある場合は、ウェブサイト上でお知らせいたします。',
        '変更後のプライバシーポリシーは、ウェブサイト上に掲載された時点から効力を生じます。',
      ],
    },
    {
      title: '9. お問い合わせについて',
      content: [
        '個人情報の取り扱いに関するお問い合わせは、以下の窓口までお願いいたします：',
        '渓谷の湯 旅館『月影の郷』',
        'TEL: 000-0000-0000',
        '受付時間: 9:00〜21:00',
        'メール: info@tsukikage-sato.com',
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
              backgroundImage: `url(${animeImages.privacy.hero})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                プライバシーポリシー
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                お客様の個人情報の取り扱いについて
                <br />
                詳しくご説明いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* プライバシーポリシー */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                プライバシーポリシー
              </h2>
              <p className="text-sumi-600">
                最終更新日: 2024年1月1日
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-sumi-600 leading-relaxed mb-8">
                渓谷の湯 旅館『月影の郷』（以下「当館」）は、お客様の個人情報の保護を最重要事項と考えております。
                このプライバシーポリシーでは、当館がお客様の個人情報をどのように取り扱うかについて詳しくご説明いたします。
              </p>

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.content.map((item, idx) => (
                        <p key={idx} className="text-sumi-600 leading-relaxed">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-kincha-200">
                <p className="text-sumi-600 text-sm text-center">
                  このプライバシーポリシーは、お客様の個人情報の保護に関する当館の取り組みを示すものです。
                  ご不明な点がございましたら、お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-6">
            お問い合わせ
          </h2>
          <p className="text-sumi-600 mb-8 text-lg">
            プライバシーポリシーに関するご質問やご不明な点がございましたら、お気軽にお問い合わせください。
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
              href={LINKS.CONTACT()}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
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