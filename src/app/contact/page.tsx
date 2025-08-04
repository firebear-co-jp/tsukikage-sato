'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages, fallbackImages } from '@/config/images';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    privacyAgreement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Google Sheets APIにデータを送信
      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL || '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        
        // フォームをリセット
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            preferredContact: 'email',
            privacyAgreement: false,
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        console.error('送信エラー:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'お電話でのお問い合わせ',
      content: '000-0000-0000',
      description: '受付時間: 9:00〜18:00',
      href: 'tel:000-0000-0000',
    },
    {
      icon: '📧',
      title: 'メールでのお問い合わせ',
      content: 'info@tsukikage-sato.com',
      description: '24時間受付（返信は営業時間内）',
      href: 'mailto:info@tsukikage-sato.com',
    },
    {
      icon: '📍',
      title: '所在地',
      content: '〒000-0000 東京都○○区○○1-1-1',
      description: '最寄り駅: ○○線○○駅 徒歩10分',
      href: 'https://maps.google.com',
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
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                ご宿泊やご予約について、
                <br />
                お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              お問い合わせフォーム
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-2xl mx-auto leading-relaxed">
              ご宿泊やご予約について、お気軽にお問い合わせください。
              内容を確認の上、担当者よりご連絡いたします。
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                お問い合わせありがとうございます
              </h3>
              <p className="text-sumi-600 leading-relaxed">
                内容を確認の上、担当者よりご連絡いたします。
                <br />
                通常2〜3営業日以内にご返信いたします。
              </p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="font-serif-jp text-2xl font-medium text-hi-600 mb-4">
                送信エラーが発生しました
              </h3>
              <p className="text-sumi-600 leading-relaxed mb-4">
                申し訳ございませんが、送信に失敗しました。
                <br />
                しばらく時間をおいて再度お試しください。
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                再度送信する
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sumi-700 mb-2">
                    お名前 <span className="text-hi-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-kincha-200 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sumi-700 mb-2">
                    メールアドレス <span className="text-hi-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-kincha-200 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-sumi-700 mb-2">
                    お電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-kincha-200 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                    placeholder="000-0000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="preferredContact" className="block text-sm font-medium text-sumi-700 mb-2">
                    ご希望の連絡方法
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-kincha-200 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                  >
                    <option value="email">メール</option>
                    <option value="phone">お電話</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-sumi-700 mb-2">
                  お問い合わせ内容 <span className="text-hi-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-kincha-200 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                >
                  <option value="">お問い合わせ内容を選択してください</option>
                  <option value="reservation">ご予約について</option>
                  <option value="accommodation">宿泊について</option>
                  <option value="onsen">温泉について</option>
                  <option value="cuisine">お料理について</option>
                  <option value="access">アクセスについて</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-sumi-700 mb-2">
                  お問い合わせ詳細 <span className="text-hi-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-kincha-200 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 resize-none text-sumi-900"
                  placeholder="お問い合わせの詳細をご記入ください。"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="privacyAgreement"
                    checked={formData.privacyAgreement}
                    onChange={handleCheckboxChange}
                    required
                    className="mt-1 w-4 h-4 text-cha-600 border-kincha-300 rounded focus:ring-cha-500 focus:ring-2"
                  />
                  <span className="text-sm text-sumi-600">
                    <a href="/privacy" className="text-cha-600 hover:text-cha-700 underline">
                      プライバシーポリシー
                    </a>
                    に同意の上、送信してください。
                  </span>
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      送信中...
                    </>
                  ) : (
                    '送信する'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 連絡先情報 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              連絡先情報
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-2xl mx-auto leading-relaxed">
              お電話やメールでもお気軽にお問い合わせください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-kincha-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-3">
                  {info.title}
                </h3>
                <a
                  href={info.href}
                  className="text-cha-600 font-medium text-lg hover:text-cha-700 transition-colors duration-200 block mb-2"
                >
                  {info.content}
                </a>
                <p className="text-sumi-600 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </main>
  );
} 