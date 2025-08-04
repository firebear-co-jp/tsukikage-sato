# 1990年代アニメ風イラスト生成・使用方法

## 概要

月影の郷温泉旅館サイト用の1990年代アニメ風イラストをAIで生成し、サイトに適用するための手順を説明します。

## 必要なファイル

### 1. プロンプト一覧
- `ai-image-prompts.md` - AI画像生成用のプロンプト一覧

### 2. 生成スクリプト
- `generate-images.py` - AI画像生成を自動化するPythonスクリプト

### 3. 設定ファイル
- `src/config/images.ts` - 生成された画像のパス管理

## 画像サイズガイド

### Webサイトに最適な画像サイズ

#### 1. **背景画像（Hero Section）**
- **推奨サイズ**: 1920×1080px
- **アスペクト比**: 16:9
- **ファイル形式**: JPEG
- **ファイルサイズ**: 200KB〜500KB
- **用途**: メインページ、各ページのヒーローセクション

#### 2. **カード画像（プラン一覧など）**
- **推奨サイズ**: 1200×900px
- **アスペクト比**: 4:3
- **ファイル形式**: JPEG
- **ファイルサイズ**: 100KB〜300KB
- **用途**: プランカード、施設紹介

#### 3. **ギャラリー画像（詳細ページ）**
- **推奨サイズ**: 800×600px
- **アスペクト比**: 4:3
- **ファイル形式**: JPEG
- **ファイルサイズ**: 150KB〜400KB
- **用途**: プラン詳細ページのギャラリー

#### 4. **サムネイル画像**
- **推奨サイズ**: 400×300px
- **アスペクト比**: 4:3
- **ファイル形式**: JPEG
- **ファイルサイズ**: 50KB〜150KB
- **用途**: ギャラリーのサムネイル

### 画像最適化

生成された画像は `optimize-images.py` スクリプトで最適化できます：

```bash
# 必要なパッケージをインストール
pip install Pillow

# 画像最適化を実行
python optimize-images.py
```

## 生成手順

### 1. 環境準備

```bash
# 必要なPythonパッケージをインストール
pip install requests Pillow

# 環境変数を設定
export OPENAI_API_KEY="your-openai-api-key"
export OPENAI_API_ENDPOINT="https://api.openai.com"
```

### 2. 画像生成

```bash
# 生成スクリプトを実行
python generate-images.py
```

### 3. 生成される画像

以下の20枚の画像が `public/images/anime-style/` ディレクトリに生成されます：

#### メインページ（3枚）
- `main-ryokan-night.jpg` - 温泉旅館の外観（夜）
- `main-onsen-outdoor.jpg` - 露天風呂
- `main-kaiseki-meal.jpg` - 和食料理

#### 温泉ページ（2枚）
- `onsen-outdoor-view.jpg` - 露天風呂の景色
- `onsen-relaxation.jpg` - 温泉でのリラックス

#### お料理ページ（3枚）
- `cuisine-kaiseki-course.jpg` - 会席料理
- `cuisine-chef-cooking.jpg` - 料理長の調理
- `cuisine-seasonal-dishes.jpg` - 季節の料理

#### お部屋ページ（3枚）
- `rooms-tatami-interior.jpg` - 和室の内装
- `rooms-luxury-with-bath.jpg` - 露天風呂付き客室
- `rooms-valley-view.jpg` - 渓谷を望む景色

#### プランページ（6枚）
- `plans-romantic-couple.jpg` - 記念日プラン
- `plans-gourmet-dining.jpg` - グルメプラン
- `plans-healing-onsen.jpg` - 癒しプラン
- `plans-family-happy.jpg` - ファミリープラン
- `plans-solo-traveler.jpg` - 一人旅プラン
- `plans-premium-luxury.jpg` - プレミアムプラン

#### 観光・施設ページ（3枚）
- `sightseeing-landscape.jpg` - 観光地の景色
- `facilities-garden-lobby.jpg` - 施設の様子
- `access-mountain-road.jpg` - アクセスの風景

## サイトへの適用

### 1. 設定ファイルの確認

`src/config/images.ts` で画像パスが正しく設定されていることを確認します。

### 2. フォールバック機能

画像の読み込みに失敗した場合、元のUnsplash画像に自動的にフォールバックします。

### 3. 適用済みページ

以下のページで1990年代アニメ風イラストが適用されています：

- **メインページ**: HeroSectionコンポーネント
- **プランページ**: プラン一覧と詳細ページ
- **その他のページ**: 順次適用予定

## カスタマイズ

### プロンプトの調整

`ai-image-prompts.md` のプロンプトを編集して、より適切なイラストを生成できます。

### 新しい画像の追加

1. `ai-image-prompts.md` に新しいプロンプトを追加
2. `generate-images.py` の `images_to_generate` リストに追加
3. `src/config/images.ts` にパスを追加
4. スクリプトを実行して画像を生成

## 注意事項

### 1. API制限

- OpenAI DALL-E APIには利用制限があります
- 大量の画像生成時は時間がかかる場合があります

### 2. 画像品質

- 生成される画像の品質はプロンプトに依存します
- 必要に応じてプロンプトを調整してください

### 3. 著作権

- 生成された画像の著作権は利用規約に従ってください
- 商用利用の場合は適切なライセンスを確認してください

## トラブルシューティング

### 画像が生成されない場合

1. APIキーが正しく設定されているか確認
2. ネットワーク接続を確認
3. API利用制限に達していないか確認

### 画像が表示されない場合

1. ファイルパスが正しいか確認
2. 画像ファイルが存在するか確認
3. フォールバック機能が動作しているか確認

## 今後の拡張

- 他のAI画像生成サービス（Stable Diffusion等）への対応
- より詳細な画像生成オプション
- 自動的な画像最適化機能
- 多言語対応

## サポート

問題が発生した場合は、以下を確認してください：

1. ログファイルの確認
2. 設定ファイルの構文チェック
3. ネットワーク接続の確認
4. API利用状況の確認 