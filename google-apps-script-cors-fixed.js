// CORS対応版 Google Apps Script コード
// このコードを Google Apps Script エディタにコピー&ペーストしてください

function doPost(e) {
  try {
    // リクエストデータの取得
    const data = JSON.parse(e.postData.contents);
    
    // 簡単なログ出力
    console.log('受信したデータ:', data);
    
    // 成功レスポンス（CORS対応）
    const response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    response.setContent(JSON.stringify({ 
      success: true,
      message: 'テスト成功',
      receivedData: data
    }));
    
    return response;
      
  } catch (error) {
    console.error('Error:', error);
    
    const response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    response.setContent(JSON.stringify({ 
      success: false, 
      error: error.message 
    }));
    
    return response;
  }
}

// OPTIONS リクエスト用（CORS プリフライト）
function doOptions(e) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.TEXT);
  response.setContent('');
  return response;
}

// GET リクエスト用（テスト用）
function doGet(e) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify({ 
    success: true,
    message: 'Google Apps Script は正常に動作しています'
  }));
  
  return response;
}
