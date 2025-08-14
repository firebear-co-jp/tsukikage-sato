// Google Apps Script 修正版コード
// このコードを Google Apps Script エディタにコピー&ペーストしてください

function doPost(e) {
  try {
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

// OPTIONS リクエスト用（CORS プリフライト）
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
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
