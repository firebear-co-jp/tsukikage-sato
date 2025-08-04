#!/usr/bin/env python3
"""
サンプル画像生成スクリプト
AI画像生成の代わりに、簡単なプレースホルダー画像を作成します
"""

import os
from PIL import Image, ImageDraw, ImageFont
import glob

def create_sample_image(filename: str, size: tuple, title: str, description: str):
    """
    サンプル画像を作成します
    
    Args:
        filename: 保存するファイル名
        size: 画像サイズ (width, height)
        title: 画像のタイトル
        description: 画像の説明
    """
    try:
        # 新しい画像を作成
        img = Image.new('RGB', size, color='#f5f5dc')  # ベージュ色の背景
        draw = ImageDraw.Draw(img)
        
        # フォントサイズを計算
        title_font_size = min(size[0] // 20, 48)
        desc_font_size = min(size[0] // 30, 24)
        
        try:
            # フォントを読み込み（システムフォントを使用）
            title_font = ImageFont.truetype("/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc", title_font_size)
            desc_font = ImageFont.truetype("/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc", desc_font_size)
        except:
            # フォントが見つからない場合はデフォルトフォントを使用
            title_font = ImageFont.load_default()
            desc_font = ImageFont.load_default()
        
        # タイトルを描画
        title_bbox = draw.textbbox((0, 0), title, font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        title_height = title_bbox[3] - title_bbox[1]
        title_x = (size[0] - title_width) // 2
        title_y = size[1] // 3
        draw.text((title_x, title_y), title, fill='#8B4513', font=title_font)
        
        # 説明を描画
        desc_bbox = draw.textbbox((0, 0), description, font=desc_font)
        desc_width = desc_bbox[2] - desc_bbox[0]
        desc_height = desc_bbox[3] - desc_bbox[1]
        desc_x = (size[0] - desc_width) // 2
        desc_y = title_y + title_height + 20
        draw.text((desc_x, desc_y), description, fill='#696969', font=desc_font)
        
        # サイズ情報を描画
        size_text = f"{size[0]}x{size[1]}px"
        size_bbox = draw.textbbox((0, 0), size_text, font=desc_font)
        size_width = size_bbox[2] - size_bbox[0]
        size_x = (size[0] - size_width) // 2
        size_y = desc_y + desc_height + 10
        draw.text((size_x, size_y), size_text, fill='#A9A9A9', font=desc_font)
        
        # 装飾的な枠を描画
        border_width = 3
        draw.rectangle([border_width, border_width, size[0] - border_width, size[1] - border_width], 
                      outline='#D2691E', width=border_width)
        
        # 画像を保存
        output_dir = "public/images/anime-style"
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, filename)
        img.save(output_path, 'JPEG', quality=85)
        
        file_size = os.path.getsize(output_path)
        file_size_kb = file_size / 1024
        
        print(f"✅ サンプル画像作成: {filename} ({size[0]}x{size[1]}, {file_size_kb:.1f}KB)")
        
    except Exception as e:
        print(f"❌ エラー: {filename} - {e}")

def main():
    """メイン処理"""
    
    print("🎨 サンプル画像生成を開始します...")
    print("📁 出力先: public/images/anime-style")
    print("-" * 50)
    
    # 生成する画像の定義
    images_to_generate = [
        # メインページ（Hero Section用 - 1920x1080）
        {
            "filename": "main-ryokan-night.jpg",
            "size": (1920, 1080),
            "title": "温泉旅館の外観（夜）",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "main-onsen-outdoor.jpg",
            "size": (1920, 1080),
            "title": "露天風呂",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "main-kaiseki-meal.jpg",
            "size": (1920, 1080),
            "title": "和食料理",
            "description": "1990年代アニメ風イラスト"
        },
        # 温泉ページ（Hero Section用 - 1920x1080）
        {
            "filename": "onsen-outdoor-view.jpg",
            "size": (1920, 1080),
            "title": "露天風呂の景色",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "onsen-relaxation.jpg",
            "size": (1920, 1080),
            "title": "温泉でのリラックス",
            "description": "1990年代アニメ風イラスト"
        },
        # お料理ページ（Hero Section用 - 1920x1080）
        {
            "filename": "cuisine-kaiseki-course.jpg",
            "size": (1920, 1080),
            "title": "会席料理",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "cuisine-chef-cooking.jpg",
            "size": (1920, 1080),
            "title": "料理長の調理",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "cuisine-seasonal-dishes.jpg",
            "size": (1920, 1080),
            "title": "季節の料理",
            "description": "1990年代アニメ風イラスト"
        },
        # お部屋ページ（Hero Section用 - 1920x1080）
        {
            "filename": "rooms-tatami-interior.jpg",
            "size": (1920, 1080),
            "title": "和室の内装",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "rooms-luxury-with-bath.jpg",
            "size": (1920, 1080),
            "title": "露天風呂付き客室",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "rooms-valley-view.jpg",
            "size": (1920, 1080),
            "title": "渓谷を望む景色",
            "description": "1990年代アニメ風イラスト"
        },
        # プランページ（カード用 - 1200x900）
        {
            "filename": "plans-romantic-couple.jpg",
            "size": (1200, 900),
            "title": "記念日プラン",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "plans-gourmet-dining.jpg",
            "size": (1200, 900),
            "title": "グルメプラン",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "plans-healing-onsen.jpg",
            "size": (1200, 900),
            "title": "癒しプラン",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "plans-family-happy.jpg",
            "size": (1200, 900),
            "title": "ファミリープラン",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "plans-solo-traveler.jpg",
            "size": (1200, 900),
            "title": "一人旅プラン",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "plans-premium-luxury.jpg",
            "size": (1200, 900),
            "title": "プレミアムプラン",
            "description": "1990年代アニメ風イラスト"
        },
        # 観光・施設ページ（Hero Section用 - 1920x1080）
        {
            "filename": "sightseeing-landscape.jpg",
            "size": (1920, 1080),
            "title": "観光地の景色",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "facilities-garden-lobby.jpg",
            "size": (1920, 1080),
            "title": "施設の様子",
            "description": "1990年代アニメ風イラスト"
        },
        {
            "filename": "access-mountain-road.jpg",
            "size": (1920, 1080),
            "title": "アクセスの風景",
            "description": "1990年代アニメ風イラスト"
        }
    ]
    
    success_count = 0
    
    for i, image_info in enumerate(images_to_generate, 1):
        print(f"🔄 作成中 ({i}/{len(images_to_generate)}): {image_info['filename']}")
        
        create_sample_image(
            image_info['filename'],
            image_info['size'],
            image_info['title'],
            image_info['description']
        )
        success_count += 1
        
        print("-" * 30)
    
    print(f"✅ サンプル画像作成完了: {success_count}/{len(images_to_generate)} 画像")
    print("🎉 サイトで画像が表示されるようになりました！")

if __name__ == "__main__":
    main() 