export interface Deal {
  id: string;
  dealer: string;
  loans: number;
  grossBalance: number;
  enpv: number | null;
  enpvPercent: number | null;
  confidence: 'High' | 'Medium' | 'Low' | null;
  stage: string;
  updated: string;
  assignedTo: string;
  submitted: string;
}

export const mockDeals: Deal[] = [
  {
    id: 'wise-auto',
    dealer: 'Wise Auto Brokers',
    loans: 142,
    grossBalance: 1892400,
    enpv: 1247300,
    enpvPercent: 65.9,
    confidence: 'High',
    stage: 'Scoring',
    updated: 'Today',
    assignedTo: 'Jon Hart',
    submitted: 'Apr 12, 2026',
  },
  {
    id: 'quality-motors',
    dealer: 'Quality Motors',
    loans: 89,
    grossBalance: 634100,
    enpv: 438200,
    enpvPercent: 69.1,
    confidence: 'Medium',
    stage: 'Review',
    updated: 'Today',
    assignedTo: 'Sarah Chen',
    submitted: 'Apr 11, 2026',
  },
  {
    id: 'southeast-auto',
    dealer: 'Southeast Auto Group',
    loans: 214,
    grossBalance: 2156800,
    enpv: 1641700,
    enpvPercent: 76.1,
    confidence: 'High',
    stage: 'Bid Submitted',
    updated: 'Yesterday',
    assignedTo: 'Jon Hart',
    submitted: 'Apr 8, 2026',
  },
  {
    id: 'premier-auto',
    dealer: 'Premier Auto Sales',
    loans: 67,
    grossBalance: 445200,
    enpv: null,
    enpvPercent: null,
    confidence: null,
    stage: 'Intake',
    updated: 'Today',
    assignedTo: 'Unassigned',
    submitted: 'Apr 13, 2026',
  },
  {
    id: 'jr-auto',
    dealer: 'J&R Auto Sales',
    loans: 38,
    grossBalance: 287600,
    enpv: 142300,
    enpvPercent: 49.5,
    confidence: 'Low',
    stage: 'Declined',
    updated: 'Apr 10',
    assignedTo: 'Sarah Chen',
    submitted: 'Apr 3, 2026',
  },
  {
    id: 'tri-county',
    dealer: 'Tri-County Motors',
    loans: 156,
    grossBalance: 1123400,
    enpv: 847900,
    enpvPercent: 75.5,
    confidence: 'High',
    stage: 'Closed/Won',
    updated: 'Apr 5',
    assignedTo: 'Jon Hart',
    submitted: 'Mar 20, 2026',
  },
  {
    id: 'valley-auto',
    dealer: 'Valley Auto Center',
    loans: 103,
    grossBalance: 789600,
    enpv: 584200,
    enpvPercent: 74.0,
    confidence: 'Medium',
    stage: 'Closed/Won',
    updated: 'Mar 28',
    assignedTo: 'Sarah Chen',
    submitted: 'Mar 12, 2026',
  },
];

export const dashboardMetrics = [
  { label: 'Active Pipeline', value: '$2.4M', subtitle: '7 deals in evaluation', trend: 12.4 },
  { label: 'Avg Portfolio ENPV', value: '74.2%', subtitle: 'of balance', trend: 3.1 },
  { label: 'YTD Acquisitions', value: '$8.7M', subtitle: '12 portfolios, 847 loans', trend: 8.2 },
  { label: 'Model Accuracy', value: '94.3%', subtitle: 'Predicted vs actual (12mo)', trend: 1.8 },
];

export const pipelineStages = [
  { stage: 'Intake', count: 2, color: '#94A3B8' },
  { stage: 'Scoring', count: 1, color: '#3B82F6' },
  { stage: 'Pricing', count: 2, color: '#8B5CF6' },
  { stage: 'Review', count: 1, color: '#F59E0B' },
  { stage: 'Bid Submitted', count: 1, color: '#10B981' },
];

export const activityFeed = [
  { time: 'Today 2:14 PM', text: 'Wise Auto Brokers portfolio scored — 142 loans, ENPV: $1,247,300', type: 'success' as const },
  { time: 'Today 11:30 AM', text: 'Quality Motors deal moved to Review — bid recommendation: $438,200', type: 'info' as const },
  { time: 'Yesterday', text: 'Southeast Auto Group — bid submitted at $892,000 (78.4% of balance)', type: 'success' as const },
  { time: 'Apr 10', text: 'J&R Auto Sales portfolio declined — confidence too low (wide CI)', type: 'warning' as const },
  { time: 'Apr 8', text: 'Model retrained on Q1 2026 performance data — AUC improved to 0.847', type: 'info' as const },
];
