import { Bell, Search } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: Props) {
  return (
    <header className="h-14 border-b border-border bg-panel/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-base font-display font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="text-xs text-text-secondary">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
          <Search size={16} />
        </button>
        <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-medium text-accent">
          JH
        </div>
      </div>
    </header>
  );
}
