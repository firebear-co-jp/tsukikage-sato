# 交通案内ページ用Google Map風地図イラスト

## 概要
交通案内ページに架空のGoogle Map風地図イラストを追加します。

## 対象ファイル
- `access-map.png` - 交通案内ページの地図セクション用

## DALL-E プロンプト

### Google Map風架空地図 (access-map.png)
```
A fictional Google Maps style map illustration showing a Japanese mountain valley area with a traditional ryokan location, 1990s anime style, soft watercolor illustration, clean map design with roads, mountains, rivers, and landmarks, pastel colors typical of Google Maps, location marker for the ryokan, street names in Japanese style, topographic features, 16:9 aspect ratio, 1792x1024px, high quality, detailed but gentle art style, easy to read and navigate
```

## 生成手順
1. 上記のプロンプトでDALL-Eを使用して画像を生成
2. 生成された画像を `tsukikage-sato/public/images/anime-style/` に配置
3. ファイル名を `access-map.png` に設定
4. `src/config/images.ts` に新しいパスを追加
5. 交通案内ページの地図セクションに画像を適用

## 注意事項
- Google Maps風のクリーンなデザイン
- 1990年代アニメ風の温かみのあるスタイル
- 架空の地図なので実際の地名は使用しない
- 温泉旅館の位置が分かりやすく表示
- 道路、山、川などの地形が表現される
- 読みやすく、ナビゲーションしやすいデザイン 