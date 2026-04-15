import { useState } from 'react';
import DealHeader from './DealHeader';
import PortfolioSummary from './PortfolioSummary';
import ENPVBreakdown from './ENPVBreakdown';
import StressTesting from './StressTesting';
import LoanTable from './LoanTable';
import AIAnalysis from './AIAnalysis';
import type { Deal } from '../../data/mockDeals';

const tabs = [
  { id: 'summary', label: 'Portfolio Summary' },
  { id: 'enpv', label: 'ENPV Breakdown' },
  { id: 'stress', label: 'Stress Testing' },
  { id: 'loans', label: 'Loan-Level Detail' },
  { id: 'ai', label: 'AI Analysis' },
];

interface Props {
  deal: Deal;
  onBack: () => void;
}

export default function DealDetailPage({ deal, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="flex flex-col h-full">
      <DealHeader deal={deal} onBack={onBack} />

      {/* Tab bar */}
      <div className="border-b border-border bg-panel/30 px-6">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'summary' && <PortfolioSummary />}
        {activeTab === 'enpv' && <ENPVBreakdown />}
        {activeTab === 'stress' && <StressTesting />}
        {activeTab === 'loans' && <LoanTable />}
        {activeTab === 'ai' && <AIAnalysis />}
      </div>
    </div>
  );
}
