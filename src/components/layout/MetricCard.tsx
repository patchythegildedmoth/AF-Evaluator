import { useEffect, useState } from 'react';
import TrendIndicator from '../shared/TrendIndicator';

interface Props {
  label: string;
  value: string;
  subtitle: string;
  trend: number;
  sparkline?: number[];
  delay?: number;
}

function MiniSparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 60;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="opacity-40">
      <polyline points={points} fill="none" stroke="#3B82F6" strokeWidth="1.5" />
    </svg>
  );
}

export default function MetricCard({ label, value, subtitle, trend, sparkline, delay = 0 }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`glass-card rounded-lg p-5 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</span>
        {sparkline && <MiniSparkline data={sparkline} />}
      </div>
      <div className="font-display text-2xl font-bold text-text-primary mb-1 font-mono">{value}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">{subtitle}</span>
        <TrendIndicator value={trend} suffix="" />
      </div>
    </div>
  );
}
