import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const data = [
  { name: 'Gross A/R', value: 1892400, fill: '#3B82F6', bottom: 0 },
  { name: 'Payments', value: 1482100, fill: '#10B981', bottom: 0 },
  { name: 'Recoveries', value: 187300, fill: '#10B981', bottom: 1482100 },
  { name: 'Prepayment', value: 43200, fill: '#10B981', bottom: 1669400 },
  { name: 'Servicing', value: 168400, fill: '#EF4444', bottom: 1544200 },
  { name: 'Discount', value: 296900, fill: '#EF4444', bottom: 1247300 },
  { name: 'ENPV', value: 1247300, fill: '#3B82F6', bottom: 0 },
];

const fmtK = (v: number) => `$${(v / 1000).toFixed(0)}K`;

export default function WaterfallChart() {
  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-sm font-display font-semibold text-text-primary mb-1">ENPV Waterfall</h3>
      <p className="text-xs text-text-secondary mb-4">How the five component models build up the portfolio ENPV</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={{ stroke: '#334155' }} tickFormatter={fmtK} />
          <Tooltip
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
            formatter={(value) => ['$' + Number(value).toLocaleString(), 'Amount']}
          />
          <ReferenceLine y={0} stroke="#334155" />
          {/* Invisible spacer bar */}
          <Bar dataKey="bottom" stackId="a" fill="transparent" />
          {/* Visible value bar */}
          <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary line */}
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-border">
        <div className="flex items-center gap-6 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Inflows</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Costs / Discounts</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-accent" /> Totals</span>
        </div>
        <div className="font-mono text-lg font-bold text-accent">ENPV: $1,247,300</div>
      </div>
    </div>
  );
}
