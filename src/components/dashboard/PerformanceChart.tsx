import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { performanceData } from '../../data/mockChartData';

export default function PerformanceChart() {
  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-sm font-display font-semibold text-text-primary mb-4">Model Performance — Predicted vs Actual Returns</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="quarter" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} domain={[60, 80]} unit="%" />
          <Tooltip
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#F8FAFC' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: '#94A3B8' }} />
          <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} name="Predicted" />
          <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} name="Actual" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
