# Google Sheets API 設定手順

## 1. Google Cloud Console での設定

### 1.1 Google Cloud Console にアクセス
- https://console.cloud.google.com/ にアクセス
- プロジェクトを作成または選択

### 1.2 Google Sheets API を有効化
- 「API とサービス」→「ライブラリ」
- 「Google Sheets API」を検索して有効化

### 1.3 サービスアカウントを作成
- 「API とサービス」→「認証情報」
- 「認証情報を作成」→「サービスアカウント」
- サービスアカウント名を入力（例：contact-form-service）
- 「キーを作成」→「JSON」を選択
- JSON ファイルをダウンロード

## 2. Google スプレッドシートの設定

### 2.1 スプレッドシートを作成
- 新しい Google スプレッドシートを作成
- 名前を「月影の郷_お問い合わせ」などに設定

### 2.2 ヘッダー行を設定
A列: 日時
B列: お名前
C列: メールアドレス
D列: 電話番号
E列: 件名
F列: メッセージ
G列: 希望連絡方法

### 2.3 サービスアカウントに権限を付与
- スプレッドシートを開く
- 「共有」ボタンをクリック
- サービスアカウントのメールアドレス（JSONファイル内のclient_email）を追加
- 権限：「編集者」を選択

## 3. 環境変数の設定

### 3.1 .env.local に追加
```
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id"
```

### 3.2 スプレッドシートIDの取得
- スプレッドシートのURLから取得
- https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
- [SPREADSHEET_ID] の部分をコピー 