export const performanceData = [
  { quarter: 'Q1 24', predicted: 68.2, actual: 66.8 },
  { quarter: 'Q2 24', predicted: 71.4, actual: 70.1 },
  { quarter: 'Q3 24', predicted: 69.8, actual: 71.2 },
  { quarter: 'Q4 24', predicted: 73.1, actual: 72.4 },
  { quarter: 'Q1 25', predicted: 72.6, actual: 73.8 },
  { quarter: 'Q2 25', predicted: 74.8, actual: 73.2 },
  { quarter: 'Q3 25', predicted: 73.9, actual: 74.6 },
  { quarter: 'Q4 25', predicted: 75.2, actual: 74.8 },
];

export const waterfallData = [
  { name: 'Gross A/R', value: 1892400, total: 1892400, type: 'total' as const },
  { name: 'Expected Payments', value: 1482100, total: 1482100, type: 'positive' as const },
  { name: 'Expected Recoveries', value: 187300, total: 1669400, type: 'positive' as const },
  { name: 'Prepayment Proceeds', value: 43200, total: 1712600, type: 'positive' as const },
  { name: 'Servicing Costs', value: -168400, total: 1544200, type: 'negative' as const },
  { name: 'Time Value Discount', value: -296900, total: 1247300, type: 'negative' as const },
  { name: 'ENPV', value: 1247300, total: 1247300, type: 'result' as const },
];

export const survivalCurveData = Array.from({ length: 48 }, (_, i) => {
  const month = i + 1;
  const base = 100 * Math.exp(-0.018 * month);
  const jitter = (Math.sin(month * 0.7) * 1.5);
  return { month, survival: Math.max(0, Math.round((base + jitter) * 10) / 10) };
});

export const paymentStateData = [
  { state: 'Good Payer', count: 77, pct: 54, color: '#10B981' },
  { state: 'Stressed', count: 31, pct: 22, color: '#F59E0B' },
  { state: 'Sporadic', count: 23, pct: 16, color: '#F97316' },
  { state: 'Pre-Default', count: 11, pct: 8, color: '#EF4444' },
];

export const vehicleTypeData = [
  { type: 'Sedan', count: 54, pct: 38, color: '#3B82F6' },
  { type: 'Truck', count: 40, pct: 28, color: '#10B981' },
  { type: 'SUV', count: 34, pct: 24, color: '#F59E0B' },
  { type: 'Other', count: 14, pct: 10, color: '#94A3B8' },
];

export const termBucketData = [
  { bucket: '0-12mo', count: 28 },
  { bucket: '13-24mo', count: 52 },
  { bucket: '25-36mo', count: 41 },
  { bucket: '37-48mo', count: 21 },
];

export const creditScoreData = [
  { range: '480-499', count: 8 },
  { range: '500-519', count: 14 },
  { range: '520-539', count: 18 },
  { range: '540-559', count: 24 },
  { range: '560-579', count: 28 },
  { range: '580-599', count: 22 },
  { range: '600-619', count: 16 },
  { range: '620-640', count: 12 },
];

export const geographyData = [
  { state: 'Georgia', pct: 42 },
  { state: 'Alabama', pct: 18 },
  { state: 'South Carolina', pct: 15 },
  { state: 'Florida', pct: 12 },
  { state: 'Other', pct: 13 },
];

export const recoveryDistribution = [
  { range: '0-10%', count: 4 },
  { range: '10-20%', count: 8 },
  { range: '20-30%', count: 14 },
  { range: '30-40%', count: 18 },
  { range: '40-50%', count: 12 },
  { range: '50-60%', count: 6 },
  { range: '60%+', count: 3 },
];

export const prepaymentCurveData = Array.from({ length: 36 }, (_, i) => {
  const month = i + 1;
  const cumulative = 4.8 * (1 - Math.exp(-0.08 * month));
  return { month, cumulative: Math.round(cumulative * 100) / 100 };
});

export const servicingCostData = Array.from({ length: 36 }, (_, i) => {
  const month = i + 1;
  const base = 3200 + month * 180 + (month > 12 ? month * 120 : 0);
  const jitter = Math.sin(month * 0.5) * 400;
  return { month, cost: Math.round(base + jitter) };
});

export const depreciationCurves = [
  { name: '2019 F-150', data: Array.from({ length: 48 }, (_, i) => ({ month: i + 1, value: Math.round(18500 * Math.exp(-0.025 * (i + 1))) })) },
  { name: '2018 Altima', data: Array.from({ length: 48 }, (_, i) => ({ month: i + 1, value: Math.round(9200 * Math.exp(-0.035 * (i + 1))) })) },
  { name: '2020 Equinox', data: Array.from({ length: 48 }, (_, i) => ({ month: i + 1, value: Math.round(16400 * Math.exp(-0.028 * (i + 1))) })) },
];

export const scenarioData = {
  base: { defaultRate: 31.2, avgRecovery: 34.2, enpv: 1247300, recommendedBid: 1059800, projectedIrr: 22.4 },
  moderate: { defaultRate: 38.7, avgRecovery: 28.6, enpv: 1024600, recommendedBid: 870900, projectedIrr: 15.1 },
  severe: { defaultRate: 52.1, avgRecovery: 19.4, enpv: 743200, recommendedBid: 631700, projectedIrr: 4.8 },
};

export const sparklineData = {
  pipeline: [1.8, 2.1, 1.9, 2.3, 2.0, 2.2, 2.4],
  enpv: [68.4, 70.1, 71.8, 69.5, 72.3, 73.1, 74.2],
  acquisitions: [5.2, 5.8, 6.4, 6.9, 7.3, 8.0, 8.7],
  accuracy: [91.2, 91.8, 92.4, 92.9, 93.4, 93.8, 94.3],
};
