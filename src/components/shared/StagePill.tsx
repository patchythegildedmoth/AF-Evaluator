interface Props {
  stage: string;
}

const stageColors: Record<string, string> = {
  'Intake': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  'Scoring': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Pricing': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Review': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Bid Submitted': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Closed/Won': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Declined': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export default function StagePill({ stage }: Props) {
  const colors = stageColors[stage] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors}`}>
      {stage}
    </span>
  );
}
