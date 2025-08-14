'use client';

import { useState, useEffect } from 'react';
import ReservationWidget from './ReservationWidget';
import { animeImages, fallbackImages } from '@/config/images';

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (index: number) => {
    if (imageErrors[index]) {
      return heroImages[index].fallback;
    }
    return heroImages[index].src;
  };
  
  const heroImages = [
    {
      src: animeImages.main.onsenOutdoor,
      alt: '渓谷の露天風呂',
      fallback: fallbackImages.onsen,
    },
    {
      src: animeImages.main.ryokanNight,
      alt: '和室の夕暮れ',
      fallback: fallbackImages.ryokan,
    },
    {
      src: animeImages.main.kaisekiMeal,
      alt: '会席料理',
      fallback: fallbackImages.cuisine,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${getImageSrc(index)})`,
              }}
              onError={() => handleImageError(index)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/60 via-sumi-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/80 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左側: キャッチコピー */}
            <div className="text-white space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h1 className="font-serif-jp text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  千年の湯に、
                  <br />
                  <span className="font-medium">心をほどく。</span>
                </h1>
                <p className="font-sans-jp text-lg md:text-xl text-kincha-100 leading-relaxed max-w-lg">
                  創業100年を迎える老舗旅館『月影の郷』。
                  自家源泉かけ流しの温泉と四季折々の会席料理で、
                  静寂の贅沢をお楽しみください。
                </p>
              </div>

              {/* 特徴アイコン */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cha-400 rounded-full"></div>
                  <span className="text-kincha-100 text-sm">自家源泉かけ流し</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cha-400 rounded-full"></div>
                  <span className="text-kincha-100 text-sm">渓谷を望む露天風呂</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cha-400 rounded-full"></div>
                  <span className="text-kincha-100 text-sm">四季折々の会席料理</span>
                </div>
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href="/tsukikage-sato/plans/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ご宿泊プランを見る
                </a>
                <a
                  href="/tsukikage-sato/contact/"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-kincha-200 text-kincha-100 font-medium rounded-full hover:bg-kincha-200 hover:text-sumi-900 transition-all duration-200"
                >
                  お問い合わせ
                </a>
              </div>
            </div>

            {/* 右側: 予約ウィジェット */}
            <div className="hidden lg:block">
              <div className="animate-slide-up">
                <ReservationWidget />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-kincha-200 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-kincha-200 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* 画像インジケーター */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage 
                ? 'bg-kincha-200 scale-125' 
                : 'bg-kincha-200/50 hover:bg-kincha-200/75'
            }`}
            aria-label={`画像 ${index + 1} に切り替え`}
          />
        ))}
      </div>

      {/* モバイル用予約ウィジェット */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-sumi-900/90 to-transparent">
        <ReservationWidget />
      </div>
    </section>
  );
} 