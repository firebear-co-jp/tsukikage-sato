// 月影の郷 総合予約システム
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
    const action = e.parameter.action;
    const callback = e.parameter.callback;
    
    let result;
    
    switch (action) {
      case 'search':
        result = searchAvailability(e.parameter);
        break;
      case 'reserve':
        result = createReservation(e.parameter);
        break;
      case 'cancel':
        result = cancelReservation(e.parameter);
        break;
      default:
        result = { success: false, message: 'Invalid action' };
    }
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(result)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    const errorResult = {
      success: false,
      message: error.toString()
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(errorResult)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// 空室検索
function searchAvailability(params) {
  const checkIn = new Date(params.checkIn);
  const checkOut = new Date(params.checkOut);
  const guests = parseInt(params.guests);
  
  const availableRooms = [];
  
  // 各部屋の空室状況をチェック
  for (const [roomId, room] of Object.entries(CONFIG.rooms)) {
    if (room.capacity >= guests) {
      const isAvailable = checkRoomAvailability(room.calendarId, checkIn, checkOut);
      
      if (isAvailable) {
        availableRooms.push({
          id: roomId,
          name: room.name,
          capacity: room.capacity,
          price: room.price,
          totalPrice: calculateTotalPrice(room.price, checkIn, checkOut)
        });
      }
    }
  }
  
  return {
    success: true,
    availableRooms: availableRooms,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    guests: guests
  };
}

// 部屋の空室チェック
function checkRoomAvailability(calendarId, checkIn, checkOut) {
  try {
    const calendar = CalendarApp.getCalendarById(calendarId);
    const events = calendar.getEvents(checkIn, checkOut);
    
    // 予約が重複していないかチェック
    return events.length === 0;
  } catch (error) {
    console.error('Calendar check error:', error);
    return false;
  }
}

// 料金計算
function calculateTotalPrice(pricePerNight, checkIn, checkOut) {
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  return pricePerNight * nights;
}

// 予約作成
function createReservation(params) {
  const reservationData = {
    checkIn: new Date(params.checkIn),
    checkOut: new Date(params.checkOut),
    roomId: params.roomId,
    guests: parseInt(params.guests),
    name: params.name,
    phone: params.phone,
    email: params.email,
    adults: parseInt(params.adults),
    children: parseInt(params.children)
  };
  
  // 空室再チェック
  const room = CONFIG.rooms[reservationData.roomId];
  if (!room) {
    return { success: false, message: 'Invalid room type' };
  }
  
  if (!checkRoomAvailability(room.calendarId, reservationData.checkIn, reservationData.checkOut)) {
    return { success: false, message: 'Room is no longer available' };
  }
  
  // 予約ID生成
  const reservationId = generateReservationId();
  
  // Google Calendarに予約を追加
  const calendar = CalendarApp.getCalendarById(room.calendarId);
  const event = calendar.createEvent(
    `${reservationData.name}様 - ${reservationData.guests}名`,
    reservationData.checkIn,
    reservationData.checkOut,
    {
      description: `予約ID: ${reservationId}\nお客様名: ${reservationData.name}\n電話: ${reservationData.phone}\nメール: ${reservationData.email}\n宿泊人数: ${reservationData.adults}名（大人）+ ${reservationData.children}名（子供）`
    }
  );
  
  // Google Sheetsに予約データを記録
  const totalPrice = calculateTotalPrice(room.price, reservationData.checkIn, reservationData.checkOut);
  recordReservationToSheet({
    reservationId: reservationId,
    checkIn: reservationData.checkIn,
    checkOut: reservationData.checkOut,
    roomType: room.name,
    guests: reservationData.guests,
    name: reservationData.name,
    phone: reservationData.phone,
    email: reservationData.email,
    totalPrice: totalPrice,
    eventId: event.getId()
  });
  
  // 確認メール送信
  sendReservationConfirmation(reservationData, reservationId, totalPrice);
  
  return {
    success: true,
    reservationId: reservationId,
    message: '予約が完了しました'
  };
}

// 予約ID生成
function generateReservationId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `TSK${timestamp}${random}`;
}

// Google Sheetsに予約記録
function recordReservationToSheet(reservationData) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  const sheet = spreadsheet.getSheetByName('予約');
  
  const nights = Math.ceil((reservationData.checkOut - reservationData.checkIn) / (1000 * 60 * 60 * 24));
  
  const rowData = [
    reservationData.reservationId,           // A: 予約ID
    new Date(),                              // B: 予約日時
    reservationData.checkIn,                 // C: チェックイン
    reservationData.checkOut,                // D: チェックアウト
    nights,                                  // E: 宿泊日数
    reservationData.roomType,                // F: 部屋タイプ
    reservationData.guests,                  // G: 宿泊人数
    reservationData.name,                    // H: お客様名
    reservationData.phone,                   // I: 電話番号
    reservationData.email,                   // J: メールアドレス
    reservationData.totalPrice,              // K: 料金
    '予約済み',                              // L: ステータス
    reservationData.eventId                  // M: カレンダーイベントID
  ];
  
  sheet.appendRow(rowData);
}

