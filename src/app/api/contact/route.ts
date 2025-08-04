import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Google Sheets APIのURL（環境変数から取得）
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_API_URL;
    
    if (!googleSheetsUrl) {
      console.error('Google Sheets API URLが設定されていません');
      return NextResponse.json(
        { success: false, error: 'API設定エラー' },
        { status: 500 }
      );
    }

    // Google Sheets APIにデータを送信
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true, message: 'お問い合わせを送信しました' });
    } else {
      console.error('Google Sheets API エラー:', result.error);
      return NextResponse.json(
        { success: false, error: 'データの保存に失敗しました' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API エラー:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 