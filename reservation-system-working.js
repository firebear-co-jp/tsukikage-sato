// 月影の郷 総合予約システム - reCAPTCHA対応版
// Google Apps Script

// reCAPTCHA設定
const RECAPTCHA = {
  secretKey: '6LdZxqUrAAAAAEZNNE3LthWeT6UOwB1Wc1DBPPkw',
  minScore: 0.5          // 最小スコア（0.0〜1.0）
};

// 設定
const CONFIG = {
  // Google Calendar ID（実際のIDに置き換えてください）
  // 取得方法: Google Calendar → 設定 → カレンダーの統合 → カレンダーID
  calendarId: 'c_6a49d730dee64c602807be7781dff924de54ebbcaf5eef1f81db7fe13b40672b@group.calendar.google.com',
  
  // Google Sheets ID（動作確認済み）
  spreadsheetId: '140FbedKeQWmr12PVxkQCgoBMZT9SllHCRxb5jyApkMc',
  
  // 部屋設定
  // 各部屋のカレンダーIDを設定してください
  rooms: {
    'washitsu-a': {
      name: '和室A',
      capacity: 2,
      price: 28000,
      // 和室A専用カレンダーのID
      calendarId: 'c_3712af58493828576ce36c3cde1985e1888507ddaa2984229a78a1469ac6133e@group.calendar.google.com'
    },
    'washitsu-b': {
      name: '和室B',
      capacity: 4,
      price: 35000,
      // 和室B専用カレンダーのID
      calendarId: 'c_09192e38b8984f6b7bc97007a77deafb23b356ab1b71f64a8aaf05aa43f592eb@group.calendar.google.com'
    },
    'washitsu-c': {
      name: '和室C',
      capacity: 3,
      price: 42000,
      // 和室C専用カレンダーのID
      calendarId: 'c_6b043093441278145825b36b5b33d0f1ecdbc3613779ea1cf23aefd11dea6221@group.calendar.google.com'
    },
    'onsen-room': {
      name: '露天風呂付き客室',
      capacity: 3,
      price: 45000,
      // 露天風呂付き客室専用カレンダーのID
      calendarId: 'c_d546eef47940954aedd5cf366effe8949104c78801e997bf1dcbdd443dabe245@group.calendar.google.com'
    },
    'special-room': {
      name: '特別室',
      capacity: 4,
      price: 65000,
      // 特別室専用カレンダーのID
      calendarId: 'c_070721cac63671e89b541be95c3c22a9d365d57a77b6349de4f42bc054070078@group.calendar.google.com'
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
  console.log('=== SEARCH START ===');
  console.log('Received data:', data);
  
  // reCAPTCHA検証
  console.log('Starting reCAPTCHA validation...');
  const recaptchaResult = validateRecaptcha(data.recaptchaToken);
  console.log('reCAPTCHA validation result:', recaptchaResult);
  
  if (!recaptchaResult) {
    console.log('reCAPTCHA validation failed');
    return createJsonResponse(callback, { 
      success: false, 
      message: 'reCAPTCHA検証に失敗しました。再度お試しください。' 
    });
  }
  
  // 日付文字列を適切な形式に変換
  const checkInStr = data.checkin + 'T00:00:00';
  const checkOutStr = data.checkout + 'T00:00:00';
  const checkInDate = new Date(checkInStr);
  const checkOutDate = new Date(checkOutStr);
  const guests = parseInt(data.guests);

  console.log('Parsed dates:');
  console.log('  checkInDate:', checkInDate);
  console.log('  checkOutDate:', checkOutDate);
  console.log('  checkInDate.getTime():', checkInDate.getTime());
  console.log('  checkOutDate.getTime():', checkOutDate.getTime());
  console.log('  isNaN(checkInDate.getTime()):', isNaN(checkInDate.getTime()));
  console.log('  isNaN(checkOutDate.getTime()):', isNaN(checkOutDate.getTime()));
  console.log('  checkInDate >= checkOutDate:', checkInDate >= checkOutDate);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkInDate >= checkOutDate) {
    console.log('Date validation failed');
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
    checkIn: data.checkin,
    checkOut: data.checkout,
    guests: guests
  });
}

