import type { Deal } from '../../data/mockDeals';
import ConfidenceBadge from '../shared/ConfidenceBadge';
import StagePill from '../shared/StagePill';

interface Props {
  deals: Deal[];
  onDealClick: (dealId: string) => void;
}

function fmt(n: number | null): string {
  if (n == null) return '—';
  return '$' + n.toLocaleString();
}

export default function DealTable({ deals, onDealClick }: Props) {
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Dealer</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Loans</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Gross Balance</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ENPV</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">ENPV %</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Confidence</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Stage</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">Updated</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal, i) => {
            const hasDetail = deal.id === 'wise-auto';
            return (
            <tr
              key={deal.id}
              onClick={() => hasDetail ? onDealClick(deal.id) : undefined}
              className={`border-b border-border/50 transition-colors animate-fade-in ${hasDetail ? 'hover:bg-white/[0.03] cursor-pointer' : 'opacity-80'}`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <td className="px-4 py-3.5 font-medium text-text-primary">{deal.dealer}</td>
              <td className="px-4 py-3.5 text-right font-mono text-text-secondary">{deal.loans}</td>
              <td className="px-4 py-3.5 text-right font-mono text-text-primary">{fmt(deal.grossBalance)}</td>
              <td className="px-4 py-3.5 text-right font-mono text-text-primary">{fmt(deal.enpv)}</td>
              <td className="px-4 py-3.5 text-right font-mono text-text-primary">{deal.enpvPercent != null ? `${deal.enpvPercent}%` : '—'}</td>
              <td className="px-4 py-3.5 text-center"><ConfidenceBadge confidence={deal.confidence} /></td>
              <td className="px-4 py-3.5 text-center"><StagePill stage={deal.stage} /></td>
              <td className="px-4 py-3.5 text-right text-text-secondary text-xs">{deal.updated}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
