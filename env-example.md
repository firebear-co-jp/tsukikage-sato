# 環境変数設定例

## .env.local ファイルの設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を設定してください：

```env
# Google Apps Script URL（お問い合わせフォーム用）
NEXT_PUBLIC_CONTACT_API_URL=https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec

# Google Apps Script URL（予約システム用）
NEXT_PUBLIC_RESERVATION_API_URL=https://script.google.com/macros/s/YOUR_RESERVATION_SCRIPT_ID/exec

# 管理者メール設定（オプション）
ADMIN_EMAIL=admin@tsukikage-sato.com
```

## 設定手順

### 1. Google Cloud Console での設定
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを作成または選択
3. 「API とサービス」→「ライブラリ」で以下を有効化：
   - Google Sheets API
   - Google Calendar API
4. 「API とサービス」→「認証情報」でサービスアカウントを作成
5. JSON キーをダウンロード

### 2. 環境変数の設定
1. ダウンロードしたJSONファイルから以下を取得：
   - `client_email`
   - `private_key`
2. 上記の値を `.env.local` に設定

### 3. スプレッドシートIDの取得
1. お問い合わせ用スプレッドシートのURLから取得
2. `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
3. `[SPREADSHEET_ID]` の部分をコピー

### 4. Google Apps Script URLの取得
1. 予約システム用のGoogle Apps Scriptをデプロイ
2. 表示されるURLをコピー
3. `NEXT_PUBLIC_RESERVATION_API_URL` に設定

## 注意事項

- `.env.local` ファイルは `.gitignore` に含めて、Gitにコミットしないでください
- 本番環境では、適切な環境変数管理サービスを使用してください
- サービスアカウントのキーは安全に管理してください
