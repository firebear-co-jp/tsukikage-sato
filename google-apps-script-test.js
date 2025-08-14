// シンプルなテスト用コード
// このコードを Google Apps Script エディタにコピー&ペーストしてください

function doPost(e) {
  try {
    // CORS ヘッダーを設定
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };
    
    // リクエストデータの取得
    const data = JSON.parse(e.postData.contents);
    
    // 簡単なログ出力
    console.log('受信したデータ:', data);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'テスト成功',
        receivedData: data
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.message 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      });
  }
}

// OPTIONS リクエスト用（CORS プリフライト）
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'text/plain'
    });
}

// GET リクエスト用（テスト用）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      success: true,
      message: 'Google Apps Script は正常に動作しています'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    });
}
