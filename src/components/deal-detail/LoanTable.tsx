import { useState, useMemo, Fragment } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { mockLoans } from '../../data/mockLoans';
import type { Loan } from '../../data/mockLoans';
import ConfidenceBadge from '../shared/ConfidenceBadge';

function fmt(n: number) { return '$' + n.toLocaleString(); }

function RiskBadge({ tier }: { tier: string }) {
  const c = tier === 'Low' ? 'bg-emerald-500/15 text-emerald-400' : tier === 'Medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400';
  return <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${c}`}>{tier}</span>;
}

function ExpandedLoanDetail({ loan }: { loan: Loan }) {
  const survData = loan.survivalData.map((s, i) => ({ month: i + 1, survival: s }));

  return (
    <tr>
      <td colSpan={12} className="px-6 py-4 bg-base/50">
        <div className="grid grid-cols-3 gap-6">
          {/* Mini survival curve */}
          <div>
            <h5 className="text-xs font-semibold text-text-secondary uppercase mb-2">Survival Curve</h5>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={survData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 8 }} axisLine={false} domain={[0, 100]} />
                <Line type="monotone" dataKey="survival" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk factors */}
          <div>
            <h5 className="text-xs font-semibold text-text-secondary uppercase mb-2">Risk Factors</h5>
            {loan.riskFactors.length === 0 ? (
              <p className="text-xs text-emerald-400">No significant risk factors identified</p>
            ) : (
              <ul className="space-y-1.5">
                {loan.riskFactors.map((f, i) => (
                  <li key={i} className="text-xs text-amber-400 flex items-start gap-1.5">
                    <span className="mt-0.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ENPV decomposition */}
          <div>
            <h5 className="text-xs font-semibold text-text-secondary uppercase mb-2">ENPV Decomposition</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-text-secondary">Payment stream</span><span className="font-mono text-emerald-400">+{fmt(Math.round(loan.enpv * 0.72))}</span></div>
              <div className="flex justify-between text-xs"><span className="text-text-secondary">Recovery value</span><span className="font-mono text-emerald-400">+{fmt(Math.round(loan.enpv * 0.18))}</span></div>
              <div className="flex justify-between text-xs"><span className="text-text-secondary">Servicing cost</span><span className="font-mono text-rose-400">-{fmt(Math.round(loan.enpv * 0.08))}</span></div>
              <div className="flex justify-between text-xs"><span className="text-text-secondary">Time discount</span><span className="font-mono text-rose-400">-{fmt(Math.round(loan.balance - loan.enpv - loan.enpv * 0.08))}</span></div>
              <div className="flex justify-between text-xs pt-1.5 border-t border-border"><span className="text-text-secondary font-medium">Net ENPV</span><span className="font-mono text-accent font-bold">{fmt(loan.enpv)}</span></div>
            </div>

            {/* Confidence bar */}
            <div className="mt-3">
              <div className="text-[10px] text-text-secondary mb-1">Confidence Interval (90%)</div>
              <div className="relative h-4 bg-card rounded-full overflow-hidden">
                <div className="absolute inset-y-0 bg-accent/20 rounded-full" style={{ left: '20%', right: '20%' }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" style={{ left: `${loan.enpvPercent * 0.8 + 10}%` }} />
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function LoanTable() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<keyof Loan>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof Loan) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => [...mockLoans].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  }), [sortKey, sortDir]);

  const toggle = (id: number) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="w-8 px-3 py-2.5" />
              {[
                { key: 'id', label: '#', align: 'left' },
                { key: 'borrower', label: 'Borrower', align: 'left' },
                { key: 'vehicle', label: 'Vehicle', align: 'left' },
                { key: 'balance', label: 'Balance', align: 'right' },
                { key: 'rate', label: 'Rate', align: 'right' },
                { key: 'seasoning', label: 'Seasoning', align: 'right' },
                { key: 'dpd', label: 'DPD', align: 'right' },
                { key: 'enpv', label: 'ENPV', align: 'right' },
                { key: 'enpvPercent', label: 'ENPV %', align: 'right' },
                { key: 'riskTier', label: 'Risk', align: 'center' },
                { key: 'confidence', label: 'Conf.', align: 'center' },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof Loan)}
                  className={`px-3 py-2.5 text-[10px] font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((loan) => {
              const isExpanded = expanded.has(loan.id);
              const rowBg = loan.riskTier === 'High' ? 'bg-rose-500/[0.03]' : loan.riskTier === 'Low' ? '' : '';
              return (
                <Fragment key={loan.id}>
                  <tr
                    onClick={() => toggle(loan.id)}
                    className={`border-b border-border/30 hover:bg-white/[0.03] cursor-pointer transition-colors ${rowBg}`}
                  >
                    <td className="px-3 py-2.5 text-text-secondary">
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-text-secondary">{loan.id}</td>
                    <td className="px-3 py-2.5 text-text-primary font-medium">{loan.borrower}</td>
                    <td className="px-3 py-2.5 text-text-secondary">{loan.vehicle}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-text-primary">{fmt(loan.balance)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-text-secondary">{loan.rate}%</td>
                    <td className="px-3 py-2.5 text-right font-mono text-text-secondary">{loan.seasoning}mo</td>
                    <td className={`px-3 py-2.5 text-right font-mono ${loan.dpd > 30 ? 'text-rose-400' : loan.dpd > 0 ? 'text-amber-400' : 'text-text-secondary'}`}>{loan.dpd}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-text-primary">{fmt(loan.enpv)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-text-primary">{loan.enpvPercent}%</td>
                    <td className="px-3 py-2.5 text-center"><RiskBadge tier={loan.riskTier} /></td>
                    <td className="px-3 py-2.5 text-center"><ConfidenceBadge confidence={loan.confidence} /></td>
                  </tr>
                  {isExpanded && <ExpandedLoanDetail loan={loan} />}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
