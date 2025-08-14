'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LINKS } from '@/utils/link';

export default function ReservationWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSearch = () => {
    // 実際の予約ページへのリダイレクト
    const params = new URLSearchParams({
      checkIn: checkIn,
      checkOut: checkOut,
      adults: adults.toString(),
      children: children.toString(),
    });
    
    // 予約ページにリダイレクト
    window.location.href = `${LINKS.RESERVATION()}?${params.toString()}`;
  };

  const getMinCheckOutDate = () => {
    if (!checkIn) return '';
    const checkInDate = new Date(checkIn);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  return (
    <div className="bg-kincha-50/80 backdrop-blur-sm border border-kincha-200 rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-2">
          空室検索・ご予約
        </h3>
        <p className="text-sumi-600 text-sm">
          ご希望の日時で空室をご確認ください
        </p>
      </div>

      <div className="space-y-4">
        {/* チェックイン・チェックアウト */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="check-in" className="block text-sm font-medium text-sumi-700 mb-2">
              チェックイン
            </label>
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-kincha-300 rounded-lg bg-white text-sumi-900 focus:ring-2 focus:ring-cha-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="check-out" className="block text-sm font-medium text-sumi-700 mb-2">
              チェックアウト
            </label>
            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={getMinCheckOutDate()}
              className="w-full px-4 py-3 border border-kincha-300 rounded-lg bg-white text-sumi-900 focus:ring-2 focus:ring-cha-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* 宿泊人数 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className="block text-sm font-medium text-sumi-700 mb-2">
              大人
            </label>
            <select
              id="adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-4 py-3 border border-kincha-300 rounded-lg bg-white text-sumi-900 focus:ring-2 focus:ring-cha-400 focus:border-transparent transition-all duration-200"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}名
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-sumi-700 mb-2">
              お子様
            </label>
            <select
              id="children"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-4 py-3 border border-kincha-300 rounded-lg bg-white text-sumi-900 focus:ring-2 focus:ring-cha-400 focus:border-transparent transition-all duration-200"
            >
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}名
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 検索ボタン */}
        <button
          onClick={handleSearch}
          disabled={!checkIn || !checkOut}
          className="w-full bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium py-4 px-6 rounded-lg hover:from-cha-700 hover:to-cha-800 disabled:from-sumi-300 disabled:to-sumi-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          空室を検索する
        </button>

        {/* 電話予約 */}
        <div className="text-center pt-4 border-t border-kincha-200">
          <p className="text-sumi-600 text-sm mb-2">お電話でのご予約も承っております</p>
          <a
            href="tel:000-0000-0000"
            className="inline-flex items-center space-x-2 text-cha-600 hover:text-cha-700 font-medium transition-colors duration-200"
          >
            <span className="text-lg">📞</span>
            <span>000-0000-0000</span>
          </a>
          <p className="text-sumi-500 text-xs mt-1">受付時間: 9:00〜21:00</p>
        </div>

        {/* プラン一覧へのリンク */}
        <div className="text-center">
          <Link
            href={LINKS.PLANS()}
            className="text-sumi-600 hover:text-sumi-900 text-sm underline transition-colors duration-200"
          >
            宿泊プラン一覧を見る →
          </Link>
        </div>
      </div>
    </div>
  );
} 