import { activityFeed } from '../../data/mockDeals';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'text-emerald-400',
  info: 'text-blue-400',
  warning: 'text-amber-400',
};

export default function ActivityFeed() {
  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-sm font-display font-semibold text-text-primary mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activityFeed.map((item, i) => {
          const Icon = icons[item.type];
          return (
            <div key={i} className="flex gap-3 items-start animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <Icon size={14} className={`mt-0.5 shrink-0 ${colors[item.type]}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text-primary leading-snug">{item.text}</p>
                <p className="text-xs text-text-secondary mt-0.5 font-mono">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
