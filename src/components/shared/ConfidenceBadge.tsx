interface Props {
  confidence: 'High' | 'Medium' | 'Low' | null;
}

const styles = {
  High: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Low: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

export default function ConfidenceBadge({ confidence }: Props) {
  if (!confidence) return <span className="text-text-secondary">—</span>;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[confidence]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${confidence === 'High' ? 'bg-emerald-400' : confidence === 'Medium' ? 'bg-amber-400' : 'bg-rose-400'}`} />
      {confidence}
    </span>
  );
}
