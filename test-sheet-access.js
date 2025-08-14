// Google Sheetsアクセステスト用コード
// このコードをGoogle Apps Scriptエディタにコピー&ペーストしてテストしてください

function testSheetAccess() {
  try {
    console.log('=== SHEET ACCESS TEST START ===');
    
    const spreadsheetId = '1Z5xhozUeeWcqbSO3QNvCt92AAgkWc5BRbYZObqOJLLw';
    console.log('Spreadsheet ID:', spreadsheetId);
    
    // スプレッドシートを開く
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    console.log('Spreadsheet opened successfully');
    console.log('Spreadsheet name:', spreadsheet.getName());
    
    // シート一覧を取得
    const sheets = spreadsheet.getSheets();
    console.log('Available sheets:');
    sheets.forEach((sheet, index) => {
      console.log(`  ${index + 1}. ${sheet.getName()}`);
    });
    
    // 「予約」シートを取得
    const reservationSheet = spreadsheet.getSheetByName('予約');
    if (reservationSheet) {
      console.log('✅ "予約" sheet found successfully');
      console.log('Sheet name:', reservationSheet.getName());
      console.log('Sheet index:', reservationSheet.getIndex());
      
      // ヘッダー行を確認
      const headerRow = reservationSheet.getRange(1, 1, 1, 12).getValues()[0];
      console.log('Header row:', headerRow);
      
      // テストデータを追加
      const testData = [
        'TEST-' + new Date().getTime(),
        new Date().toLocaleString('ja-JP'),
        '2025-08-15',
        '2025-08-16',
        1,
        'テスト部屋',
        '2名',
        'テスト太郎',
        'test@example.com',
        '000-0000-0000',
        15000,
        'テスト'
      ];
      
      reservationSheet.appendRow(testData);
      console.log('✅ Test data appended successfully');
      
    } else {
      console.log('❌ "予約" sheet not found');
      console.log('Available sheet names:');
      sheets.forEach(sheet => {
        console.log(`  - ${sheet.getName()}`);
      });
    }
    
    console.log('=== SHEET ACCESS TEST END ===');
    
  } catch (error) {
    console.error('❌ Error in testSheetAccess:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
}

// メイン処理（テスト用）
function doGet(e) {
  try {
    const callback = e.parameter.callback || 'testCallback';
    
    // シートアクセステストを実行
    testSheetAccess();
    
    const response = {
      success: true,
      message: 'Sheet access test completed. Check logs for details.'
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(response)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    const callback = e.parameter.callback || 'testCallback';
    const errorResponse = {
      success: false,
      message: error.toString()
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(errorResponse)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}
