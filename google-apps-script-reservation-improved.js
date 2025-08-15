// 予約システム用のGoogle Apps Scriptコード（改善版）
// このコードを Google Apps Script エディタにコピー&ペーストしてください

// レート制限の設定
const RATE_LIMIT = {
  maxRequests: 10,       // 5分間に最大10回
  timeWindow: 300000,    // 5分間（ミリ秒）
  storageKey: 'rateLimit'
};

// 部屋タイプの定義
const ROOM_TYPES = {
  'standard': { name: 'スタンダード', capacity: 2, price: 15000 },
  'deluxe': { name: 'デラックス', capacity: 3, price: 25000 },
  'suite': { name: 'スイート', capacity: 4, price: 40000 },
  'family': { name: 'ファミリー', capacity: 6, price: 35000 }
};

function doGet(e) {
  try {
    console.log('=== GAS Reservation Request Started ===');
    console.log('Parameters:', e && e.parameter ? e.parameter : 'No parameters');
    
    // パラメータの存在チェック
    if (!e || !e.parameter) {
      console.log('No event or parameters provided');
      return ContentService
        .createTextOutput('{"success": false, "message": "Invalid request"}')
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // レート制限チェック
    if (!checkRateLimit(e)) {
      const callback = e.parameter.callback || 'callback';
      console.log('Rate limit exceeded');
      return ContentService
        .createTextOutput(`${callback}({"success": false, "message": "送信回数が上限に達しました。しばらく時間をおいてから再度お試しください。"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // パラメータを取得
    const callback = e.parameter.callback || 'callback';
    const data = e.parameter.data;
    const test = e.parameter.test;
    
    console.log('Callback:', callback);
    console.log('Data received:', data ? 'Yes' : 'No');
    
    // テストリクエストの場合
    if (test === 'true') {
      const testResponse = {
        success: true,
        message: 'Reservation GAS is working correctly',
        timestamp: new Date().toISOString()
      };
      
      console.log('Test response:', testResponse);
      return ContentService
        .createTextOutput(`${callback}(${JSON.stringify(testResponse)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    if (!data) {
      console.log('No data provided');
      return ContentService
        .createTextOutput(`${callback}({"success": false, "message": "No data provided"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // JSONデータをパース
    const jsonData = JSON.parse(data);
    console.log('Parsed JSON data:', {
      action: jsonData.action,
      checkIn: jsonData.checkIn,
      checkOut: jsonData.checkOut,
      guests: jsonData.guests
    });
    
    // アクションに応じて処理を分岐
    switch (jsonData.action) {
      case 'search':
        return handleSearch(callback, jsonData);
      case 'reserve':
        return handleReserve(callback, jsonData);
      case 'cancel':
        return handleCancel(callback, jsonData);
      default:
        console.log('Invalid action:', jsonData.action);
        return ContentService
          .createTextOutput(`${callback}({"success": false, "message": "Invalid action"})`)
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
  } catch (error) {
    console.error('GAS Reservation Error:', error);
    const callback = (e && e.parameter && e.parameter.callback) || 'callback';
    const errorResponse = {
      success: false,
      message: error.toString()
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(errorResponse)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function doPost(e) {
  // POSTリクエストも同じ処理
  return doGet(e);
}

// 空室検索処理
function handleSearch(callback, data) {
  try {
    console.log('Handling search request...');
    
    // 入力値の検証
    if (!validateSearchInput(data)) {
      console.log('Search input validation failed');
      return ContentService
        .createTextOutput(`${callback}({"success": false, "message": "入力データが不正です"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // スプレッドシートから既存の予約を取得
    const existingReservations = getExistingReservations();
    console.log('Existing reservations count:', existingReservations.length);
    
    // 指定期間の予約をフィルタリング
    const conflictingReservations = filterConflictingReservations(
      existingReservations, 
      data.checkIn, 
      data.checkOut
    );
    console.log('Conflicting reservations count:', conflictingReservations.length);
    
    // 利用可能な部屋を計算
    const availableRooms = calculateAvailableRooms(
      conflictingReservations, 
      data.guests,
      data.checkIn,
      data.checkOut
    );
    console.log('Available rooms:', availableRooms);
    
    // レスポンスを作成
    const response = {
      success: true,
      availableRooms: availableRooms,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests
    };
    
    console.log('Search response:', response);
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(response)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    console.error('Search error:', error);
    return ContentService
      .createTextOutput(`${callback}({"success": false, "message": "空室検索中にエラーが発生しました"})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// 予約処理（改善版）
function handleReserve(callback, data) {
  try {
    console.log('Handling reserve request...');
    
    // 入力値の検証
    if (!validateReserveInput(data)) {
      console.log('Reserve input validation failed');
      return ContentService
        .createTextOutput(`${callback}({"success": false, "message": "入力データが不正です"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // 再度空室確認
    const existingReservations = getExistingReservations();
    const conflictingReservations = filterConflictingReservations(
      existingReservations, 
      data.checkIn, 
      data.checkOut
    );
    
    const availableRooms = calculateAvailableRooms(
      conflictingReservations, 
      data.guests,
      data.checkIn,
      data.checkOut
    );
    
    // 選択された部屋が利用可能かチェック
    const selectedRoom = availableRooms.find(room => room.id === data.roomId);
    if (!selectedRoom) {
      console.log('Selected room not available');
      return ContentService
        .createTextOutput(`${callback}({"success": false, "message": "選択された部屋は既に予約されています"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // 予約をスプレッドシートに追加（ステータス「確定」で）
    const reservationId = addReservation(data, selectedRoom, '確定');
    console.log('Reservation added with ID:', reservationId);
    
    // Google Calendarにイベントを追加
    addCalendarEvent(data, selectedRoom, reservationId);
    console.log('Calendar event added');
    
    // お客様に確認メールを送信（改善：有効化）
    sendReservationConfirmationEmail(data, selectedRoom, reservationId);
    console.log('Customer confirmation email sent');
    
    // 管理者に通知メールを送信
    sendAdminNotificationEmail(data, selectedRoom, reservationId);
    console.log('Admin notification email sent');
    
    const response = {
      success: true,
      message: '予約が確定しました',
      reservationId: reservationId
    };
    
    console.log('Reserve response:', response);
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(response)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    console.error('Reserve error:', error);
    return ContentService
      .createTextOutput(`${callback}({"success": false, "message": "予約中にエラーが発生しました"})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// 予約キャンセル処理
function handleCancel(callback, data) {
  try {
    console.log('Handling cancel request...');
    
    // 予約をキャンセル
    const success = cancelReservation(data.reservationId);
    
    if (success) {
      const response = {
        success: true,
        message: '予約をキャンセルしました'
      };
      
      console.log('Cancel response:', response);
      return ContentService
        .createTextOutput(`${callback}(${JSON.stringify(response)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      return ContentService
        .createTextOutput(`${callback}({"success": false, "message": "予約のキャンセルに失敗しました"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
  } catch (error) {
    console.error('Cancel error:', error);
    return ContentService
      .createTextOutput(`${callback}({"success": false, "message": "キャンセル中にエラーが発生しました"})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// 既存の予約を取得
function getExistingReservations() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('予約');
    
    if (!sheet) {
      console.log('Reservation sheet not found');
      return [];
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const reservations = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0] && row[11] !== 'キャンセル') { // 予約IDがあり、ステータスがキャンセルでない
        reservations.push({
          id: row[0],
          checkIn: row[2],
          checkOut: row[3],
          roomType: row[5],
          guests: row[6],
          status: row[11]
        });
      }
    }
    
    console.log('Retrieved reservations:', reservations.length);
    return reservations;
    
  } catch (error) {
    console.error('Error getting existing reservations:', error);
    return [];
  }
}

// 競合する予約をフィルタリング
function filterConflictingReservations(reservations, checkIn, checkOut) {
  return reservations.filter(reservation => {
    const reservationCheckIn = new Date(reservation.checkIn);
    const reservationCheckOut = new Date(reservation.checkOut);
    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);
    
    // 日付が重複するかチェック
    return (newCheckIn < reservationCheckOut && newCheckOut > reservationCheckIn);
  });
}

// 利用可能な部屋を計算
function calculateAvailableRooms(conflictingReservations, guests, checkIn, checkOut) {
  const roomTypes = Object.keys(ROOM_TYPES);
  const availableRooms = [];
  
  // 各部屋タイプについて、利用可能な数を計算
  const roomCounts = {
    'standard': 5,
    'deluxe': 3,
    'suite': 2,
    'family': 2
  };
  
  for (const roomType of roomTypes) {
    const roomInfo = ROOM_TYPES[roomType];
    if (roomInfo.capacity >= guests) {
      // この部屋タイプの競合予約数をカウント
      const conflictingCount = conflictingReservations.filter(
        reservation => reservation.roomType === roomInfo.name
      ).length;
      
      const availableCount = roomCounts[roomType] - conflictingCount;
      
      if (availableCount > 0) {
        availableRooms.push({
          id: roomType,
          name: roomInfo.name,
          capacity: roomInfo.capacity,
          price: roomInfo.price,
          totalPrice: roomInfo.price * calculateNights(checkIn, checkOut),
          availableCount: availableCount
        });
      }
    }
  }
  
  return availableRooms;
}

// 宿泊日数を計算
function calculateNights(checkIn, checkOut) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate - checkInDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// 予約をスプレッドシートに追加（改善版：ステータスを指定可能）
function addReservation(data, selectedRoom, status = '確定') {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('予約');
    
    if (!sheet) {
      throw new Error('Reservation sheet not found');
    }
    
    const reservationId = generateReservationId();
    const nights = calculateNights(data.checkIn, data.checkOut);
    const totalPrice = selectedRoom.price * nights;
    
    // 日本時間で予約日時を取得
    const japanTime = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const rowData = [
      reservationId,                    // 予約ID
      japanTime,                       // 予約日時
      data.checkIn,                    // チェックイン
      data.checkOut,                   // チェックアウト
      nights,                          // 宿泊日数
      selectedRoom.name,               // 部屋タイプ
      data.guests,                     // 宿泊人数
      data.name,                       // お客様名
      data.phone,                      // 電話番号
      data.email,                      // メールアドレス
      totalPrice,                      // 料金
      status                           // ステータス（改善：デフォルトで「確定」）
    ];
    
    sheet.appendRow(rowData);
    console.log('Reservation added to sheet:', rowData);
    
    return reservationId;
    
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw error;
  }
}

// 予約IDを生成
function generateReservationId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `RSV${timestamp}${random}`;
}

// Google Calendarにイベントを追加
function addCalendarEvent(data, selectedRoom, reservationId) {
  try {
    const calendar = CalendarApp.getDefaultCalendar();
    const eventTitle = `[月影の郷] 予約: ${data.name}様 (${selectedRoom.name})`;
    const eventDescription = `
予約ID: ${reservationId}
お客様名: ${data.name}
電話番号: ${data.phone}
メールアドレス: ${data.email}
宿泊人数: ${data.guests}名
部屋タイプ: ${selectedRoom.name}
料金: ${selectedRoom.price * calculateNights(data.checkIn, data.checkOut)}円
    `.trim();
    
    const event = calendar.createEvent(
      eventTitle,
      new Date(data.checkIn),
      new Date(data.checkOut),
      { description: eventDescription }
    );
    
    console.log('Calendar event created:', event.getId());
    
  } catch (error) {
    console.error('Error creating calendar event:', error);
  }
}

// お客様への確認メールを送信（改善版）
function sendReservationConfirmationEmail(data, selectedRoom, reservationId) {
  try {
    const nights = calculateNights(data.checkIn, data.checkOut);
    const totalPrice = selectedRoom.price * nights;
    
    const emailSubject = `[月影の郷] ご予約確定: ${reservationId}`;
    const emailBody = `
${data.name} 様

この度は、月影の郷をご予約いただき、誠にありがとうございます。
以下の内容でご予約を確定いたしました。

【ご予約内容】
予約ID: ${reservationId}
チェックイン: ${data.checkIn}
チェックアウト: ${data.checkOut}
宿泊日数: ${nights}泊
部屋タイプ: ${selectedRoom.name}
宿泊人数: ${data.guests}名
料金: ${totalPrice}円

【お客様情報】
お名前: ${data.name}
電話番号: ${data.phone}
メールアドレス: ${data.email}

【ご来館について】
・チェックイン時間: 15:00〜18:00
・チェックアウト時間: 10:00まで
・駐車場: 無料でご利用いただけます
・温泉営業時間: 6:00〜24:00

ご予約内容に変更がございましたら、お電話またはメールにてご連絡ください。

---
月影の郷
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
Email: info@tsukikage-sato.com
    `.trim();
    
    GmailApp.sendEmail(data.email, emailSubject, emailBody, {
      name: '月影の郷'
    });
    
    console.log('Customer confirmation email sent to:', data.email);
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// 管理者通知メールを送信
function sendAdminNotificationEmail(data, selectedRoom, reservationId) {
  try {
    const adminEmail = 'takayuki.sase@firebear.co.jp';
    const nights = calculateNights(data.checkIn, data.checkOut);
    const totalPrice = selectedRoom.price * nights;
    
    const emailSubject = `[月影の郷] 新しい予約確定: ${reservationId}`;
    const emailBody = `
新しい予約が確定しました。

【予約情報】
予約ID: ${reservationId}
チェックイン: ${data.checkIn}
チェックアウト: ${data.checkOut}
宿泊日数: ${nights}泊
部屋タイプ: ${selectedRoom.name}
宿泊人数: ${data.guests}名
料金: ${totalPrice}円

【お客様情報】
お名前: ${data.name}
電話番号: ${data.phone}
メールアドレス: ${data.email}

---
このメールは月影の郷の予約システムから自動送信されました。
    `.trim();
    
    GmailApp.sendEmail(adminEmail, emailSubject, emailBody, {
      name: '月影の郷 予約システム'
    });
    
    console.log('Admin notification email sent to:', adminEmail);
    
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}

// 予約をキャンセル
function cancelReservation(reservationId) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('予約');
    
    if (!sheet) {
      return false;
    }
    
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === reservationId) {
        sheet.getRange(i + 1, 12).setValue('キャンセル'); // ステータス列
        return true;
      }
    }
    
    return false;
    
  } catch (error) {
    console.error('Error canceling reservation:', error);
    return false;
  }
}

// 検索入力値の検証
function validateSearchInput(data) {
  try {
    if (!data.checkIn || !data.checkOut) {
      console.log('Validation failed: missing dates');
      return false;
    }
    
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkIn < today) {
      console.log('Validation failed: check-in date is in the past');
      return false;
    }
    
    if (checkOut <= checkIn) {
      console.log('Validation failed: check-out date is not after check-in');
      return false;
    }
    
    if (data.guests < 1 || data.guests > 10) {
      console.log('Validation failed: invalid guest count');
      return false;
    }
    
    console.log('Search input validation passed');
    return true;
    
  } catch (error) {
    console.error('Search input validation error:', error);
    return false;
  }
}

// 予約入力値の検証
function validateReserveInput(data) {
  try {
    if (!validateSearchInput(data)) {
      return false;
    }
    
    if (!data.name || data.name.trim().length === 0) {
      console.log('Validation failed: name is empty');
      return false;
    }
    
    if (!data.email || data.email.trim().length === 0) {
      console.log('Validation failed: email is empty');
      return false;
    }
    
    if (!data.phone || data.phone.trim().length === 0) {
      console.log('Validation failed: phone is empty');
      return false;
    }
    
    if (!data.roomId) {
      console.log('Validation failed: room ID is missing');
      return false;
    }
    
    console.log('Reserve input validation passed');
    return true;
    
  } catch (error) {
    console.error('Reserve input validation error:', error);
    return false;
  }
}

// レート制限チェック関数
function checkRateLimit(e) {
  try {
    const now = new Date().getTime();
    const userKey = e.parameter.email || 'anonymous';
    
    const properties = PropertiesService.getScriptProperties();
    const rateLimitData = properties.getProperty(RATE_LIMIT.storageKey);
    
    let requests = {};
    if (rateLimitData) {
      requests = JSON.parse(rateLimitData);
    }
    
    if (requests[userKey]) {
      requests[userKey] = requests[userKey].filter(timestamp => 
        now - timestamp < RATE_LIMIT.timeWindow
      );
    } else {
      requests[userKey] = [];
    }
    
    if (requests[userKey].length >= RATE_LIMIT.maxRequests) {
      return false;
    }
    
    requests[userKey].push(now);
    properties.setProperty(RATE_LIMIT.storageKey, JSON.stringify(requests));
    
    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    return true;
  }
}
