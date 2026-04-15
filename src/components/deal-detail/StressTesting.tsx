import { useState, useMemo } from 'react';
import { scenarioData } from '../../data/mockChartData';

function fmt(n: number) { return '$' + n.toLocaleString(); }

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function interpolateScenarios(unemployment: number, carIndex: number, rates: number) {
  const base = scenarioData.base;
  const mod = scenarioData.moderate;
  const sev = scenarioData.severe;
  const uFactor = (unemployment - 4.2) / (8.5 - 4.2);
  const cFactor = (100 - carIndex) / (100 - 72);
  const rFactor = (rates - 5.5) / (9.0 - 5.5);
  const t = Math.max(0, Math.min(1, (uFactor + cFactor + rFactor) / 3));

  if (t <= 0.5) {
    const tt = t / 0.5;
    return {
      defaultRate: lerp(base.defaultRate, mod.defaultRate, tt),
      avgRecovery: lerp(base.avgRecovery, mod.avgRecovery, tt),
      enpv: Math.round(lerp(base.enpv, mod.enpv, tt)),
      recommendedBid: Math.round(lerp(base.recommendedBid, mod.recommendedBid, tt)),
      projectedIrr: lerp(base.projectedIrr, mod.projectedIrr, tt),
    };
  } else {
    const tt = (t - 0.5) / 0.5;
    return {
      defaultRate: lerp(mod.defaultRate, sev.defaultRate, tt),
      avgRecovery: lerp(mod.avgRecovery, sev.avgRecovery, tt),
      enpv: Math.round(lerp(mod.enpv, sev.enpv, tt)),
      recommendedBid: Math.round(lerp(mod.recommendedBid, sev.recommendedBid, tt)),
      projectedIrr: lerp(mod.projectedIrr, sev.projectedIrr, tt),
    };
  }
}

export default function StressTesting() {
  const [unemployment, setUnemployment] = useState(4.2);
  const [carIndex, setCarIndex] = useState(100);
  const [interestRate, setInterestRate] = useState(5.5);
  const live = useMemo(() => interpolateScenarios(unemployment, carIndex, interestRate), [unemployment, carIndex, interestRate]);

  const scenarios = [
    { label: 'Base Case', data: scenarioData.base, color: 'text-emerald-400' },
    { label: 'Moderate Stress', data: scenarioData.moderate, color: 'text-amber-400' },
    { label: 'Severe Stress', data: scenarioData.severe, color: 'text-rose-400' },
  ];

  const weightedENPV = Math.round(0.6 * scenarioData.base.enpv + 0.3 * scenarioData.moderate.enpv + 0.1 * scenarioData.severe.enpv);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Scenario Comparison Table */}
      <div className="glass-card rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-medium text-text-secondary uppercase">Metric</th>
              {scenarios.map((s) => (
                <th key={s.label} className={`text-right px-5 py-3 text-xs font-medium uppercase ${s.color}`}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Default Rate', key: 'defaultRate' as const, fmt: (v: number) => `${v}%` },
              { label: 'Avg Recovery', key: 'avgRecovery' as const, fmt: (v: number) => `${v}%` },
              { label: 'ENPV', key: 'enpv' as const, fmt },
              { label: 'Recommended Bid', key: 'recommendedBid' as const, fmt },
              { label: 'Projected IRR', key: 'projectedIrr' as const, fmt: (v: number) => `${v}%` },
            ].map((row) => (
              <tr key={row.label} className="border-b border-border/50">
                <td className="px-5 py-3 text-text-secondary">{row.label}</td>
                {scenarios.map((s) => (
                  <td key={s.label} className="px-5 py-3 text-right font-mono text-text-primary">{row.fmt(s.data[row.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weighted ENPV */}
      <div className="glass-card rounded-lg p-5">
        <h4 className="text-xs text-text-secondary uppercase tracking-wider mb-2">Scenario-Weighted ENPV</h4>
        <div className="text-xs text-text-secondary font-mono mb-2">
          60% x Base + 30% x Moderate + 10% x Severe
        </div>
        <div className="font-mono text-2xl font-bold text-accent">{fmt(weightedENPV)}</div>
      </div>

      {/* Interactive Sliders */}
      <div className="glass-card rounded-lg p-5">
        <h4 className="text-sm font-display font-semibold text-text-primary mb-1">Scenario Explorer</h4>
        <p className="text-xs text-text-secondary mb-5">Adjust macroeconomic assumptions and watch the ENPV recalculate in real time</p>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-xs text-text-secondary block mb-2">Unemployment Rate: <span className="font-mono text-text-primary">{unemployment.toFixed(1)}%</span></label>
            <input type="range" min="4.2" max="8.5" step="0.1" value={unemployment} onChange={(e) => setUnemployment(+e.target.value)} className="w-full accent-accent" />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1"><span>4.2%</span><span>8.5%</span></div>
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-2">Used Car Price Index: <span className="font-mono text-text-primary">{carIndex.toFixed(0)}</span></label>
            <input type="range" min="72" max="100" step="1" value={carIndex} onChange={(e) => setCarIndex(+e.target.value)} className="w-full accent-accent" />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1"><span>72</span><span>100</span></div>
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-2">Interest Rate: <span className="font-mono text-text-primary">{interestRate.toFixed(1)}%</span></label>
            <input type="range" min="5.5" max="9.0" step="0.1" value={interestRate} onChange={(e) => setInterestRate(+e.target.value)} className="w-full accent-accent" />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1"><span>5.5%</span><span>9.0%</span></div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 pt-4 border-t border-border">
          {[
            { label: 'Default Rate', value: `${live.defaultRate.toFixed(1)}%`, color: live.defaultRate > 40 ? 'text-rose-400' : live.defaultRate > 35 ? 'text-amber-400' : 'text-emerald-400' },
            { label: 'Avg Recovery', value: `${live.avgRecovery.toFixed(1)}%`, color: live.avgRecovery < 25 ? 'text-rose-400' : live.avgRecovery < 30 ? 'text-amber-400' : 'text-emerald-400' },
            { label: 'ENPV', value: fmt(live.enpv), color: 'text-accent' },
            { label: 'Recommended Bid', value: fmt(live.recommendedBid), color: 'text-text-primary' },
            { label: 'Projected IRR', value: `${live.projectedIrr.toFixed(1)}%`, color: live.projectedIrr < 10 ? 'text-rose-400' : live.projectedIrr < 18 ? 'text-amber-400' : 'text-emerald-400' },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">{m.label}</div>
              <div className={`font-mono text-lg font-bold transition-colors ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
