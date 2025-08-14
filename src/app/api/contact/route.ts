import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets API の設定
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      return NextResponse.json(
        { success: false, error: 'Spreadsheet ID not configured' },
        { status: 500 }
      );
    }
    
    // 現在の日時を取得
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
        body.name || '',
        body.email || '',
        body.phone || '',
        body.subject || '',
        body.message || '',
        body.preferredContact || '',
      ],
    ];
    
    // スプレッドシートにデータを追加
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:G', // A列からG列まで
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });
    
    // 管理者メール送信（オプション）
    if (process.env.ADMIN_EMAIL) {
      await sendAdminEmail(body);
    }
    
    // ユーザー確認メール送信（オプション）
    if (body.email) {
      await sendUserEmail(body);
    }
    
    return NextResponse.json({
      success: true,
      message: 'お問い合わせを送信しました',
      data: response.data,
    });
    
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '送信に失敗しました' 
      },
      { status: 500 }
    );
  }
}

// 管理者メール送信関数
async function sendAdminEmail(data: any) {
  // ここでメール送信処理を実装
  // 例：SendGrid、Resend、または他のメールサービスを使用
  console.log('管理者メール送信:', data);
}

// ユーザー確認メール送信関数
async function sendUserEmail(data: any) {
  // ここでメール送信処理を実装
  console.log('ユーザー確認メール送信:', data);
} 