// 予約作成ハンドラー
function handleReserve(data, callback) {
  try {
    console.log('=== RESERVATION START ===');
    console.log('Reservation data:', data);
    
    // reCAPTCHA検証
    console.log('Starting reCAPTCHA validation...');
    const recaptchaResult = validateRecaptcha(data.recaptchaToken);
    console.log('reCAPTCHA validation result:', recaptchaResult);
    
    if (!recaptchaResult) {
      console.log('reCAPTCHA validation failed');
      return createJsonResponse(callback, { 
        success: false, 
        message: 'reCAPTCHA検証に失敗しました。再度お試しください。' 
      });
    }
    
    console.log('Attempting to open spreadsheet with ID:', CONFIG.spreadsheetId);
    
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
      console.log('Spreadsheet opened successfully');
    } catch (spreadsheetError) {
      console.error('Failed to open spreadsheet:', spreadsheetError);
      return createJsonResponse(callback, { 
        success: false, 
        message: 'Failed to access reservation spreadsheet. Please check spreadsheet ID and permissions.' 
      });
    }
    
    // シート名を確認（複数の可能性を試す）
    let sheet = spreadsheet.getSheetByName('予約');
    if (!sheet) {
      sheet = spreadsheet.getSheetByName('reservation');
    }
    if (!sheet) {
      sheet = spreadsheet.getSheetByName('Reservation');
    }
    if (!sheet) {
      console.error('Reservation sheet not found. Available sheets:', spreadsheet.getSheets().map(s => s.getName()));
      return createJsonResponse(callback, { success: false, message: 'Reservation sheet not found. Please check sheet name.' });
    }
    
    console.log('Sheet found:', sheet.getName());

    const room = CONFIG.rooms[data.roomId];
    if (!room) {
      console.error('Invalid room ID:', data.roomId);
      return createJsonResponse(callback, { success: false, message: 'Invalid room selected.' });
    }
    
    console.log('Room found:', room.name);

    // 日付文字列を適切な形式に変換
    const checkInStr = data.checkin + 'T00:00:00';
    const checkOutStr = data.checkout + 'T00:00:00';
    const checkInDate = new Date(checkInStr);
    const checkOutDate = new Date(checkOutStr);
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

    console.log('Creating calendar event...');
    // Google Calendarにイベントを追加
    const eventTitle = `${data.name}様 (${room.name} ${guests}名)`;
    const eventDescription = `予約ID: ${reservationId}\nお客様名: ${data.name}\nメール: ${data.email}\n電話: ${data.phone}\n部屋: ${room.name}\n人数: 大人${adults}名, 子供${children}名\n合計料金: ${totalPrice}円`;
    roomCalendar.createEvent(eventTitle, checkInDate, checkOutDate, { description: eventDescription });
    console.log('Calendar event created');

    console.log('Adding data to sheet...');
    // Google Sheetsにデータを記録（正しい列構成に修正）
    sheet.appendRow([
      reservationId, // A列: 予約ID
      japanTime, // B列: 予約日
      Utilities.formatDate(checkInDate, 'Asia/Tokyo', 'yyyy/MM/dd'), // C列: チェックイン
      Utilities.formatDate(checkOutDate, 'Asia/Tokyo', 'yyyy/MM/dd'), // D列: チェックアウト
      nights, // E列: 宿泊日数
      data.roomId, // F列: 部屋ID
      room.name, // G列: 部屋名
      guests, // H列: 宿泊人数
      adults, // I列: 大人
      children, // J列: 子供
      data.name, // K列: お客様名
      data.phone, // L列: 電話番号
      data.email, // M列: メールアドレス
      '予約済み' // N列: ステータス
    ]);
    console.log('Sheet data added');

    console.log('Sending emails...');
    try {
      // 予約確認メールを送信
      sendReservationConfirmationEmail(data, room, checkInDate, checkOutDate, nights, totalPrice, reservationId);
      console.log('Customer confirmation email sent');
    } catch (emailError) {
      console.error('Failed to send customer email:', emailError);
    }
    
    try {
      // 管理者通知メールを送信
      sendAdminNotificationEmail(data, room, checkInDate, checkOutDate, nights, totalPrice, reservationId);
      console.log('Admin notification email sent');
    } catch (adminEmailError) {
      console.error('Failed to send admin email:', adminEmailError);
    }
    console.log('Email sending completed');

    console.log('=== RESERVATION SUCCESS ===');
    return createJsonResponse(callback, { 
      success: true, 
      message: 'Reservation successful!',
      reservationId: reservationId
    });
    
  } catch (error) {
    console.error('=== RESERVATION ERROR ===');
    console.error('Error in handleReserve:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return createJsonResponse(callback, { 
      success: false, 
      message: `Reservation failed: ${error.message}` 
    });
  }
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
  const subject = `【月影の郷】新規予約通知 - ${customerData.name}様 (ID: ${reservationId})`;
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
    name: '月影の郷 予約システム' // 送信者名を固定
  });
}

// reCAPTCHA検証関数
function validateRecaptcha(token) {
  try {
    console.log('validateRecaptcha called with token:', token ? `${token.substring(0, 20)}...` : 'null');
    
    if (!token) {
      console.log('No reCAPTCHA token provided');
      return false;
    }
    
    // reCAPTCHA APIに検証リクエストを送信
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      secret: RECAPTCHA.secretKey,
      response: token
    };
    
    console.log('Sending reCAPTCHA verification request...');
    console.log('Secret key length:', RECAPTCHA.secretKey.length);
    
    const options = {
      method: 'POST',
      payload: payload
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    console.log('reCAPTCHA API response code:', responseCode);
    console.log('reCAPTCHA API response text:', responseText);
    
    if (responseCode !== 200) {
      console.log('reCAPTCHA API returned non-200 status code');
      return false;
    }
    
    const result = JSON.parse(responseText);
    console.log('Parsed reCAPTCHA result:', result);
    
    // 検証結果をチェック
    if (result.success && result.score >= RECAPTCHA.minScore) {
      console.log('reCAPTCHA validation successful. Score:', result.score);
      return true;
    }
    
    console.log('reCAPTCHA validation failed. Success:', result.success, 'Score:', result.score);
    if (result['error-codes']) {
      console.log('reCAPTCHA error codes:', result['error-codes']);
    }
    return false;
    
  } catch (error) {
    console.error('reCAPTCHA validation error:', error);
    return false;
  }
}
