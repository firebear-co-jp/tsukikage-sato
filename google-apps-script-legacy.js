// 以前の動作していたGoogle Apps Scriptコード
// このコードを Google Apps Script エディタにコピー&ペーストしてください

function doPost(e) {
  try {
    // リクエストデータの取得
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートに記録
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.subject,
      data.message,
      data.preferredContact
    ]);
    
    // 管理者メール送信
    sendAdminEmail(data);
    
    // ユーザーメール送信
    sendUserEmail(data);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET リクエスト用（テスト用）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      success: true,
      message: 'Google Apps Script は正常に動作しています'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendAdminEmail(data) {
  const adminEmail = 'takayuki.sase@firebear.co.jp';
  const subject = '【月影の郷】新しいお問い合わせが届きました';
  const body = `
新しいお問い合わせが届きました。

【お名前】${data.name}
【メールアドレス】${data.email}
【電話番号】${data.phone}
【お問い合わせ内容】${data.subject}
【ご希望の連絡方法】${data.preferredContact}
【お問い合わせ詳細】
${data.message}

---
月影の郷 お問い合わせシステム
  `;
  
  MailApp.sendEmail(adminEmail, subject, body);
}

function sendUserEmail(data) {
  const subject = '【月影の郷】お問い合わせありがとうございます';
  const body = `
${data.name} 様

お問い合わせありがとうございます。
以下の内容で承りました。

【お問い合わせ内容】${data.subject}
【お問い合わせ詳細】
${data.message}

内容を確認の上、担当者よりご連絡いたします。
しばらくお待ちください。

---
渓谷の湯 旅館『月影の郷』
〒000-0000 ○○県○○市○○町○○-○○
TEL: 000-0000-0000
受付時間: 9:00〜21:00
  `;
  
  MailApp.sendEmail(data.email, subject, body);
}
