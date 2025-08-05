'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages } from '@/config/images';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'ご予約について',
      icon: '📅',
      items: [
        {
          question: '予約はいつから可能ですか？',
          answer: 'ご宿泊日の3ヶ月前からご予約を承っております。人気の時期は早めのご予約をお勧めいたします。',
        },
        {
          question: 'キャンセルはいつまで可能ですか？',
          answer: '宿泊日の3日前まで無料でキャンセル可能です。2日前は宿泊料金の30%、前日は50%、当日は100%のキャンセル料が発生いたします。',
        },
        {
          question: '当日予約は可能ですか？',
          answer: '空室がある場合は当日予約も可能です。お電話にてご確認ください。',
        },
        {
          question: '予約の変更は可能ですか？',
          answer: '宿泊日や人数の変更は、空室状況により対応可能です。お早めにご連絡ください。',
        },
      ],
    },
    {
      title: 'チェックイン・チェックアウト',
      icon: '🕐',
      items: [
        {
          question: 'チェックイン・チェックアウトの時間を教えてください。',
          answer: 'チェックインは15:00から、チェックアウトは10:00までとなっております。',
        },
        {
          question: '早めのチェックインは可能ですか？',
          answer: '空室状況により対応可能です。事前にご連絡ください。',
        },
        {
          question: '遅めのチェックアウトは可能ですか？',
          answer: '空室状況により対応可能です。追加料金が発生する場合がございます。',
        },
        {
          question: '荷物預かりは可能ですか？',
          answer: 'チェックイン前やチェックアウト後の荷物預かりサービスをご利用いただけます。',
        },
      ],
    },
    {
      title: 'お部屋について',
      icon: '🏠',
      items: [
        {
          question: '禁煙・喫煙のお部屋はありますか？',
          answer: '全室禁煙となっております。喫煙は指定の喫煙スペースをご利用ください。',
        },
        {
          question: 'Wi-Fiは利用できますか？',
          answer: '館内全域で無料Wi-Fiをご利用いただけます。',
        },
        {
          question: 'アメニティは何が用意されていますか？',
          answer: '浴衣、タオル、歯ブラシ、シャンプー、リンス、ボディソープをご用意しております。',
        },
        {
          question: 'ペット同伴は可能ですか？',
          answer: '申し訳ございませんが、ペット同伴でのご宿泊はお受けできません。',
        },
      ],
    },
    {
      title: '温泉について',
      icon: '♨️',
      items: [
        {
          question: '温泉の営業時間を教えてください。',
          answer: '温泉大浴場は6:00〜24:00までご利用いただけます。最終入浴は23:30までです。',
        },
        {
          question: '貸切風呂は予約が必要ですか？',
          answer: '貸切風呂は予約制となっております。事前にご予約ください。',
        },
        {
          question: '温泉の効能を教えてください。',
          answer: '神経痛、筋肉痛、関節痛、冷え性、疲労回復などの効能がございます。',
        },
        {
          question: '日帰り入浴は可能ですか？',
          answer: '申し訳ございませんが、宿泊者様限定となっております。',
        },
      ],
    },
    {
      title: 'お食事について',
      icon: '🍽️',
      items: [
        {
          question: '食事の時間を教えてください。',
          answer: '朝食は7:00〜9:00、夕食は18:00〜20:00となっております。',
        },
        {
          question: 'アレルギー対応は可能ですか？',
          answer: '事前にご連絡いただければ、可能な限り対応いたします。',
        },
        {
          question: 'ベジタリアンメニューはありますか？',
          answer: '事前にご連絡いただければ、ベジタリアンメニューをご用意いたします。',
        },
        {
          question: 'お酒の持ち込みは可能ですか？',
          answer: 'お酒の持ち込みは可能です。ただし、館内での過度な飲酒はご遠慮ください。',
        },
      ],
    },
    {
      title: 'アクセス・駐車場',
      icon: '🚗',
      items: [
        {
          question: '駐車場は無料ですか？',
          answer: '宿泊者様は無料で駐車場をご利用いただけます。',
        },
        {
          question: '大型車両の駐車は可能ですか？',
          answer: '大型車両の駐車も可能です。事前にご連絡ください。',
        },
        {
          question: '送迎サービスはありますか？',
          answer: '最寄り駅からの送迎サービスを無料でご利用いただけます。事前にご予約ください。',
        },
        {
          question: '最寄り駅からの距離を教えてください。',
          answer: '○○駅から徒歩10分、○○駅から徒歩15分です。',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${animeImages.faq.hero})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                よくあるご質問
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                お客様からよくいただく質問と回答を
                <br />
                カテゴリ別にご案内いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              FAQ
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-3xl mx-auto leading-relaxed">
              お客様からよくいただく質問と回答をご案内いたします。
              お探しの情報が見つからない場合は、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-cha-600 to-cha-700 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{category.icon}</div>
                    <h3 className="font-serif-jp text-2xl font-medium text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <div className="divide-y divide-kincha-100">
                  {category.items.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    const isOpen = openItems.includes(globalIndex);

                    return (
                      <div key={itemIndex} className="bg-white">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-4 text-left hover:bg-kincha-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cha-500 focus:ring-inset"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif-jp text-lg font-medium text-sumi-900 pr-4">
                              {item.question}
                            </h4>
                            <div className={`flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}>
                              <svg className="w-5 h-5 text-sumi-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-6 pb-4">
                            <p className="text-sumi-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-6">
            お探しの情報が見つからない場合
          </h2>
          <p className="text-sumi-600 mb-8 text-lg">
            上記のFAQでお探しの情報が見つからない場合は、お気軽にお問い合わせください。
            スタッフが丁寧にご案内いたします。
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
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 