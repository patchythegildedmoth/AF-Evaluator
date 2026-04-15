import { useState } from 'react';
import { Search } from 'lucide-react';
import DealTable from './DealTable';
import { mockDeals } from '../../data/mockDeals';

interface Props {
  onDealClick: (dealId: string) => void;
  initialFilter?: string;
}

const stages = ['All', 'Intake', 'Scoring', 'Pricing', 'Review', 'Bid Submitted', 'Closed/Won', 'Declined'];

export default function PipelinePage({ onDealClick, initialFilter }: Props) {
  const [stageFilter, setStageFilter] = useState(initialFilter || 'All');
  const [search, setSearch] = useState('');

  const filtered = mockDeals.filter((d) => {
    if (stageFilter !== 'All' && d.stage !== stageFilter) return false;
    if (search && !d.dealer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
        >
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search dealer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent"
          />
        </div>
        <div className="ml-auto text-xs text-text-secondary">
          {filtered.length} deal{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>
      <DealTable deals={filtered} onDealClick={onDealClick} />
    </div>
  );
}
