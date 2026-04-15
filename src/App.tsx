import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './components/dashboard/DashboardPage';
import PipelinePage from './components/pipeline/PipelinePage';
import DealDetailPage from './components/deal-detail/DealDetailPage';
import { mockDeals } from './data/mockDeals';

const pageHeaders: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Portfolio acquisition command center' },
  pipeline: { title: 'Deal Pipeline', subtitle: 'Active and historical deals' },
  analytics: { title: 'Portfolio Analytics', subtitle: 'Coming soon' },
  documents: { title: 'Documents', subtitle: 'Coming soon' },
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [pipelineFilter, setPipelineFilter] = useState<string | undefined>();

  const selectedDeal = selectedDealId ? mockDeals.find((d) => d.id === selectedDealId) : null;

  const handleNavigate = (target: string, filter?: string) => {
    if (target === 'pipeline') {
      setPipelineFilter(filter);
    }
    setPage(target);
    if (target !== 'deal-detail') {
      setSelectedDealId(null);
    }
  };

  const handleDealClick = (dealId: string) => {
    setSelectedDealId(dealId);
    setPage('deal-detail');
  };

  const handleBackFromDeal = () => {
    setPage('pipeline');
    setSelectedDealId(null);
  };

  const currentHeader = pageHeaders[page] || { title: '' };

  return (
    <>
      <Sidebar
        currentPage={page}
        onNavigate={handleNavigate}
        showDealDetail={!!selectedDeal}
      />
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {page !== 'deal-detail' && <Header {...currentHeader} />}
        <main className="flex-1 overflow-y-auto">
          {page === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
          {page === 'pipeline' && <PipelinePage onDealClick={handleDealClick} initialFilter={pipelineFilter} />}
          {page === 'deal-detail' && selectedDeal && <DealDetailPage deal={selectedDeal} onBack={handleBackFromDeal} />}
          {page === 'analytics' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-3 opacity-20">📊</div>
                <h2 className="font-display text-lg text-text-secondary">Portfolio Analytics</h2>
                <p className="text-sm text-text-secondary/60 mt-1">Cross-portfolio performance analysis — coming soon</p>
              </div>
            </div>
          )}
          {page === 'documents' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-3 opacity-20">📄</div>
                <h2 className="font-display text-lg text-text-secondary">Documents</h2>
                <p className="text-sm text-text-secondary/60 mt-1">Bid letters, reports, and audit trails — coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
