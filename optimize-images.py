#!/usr/bin/env python3
"""
画像最適化スクリプト
生成された画像をWebサイト用に最適化します
"""

import os
import sys
from PIL import Image
import glob

def optimize_image(input_path: str, output_path: str, max_width: int = None, max_height: int = None, quality: int = 85):
    """
    画像を最適化します
    
    Args:
        input_path: 入力画像のパス
        output_path: 出力画像のパス
        max_width: 最大幅
        max_height: 最大高さ
        quality: JPEG品質（1-100）
    """
    try:
        with Image.open(input_path) as img:
            # 元のサイズを取得
            original_width, original_height = img.size
            
            # リサイズが必要な場合
            if max_width or max_height:
                # アスペクト比を保持してリサイズ
                if max_width and max_height:
                    # 両方のサイズが指定されている場合
                    img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                elif max_width:
                    # 幅のみ指定
                    ratio = max_width / original_width
                    new_height = int(original_height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                elif max_height:
                    # 高さのみ指定
                    ratio = max_height / original_height
                    new_width = int(original_width * ratio)
                    img = img.resize((new_width, max_height), Image.Resampling.LANCZOS)
            
            # 出力ディレクトリを作成
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # 画像を保存
            if output_path.lower().endswith('.jpg') or output_path.lower().endswith('.jpeg'):
                img = img.convert('RGB')
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
            elif output_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            elif output_path.lower().endswith('.webp'):
                img.save(output_path, 'WEBP', quality=quality)
            
            # ファイルサイズを取得
            file_size = os.path.getsize(output_path)
            file_size_kb = file_size / 1024
            
            print(f"✅ 最適化完了: {output_path} ({img.size[0]}x{img.size[1]}, {file_size_kb:.1f}KB)")
            
    except Exception as e:
        print(f"❌ エラー: {input_path} - {e}")

def create_thumbnail(input_path: str, output_path: str, size: tuple = (400, 300)):
    """
    サムネイル画像を作成します
    
    Args:
        input_path: 入力画像のパス
        output_path: 出力画像のパス
        size: サムネイルサイズ (width, height)
    """
    try:
        with Image.open(input_path) as img:
            # アスペクト比を保持してリサイズ
            img.thumbnail(size, Image.Resampling.LANCZOS)
            
            # 出力ディレクトリを作成
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # サムネイルを保存
            img = img.convert('RGB')
            img.save(output_path, 'JPEG', quality=80, optimize=True)
            
            file_size = os.path.getsize(output_path)
            file_size_kb = file_size / 1024
            
            print(f"✅ サムネイル作成: {output_path} ({img.size[0]}x{img.size[1]}, {file_size_kb:.1f}KB)")
            
    except Exception as e:
        print(f"❌ エラー: {input_path} - {e}")

def main():
    """メイン処理"""
    
    # 入力ディレクトリ
    input_dir = "public/images/anime-style"
    
    # 出力ディレクトリ
    output_dir = "public/images/anime-style/optimized"
    thumbnail_dir = "public/images/anime-style/thumbnails"
    
    # 入力ディレクトリが存在するか確認
    if not os.path.exists(input_dir):
        print(f"❌ 入力ディレクトリが見つかりません: {input_dir}")
        return
    
    # 画像ファイルを検索
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.webp']:
        image_files.extend(glob.glob(os.path.join(input_dir, ext)))
    
    if not image_files:
        print(f"❌ 画像ファイルが見つかりません: {input_dir}")
        return
    
    print(f"🎨 画像最適化を開始します...")
    print(f"📁 入力: {input_dir}")
    print(f"📁 出力: {output_dir}")
    print(f"📊 処理対象: {len(image_files)} ファイル")
    print("-" * 50)
    
    # 最適化設定
    optimization_configs = [
        # Hero Section用（1920x1080）
        {
            "suffix": "hero",
            "max_width": 1920,
            "max_height": 1080,
            "quality": 85
        },
        # カード用（1200x900）
        {
            "suffix": "card",
            "max_width": 1200,
            "max_height": 900,
            "quality": 80
        },
        # ギャラリー用（800x600）
        {
            "suffix": "gallery",
            "max_width": 800,
            "max_height": 600,
            "quality": 75
        }
    ]
    
    # 各画像を最適化
    for image_file in image_files:
        filename = os.path.basename(image_file)
        name, ext = os.path.splitext(filename)
        
        print(f"🔄 処理中: {filename}")
        
        # 各設定で最適化
        for config in optimization_configs:
            output_filename = f"{name}-{config['suffix']}{ext}"
            output_path = os.path.join(output_dir, output_filename)
            
            optimize_image(
                image_file,
                output_path,
                max_width=config['max_width'],
                max_height=config['max_height'],
                quality=config['quality']
            )
        
        # サムネイル作成
        thumbnail_filename = f"{name}-thumb{ext}"
        thumbnail_path = os.path.join(thumbnail_dir, thumbnail_filename)
        create_thumbnail(image_file, thumbnail_path, (400, 300))
        
        print("-" * 30)
    
    print("🎉 画像最適化が完了しました！")
    print(f"📁 最適化済み画像: {output_dir}")
    print(f"📁 サムネイル画像: {thumbnail_dir}")

if __name__ == "__main__":
    main() 