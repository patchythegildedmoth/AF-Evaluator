import { pipelineStages } from '../../data/mockDeals';

interface Props {
  onStageClick: (stage: string) => void;
}

export default function PipelineSummary({ onStageClick }: Props) {
  const total = pipelineStages.reduce((s, p) => s + p.count, 0);

  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-sm font-display font-semibold text-text-primary mb-4">Deal Pipeline</h3>
      <div className="flex h-3 rounded-full overflow-hidden mb-4 bg-base">
        {pipelineStages.map((s) => (
          <div
            key={s.stage}
            style={{ width: `${(s.count / total) * 100}%`, backgroundColor: s.color }}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onStageClick(s.stage)}
          />
        ))}
      </div>
      <div className="space-y-2.5">
        {pipelineStages.map((s) => (
          <button
            key={s.stage}
            onClick={() => onStageClick(s.stage)}
            className="w-full flex items-center justify-between text-sm hover:bg-white/5 rounded px-2 py-1.5 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-text-secondary">{s.stage}</span>
            </div>
            <span className="font-mono text-text-primary font-medium">{s.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
