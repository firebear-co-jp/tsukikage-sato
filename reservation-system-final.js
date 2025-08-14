// 月影の郷 総合予約システム - 最終版
// Google Apps Script

// 設定
const CONFIG = {
  // Google Calendar ID（実際のIDに置き換えてください）
  // 取得方法: Google Calendar → 設定 → カレンダーの統合 → カレンダーID
  calendarId: 'c_6a49d730dee64c602807be7781dff924de54ebbcaf5eef1f81db7fe13b40672b@group.calendar.google.com',
  
  // Google Sheets ID（実際のIDに置き換えてください）
  // 取得方法: Google Sheets URLの /d/ と /edit の間の文字列
  // 例: https://docs.google.com/spreadsheets/d/【ここがID】/edit
  spreadsheetId: '1Z5xhozUeeWcqbSO3QNvCt92AAgkWc5BRbYZObqOJLLw',
  
  // 部屋設定
  // 各部屋のカレンダーIDを設定してください
  rooms: {
    'washitsu-a': {
      name: '和室A',
      capacity: 2,
      price: 15000,
      // 和室A専用カレンダーのID
      calendarId: 'c_d7a00081dad30a339865552ea1ed1af4340ba448757a049eae595c8d5da68e79@group.calendar.google.com'
    },
    'washitsu-b': {
      name: '和室B',
      capacity: 4,
      price: 25000,
      // 和室B専用カレンダーのID
      calendarId: 'c_7b9e2504e93b464880f6ec6d28f4ff3cb92c8b1bfda747362eaf74452f6df400@group.calendar.google.com'
    },
    'special': {
      name: '特別室',
      capacity: 2,
      price: 30000,
      // 特別室専用カレンダーのID
      calendarId: 'c_36fee39dbc5234aebf6fd6f103003b671d1fd73292230a67f821db9eeaff5c64@group.calendar.google.com'
    },
    'family': {
      name: '家族室',
      capacity: 6,
      price: 40000,
      // 家族室専用カレンダーのID
      calendarId: 'c_29a693c338b3dd1ecfe0130fb3a3749b00ced420df6d601ab0b9b0e419363155@group.calendar.google.com'
    }
  }
};

// メイン処理
function doGet(e) {
  try {
    console.log('=== DEBUG START ===');
    console.log('Full event object:', e);
    console.log('Event parameter:', e.parameter);
    console.log('Parameter keys:', Object.keys(e.parameter));
    
    // 各パラメータを個別に確認
    for (const [key, value] of Object.entries(e.parameter)) {
      console.log(`Parameter ${key}:`, value);
    }
    
    const callback = e.parameter.callback;
    const dataParam = e.parameter.data;
    
    console.log('Extracted callback:', callback);
    console.log('Extracted dataParam:', dataParam);
    
    // データをパース
    let data = {};
    if (dataParam) {
      try {
        data = JSON.parse(dataParam);
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('Data parse error:', parseError);
        return createJsonResponse(callback, { success: false, message: 'Invalid data format' });
      }
    }

    // action は data オブジェクトの中から取得する
    const action = data.action;
    console.log('Extracted action from parsed data:', action);

    if (!action) {
      return createJsonResponse(callback, { success: false, message: 'Action not specified in data' });
    }

    switch (action) {
      case 'search':
        return handleSearch(data, callback);
      case 'reserve':
        return handleReserve(data, callback);
      case 'cancel':
        return handleCancel(data, callback);
      default:
        return createJsonResponse(callback, { success: false, message: `Invalid action: ${action}` });
    }

  } catch (error) {
    console.error('Global error:', error);
    const callback = e.parameter.callback || 'callback'; // Fallback callback name
    return createJsonResponse(callback, { success: false, message: `Server error: ${error.message}` });
  } finally {
    console.log('=== DEBUG END ===');
  }
}

