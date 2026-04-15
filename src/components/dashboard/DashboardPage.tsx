import MetricCard from '../layout/MetricCard';
import PipelineSummary from './PipelineSummary';
import PerformanceChart from './PerformanceChart';
import ActivityFeed from './ActivityFeed';
import { dashboardMetrics } from '../../data/mockDeals';
import { sparklineData } from '../../data/mockChartData';

interface Props {
  onNavigate: (page: string, filter?: string) => void;
}

const sparklines = [sparklineData.pipeline, sparklineData.enpv, sparklineData.acquisitions, sparklineData.accuracy];

export default function DashboardPage({ onNavigate }: Props) {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-4 gap-4">
        {dashboardMetrics.map((m, i) => (
          <MetricCard key={m.label} {...m} sparkline={sparklines[i]} delay={i * 100} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PipelineSummary onStageClick={(stage) => onNavigate('pipeline', stage)} />
        <PerformanceChart />
      </div>

      <ActivityFeed />
    </div>
  );
}
