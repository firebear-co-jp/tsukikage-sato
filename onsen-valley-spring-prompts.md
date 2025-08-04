# 温泉ページ画像の改善用プロンプト

## 概要
温泉ページの文言「渓谷を望む絶景」と「自家源泉かけ流し温泉」に合ったイラストに変更します。

## 変更対象
1. **ヒーローセクション**: 渓谷を望む絶景の露天風呂
2. **泉質・効能セクション**: 自家源泉かけ流し温泉の様子

## DALL-E プロンプト

### 1. 渓谷を望む絶景の露天風呂 (onsen-valley-view.png)
```
A breathtaking outdoor hot spring bath overlooking a deep mountain valley, 1990s anime style, soft watercolor illustration, no people visible, steam rising from the hot water, surrounded by natural rocks and Japanese maple trees, panoramic valley view with misty mountains in the background, peaceful atmosphere, warm golden hour lighting, 16:9 aspect ratio, 1792x1024px, high quality, detailed but gentle art style, zen atmosphere
```

### 2. 自家源泉かけ流し温泉 (onsen-natural-spring.png)
```
A natural hot spring source with flowing water cascading into a traditional Japanese onsen bath, 1990s anime style, soft watercolor illustration, no people visible, steam rising from the flowing hot water, natural rock formations, moss-covered stones, pure spring water flowing from mountain source, peaceful and pristine atmosphere, warm lighting, 16:9 aspect ratio, 1792x1024px, high quality, detailed but gentle art style, natural and authentic feeling
```

## 生成手順
1. 上記のプロンプトでDALL-Eを使用して画像を生成
2. 生成された画像を `tsukikage-sato/public/images/anime-style/` に配置
3. ファイル名を `onsen-valley-view.png` と `onsen-natural-spring.png` に設定
4. `src/config/images.ts` に新しいパスを追加
5. 温泉ページで適切な箇所に画像を適用

## 注意事項
- 渓谷の絶景が明確に見えるようにする
- 自家源泉の流れが自然で美しく表現される
- 1990年代アニメ風の温かみのあるスタイル
- 人が映っていない自然な雰囲気
- 温泉の湯気や自然の要素を含める 