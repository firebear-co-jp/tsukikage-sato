'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animeImages } from '@/config/images';

interface Room {
  id: string;
  name: string;
  capacity: number;
  price: number;
  totalPrice: number;
}

interface SearchResult {
  success: boolean;
  availableRooms: Room[];
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function ReservationPage() {
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    adults: 2,
    children: 0
  });
  
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // URLパラメータを読み取って初期値を設定
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const adults = urlParams.get('adults');
    const children = urlParams.get('children');
    
    if (checkIn || checkOut || adults || children) {
      setSearchData(prev => ({
        ...prev,
        checkIn: checkIn || prev.checkIn,
        checkOut: checkOut || prev.checkOut,
        adults: adults ? parseInt(adults) : prev.adults,
        children: children ? parseInt(children) : prev.children,
        guests: (adults ? parseInt(adults) : prev.adults) + (children ? parseInt(children) : prev.children)
      }));
    }
  }, []);

  // selectedRoomの状態変化を監視
  useEffect(() => {
    console.log('Selected room changed:', selectedRoom);
  }, [selectedRoom]);
  const [reservationData, setReservationData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isReserving, setIsReserving] = useState(false);
  const [reservationStatus, setReservationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 空室検索
  const searchAvailability = async () => {
    if (!searchData.checkIn || !searchData.checkOut) {
      alert('チェックイン・チェックアウト日を選択してください');
      return;
    }

    console.log('Starting search with data:', searchData); // デバッグ用
    setIsSearching(true);
    
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbw4dx0Qw_Z7hEbDyfKss8i-KBDvRvfA__xy-yNwh3NnGMatk81Je7waLsWMP9hJrUk-/exec'; // 予約システム用のURL
      const callback = 'handleSearchResponse';
      
      const data = {
        action: 'search',
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: searchData.guests
      };
      
      console.log('Data object keys:', Object.keys(data)); // デバッグ用
      
      console.log('Sending request to:', scriptUrl); // デバッグ用
      console.log('Request data:', data); // デバッグ用
      
      // グローバルコールバック関数を定義
      (window as any)[callback] = (response: SearchResult) => {
        console.log('Google Apps Script response:', response); // デバッグ用
        setSearchResult(response);
        setIsSearching(false);
      };
      
      // JSONP方式でリクエスト
      const url = `${scriptUrl}?callback=${callback}&data=${encodeURIComponent(JSON.stringify(data))}`;
      console.log('Full URL:', url); // デバッグ用
      console.log('URL length:', url.length); // デバッグ用
      console.log('URL parameters:');
      console.log('  - callback:', callback);
      console.log('  - data:', JSON.stringify(data));
      console.log('  - encoded data:', encodeURIComponent(JSON.stringify(data)));
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        console.error('Script loading error'); // デバッグ用
        setErrorMessage('検索中にエラーが発生しました');
        setIsSearching(false);
      };
      script.onload = () => {
        console.log('Script loaded successfully'); // デバッグ用
      };
      document.head.appendChild(script);
      
    } catch (error) {
      setErrorMessage('検索中にエラーが発生しました');
      setIsSearching(false);
    }
  };

  // 予約作成
  const createReservation = async () => {
    if (!selectedRoom) {
      alert('部屋を選択してください');
      return;
    }

    if (!reservationData.name || !reservationData.phone || !reservationData.email) {
      alert('お客様情報を入力してください');
      return;
    }

    setIsReserving(true);
    
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbw4dx0Qw_Z7hEbDyfKss8i-KBDvRvfA__xy-yNwh3NnGMatk81Je7waLsWMP9hJrUk-/exec'; // 予約システム用のURL
      const callback = 'handleReservationResponse';
      
      const data = {
        action: 'reserve',
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        roomId: selectedRoom.id,
        guests: searchData.guests,
        adults: searchData.adults,
        children: searchData.children,
        name: reservationData.name,
        phone: reservationData.phone,
        email: reservationData.email
      };
      
      console.log('Reservation data:', data); // デバッグ用
      
      // グローバルコールバック関数を定義
      (window as any)[callback] = (response: any) => {
        console.log('Reservation response:', response); // デバッグ用
        if (response.success) {
          setReservationStatus('success');
          // フォームをリセット
          setSearchData({
            checkIn: '',
            checkOut: '',
            guests: 2,
            adults: 2,
            children: 0
          });
          setReservationData({
            name: '',
            phone: '',
            email: ''
          });
          setSelectedRoom(null);
          setSearchResult(null);
        } else {
          setReservationStatus('error');
          setErrorMessage(response.message);
        }
        setIsReserving(false);
      };
      
      // JSONP方式でリクエスト
      const url = `${scriptUrl}?callback=${callback}&data=${encodeURIComponent(JSON.stringify(data))}`;
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        setErrorMessage('予約中にエラーが発生しました');
        setIsReserving(false);
      };
      document.head.appendChild(script);
      
    } catch (error) {
      setErrorMessage('予約中にエラーが発生しました');
      setIsReserving(false);
    }
  };

  // 宿泊人数の更新
  const updateGuests = (adults: number, children: number) => {
    const total = adults + children;
    setSearchData(prev => ({
      ...prev,
      adults,
      children,
      guests: total
    }));
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
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
                空室検索・ご予約
              </h1>
              <p className="font-sans-jp text-xl md:text-2xl text-kincha-100 leading-relaxed max-w-2xl">
                ご希望の宿泊日と人数で空室を検索し、オンラインでご予約いただけます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 空室検索フォーム */}
      <section className="py-20 bg-kincha-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
              空室検索
            </h2>
            <p className="font-sans-jp text-lg text-sumi-600 max-w-2xl mx-auto leading-relaxed">
              ご希望の宿泊日と人数を入力して、空室状況をご確認ください。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-sumi-700 mb-2">
                  チェックイン <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData(prev => ({ ...prev, checkIn: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sumi-700 mb-2">
                  チェックアウト <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData(prev => ({ ...prev, checkOut: e.target.value }))}
                  min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-sumi-700 mb-2">
                  大人 <span className="text-red-500">*</span>
                </label>
                <select
                  value={searchData.adults}
                  onChange={(e) => updateGuests(parseInt(e.target.value), searchData.children)}
                  className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}名</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-sumi-700 mb-2">
                  子供
                </label>
                <select
                  value={searchData.children}
                  onChange={(e) => updateGuests(searchData.adults, parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num}名</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={searchAvailability}
                disabled={isSearching}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    検索中...
                  </>
                ) : (
                  '空室を検索'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 検索結果 */}
      {searchResult && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                検索結果
              </h2>
              <p className="font-sans-jp text-lg text-sumi-600 max-w-2xl mx-auto leading-relaxed">
                {searchResult?.availableRooms?.length > 0 
                  ? 'ご希望の期間に空室がございます。'
                  : '申し訳ございませんが、ご希望の期間に空室がございません。'
                }
              </p>
            </div>

            {searchResult?.availableRooms?.length > 0 ? (
              <div className="space-y-6">
                {searchResult?.availableRooms?.map((room) => (
                  <div
                    key={room.id}
                    className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedRoom?.id === room.id
                        ? 'border-cha-500 bg-kincha-50'
                        : 'border-sumi-200 hover:border-cha-300'
                    }`}
                    onClick={() => {
                      console.log('Room card clicked:', room); // デバッグ用
                      setSelectedRoom(room);
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="font-serif-jp text-2xl font-medium text-sumi-900 mb-2">
                          {room.name}
                        </h3>
                        <p className="text-sumi-600 mb-2">
                          定員: {room.capacity}名様
                        </p>
                        <p className="text-lg font-medium text-cha-600">
                          {room.totalPrice.toLocaleString()}円（税込）
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Room selected:', room); // デバッグ用
                            setSelectedRoom(room);
                            console.log('Selected room state updated'); // デバッグ用
                          }}
                          className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
                        >
                          選択する
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">😔</div>
                <p className="text-sumi-600 mb-6">
                  他の日付でお試しください。
                </p>
                <button
                  onClick={() => setSearchResult(null)}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-cha-600 text-cha-600 font-medium rounded-full hover:bg-cha-600 hover:text-white transition-all duration-200"
                >
                  再度検索
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 予約フォーム */}
      {selectedRoom && (
        <section className="py-20 bg-kincha-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-6">
                ご予約
              </h2>
              <p className="font-sans-jp text-lg text-sumi-600 max-w-2xl mx-auto leading-relaxed">
                お客様情報を入力してご予約を完了してください。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* 選択された部屋の情報 */}
              <div className="bg-kincha-100 rounded-xl p-6 mb-8">
                <h3 className="font-serif-jp text-xl font-medium text-sumi-900 mb-4">
                  選択された部屋
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-sumi-600">部屋:</span>
                    <span className="ml-2 font-medium">{selectedRoom.name}</span>
                  </div>
                  <div>
                    <span className="text-sumi-600">宿泊期間:</span>
                    <span className="ml-2 font-medium">
                      {searchData.checkIn} 〜 {searchData.checkOut}
                    </span>
                  </div>
                  <div>
                    <span className="text-sumi-600">料金:</span>
                    <span className="ml-2 font-medium text-cha-600">
                      {selectedRoom.totalPrice.toLocaleString()}円
                    </span>
                  </div>
                </div>
              </div>

              {/* お客様情報フォーム */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reservationData.name}
                    onChange={(e) => setReservationData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={reservationData.phone}
                    onChange={(e) => setReservationData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                    placeholder="000-0000-0000"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-sumi-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={reservationData.email}
                  onChange={(e) => setReservationData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-sumi-300 rounded-lg focus:ring-2 focus:ring-cha-500 focus:border-transparent transition-all duration-200 text-sumi-900"
                  placeholder="example@email.com"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={createReservation}
                  disabled={isReserving}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cha-600 to-cha-700 text-white font-medium rounded-full hover:from-cha-700 hover:to-cha-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isReserving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      予約中...
                    </>
                  ) : (
                    '予約を確定する'
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 予約完了メッセージ */}
      {reservationStatus === 'success' && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="text-8xl mb-8">🎉</div>
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-8">
                ご予約ありがとうございます
              </h2>
              <p className="text-sumi-600 leading-relaxed mb-8">
                ご予約が完了しました。確認メールをお送りしておりますので、ご確認ください。
              </p>
              <button
                onClick={() => setReservationStatus('idle')}
                className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                再度予約する
              </button>
            </div>
          </div>
        </section>
      )}

      {/* エラーメッセージ */}
      {(reservationStatus === 'error' || errorMessage) && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-8">❌</div>
              <h2 className="font-serif-jp text-4xl md:text-5xl font-medium text-sumi-900 mb-8">
                エラーが発生しました
              </h2>
              <p className="text-sumi-600 leading-relaxed mb-8">
                {errorMessage || '予約処理中にエラーが発生しました。'}
              </p>
              <button
                onClick={() => {
                  setReservationStatus('idle');
                  setErrorMessage('');
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-cha-600 text-white font-medium rounded-full hover:bg-cha-700 transition-all duration-200"
              >
                再度お試しください
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
