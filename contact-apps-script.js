// 月影の郷 お問い合わせフォーム用 Google Apps Script

// 設定
const CONFIG = {
  // Google Sheets ID（実際のIDに置き換えてください）
  spreadsheetId: 'YOUR_SPREADSHEET_ID',
  
  // シート名
  sheetName: 'お問い合わせ'
};

// メイン処理
function doGet(e) {
  try {
    console.log('=== CONTACT FORM DEBUG START ===');
    console.log('Full event object:', e);
    console.log('Event parameter:', e.parameter);
    
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
      case 'submit':
        return handleContactSubmit(data, callback);
      default:
        return createJsonResponse(callback, { success: false, message: `Invalid action: ${action}` });
    }

  } catch (error) {
    console.error('Global error:', error);
    const callback = e.parameter.callback || 'callback';
    return createJsonResponse(callback, { success: false, message: `Server error: ${error.message}` });
  } finally {
    console.log('=== CONTACT FORM DEBUG END ===');
  }
}

// JSONPレスポンスを生成するヘルパー関数
function createJsonResponse(callback, content) {
  return ContentService
    .createTextOutput(`${callback}(${JSON.stringify(content)})`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// お問い合わせ送信ハンドラー
function handleContactSubmit(data, callback) {
  try {
    console.log('=== CONTACT SUBMIT START ===');
    console.log('Contact data:', data);
    
    const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(CONFIG.sheetName);
    if (!sheet) {
      console.error('Contact sheet not found');
      return createJsonResponse(callback, { success: false, message: 'Contact sheet not found.' });
    }
    
    console.log('Sheet found:', sheet.getName());

    // 必須項目のチェック
    if (!data.name || !data.email || !data.message) {
      return createJsonResponse(callback, { success: false, message: '必須項目が入力されていません。' });
    }

    // 現在の日時を取得（日本時間）
    const timestamp = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // スプレッドシートに追加するデータ
    const values = [
      [
        timestamp,
        data.name || '',
        data.email || '',
        data.phone || '',
        data.preferredContact || '',
        data.subject || '',
        data.message || '',
        data.privacyAgreement ? '同意' : '未同意'
      ],
    ];

    // スプレッドシートにデータを追加
    const response = sheet.appendRow(values[0]);
    
    console.log('Data appended successfully');
    console.log('Response:', response);

    // 管理者メール送信（オプション）
    if (CONFIG.ADMIN_EMAIL) {
      await sendAdminEmail(data);
    }

    // ユーザー確認メール送信（オプション）
    if (data.email) {
      await sendUserEmail(data);
    }

    return createJsonResponse(callback, {
      success: true,
      message: 'お問い合わせを送信しました',
      data: response,
    });

  } catch (error) {
    console.error('Contact submit error:', error);
    return createJsonResponse(callback, {
      success: false,
      message: error instanceof Error ? error.message : '送信に失敗しました'
    });
  } finally {
    console.log('=== CONTACT SUBMIT END ===');
  }
}

// 管理者メール送信関数
async function sendAdminEmail(data) {
  // ここでメール送信処理を実装
  // 例：Gmail API、SendGrid、または他のメールサービスを使用
  console.log('管理者メール送信:', data);
}

// ユーザー確認メール送信関数
async function sendUserEmail(data) {
  // ここでメール送信処理を実装
  console.log('ユーザー確認メール送信:', data);
}

// CORS対応のためのOPTIONSリクエスト処理
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setHeaders(headers);
}
