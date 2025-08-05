import NewsDetailClient from '@/components/NewsDetailClient';

// 静的エクスポート用のパラメータ生成
export async function generateStaticParams() {
  const newsIds = ['1', '2', '3', '4', '5', '6'];
  
  return newsIds.map((id) => ({
    id: id,
  }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return <NewsDetailClient />;
} 