'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationWidget from '@/components/ReservationWidget';
import { planImages, fallbackImages } from '@/config/images';

export default function PlanDetailPage() {
  const params = useParams();
  const planId = params.planId as string;

  const [selectedImage, setSelectedImage] = useState(0);

  // プランデータ
  const plans = [
    {
      id: 'romantic-special',
      title: '記念日特別プラン',
      subtitle: '特別な日を彩る',
      description: '大切な記念日を月影の郷でお過ごしください。露天風呂付き客室と特別な会席料理で、思い出に残る時間をお届けします。',
      longDescription: '記念日特別プランは、大切な方との特別な時間をより一層輝かせるためのプランです。露天風呂付きの特別客室で、二人だけの贅沢な時間をお過ごしいただけます。夕食は料理長が心を込めて作る特別な会席料理。記念日を彩るデコレーションとシャンパンサービスで、忘れられない思い出作りをお手伝いします。',
      image: planImages['romantic-special']?.main || fallbackImages.ryokan,
      images: planImages['romantic-special']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '45,000',
      priceNote: '〜（2名様1室）',
      features: ['露天風呂付き客室', '特別会席料理', '記念日デコレーション', 'シャンパンサービス'],
      category: 'romantic',
      popular: true,
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '2名様',
        roomType: '露天風呂付き和室',
        meals: ['夕食：特別会席料理', '朝食：和食'],
        amenities: ['露天風呂', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['記念日デコレーション付き', 'シャンパンサービス付き', 'チェックイン時に記念日をお聞かせください'],
      },
    },
    {
      id: 'gourmet-seasonal',
      title: '季節の会席プラン',
      subtitle: '四季の味覚を堪能',
      description: '地元の旬の食材を使用した会席料理を存分にお楽しみください。料理長が心を込めて作る一品一品が、日本の四季をお届けします。',
      longDescription: '季節の会席プランでは、地元の旬の食材をふんだんに使用した会席料理をお楽しみいただけます。料理長が四季折々の食材を厳選し、日本の伝統的な調理法と現代的なアレンジを組み合わせて、心と体を満たす料理をお届けします。渓谷を望む個室での食事で、贅沢な時間をお過ごしください。',
      image: planImages['gourmet-seasonal']?.main || fallbackImages.cuisine,
      images: planImages['gourmet-seasonal']?.gallery || [
        fallbackImages.cuisine,
        fallbackImages.ryokan,
        fallbackImages.onsen,
      ],
      price: '38,000',
      priceNote: '〜（2名様1室）',
      features: ['渓谷を望む和室', '季節の会席料理', '地産地消メニュー', '個室での食事'],
      category: 'gourmet',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '2名様',
        roomType: '渓谷を望む和室',
        meals: ['夕食：季節の会席料理', '朝食：和食'],
        amenities: ['Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['地産地消メニュー', '個室での食事', 'アレルギー対応可能（事前連絡要）'],
      },
    },
    {
      id: 'relax-onsen',
      title: '温泉癒しプラン',
      subtitle: '温泉で心身をリフレッシュ',
      description: '自家源泉かけ流しの温泉で、日々の疲れを癒してください。渓谷を望む露天風呂で、心身ともにリフレッシュできます。',
      longDescription: '温泉癒しプランでは、自家源泉かけ流しの温泉で日々の疲れを癒していただけます。渓谷を望む露天風呂では、四季折々の景色を楽しみながら、心身ともにリフレッシュできます。温泉効能の説明やリラクゼーションサービスも含まれており、至福の癒しの時間をお過ごしください。',
      image: planImages['relax-onsen']?.main || fallbackImages.onsen,
      images: planImages['relax-onsen']?.gallery || [
        fallbackImages.onsen,
        fallbackImages.ryokan,
        fallbackImages.cuisine,
      ],
      price: '32,000',
      priceNote: '〜（2名様1室）',
      features: ['渓谷を望む和室', '貸切風呂利用', '温泉効能説明', 'リラクゼーション'],
      category: 'relax',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '2名様',
        roomType: '渓谷を望む和室',
        meals: ['夕食：会席料理', '朝食：和食'],
        amenities: ['貸切風呂利用', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['温泉効能説明付き', 'リラクゼーションサービス', '貸切風呂は事前予約制'],
      },
    },
    {
      id: 'family-friendly',
      title: 'ファミリープラン',
      subtitle: '家族で楽しむ温泉旅',
      description: 'お子様からご年配の方まで、家族全員でお楽しみいただけるプランです。安心・安全な環境で、思い出作りをお手伝いします。',
      longDescription: 'ファミリープランは、お子様からご年配の方まで、家族全員でお楽しみいただけるプランです。安心・安全な環境で、家族の思い出作りをお手伝いします。お子様用のメニューやアメニティもご用意しており、家族みんなで温泉を楽しんでいただけます。',
      image: planImages['family-friendly']?.main || fallbackImages.ryokan,
      images: planImages['family-friendly']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '35,000',
      priceNote: '〜（4名様1室）',
      features: ['和洋室', 'お子様メニュー', '貸切風呂利用', '家族向けアメニティ'],
      category: 'family',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '4名様',
        roomType: '和洋室',
        meals: ['夕食：会席料理', '朝食：和食'],
        amenities: ['お子様用アメニティ', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['お子様メニュー付き', '家族向けアメニティ', '貸切風呂利用可能'],
      },
    },
    {
      id: 'solo-healing',
      title: '一人旅癒しプラン',
      subtitle: '自分だけの贅沢時間',
      description: '一人旅だからこそ味わえる贅沢な時間をお過ごしください。静寂の中で自分を見つめ直す、特別な体験をお届けします。',
      longDescription: '一人旅癒しプランでは、一人旅だからこそ味わえる贅沢な時間をお過ごしいただけます。静寂の中で自分を見つめ直し、心身ともにリフレッシュできる特別な体験をお届けします。一人用に最適化された会席料理と、読書スペースもご用意しています。',
      image: planImages['solo-healing']?.main || fallbackImages.ryokan,
      images: planImages['solo-healing']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '28,000',
      priceNote: '〜（1名様）',
      features: ['渓谷を望む和室', '一人用会席料理', '貸切風呂利用', '読書スペース'],
      category: 'solo',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '1名様',
        roomType: '渓谷を望む和室',
        meals: ['夕食：一人用会席料理', '朝食：和食'],
        amenities: ['読書スペース', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['一人用会席料理', '読書スペース付き', '貸切風呂利用可能'],
      },
    },
    {
      id: 'premium-suite',
      title: 'プレミアムスイートプラン',
      subtitle: '最高級の贅沢体験',
      description: '月影の郷の最高級プラン。露天風呂付きスイートルームと、料理長が心を込めて作る特別な会席料理で、至福の時間をお過ごしください。',
      longDescription: 'プレミアムスイートプランは、月影の郷の最高級プランです。露天風呂付きスイートルームと、料理長が心を込めて作る特別な会席料理で、至福の時間をお過ごしいただけます。専用コンシェルジュが24時間お客様をお支えし、最高級のサービスをお届けします。',
      image: planImages['premium-suite']?.main || fallbackImages.ryokan,
      images: planImages['premium-suite']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '65,000',
      priceNote: '〜（2名様1室）',
      features: ['露天風呂付きスイート', '特別会席料理', '専用コンシェルジュ', 'シャンパンサービス'],
      category: 'romantic',
      premium: true,
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '2名様',
        roomType: '露天風呂付きスイート',
        meals: ['夕食：特別会席料理', '朝食：和食'],
        amenities: ['専用コンシェルジュ', '露天風呂', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['専用コンシェルジュ24時間対応', 'シャンパンサービス付き', '特別会席料理'],
      },
    },
  ];

  const plan = plans.find(p => p.id === planId);

  if (!plan) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
              プランが見つかりません
            </h1>
            <p className="text-sumi-600 mb-8">
              指定されたプランは存在しません。
            </p>
            <a
              href="/plans"
              className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-colors duration-200"
            >
              プラン一覧に戻る
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
              backgroundImage: `url(${plan.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                {plan.popular && (
                  <span className="inline-block px-3 py-1 bg-hi-500 text-white text-sm font-medium rounded-full">
                    人気
                  </span>
                )}
                {plan.premium && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-kincha-600 to-cha-600 text-white text-sm font-medium rounded-full">
                    プレミアム
                  </span>
                )}
              </div>
              <h1 className="font-serif-jp text-5xl md:text-6xl font-light leading-tight">
                {plan.title}
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                {plan.subtitle}
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-sumi-900 font-serif-jp text-2xl font-medium">
                    ¥{plan.price}
                  </p>
                  <p className="text-sumi-600 text-sm">
                    {plan.priceNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 空室検索ウィジェット */}
      <section className="py-12 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReservationWidget />
        </div>
      </section>

      {/* プラン詳細 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 画像ギャラリー */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${plan.images[selectedImage]})`,
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {plan.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index ? 'border-cha-500' : 'border-kincha-200'
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* プラン情報 */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                  プラン概要
                </h2>
                <p className="text-sumi-600 leading-relaxed">
                  {plan.longDescription}
                </p>
              </div>

              <div>
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                  プランの特徴
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-kincha-50 rounded-lg">
                      <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sumi-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                  プラン詳細
                </h3>
                <div className="bg-kincha-50 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-sumi-600">チェックイン</p>
                      <p className="font-medium text-sumi-900">{plan.details.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sumi-600">チェックアウト</p>
                      <p className="font-medium text-sumi-900">{plan.details.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sumi-600">定員</p>
                      <p className="font-medium text-sumi-900">{plan.details.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sumi-600">お部屋タイプ</p>
                      <p className="font-medium text-sumi-900">{plan.details.roomType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-sumi-600 mb-2">食事</p>
                    <div className="space-y-1">
                      {plan.details.meals.map((meal, index) => (
                        <p key={index} className="text-sumi-900">{meal}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-sumi-600 mb-2">アメニティ</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.details.amenities.map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-white text-sumi-700 text-sm rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {plan.details.notes.length > 0 && (
                    <div>
                      <p className="text-sm text-sumi-600 mb-2">ご案内</p>
                      <div className="space-y-1">
                        {plan.details.notes.map((note, index) => (
                          <p key={index} className="text-sumi-900 text-sm">• {note}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 予約ボタン */}
              <div className="pt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  このプランで予約する
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-6">
            ご不明な点がございましたら
          </h2>
          <p className="text-sumi-600 mb-8">
            プランについてご不明な点やご質問がございましたら、お気軽にお問い合わせください。
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
              href="/contact"
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