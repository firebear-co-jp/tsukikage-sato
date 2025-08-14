// 以前の動作していたJSONP方式のGoogle Apps Scriptコード
// このコードを Google Apps Script エディタにコピー&ペーストしてください

// レート制限の設定
const RATE_LIMIT = {
  maxRequests: 5,        // 5分間に最大5回
  timeWindow: 300000,    // 5分間（ミリ秒）
  storageKey: 'rateLimit'
};

// reCAPTCHA設定
const RECAPTCHA = {
  secretKey: '6LdZxqUrAAAAAEZNNE3LthWeT6UOwB1Wc1DBPPkw',
  minScore: 0.5          // 最小スコア（0.0〜1.0）
};

function doGet(e) {
  try {
    // レート制限チェック
    if (!checkRateLimit(e)) {
      const callback = e.parameter.callback;
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "送信回数が上限に達しました。しばらく時間をおいてから再度お試しください。"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // パラメータを取得
    const callback = e.parameter.callback;
    const data = e.parameter.data;
    const test = e.parameter.test;
    
    // テストリクエストの場合
    if (test === 'true') {
      const testResponse = {
        result: 'success',
        message: 'GAS is working correctly',
        timestamp: new Date().toISOString()
      };
      
      return ContentService
        .createTextOutput(`${callback}(${JSON.stringify(testResponse)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    if (!data) {
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "No data provided"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // JSONデータをパース
    const jsonData = JSON.parse(data);
    
    // reCAPTCHA検証
    if (!validateRecaptcha(jsonData.recaptchaToken)) {
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "reCAPTCHA検証に失敗しました。再度お試しください。"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // 入力値の検証
    if (!validateInput(jsonData)) {
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "入力データが不正です"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // スプレッドシートを取得
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // メッセージから件名と電話番号を抽出
    const messageLines = jsonData.message.split('\n');
    let subject = '';
    let phone = '';
    let preferredContact = '';
    let actualMessage = '';
    
    for (let line of messageLines) {
      if (line.startsWith('件名: ')) {
        subject = line.replace('件名: ', '');
      } else if (line.startsWith('電話番号: ')) {
        phone = line.replace('電話番号: ', '');
      } else if (line.startsWith('希望連絡方法: ')) {
        preferredContact = line.replace('希望連絡方法: ', '');
      } else if (line.trim() !== '') {
        actualMessage += line + '\n';
      }
    }
    
    // 連絡方法を日本語に変換
    const contactMethodJapanese = preferredContact === 'email' ? 'メール' : 
                                 preferredContact === 'phone' ? '電話' : preferredContact;
    
    // 日本時間の24時間表記で日時を取得
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
    
    // お問い合わせフォームの項目と完全に一致する列構成
    const rowData = [
      japanTime,                                        // A列: 日時（日本時間24時間表記）
      jsonData.userName || '',                          // B列: お名前
      jsonData.email || '',                             // C列: メールアドレス
      phone || '',                                      // D列: 電話番号
      contactMethodJapanese || '',                      // E列: ご希望の連絡方法（日本語）
      subject || '',                                    // F列: 件名
      actualMessage.trim() || ''                        // G列: お問い合わせ内容
    ];
    
    // スプレッドシートに追加
    sheet.appendRow(rowData);
    
    // 管理者にメール通知を送信
    sendNotificationEmail(jsonData, subject, phone, contactMethodJapanese, actualMessage);
    
    // ユーザーに確認メールを送信
    sendUserConfirmationEmail(jsonData, subject, actualMessage);
    
    // JSONP形式でレスポンス
    const response = {
      result: 'success',
      message: 'Data saved successfully and emails sent'
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(response)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    const errorResponse = {
      result: 'error',
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

// reCAPTCHA検証関数
function validateRecaptcha(token) {
  try {
    if (!token) {
      return false;
    }
    
    // reCAPTCHA APIに検証リクエストを送信
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      secret: RECAPTCHA.secretKey,
      response: token
    };
    
    const options = {
      method: 'POST',
      payload: payload
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    // 検証結果をチェック
    if (result.success && result.score >= RECAPTCHA.minScore) {
      return true;
    }
    
    console.log('reCAPTCHA validation failed:', result);
    return false;
    
  } catch (error) {
    console.error('reCAPTCHA validation error:', error);
    return false;
  }
}

// レート制限チェック関数
function checkRateLimit(e) {
  try {
    const now = new Date().getTime();
    const userKey = e.parameter.email || 'anonymous'; // メールアドレスをキーとして使用
    
    // PropertiesServiceから現在のリクエスト履歴を取得
    const properties = PropertiesService.getScriptProperties();
    const rateLimitData = properties.getProperty(RATE_LIMIT.storageKey);
    
    let requests = {};
    if (rateLimitData) {
      requests = JSON.parse(rateLimitData);
    }
    
    // 古いリクエストを削除
    if (requests[userKey]) {
      requests[userKey] = requests[userKey].filter(timestamp => 
        now - timestamp < RATE_LIMIT.timeWindow
      );
    } else {
      requests[userKey] = [];
    }
    
    // リクエスト数チェック
    if (requests[userKey].length >= RATE_LIMIT.maxRequests) {
      return false;
    }
    
    // 新しいリクエストを追加
    requests[userKey].push(now);
    
    // データを保存
    properties.setProperty(RATE_LIMIT.storageKey, JSON.stringify(requests));
    
    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    return true; // エラーの場合は許可
  }
}

// 入力値検証関数
function validateInput(data) {
  try {
    // 必須フィールドのチェック
    if (!data.userName || !data.email || !data.message) {
      return false;
    }
    
    // 文字数制限
    if (data.userName.length > 100 || data.email.length > 255 || data.message.length > 2000) {
      return false;
    }
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }
    
    // 危険な文字列のチェック
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /document\./i
    ];
    
    const allText = JSON.stringify(data).toLowerCase();
    for (let pattern of dangerousPatterns) {
      if (pattern.test(allText)) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Input validation error:', error);
    return false;
  }
}

// 管理者にメール通知を送信する関数
function sendNotificationEmail(data, subject, phone, contactMethodJapanese, actualMessage) {
  const adminEmail = 'takayuki.sase@firebear.co.jp'; // 管理者のメールアドレス
  const emailSubject = `【お問い合わせ】${data.userName}様より`;
  
  // 日本時間の24時間表記で日時を取得
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
  
  const body = `
新しいお問い合わせが届きました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【送信日時】
${japanTime}

【お名前】
${data.userName}

【メールアドレス】
${data.email}

【電話番号】
${phone}

【ご希望の連絡方法】
${contactMethodJapanese}

【件名】
${subject}

【お問い合わせ内容】
${actualMessage}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールは自動送信されています。
スプレッドシートでも詳細を確認できます。
  `;
  
  try {
    // 管理者メールの差出人をお客様のお名前に変更
    GmailApp.sendEmail(adminEmail, emailSubject, body, {
      name: data.userName // 差出人をお客様のお名前に設定
    });
    console.log('Admin notification email sent successfully');
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    // メール送信に失敗してもスプレッドシート保存は継続
  }
}

// ユーザーに確認メールを送信する関数
function sendUserConfirmationEmail(data, subject, actualMessage) {
  const userEmail = data.email;
  const userName = data.userName;
  const emailSubject = '【月影の郷】お問い合わせありがとうございます';
  
  // 日本時間の24時間表記で日時を取得
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
  
  const body = `
${userName} 様

お問い合わせありがとうございます。
以下の内容で承りました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【送信日時】
${japanTime}

【件名】
${subject}

【お問い合わせ内容】
${actualMessage}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

内容を確認の上、担当者よりご連絡いたします。
しばらくお待ちください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
渓谷の湯 旅館『月影の郷』
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
受付時間: 9:00〜21:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールは自動送信されています。
ご返信はできませんのでご了承ください。
  `;
  
  try {
    // ユーザー確認メールの差出人を「月影の郷」に変更
    GmailApp.sendEmail(userEmail, emailSubject, body, {
      name: '月影の郷' // 差出人を「月影の郷」に設定
    });
    console.log('User confirmation email sent successfully');
  } catch (error) {
    console.error('Failed to send user confirmation email:', error);
    // ユーザーメール送信に失敗しても他の処理は継続
  }
}