// 予約確認メール送信
function sendReservationConfirmation(reservationData, reservationId, totalPrice) {
  const room = CONFIG.rooms[reservationData.roomId];
  const nights = Math.ceil((reservationData.checkOut - reservationData.checkIn) / (1000 * 60 * 60 * 24));
  
  const subject = `【月影の郷】ご予約確認 - ${reservationId}`;
  
  const body = `
${reservationData.name} 様

ご予約ありがとうございます。
以下の内容で承りました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【予約ID】
${reservationId}

【宿泊期間】
チェックイン: ${reservationData.checkIn.toLocaleDateString('ja-JP')}
チェックアウト: ${reservationData.checkOut.toLocaleDateString('ja-JP')}
宿泊日数: ${nights}泊

【部屋】
${room.name}

【宿泊人数】
大人: ${reservationData.adults}名
子供: ${reservationData.children}名
合計: ${reservationData.guests}名

【料金】
${totalPrice.toLocaleString()}円（税込）

【お客様情報】
お名前: ${reservationData.name}
電話番号: ${reservationData.phone}
メールアドレス: ${reservationData.email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ご来館の際は、予約IDをお持ちください。
何かご不明な点がございましたら、お気軽にお問い合わせください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
渓谷の湯 旅館『月影の郷』
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
受付時間: 9:00〜21:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
  
  GmailApp.sendEmail(reservationData.email, subject, body, {
    name: '月影の郷'
  });
  
  // 管理者にも通知
  const adminSubject = `【新規予約】${reservationData.name}様 - ${reservationId}`;
  GmailApp.sendEmail('takayuki.sase@firebear.co.jp', adminSubject, body, {
    name: reservationData.name
  });
}

// 予約キャンセル
function cancelReservation(params) {
  const reservationId = params.reservationId;
  
  // Google Sheetsから予約情報を取得
  const reservation = getReservationFromSheet(reservationId);
  
  if (!reservation) {
    return { success: false, message: '予約が見つかりません' };
  }
  
  // Google Calendarからイベントを削除
  try {
    const calendar = CalendarApp.getCalendarById(CONFIG.calendarId);
    const event = calendar.getEventById(reservation.eventId);
    if (event) {
      event.deleteEvent();
    }
  } catch (error) {
    console.error('Calendar event deletion error:', error);
  }
  
  // Google Sheetsのステータスを更新
  updateReservationStatus(reservationId, 'キャンセル');
  
  // キャンセルメール送信
  sendCancellationEmail(reservation);
  
  return {
    success: true,
    message: '予約をキャンセルしました'
  };
}

// Google Sheetsから予約情報取得
function getReservationFromSheet(reservationId) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  const sheet = spreadsheet.getSheetByName('予約');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === reservationId) {
      return {
        reservationId: data[i][0],
        checkIn: data[i][2],
        checkOut: data[i][3],
        roomType: data[i][5],
        guests: data[i][6],
        name: data[i][7],
        phone: data[i][8],
        email: data[i][9],
        totalPrice: data[i][10],
        eventId: data[i][12]
      };
    }
  }
  
  return null;
}

// 予約ステータス更新
function updateReservationStatus(reservationId, status) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  const sheet = spreadsheet.getSheetByName('予約');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === reservationId) {
      sheet.getRange(i + 1, 12).setValue(status); // L列（ステータス）
      break;
    }
  }
}

// キャンセルメール送信
function sendCancellationEmail(reservation) {
  const subject = `【月影の郷】ご予約キャンセル - ${reservation.reservationId}`;
  
  const body = `
${reservation.name} 様

ご予約のキャンセルを承りました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【キャンセルされた予約】
予約ID: ${reservation.reservationId}
宿泊期間: ${reservation.checkIn.toLocaleDateString('ja-JP')} 〜 ${reservation.checkOut.toLocaleDateString('ja-JP')}
部屋: ${reservation.roomType}
宿泊人数: ${reservation.guests}名
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

またのご利用をお待ちしております。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
渓谷の湯 旅館『月影の郷』
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
受付時間: 9:00〜21:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
  
  GmailApp.sendEmail(reservation.email, subject, body, {
    name: '月影の郷'
  });
}
