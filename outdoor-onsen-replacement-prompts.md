# 露天風呂画像の置き換え用プロンプト

## 概要
現在の露天風呂の画像 `onsen-outdoor-view.png` に人が映っているため、人が映っていない自然な露天風呂のイラストに変更します。

## 変更対象
- `onsen-outdoor-view.png` のみを置き換え

## DALL-E プロンプト

### 露天風呂の景色 (onsen-outdoor-view.png)
```
A serene outdoor hot spring bath in a traditional Japanese ryokan, nestled in a mountain valley, 1990s anime style, soft watercolor illustration, no people visible, steam rising from the hot water, surrounded by natural rocks and trees, peaceful atmosphere, warm lighting, 16:9 aspect ratio, 1792x1024px, high quality, detailed but gentle art style
```

## 生成手順
1. 上記のプロンプトでDALL-Eを使用して画像を生成
2. 生成された画像を `tsukikage-sato/public/images/anime-style/` に配置
3. ファイル名を `onsen-outdoor-view.png` として既存ファイルを上書き
4. 配置後、設定ファイルの更新は不要（既存のパスを使用）

## 注意事項
- 人が映っていないことを確認
- 自然な露天風呂の雰囲気を重視
- 1990年代アニメ風の温かみのあるスタイル
- 温泉の湯気や自然の要素を含める
- 既存のファイル名をそのまま使用 