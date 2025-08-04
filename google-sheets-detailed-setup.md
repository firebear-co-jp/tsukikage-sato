# Google Sheets連携 詳細設定ガイド

## 📋 ステップ1: Google Sheetsの作成

### 1.1 スプレッドシートの作成
1. [Google Sheets](https://sheets.google.com) にアクセス
2. 「新しいスプレッドシート」をクリック
3. スプレッドシート名を「月影の郷_お問い合わせ」に変更

### 1.2 ヘッダー行の設定
以下のヘッダーをA1からH1に設定：

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|---|---|---|---|---|---|---|---|
| タイムスタンプ | お名前 | メールアドレス | お電話番号 | ご希望の連絡方法 | お問い合わせ内容 | お問い合わせ詳細 | プライバシーポリシー同意 |

### 1.3 列幅の調整
- A列（タイムスタンプ）: 150px
- B列（お名前）: 120px
- C列（メールアドレス）: 200px
- D列（お電話番号）: 120px
- E列（連絡方法）: 100px
- F列（お問い合わせ内容）: 150px
- G列（お問い合わせ詳細）: 300px
- H列（同意）: 80px

## 🔧 ステップ2: Google Apps Scriptの設定

### 2.1 Apps Scriptを開く
1. スプレッドシートの「拡張機能」メニューをクリック
2. 「Apps Script」を選択

### 2.2 コードの貼り付け
デフォルトの `Code.gs` ファイルの内容を削除し、以下のコードを貼り付け：

```javascript
function doPost(e) {
  try {
    // CORSヘッダーを設定
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    
    // リクエストデータを取得
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを取得
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 現在の日時を取得（日本時間）
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
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'データが正常に保存されました',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    console.error('エラー:', error);
    
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('月影の郷 お問い合わせフォーム用API')
    .setMimeType(ContentService.MimeType.TEXT);
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
```

### 2.3 デプロイの設定
1. 「デプロイ」ボタンをクリック
2. 「新しいデプロイ」を選択
3. 以下の設定を行う：
   - **種類の選択**: 「ウェブアプリ」
   - **説明**: 「月影の郷 お問い合わせフォームAPI」
   - **次のユーザーとして実行**: 「自分」
   - **アクセスできるユーザー**: 「全員」
4. 「デプロイ」をクリック
5. 承認を求められたら「許可」をクリック
6. 表示されるURLをコピー（例: `https://script.google.com/macros/s/AKfycbz.../exec`）

## ⚙️ ステップ3: 環境変数の設定

### 3.1 .env.localファイルの作成
プロジェクトルートに `.env.local` ファイルを作成：

```env
# Google Sheets API設定
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# フロントエンド用（NEXT_PUBLIC_プレフィックスが必要）
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**注意**: `YOUR_SCRIPT_ID` を実際のスクリプトIDに置き換えてください。

## 🧪 ステップ4: 動作確認

### 4.1 開発サーバーの再起動
```bash
npm run dev
```

### 4.2 テスト送信
1. ブラウザで `http://localhost:3000/contact` にアクセス
2. お問い合わせフォームにテストデータを入力
3. 「送信する」をクリック
4. Google Sheetsにデータが追加されることを確認

## 🔒 ステップ5: セキュリティと最適化

### 5.1 スプレッドシートの保護
1. スプレッドシートの「データ」→「シートを保護」
2. ヘッダー行（1行目）を保護
3. 編集権限を制限

### 5.2 データ検証の追加
1. スプレッドシートの「データ」→「データ検証」
2. 各列に適切な検証ルールを設定

### 5.3 自動バックアップ
1. スプレッドシートの「ファイル」→「バージョン履歴」
2. 定期的なバックアップを設定

## 🚨 トラブルシューティング

### よくある問題と解決方法

#### 1. CORSエラー
```
Access to fetch at 'https://script.google.com/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**解決方法**: Apps ScriptのコードにCORSヘッダーを追加済み

#### 2. 認証エラー
```
Google Apps Script API error: Script not found
```
**解決方法**: 
- スクリプトIDが正しいか確認
- デプロイ設定で「全員」にアクセス権限を設定

#### 3. データが保存されない
**解決方法**:
- Apps Scriptのログを確認
- スプレッドシートの権限を確認
- ネットワーク接続を確認

## 📊 データ管理のヒント

### 1. データの整理
- 定期的に古いデータをアーカイブ
- 重要なデータは別シートにコピー

### 2. 分析機能
- お問い合わせ内容別の集計
- 月別・週別の統計
- 返信状況の管理

### 3. 自動化
- 新規お問い合わせのメール通知
- 定期的なレポート生成
- データの自動整理

## 🎯 次のステップ

1. **メール通知の追加**: 新規お問い合わせ時にメール送信
2. **データ分析**: お問い合わせ傾向の分析
3. **自動返信**: 自動返信メールの設定
4. **管理画面**: お問い合わせ管理用のダッシュボード

これで完全に動作するGoogle Sheets連携システムが完成します！ 