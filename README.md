# 月影の郷 - 渓谷の湯 旅館

創業100年を迎える老舗旅館『月影の郷』の公式ウェブサイトです。

## 🚀 デプロイ方法

### GitHub Pagesでのデプロイ

1. **リポジトリの設定**
   - GitHubリポジトリのSettings > Pages
   - Source: "GitHub Actions"を選択

2. **ブランチの確認**
   - メインブランチが`main`であることを確認
   - 必要に応じて`master`から`main`に変更

3. **自動デプロイ**
   - `main`ブランチにプッシュすると自動的にデプロイされます
   - GitHub Actionsがビルドとデプロイを実行します

4. **手動ビルド（ローカル）**
   ```bash
   npm run build
   ```
   ビルド結果は`out`フォルダに出力されます。

## 🛠️ 開発環境

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 静的エクスポート
npm run export
```

## 📁 プロジェクト構成

- `src/app/` - Next.js App Router
- `src/components/` - Reactコンポーネント
- `public/images/` - 画像ファイル
- `.github/workflows/` - GitHub Actions設定

## 🔧 技術スタック

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GitHub Pages

## 📝 注意事項

- 静的エクスポートを使用しているため、サーバーサイド機能は利用できません
- 画像は`unoptimized: true`で設定されているため、最適化されません
- GitHub Pagesのベースパスは`/tsukikage-sato`に設定されています
