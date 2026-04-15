import { LayoutDashboard, GitPullRequest, BarChart3, FileSearch, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
  showDealDetail?: boolean;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pipeline', label: 'Deal Pipeline', icon: GitPullRequest },
  { id: 'analytics', label: 'Portfolio Analytics', icon: BarChart3 },
  { id: 'deal-detail', label: 'Deal Detail', icon: FileSearch, contextual: true },
  { id: 'documents', label: 'Documents', icon: FileText },
];

export default function Sidebar({ currentPage, onNavigate, showDealDetail }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-panel border-r border-border flex flex-col transition-all duration-300 shrink-0`}>
      <div className={`p-4 border-b border-border flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
          AF
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-display font-semibold text-sm text-text-primary truncate">AF Portfolio</div>
            <div className="text-[10px] text-text-secondary">Evaluator v1.0</div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1">
        {navItems.map((item) => {
          if (item.contextual && !showDealDetail) return null;
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                }
                ${collapsed ? 'justify-center' : ''}
                ${item.contextual ? 'border-l-2 border-l-accent/50 ml-1' : ''}
              `}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
