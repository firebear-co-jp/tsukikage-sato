import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function TermsPage() {
  const sections = [
    {
      title: '第1条（適用）',
      content: [
        '本規約は、渓谷の湯 旅館『月影の郷』（以下「当館」）が提供する宿泊サービスおよびウェブサイトの利用に関する条件を定めるものです。',
        'お客様が当館のサービスを利用する際は、本規約に同意していただく必要があります。',
      ],
    },
    {
      title: '第2条（宿泊の申込み）',
      content: [
        '宿泊の申込みは、電話、メール、ウェブサイト、またはその他の方法により行うことができます。',
        '申込みの際は、正確な情報をご提供ください。',
        '当館は、申込み内容を確認の上、宿泊の承諾または拒否を決定いたします。',
      ],
    },
    {
      title: '第3条（宿泊料金）',
      content: [
        '宿泊料金は、当館が定める料金表に基づいて算定いたします。',
        '料金は、消費税込みの表示となっております。',
        '宿泊料金は、チェックイン時または事前に指定された方法によりお支払いください。',
      ],
    },
    {
      title: '第4条（キャンセル・変更）',
      content: [
        '宿泊のキャンセル・変更は、以下の条件により対応いたします：',
        '• 宿泊日の3日前まで: 無料',
        '• 宿泊日の2日前: 宿泊料金の30%',
        '• 宿泊日の前日: 宿泊料金の50%',
        '• 宿泊当日: 宿泊料金の100%',
        '天災、交通機関の運行停止等、当館の責に帰すべき事由による場合は、キャンセル料を免除いたします。',
      ],
    },
    {
      title: '第5条（チェックイン・チェックアウト）',
      content: [
        'チェックイン時間は15:00から、チェックアウト時間は10:00までとなっております。',
        '早めのチェックイン、遅めのチェックアウトは、空室状況により対応可能です。',
        'チェックアウト後は、速やかに客室から退出してください。',
      ],
    },
    {
      title: '第6条（館内での利用）',
      content: [
        '館内では、他のお客様に迷惑をかける行為はご遠慮ください。',
        '館内での喫煙は、指定された場所でのみ可能です。',
        '館内の設備・備品は、適切にご利用ください。',
        '館内での撮影は、他のお客様のプライバシーに配慮して行ってください。',
      ],
    },
    {
      title: '第7条（禁止事項）',
      content: [
        '当館では、以下の行為を禁止いたします：',
        '• 法令に違反する行為',
        '• 他のお客様に迷惑をかける行為',
        '• 館内の設備・備品を損壊する行為',
        '• 火気を使用する行為（指定された場所を除く）',
        '• ペットの同伴（介助犬等を除く）',
        '• その他、当館が不適切と判断する行為',
      ],
    },
    {
      title: '第8条（損害賠償）',
      content: [
        'お客様が当館の設備・備品を損壊した場合、修理費または交換費を請求いたします。',
        'お客様の行為により当館または他のお客様に損害が生じた場合、損害賠償を請求いたします。',
        '当館は、お客様の行為により生じた損害について、一切の責任を負いません。',
      ],
    },
    {
      title: '第9条（免責事項）',
      content: [
        '当館は、以下の事由により生じた損害について、一切の責任を負いません：',
        '• 天災、火災、停電等の不可抗力',
        '• お客様の故意または過失',
        '• 第三者の行為',
        '• その他、当館の責に帰すべき事由によらない事由',
      ],
    },
    {
      title: '第10条（ウェブサイトの利用）',
      content: [
        '当館のウェブサイトの利用は、お客様の責任において行ってください。',
        'ウェブサイトの内容は、予告なく変更される場合があります。',
        'ウェブサイトの利用により生じた損害について、当館は一切の責任を負いません。',
      ],
    },
    {
      title: '第11条（個人情報の取り扱い）',
      content: [
        'お客様の個人情報の取り扱いについては、別途定めるプライバシーポリシーに従います。',
        'プライバシーポリシーは、当館のウェブサイトでご確認いただけます。',
      ],
    },
    {
      title: '第12条（規約の変更）',
      content: [
        '当館は、必要に応じて本規約を変更することがあります。',
        '重要な変更がある場合は、ウェブサイト上でお知らせいたします。',
        '変更後の規約は、ウェブサイト上に掲載された時点から効力を生じます。',
      ],
    },
    {
      title: '第13条（準拠法・管轄裁判所）',
      content: [
        '本規約の解釈および適用については、日本法に準拠します。',
        '本規約に関して紛争が生じた場合、当館の所在地を管轄する裁判所を第一審の専属管轄裁判所とします。',
      ],
    },
    {
      title: '第14条（お問い合わせ）',
      content: [
        '本規約に関するお問い合わせは、以下の窓口までお願いいたします：',
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
              backgroundImage: `url(${animeImages.terms.hero})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                利用規約
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                宿泊サービスおよびウェブサイトの
                <br />
                利用条件をご確認ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 利用規約 */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                利用規約
              </h2>
              <p className="text-sumi-600">
                最終更新日: 2024年1月1日
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-sumi-600 leading-relaxed mb-8">
                渓谷の湯 旅館『月影の郷』（以下「当館」）の宿泊サービスおよびウェブサイトの利用に関する規約です。
                お客様が当館のサービスを利用する際は、本規約に同意していただく必要があります。
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
                  この利用規約は、お客様と当館との間の権利義務関係を定めるものです。
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
            利用規約に関するご質問やご不明な点がございましたら、お気軽にお問い合わせください。
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
              href="/Ryokan-HP/contact"
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