import WaterfallChart from './WaterfallChart';
import ModelCards from './ModelCards';

export default function ENPVBreakdown() {
  return (
    <div className="space-y-6 animate-fade-in">
      <WaterfallChart />
      <ModelCards />
    </div>
  );
}
