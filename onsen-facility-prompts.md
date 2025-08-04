# 温泉施設用画像生成プロンプト

## 不足している画像（2枚）

### 1. `onsen-indoor-bath.png`
**DALL-E用英語プロンプト**:
```
1990s anime style, Japanese ryokan indoor onsen bathhouse, spacious traditional indoor bath area, steam rising, men's and women's sections, traditional Japanese architecture, warm lighting, wooden interior, valley view through windows, healing atmosphere, 16:9 aspect ratio, high quality, detailed illustration
```

**日本語説明**: 大浴場用。室内の広々とした温泉大浴場、男女別浴場、渓谷を望む景色。

### 2. `onsen-private-bath.png`
**DALL-E用英語プロンプト**:
```
1990s anime style, Japanese ryokan private onsen bath, intimate private bathing room, perfect for couples and families, traditional Japanese interior, warm lighting, private hot spring, exclusive atmosphere, 16:9 aspect ratio, high quality, detailed illustration
```

**日本語説明**: 貸切風呂用。プライベートな貸切風呂、カップルや家族向けの親密な空間。

## 修正内容

### 温泉施設の画像設定変更

**Before**:
- 大浴場: `onsen.outdoorView` (露天風呂の画像)
- 露天風呂: `onsen.relaxation` (正しい)
- 貸切風呂: `onsen.outdoorView` (露天風呂の画像)

**After**:
- 大浴場: `onsen.indoorBath` (室内大浴場の画像) ← 新規追加
- 露天風呂: `onsen.relaxation` (変更なし)
- 貸切風呂: `onsen.privateBath` (貸切風呂の画像) ← 新規追加

## 生成手順

1. **DALL-Eで各プロンプトをコピー＆ペースト**
2. **画像サイズ**: 16:9 (1792x1024) を選択
3. **生成された画像をダウンロード**
4. **ファイル名を指定通りに変更**
5. **`tsukikage-sato/public/images/anime-style/` に配置**

## 配置先

```
tsukikage-sato/public/images/anime-style/
├── onsen-indoor-bath.png    ← 新規追加
└── onsen-private-bath.png   ← 新規追加
```

## 完成後の確認

これらの画像を配置すれば、温泉ページの施設セクションが正しく表示されます：

- ✅ 大浴場 - 室内の広々とした温泉大浴場
- ✅ 露天風呂 - 自然の中の露天風呂（変更なし）
- ✅ 貸切風呂 - プライベートな貸切風呂

各施設に適した画像が表示され、重複が解消されます！🎨✨ 