import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { vehicleTypeData, termBucketData, creditScoreData, geographyData } from '../../data/mockChartData';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const summaryMetrics = [
  { label: 'Expected NPV', value: '$1,247,300', accent: true },
  { label: 'Recommended Bid', value: '$1,059,800', sub: '56.0% of balance' },
  { label: 'Projected IRR', value: '22.4%', accent: true },
  { label: 'Expected Default Rate', value: '31.2%' },
  { label: 'Avg Loan ENPV', value: '$8,784' },
  { label: 'Confidence Level', value: 'High', sub: '87th percentile', accent: true },
];

export default function PortfolioSummary() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics row */}
      <div className="grid grid-cols-6 gap-3">
        {summaryMetrics.map((m) => (
          <div key={m.label} className="glass-card rounded-lg p-4">
            <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-2">{m.label}</div>
            <div className={`font-mono text-lg font-bold ${m.accent ? 'text-accent' : 'text-text-primary'}`}>{m.value}</div>
            {m.sub && <div className="text-[10px] text-text-secondary mt-0.5">{m.sub}</div>}
          </div>
        ))}
      </div>

      {/* Portfolio Composition */}
      <div className="grid grid-cols-4 gap-4">
        {/* Vehicle Type Donut */}
        <div className="glass-card rounded-lg p-4">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Vehicle Type</h4>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={vehicleTypeData} dataKey="count" nameKey="type" cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2}>
                {vehicleTypeData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {vehicleTypeData.map((d) => (
              <div key={d.type} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-text-secondary">{d.type}</span>
                </div>
                <span className="font-mono text-text-primary">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Term Buckets */}
        <div className="glass-card rounded-lg p-4">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Remaining Term</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={termBucketData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis dataKey="bucket" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Credit Score Distribution */}
        <div className="glass-card rounded-lg p-4">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Credit Score Distribution</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={creditScoreData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis dataKey="range" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={40} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geography */}
        <div className="glass-card rounded-lg p-4">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Geography</h4>
          <div className="space-y-3 mt-4">
            {geographyData.map((g) => (
              <div key={g.state}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-secondary">{g.state}</span>
                  <span className="font-mono text-text-primary">{g.pct}%</span>
                </div>
                <div className="h-1.5 bg-base rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C/O vs ENPV Comparison */}
      <div className="grid grid-cols-2 gap-0 rounded-lg overflow-hidden border border-border">
        <div className="bg-card/80 p-6 border-r border-border">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={16} className="text-amber-400" />
            <h4 className="text-sm font-display font-bold text-text-secondary uppercase tracking-wider">Current Model (C/O)</h4>
          </div>
          <div className="space-y-4">
            <div><span className="text-xs text-text-secondary">Blended C/O:</span><span className="ml-2 font-mono text-lg text-text-primary">72.4%</span></div>
            <div><span className="text-xs text-text-secondary">NCL Assumption:</span><span className="ml-2 font-mono text-lg text-text-primary">29.6%</span></div>
            <div><span className="text-xs text-text-secondary">Opex Assumption:</span><span className="ml-2 font-mono text-lg text-text-primary">15.0%</span></div>
            <div className="pt-2 border-t border-border">
              <span className="text-xs text-text-secondary">Model Bid:</span>
              <span className="ml-2 font-mono text-xl font-bold text-text-primary">$1,124,600</span>
            </div>
            <div className="space-y-2 pt-3 border-t border-border">
              {['No confidence interval', 'No time-value adjustment', 'Uniform NCL assumption', 'Flat opex assumption'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-amber-400">
                  <AlertTriangle size={12} /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-accent/[0.04] p-6">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 size={16} className="text-accent" />
            <h4 className="text-sm font-display font-bold text-accent uppercase tracking-wider">ENPV Model</h4>
          </div>
          <div className="space-y-4">
            <div><span className="text-xs text-text-secondary">Expected Collection:</span><span className="ml-2 font-mono text-lg text-text-primary">68.8%</span></div>
            <div><span className="text-xs text-text-secondary">Predicted NCL:</span><span className="ml-2 font-mono text-lg text-text-primary">31.2%</span></div>
            <div><span className="text-xs text-text-secondary">Predicted Opex:</span><span className="ml-2 font-mono text-lg text-text-primary">12.7%</span></div>
            <div className="pt-2 border-t border-accent/20">
              <span className="text-xs text-text-secondary">ENPV Bid:</span>
              <span className="ml-2 font-mono text-xl font-bold text-accent">$1,059,800</span>
            </div>
            <div className="space-y-2 pt-3 border-t border-accent/20">
              <div className="flex items-center gap-2 text-xs text-text-primary"><Info size={12} className="text-accent" /> 90% CI: $934K — $1,178K</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400"><CheckCircle2 size={12} /> Discounted at 8.5% CoC</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400"><CheckCircle2 size={12} /> Loan-level loss prediction</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400"><CheckCircle2 size={12} /> Activity-based cost model</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
