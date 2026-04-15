import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  value: number;
  suffix?: string;
}

export default function TrendIndicator({ value, suffix = 'vs last quarter' }: Props) {
  const isPositive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {isPositive ? '+' : ''}{value}% {suffix}
    </span>
  );
}
