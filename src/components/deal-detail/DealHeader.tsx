import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import StagePill from '../shared/StagePill';
import type { Deal } from '../../data/mockDeals';

interface Props {
  deal: Deal;
  onBack: () => void;
}

function DemoToast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary shadow-lg animate-fade-in" onAnimationEnd={() => setTimeout(onDone, 1500)}>
      {message}
    </div>
  );
}

export default function DealHeader({ deal, onBack }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => setToast(msg);

  return (
    <div className="bg-panel border-b border-border px-6 py-4">
      {toast && <DemoToast message={toast} onDone={() => setToast(null)} />}
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent mb-3 transition-colors">
        <ArrowLeft size={14} /> Back to Pipeline
      </button>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-text-primary">{deal.dealer} — Portfolio Evaluation</h2>
          <div className="flex items-center gap-4 mt-1.5 text-sm text-text-secondary">
            <span className="font-mono">{deal.loans} loans</span>
            <span className="text-border">|</span>
            <span className="font-mono">Gross A/R: ${deal.grossBalance.toLocaleString()}</span>
            <span className="text-border">|</span>
            <span>Submitted: {deal.submitted}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <StagePill stage={deal.stage} />
            <span className="text-xs text-text-secondary">Assigned: {deal.assignedTo}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast('Bid generation queued — available in production v1')} className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/80 transition-colors">
            Generate Bid
          </button>
          <button onClick={() => showToast('Review request sent — available in production v1')} className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-medium hover:text-text-primary hover:border-text-secondary transition-colors">
            Request Review
          </button>
          <button onClick={() => showToast('Deal decline flow — available in production v1')} className="px-3 py-1.5 rounded-lg border border-danger/30 text-danger text-xs font-medium hover:bg-danger/10 transition-colors">
            Decline Deal
          </button>
        </div>
      </div>
    </div>
  );
}
