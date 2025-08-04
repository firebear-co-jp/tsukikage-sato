# Google Sheets連携セットアップガイド

## 📋 手順1: Google Sheetsの作成

1. **新しいGoogle Sheetsを作成**
   - [Google Sheets](https://sheets.google.com) にアクセス
   - 「新しいスプレッドシート」を作成
   - スプレッドシートの名前を「月影の郷_お問い合わせ」に変更

2. **ヘッダー行の設定**
   ```
   A1: タイムスタンプ
   B1: お名前
   C1: メールアドレス
   D1: お電話番号
   E1: ご希望の連絡方法
   F1: お問い合わせ内容
   G1: お問い合わせ詳細
   H1: プライバシーポリシー同意
   ```

## 🔧 手順2: Google Apps Scriptの設定

1. **Google Apps Scriptを開く**
   - スプレッドシートの「拡張機能」→「Apps Script」をクリック

2. **以下のコードを貼り付け**

```javascript
function doPost(e) {
  try {
    // リクエストデータを取得
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを取得
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 現在の日時を取得
    const timestamp = new Date();
    
    // データを配列に整理
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.preferredContact || '',
      data.subject || '',
      data.message || '',
      data.privacyAgreement ? '同意' : '未同意'
    ];
    
    // スプレッドシートに追加
    sheet.appendRow(rowData);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'データが正常に保存されました' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('お問い合わせフォーム用API')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. **デプロイの設定**
   - 「デプロイ」→「新しいデプロイ」をクリック
   - 「種類の選択」→「ウェブアプリ」を選択
   - 以下の設定を行う：
     - 説明: 「お問い合わせフォームAPI」
     - 次のユーザーとして実行: 「自分」
     - アクセスできるユーザー: 「全員」
   - 「デプロイ」をクリック
   - 承認を求められたら「許可」をクリック

4. **WebアプリのURLをコピー**
   - デプロイ後に表示されるURLをコピー
   - 例: `https://script.google.com/macros/s/AKfycbz.../exec`

## ⚙️ 手順3: フロントエンドの修正

1. **環境変数の設定**
   - `.env.local` ファイルを作成
   - `GOOGLE_SHEETS_API_URL=あなたのWebアプリURL` を追加

2. **お問い合わせフォームの修正**
   - `src/app/contact/page.tsx` の `handleSubmit` 関数を修正
   - Google Sheets APIにデータを送信する処理を追加

## 🔒 セキュリティ設定

1. **CORS設定**
   - Google Apps ScriptでCORSを有効にする必要があります
   - 必要に応じて追加の設定を行います

2. **レート制限**
   - Google Apps Scriptには1日あたりの実行回数制限があります
   - 大量の送信がある場合は注意が必要です

## 📝 使用方法

1. お問い合わせフォームから送信
2. データが自動でGoogle Sheetsに追加
3. スプレッドシートでデータを確認・管理

## 🚨 注意事項

- Google Apps ScriptのURLは公開されるため、必要に応じて追加のセキュリティ対策を検討
- 本番環境では、より堅牢なバックエンドAPIの使用を推奨
- 個人情報の取り扱いには十分注意 