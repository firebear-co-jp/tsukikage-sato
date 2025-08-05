import PlanDetailClient from '@/components/PlanDetailClient';

// 静的エクスポート用のパラメータ生成
export async function generateStaticParams() {
  const planIds = [
    'romantic-special',
    'gourmet-seasonal', 
    'relax-onsen',
    'family-friendly',
    'premium-suite',
    'solo-healing'
  ];
  
  return planIds.map((planId) => ({
    planId: planId,
  }));
}

export default function PlanDetailPage({ params }: { params: { planId: string } }) {
  return <PlanDetailClient planId={params.planId} />;
} 