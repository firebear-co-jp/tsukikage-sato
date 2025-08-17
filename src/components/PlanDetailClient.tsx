'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationWidget from '@/components/ReservationWidget';
import { planImages, fallbackImages } from '@/config/images';

interface PlanDetailClientProps {
  planId: string;
}

export default function PlanDetailClient({ planId }: PlanDetailClientProps) {
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
        roomType: '露天風呂付き客室',
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
      features: ['和室A', '季節の会席料理', '地産地消メニュー', '個室での食事'],
      category: 'gourmet',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '2名様',
        roomType: '和室A',
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
      features: ['和室A', '貸切風呂利用', '温泉効能説明', 'リラクゼーション'],
      category: 'relax',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '2名様',
        roomType: '和室A',
        meals: ['夕食：会席料理', '朝食：和食'],
        amenities: ['貸切風呂利用', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['温泉効能説明付き', 'リラクゼーションサービス', '貸切風呂は事前予約制'],
      },
    },
    {
      id: 'family-friendly',
      title: 'ファミリープラン',
      subtitle: '家族で楽しむ温泉旅',
      description: 'お子様からご年配の方まで、家族全員で楽しめるプランです。温泉と美味しい料理で、家族の絆を深めましょう。',
      longDescription: 'ファミリープランでは、お子様からご年配の方まで、家族全員で楽しめる温泉旅をご提供いたします。広々とした和室で家族団らんの時間をお過ごしいただけます。温泉はお子様も安心してご利用いただけ、家族の絆を深める素敵な時間をお届けします。',
      image: planImages['family-friendly']?.main || fallbackImages.ryokan,
      images: planImages['family-friendly']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '28,000',
      priceNote: '〜（大人2名様1室）',
      features: ['和室B', '家族向け料理', 'お子様用アメニティ', '家族向けサービス'],
      category: 'family',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '大人2名様＋お子様',
        roomType: '和室B',
        meals: ['夕食：家族向け会席料理', '朝食：和食'],
        amenities: ['お子様用アメニティ', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['お子様用アメニティ付き', '家族向けサービス', 'お子様の年齢をお聞かせください'],
      },
    },
    {
      id: 'valley-view',
      title: '渓谷眺望プラン',
      subtitle: '絶景を楽しむ特別な時間',
      description: '渓谷を一望できる特別な和室で、四季折々の絶景をお楽しみください。朝日や夕日、そして夜の星空まで、自然の美しさを存分にお楽しみいただけます。',
      longDescription: '渓谷眺望プランでは、渓谷を一望できる特別な和室で、四季折々の絶景をお楽しみいただけます。朝日や夕日、そして夜の星空まで、自然の美しさを存分にお楽しみいただけます。広々とした12畳の和室で、ゆったりとした時間をお過ごしください。夕食は渓谷を眺めながらの個室での会席料理。特別な景色と共に、心に残る贅沢な時間をお届けします。',
      image: planImages['valley-view']?.main || fallbackImages.ryokan,
      images: planImages['valley-view']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '42,000',
      priceNote: '〜（3名様1室）',
      features: ['和室C', '渓谷眺望', '個室での食事', '特別な景色'],
      category: 'view',
      popular: true,
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '3名様',
        roomType: '和室C',
        meals: ['夕食：渓谷眺望会席料理', '朝食：和食'],
        amenities: ['渓谷眺望', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['渓谷眺望付き', '個室での食事', '景色の良い時間帯をお聞かせください'],
      },
    },
    {
      id: 'premium-suite',
      title: 'プレミアムスイートプラン',
      subtitle: '最高級の贅沢を体験',
      description: '最高級のサービスと設備で、特別な贅沢な時間をお過ごしください。専用の露天風呂と特別な会席料理で、至福のひとときを。',
      longDescription: 'プレミアムスイートプランでは、最高級のサービスと設備で特別な贅沢な時間をお過ごしいただけます。専用の露天風呂付き特別客室で、プライベートな空間でのんびりとお過ごしいただけます。夕食は料理長が心を込めて作る最高級の会席料理。特別な日を彩るサービスで、忘れられない思い出作りをお手伝いします。',
      image: planImages['premium-suite']?.main || fallbackImages.ryokan,
      images: planImages['premium-suite']?.gallery || [
        fallbackImages.ryokan,
        fallbackImages.cuisine,
        fallbackImages.onsen,
      ],
      price: '65,000',
      priceNote: '〜（2名様1室）',
      features: ['特別室', '最高級会席料理', '専用サービス', '特別アメニティ'],
      category: 'luxury',
      popular: true,
      details: {
        checkIn: '14:00',
        checkOut: '12:00',
        capacity: '2名様',
        roomType: '特別室',
        meals: ['夕食：最高級会席料理', '朝食：和食'],
        amenities: ['専用露天風呂', '最高級アメニティ', 'Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['専用サービス付き', '特別アメニティ', 'チェックイン時間が早くなります'],
      },
    },
    {
      id: 'solo-healing',
      title: 'ソロ癒しプラン',
      subtitle: '一人でゆっくり癒される',
      description: '一人でゆっくりと温泉を楽しみ、心身を癒してください。静寂の中で自分だけの贅沢な時間をお過ごしください。',
      longDescription: 'ソロ癒しプランでは、一人でゆっくりと温泉を楽しみ、心身を癒していただけます。静寂の中で自分だけの贅沢な時間をお過ごしいただけます。温泉効能の説明やリラクゼーションサービスも含まれており、至福の癒しの時間をお届けします。',
      image: planImages['solo-healing']?.main || fallbackImages.onsen,
      images: planImages['solo-healing']?.gallery || [
        fallbackImages.onsen,
        fallbackImages.ryokan,
        fallbackImages.cuisine,
      ],
      price: '25,000',
      priceNote: '〜（1名様1室）',
      features: ['和室A', '一人向け料理', '温泉効能説明', 'リラクゼーション'],
      category: 'solo',
      details: {
        checkIn: '15:00',
        checkOut: '11:00',
        capacity: '1名様',
        roomType: '和室A',
        meals: ['夕食：一人向け会席料理', '朝食：和食'],
        amenities: ['Wi-Fi', 'テレビ', '冷蔵庫', '湯沸かしポット'],
        notes: ['温泉効能説明付き', 'リラクゼーションサービス', '一人向けサービス'],
      },
    },
  ];

  const plan = plans.find(p => p.id === planId);

  if (!plan) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                プランが見つかりません
              </h1>
              <p className="font-sans-jp text-lg text-sumi-600 mb-8">
                指定されたプランは存在しません。
              </p>
              <a
                href="/tsukikage-sato/plans"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cha-600 hover:bg-cha-700 transition-colors duration-200"
              >
                プラン一覧に戻る
              </a>
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
              backgroundImage: `url(${plan.image})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="font-serif-jp text-4xl md:text-5xl font-medium mb-4">
              {plan.title}
            </h1>
            <p className="font-sans-jp text-xl md:text-2xl mb-6">
              {plan.subtitle}
            </p>
            <p className="font-sans-jp text-lg max-w-3xl mx-auto leading-relaxed">
              {plan.description}
            </p>
          </div>
        </div>
      </section>

      {/* プラン詳細 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 左側：画像ギャラリー */}
            <div className="space-y-6">
              <div className="relative">
                <div
                  className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                  style={{
                    backgroundImage: `url(${plan.images[selectedImage]})`,
                  }}
                />
                {plan.popular && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-hi-500 text-white">
                      人気プラン
                    </span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {plan.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg bg-cover bg-center bg-no-repeat transition-all duration-200 ${
                      selectedImage === idx
                        ? 'ring-2 ring-cha-400 ring-offset-2'
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 右側：プラン情報 */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif-jp text-3xl font-medium text-sumi-900 mb-4">
                  プラン概要
                </h2>
                <p className="font-sans-jp text-lg text-sumi-600 leading-relaxed">
                  {plan.longDescription}
                </p>
              </div>

              <div className="bg-kincha-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif-jp text-2xl font-medium text-sumi-900">
                    料金
                  </h3>
                  <div className="text-right">
                    <span className="font-serif-jp text-3xl font-medium text-cha-600">
                      ¥{plan.price}
                    </span>
                    <p className="font-sans-jp text-sm text-sumi-600">
                      {plan.priceNote}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="font-sans-jp text-sumi-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                  プラン詳細
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-kincha-50 rounded-lg p-4">
                    <p className="text-sumi-600 text-sm">チェックイン</p>
                    <p className="font-medium text-sumi-900">{plan.details.checkIn}</p>
                  </div>
                  <div className="bg-kincha-50 rounded-lg p-4">
                    <p className="text-sumi-600 text-sm">チェックアウト</p>
                    <p className="font-medium text-sumi-900">{plan.details.checkOut}</p>
                  </div>
                  <div className="bg-kincha-50 rounded-lg p-4">
                    <p className="text-sumi-600 text-sm">定員</p>
                    <p className="font-medium text-sumi-900">{plan.details.capacity}</p>
                  </div>
                  <div className="bg-kincha-50 rounded-lg p-4">
                    <p className="text-sumi-600 text-sm">お部屋タイプ</p>
                    <p className="font-medium text-sumi-900">{plan.details.roomType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                  食事
                </h3>
                <div className="space-y-2">
                  {plan.details.meals.map((meal, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="font-sans-jp text-sumi-700">{meal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                  アメニティ
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {plan.details.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-cha-400 rounded-full flex-shrink-0"></div>
                      <span className="font-sans-jp text-sm text-sumi-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {plan.details.notes.length > 0 && (
                <div>
                  <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-4">
                    ご注意事項
                  </h3>
                  <div className="space-y-2">
                    {plan.details.notes.map((note, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-hi-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="font-sans-jp text-sm text-sumi-700">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 予約ウィジェット */}
      <ReservationWidget />

      <Footer />
    </main>
  );
} 