// JSONPレスポンスを生成するヘルパー関数
function createJsonResponse(callback, content) {
  return ContentService
    .createTextOutput(`${callback}(${JSON.stringify(content)})`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// 空室検索ハンドラー
function handleSearch(data, callback) {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  const guests = parseInt(data.guests);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkInDate >= checkOutDate) {
    return createJsonResponse(callback, { success: false, message: 'Invalid check-in/check-out dates.' });
  }
  if (isNaN(guests) || guests <= 0) {
    return createJsonResponse(callback, { success: false, message: 'Invalid number of guests.' });
  }

  const availableRooms = [];
  for (const roomId in CONFIG.rooms) {
    const room = CONFIG.rooms[roomId];
    if (guests <= room.capacity) {
      const roomCalendar = CalendarApp.getCalendarById(room.calendarId);
      if (!roomCalendar) {
        console.error(`Calendar not found for room: ${room.name} (ID: ${room.calendarId})`);
        continue; // Skip this room if calendar is not found
      }
      const events = roomCalendar.getEvents(checkInDate, checkOutDate);
      if (events.length === 0) {
        // 空室あり
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        availableRooms.push({
          id: roomId,
          name: room.name,
          capacity: room.capacity,
          price: room.price,
          totalPrice: room.price * nights // 宿泊日数に応じた合計料金
        });
      }
    }
  }

  return createJsonResponse(callback, {
    success: true,
    availableRooms: availableRooms,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    guests: guests
  });
}

// 予約作成ハンドラー
function handleReserve(data, callback) {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName('予約');
  if (!sheet) {
    return createJsonResponse(callback, { success: false, message: 'Reservation sheet not found.' });
  }

  const room = CONFIG.rooms[data.roomId];
  if (!room) {
    return createJsonResponse(callback, { success: false, message: 'Invalid room selected.' });
  }

  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  const guests = parseInt(data.guests);
  const adults = parseInt(data.adults);
  const children = parseInt(data.children);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkInDate >= checkOutDate) {
    return createJsonResponse(callback, { success: false, message: 'Invalid check-in/check-out dates.' });
  }
  if (isNaN(guests) || guests <= 0) {
    return createJsonResponse(callback, { success: false, message: 'Invalid number of guests.' });
  }
  if (isNaN(adults) || adults < 0 || isNaN(children) || children < 0) {
    return createJsonResponse(callback, { success: false, message: 'Invalid adults/children count.' });
  }

  const roomCalendar = CalendarApp.getCalendarById(room.calendarId);
  if (!roomCalendar) {
    console.error(`Calendar not found for room: ${room.name} (ID: ${room.calendarId})`);
    return createJsonResponse(callback, { success: false, message: 'Room calendar not configured.' });
  }

  // 空室再確認
  const existingEvents = roomCalendar.getEvents(checkInDate, checkOutDate);
  if (existingEvents.length > 0) {
    return createJsonResponse(callback, { success: false, message: 'Selected room is no longer available for the chosen dates.' });
  }

  // 予約ID生成 (簡易的なもの)
  const reservationId = Utilities.getUuid();
  const now = new Date();
  const japanTime = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = room.price * nights;

  // Google Calendarにイベントを追加
  const eventTitle = `${data.name}様 (${room.name} ${guests}名)`;
  const eventDescription = `予約ID: ${reservationId}\nお客様名: ${data.name}\nメール: ${data.email}\n電話: ${data.phone}\n部屋: ${room.name}\n人数: 大人${adults}名, 子供${children}名\n合計料金: ${totalPrice}円`;
  roomCalendar.createEvent(eventTitle, checkInDate, checkOutDate, { description: eventDescription });

  // Google Sheetsにデータを記録
  sheet.appendRow([
    reservationId,
    japanTime,
    Utilities.formatDate(checkInDate, 'Asia/Tokyo', 'yyyy/MM/dd'),
    Utilities.formatDate(checkOutDate, 'Asia/Tokyo', 'yyyy/MM/dd'),
    nights,
    room.name,
    `${adults}名 (大人), ${children}名 (子供)`,
    data.name,
    data.email,
    data.phone,
    totalPrice,
    '予約済み' // ステータス
  ]);

  // 予約確認メールを送信
  sendReservationConfirmationEmail(data, room, checkInDate, checkOutDate, nights, totalPrice, reservationId);
  sendAdminNotificationEmail(data, room, checkInDate, checkOutDate, nights, totalPrice, reservationId);

  return createJsonResponse(callback, { success: true, message: 'Reservation successful!' });
}

// 予約キャンセルハンドラー (未実装 - 必要に応じて追加)
function handleCancel(data, callback) {
  // 予約キャンセルロジックをここに追加
  // 例: Google Calendarイベントの削除、Google Sheetsのステータス更新
  return createJsonResponse(callback, { success: false, message: 'Cancel action not yet implemented.' });
}

// 予約確認メール送信 (お客様向け)
function sendReservationConfirmationEmail(customerData, roomInfo, checkIn, checkOut, nights, totalPrice, reservationId) {
  const subject = `【月影の郷】ご予約ありがとうございます（予約ID: ${reservationId}）`;
  const body = `
${customerData.name}様

この度は、渓谷の湯 旅館『月影の郷』をご予約いただき、誠にありがとうございます。
以下の内容でご予約を承りました。

---
◆ご予約内容◆
予約ID: ${reservationId}
チェックイン: ${Utilities.formatDate(checkIn, 'Asia/Tokyo', 'yyyy年MM月dd日')}
チェックアウト: ${Utilities.formatDate(checkOut, 'Asia/Tokyo', 'yyyy年MM月dd日')}
宿泊日数: ${nights}泊
部屋タイプ: ${roomInfo.name}
宿泊人数: 大人${customerData.adults}名、子供${customerData.children}名
合計料金: ${totalPrice.toLocaleString()}円

◆お客様情報◆
お名前: ${customerData.name}
メールアドレス: ${customerData.email}
電話番号: ${customerData.phone}

---
ご不明な点がございましたら、お気軽にお問い合わせください。
皆様のお越しを心よりお待ちしております。

---
渓谷の湯 旅館『月影の郷』
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
受付時間: 9:00〜21:00
`;

  MailApp.sendEmail({
    to: customerData.email,
    subject: subject,
    body: body,
    name: '月影の郷' // 送信者名
  });
}

// 管理者通知メール送信
function sendAdminNotificationEmail(customerData, roomInfo, checkIn, checkOut, nights, totalPrice, reservationId) {
  const adminEmail = 'takayuki.sase@firebear.co.jp'; // 管理者のメールアドレス
  const subject = `【月影の郷】新しい予約が入りました（予約ID: ${reservationId}）`;
  const body = `
新しいご予約が入りました。

---
◆ご予約内容◆
予約ID: ${reservationId}
チェックイン: ${Utilities.formatDate(checkIn, 'Asia/Tokyo', 'yyyy年MM月dd日')}
チェックアウト: ${Utilities.formatDate(checkOut, 'Asia/Tokyo', 'yyyy年MM月dd日')}
宿泊日数: ${nights}泊
部屋タイプ: ${roomInfo.name}
宿泊人数: 大人${customerData.adults}名、子供${customerData.children}名
合計料金: ${totalPrice.toLocaleString()}円

◆お客様情報◆
お名前: ${customerData.name}
メールアドレス: ${customerData.email}
電話番号: ${customerData.phone}

---
`;

  MailApp.sendEmail({
    to: adminEmail,
    subject: subject,
    body: body,
    name: customerData.name // 送信者名をお客様名にする
  });
}
