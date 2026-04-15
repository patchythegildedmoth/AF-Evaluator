import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { survivalCurveData, paymentStateData, recoveryDistribution, prepaymentCurveData, servicingCostData, depreciationCurves } from '../../data/mockChartData';
import ConfidenceBadge from '../shared/ConfidenceBadge';

function CardShell({ title, children, badge }: { title: string; children: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <div className="glass-card rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-display font-semibold text-text-primary">{title}</h4>
        {badge}
      </div>
      {children}
    </div>
  );
}

function KeyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className="font-mono text-text-primary font-medium">{value}</span>
    </div>
  );
}

export default function ModelCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 1. Default Timing */}
      <CardShell title="1. Default Timing Model" badge={<ConfidenceBadge confidence="High" />}>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={survivalCurveData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} domain={[0, 100]} unit="%" />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            <Line type="monotone" dataKey="survival" stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-0.5">
          <KeyStat label="Median loan survival" value="19.2 months" />
          <KeyStat label="50% of defaults expected" value="Months 8-16" />
        </div>
      </CardShell>

      {/* 2. Payment Behavior */}
      <CardShell title="2. Payment Behavior Model" badge={<ConfidenceBadge confidence="High" />}>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={paymentStateData} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 60 }}>
            <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} />
            <YAxis type="category" dataKey="state" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} width={60} />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
              {paymentStateData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-0.5">
          <KeyStat label="Expected monthly cash flow" value="$124,300 declining to $87,600" />
          <KeyStat label="Good Payer rate" value="54% (above 48% avg)" />
        </div>
      </CardShell>

      {/* 3. LGD */}
      <CardShell title="3. Loss Given Default (LGD)" badge={<ConfidenceBadge confidence="Medium" />}>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={recoveryDistribution} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <XAxis dataKey="range" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-0.5">
          <KeyStat label="Expected avg recovery" value="34.2% of balance at default" />
          <KeyStat label="Avg repo + auction cost" value="$1,840/unit" />
        </div>
      </CardShell>

      {/* 4. Prepayment */}
      <CardShell title="4. Prepayment Model" badge={<ConfidenceBadge confidence="High" />}>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={prepaymentCurveData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} unit="%" />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            <Line type="monotone" dataKey="cumulative" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-0.5">
          <KeyStat label="12-month cumulative prepay" value="4.8%" />
          <KeyStat label="Breakdown" value="Total loss 2.1%, Payoff 1.9%, Refi 0.8%" />
        </div>
      </CardShell>

      {/* 5. Servicing Cost */}
      <CardShell title="5. Servicing Cost Model" badge={<ConfidenceBadge confidence="Medium" />}>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={servicingCostData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            <Area type="monotone" dataKey="cost" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-0.5">
          <KeyStat label="Total expected servicing" value="$168,400 ($1,186/loan)" />
          <KeyStat label="Cost mix" value="Processing 31%, Collection 44%, Repo 25%" />
        </div>
      </CardShell>

      {/* Vehicle Depreciation */}
      <CardShell title="Vehicle Depreciation Curves" badge={<span className="text-[10px] text-text-secondary">Sample vehicles</span>}>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} type="number" domain={[1, 48]} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            {depreciationCurves.map((c, i) => (
              <Line key={c.name} data={c.data} type="monotone" dataKey="value" stroke={['#3B82F6', '#10B981', '#F59E0B'][i]} strokeWidth={1.5} dot={false} name={c.name} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 text-[10px] text-text-secondary">
          {depreciationCurves.map((c, i) => (
            <span key={c.name} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: ['#3B82F6', '#10B981', '#F59E0B'][i] }} />
              {c.name}
            </span>
          ))}
        </div>
      </CardShell>
    </div>
  );
}
