// 修正版テスト用Google Apps Script
// このコードをGoogle Apps Scriptエディタにコピー&ペーストしてください

function doGet(e) {
  try {
    console.log('Received parameters:', e.parameter);
    
    // パラメータを直接取得
    const action = e.parameter.action;
    const callback = e.parameter.callback;
    const dataParam = e.parameter.data;
    
    console.log('Action:', action);
    console.log('Callback:', callback);
    console.log('Data parameter:', dataParam);
    
    // データをパース
    let data = {};
    if (dataParam) {
      try {
        data = JSON.parse(dataParam);
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('Data parse error:', parseError);
        data = {};
      }
    }
    
    if (action === 'search') {
      // テスト用の固定レスポンス
      const testResponse = {
        success: true,
        availableRooms: [
          {
            id: 'washitsu-a',
            name: '和室A',
            capacity: 2,
            price: 15000,
            totalPrice: 15000
          },
          {
            id: 'washitsu-b',
            name: '和室B',
            capacity: 4,
            price: 25000,
            totalPrice: 25000
          },
          {
            id: 'special',
            name: '特別室',
            capacity: 2,
            price: 30000,
            totalPrice: 30000
          },
          {
            id: 'family',
            name: '家族室',
            capacity: 6,
            price: 40000,
            totalPrice: 40000
          }
        ],
        checkIn: data.checkIn || '2024-01-15',
        checkOut: data.checkOut || '2024-01-16',
        guests: data.guests || 2
      };
      
      console.log('Sending test response:', testResponse);
      
      return ContentService
        .createTextOutput(`${callback}(${JSON.stringify(testResponse)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // デフォルトレスポンス
    const defaultResponse = {
      success: false,
      message: `Invalid action: ${action || 'undefined'}`
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(defaultResponse)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
      
  } catch (error) {
    console.error('Error in doGet:', error);
    
    const errorResponse = {
      success: false,
      message: error.toString()
    };
    
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(errorResponse)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// テスト用の関数
function testSearchAvailability() {
  const testParams = {
    action: 'search',
    callback: 'testCallback',
    data: JSON.stringify({
      checkIn: '2024-01-15',
      checkOut: '2024-01-16',
      guests: 2
    })
  };
  
  const mockEvent = {
    parameter: testParams
  };
  
  const result = doGet(mockEvent);
  console.log('Test result:', result.getContent());
}
