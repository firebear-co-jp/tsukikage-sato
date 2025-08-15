// お問い合わせフォーム用のGoogle Apps Scriptコード（reCAPTCHA修正版）
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
    console.log('=== GAS Contact Form Request Started ===');
    console.log('Parameters:', e.parameter);
    
    // レート制限チェック
    if (!checkRateLimit(e)) {
      const callback = e.parameter.callback;
      console.log('Rate limit exceeded');
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "送信回数が上限に達しました。しばらく時間をおいてから再度お試しください。"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // パラメータを取得
    const callback = e.parameter.callback;
    const data = e.parameter.data;
    const test = e.parameter.test;
    
    console.log('Callback:', callback);
    console.log('Data received:', data ? 'Yes' : 'No');
    
    // テストリクエストの場合
    if (test === 'true') {
      const testResponse = {
        result: 'success',
        message: 'Contact GAS is working correctly',
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
        .createTextOutput(`${callback}({"result": "error", "message": "No data provided"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // JSONデータをパース
    const jsonData = JSON.parse(data);
    console.log('Parsed JSON data:', {
      userName: jsonData.userName,
      email: jsonData.email,
      hasRecaptchaToken: !!jsonData.recaptchaToken,
      recaptchaTokenLength: jsonData.recaptchaToken ? jsonData.recaptchaToken.length : 0
    });
    
    // reCAPTCHA検証
    console.log('Starting reCAPTCHA validation...');
    const recaptchaResult = validateRecaptcha(jsonData.recaptchaToken);
    console.log('reCAPTCHA validation result:', recaptchaResult);
    
    if (!recaptchaResult) {
      console.log('reCAPTCHA validation failed');
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "reCAPTCHA検証に失敗しました。再度お試しください。"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // 入力値の検証
    if (!validateContactInput(jsonData)) {
      console.log('Input validation failed');
      return ContentService
        .createTextOutput(`${callback}({"result": "error", "message": "入力データが不正です"})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    console.log('All validations passed, processing contact data...');
    
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
    
    console.log('Row data to append:', rowData);
    
    // スプレッドシートに追加
    sheet.appendRow(rowData);
    console.log('Contact data appended to spreadsheet');
    
    // 管理者にメール通知を送信
    sendContactNotificationEmail(jsonData, subject, phone, contactMethodJapanese, actualMessage);
    console.log('Admin notification email sent');
    
    // ユーザーに確認メールを送信
    sendContactConfirmationEmail(jsonData, subject, actualMessage);
    console.log('User confirmation email sent');
    
    // JSONP形式でレスポンス
    const response = {
      result: 'success',
      message: 'Contact data saved successfully and emails sent'
    };
    
    console.log('Sending success response:', response);
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(response)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    console.error('GAS Contact Error:', error);
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

// reCAPTCHA検証関数（修正版）
function validateRecaptcha(token) {
  try {
    console.log('validateRecaptcha called with token:', token ? `${token.substring(0, 20)}...` : 'null');
    
    if (!token) {
      console.log('No reCAPTCHA token provided');
      return false;
    }
    
    // reCAPTCHA APIに検証リクエストを送信
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    
    // フォームデータとして送信
    const formData = {
      'secret': RECAPTCHA.secretKey,
      'response': token
    };
    
    console.log('Sending reCAPTCHA verification request...');
    console.log('Secret key length:', RECAPTCHA.secretKey.length);
    console.log('Token length:', token.length);
    
    const options = {
      method: 'POST',
      payload: formData,
      muteHttpExceptions: true
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

// お問い合わせ入力値検証関数
function validateContactInput(data) {
  try {
    // 必須フィールドのチェック
    if (!data.userName || data.userName.trim().length === 0) {
      console.log('Validation failed: userName is empty');
      return false;
    }
    
    if (!data.email || data.email.trim().length === 0) {
      console.log('Validation failed: email is empty');
      return false;
    }
    
    // メールアドレスの形式チェック（簡易版）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log('Validation failed: invalid email format');
      return false;
    }
    
    // 文字数制限チェック
    if (data.userName.length > 100) {
      console.log('Validation failed: userName too long');
      return false;
    }
    
    if (data.email.length > 255) {
      console.log('Validation failed: email too long');
      return false;
    }
    
    if (data.message && data.message.length > 2000) {
      console.log('Validation failed: message too long');
      return false;
    }
    
    console.log('Contact input validation passed');
    return true;
    
  } catch (error) {
    console.error('Contact input validation error:', error);
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

// 管理者通知メール送信関数
function sendContactNotificationEmail(data, subject, phone, contactMethod, message) {
  try {
    const adminEmail = 'takayuki.sase@firebear.co.jp';
    const emailSubject = `[月影の郷] 新しいお問い合わせ: ${subject}`;
    
    const emailBody = `
新しいお問い合わせが届きました。

【お客様情報】
お名前: ${data.userName}
メールアドレス: ${data.email}
電話番号: ${phone}
希望連絡方法: ${contactMethod}

【お問い合わせ内容】
件名: ${subject}

${message}

---
このメールは月影の郷のお問い合わせフォームから自動送信されました。
    `.trim();
    
    GmailApp.sendEmail(adminEmail, emailSubject, emailBody, {
      name: '月影の郷 お問い合わせシステム'
    });
    
  } catch (error) {
    console.error('Admin notification email error:', error);
  }
}

// ユーザー確認メール送信関数
function sendContactConfirmationEmail(data, subject, message) {
  try {
    const emailSubject = `[月影の郷] お問い合わせありがとうございます`;
    
    const emailBody = `
${data.userName} 様

この度は、月影の郷にお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。

【お問い合わせ内容】
件名: ${subject}

${message}

内容を確認の上、担当者よりご連絡いたします。
通常2〜3営業日以内にご返信いたします。

しばらくお待ちください。

---
月影の郷
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
Email: info@tsukikage-sato.com
    `.trim();
    
    GmailApp.sendEmail(data.email, emailSubject, emailBody, {
      name: '月影の郷'
    });
    
  } catch (error) {
    console.error('User confirmation email error:', error);
  }
}
