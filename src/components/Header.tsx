'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/Ryokan-HP/concept/', label: '月影の郷の魅力' },
    { href: '/Ryokan-HP/onsen/', label: '温泉' },
    { href: '/Ryokan-HP/cuisine/', label: 'お料理' },
    { href: '/Ryokan-HP/rooms/', label: 'お部屋' },
    { href: '/Ryokan-HP/plans/', label: 'ご宿泊プラン' },
    { href: '/Ryokan-HP/facilities/', label: '館内のご案内' },
    { href: '/Ryokan-HP/sightseeing/', label: '周辺観光' },
    { href: '/Ryokan-HP/access/', label: '交通案内' },
    { href: '/Ryokan-HP/contact/', label: 'お問い合わせ' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-kincha-50/95 backdrop-blur-md shadow-lg border-b border-kincha-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-kincha-400 to-cha-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`absolute inset-2 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isScrolled ? 'bg-white' : 'bg-kincha-50'
              }`}>
                <span className={`font-serif-jp text-lg font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-sumi-900' : 'text-sumi-900'
                }`}>月</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-serif-jp text-xl font-medium transition-colors duration-300 ${
                isScrolled ? 'text-sumi-900' : 'text-white'
              }`}>
                月影の郷
              </h1>
              <p className={`font-serif-jp text-sm -mt-1 transition-colors duration-300 ${
                isScrolled ? 'text-sumi-600' : 'text-kincha-100'
              }`}>
                渓谷の湯 旅館
              </p>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans-jp text-sm transition-colors duration-200 relative group ${
                  isScrolled 
                    ? 'text-sumi-700 hover:text-sumi-900' 
                    : 'text-white hover:text-kincha-100'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-cha-400' : 'bg-white'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* 右側のボタン群 */}
          <div className="flex items-center space-x-4">
            {/* 言語切り替え */}
            <button className={`hidden md:flex items-center space-x-1 text-sm transition-colors duration-200 ${
              isScrolled 
                ? 'text-sumi-600 hover:text-sumi-900' 
                : 'text-white hover:text-kincha-100'
            }`}>
              <span className="font-medium">JP</span>
              <span className={isScrolled ? 'text-sumi-400' : 'text-kincha-200'}>|</span>
              <span className={isScrolled ? 'text-sumi-400' : 'text-kincha-200'}>EN</span>
            </button>

            {/* 予約ボタン */}
            <Link
              href="/Ryokan-HP/plans/"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-cha-600 to-cha-700 text-white text-sm font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              ご予約
            </Link>

            {/* ハンバーガーメニュー */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-200 ${
                isScrolled 
                  ? 'text-sumi-700 hover:text-sumi-900' 
                  : 'text-white hover:text-kincha-100'
              }`}
              aria-label="メニューを開く"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 border-t border-kincha-200">
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sumi-700 hover:text-sumi-900 hover:bg-kincha-100 rounded-lg transition-colors duration-200 font-sans-jp text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-3">
                <Link
                  href="/Ryokan-HP/plans/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-cha-600 to-cha-700 text-white text-sm font-medium rounded-full hover:from-cha-700 hover:to-cha-800 transition-all duration-200"
                >
                  ご予約
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 