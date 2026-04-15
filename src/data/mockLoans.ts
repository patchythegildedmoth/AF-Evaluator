export interface Loan {
  id: number;
  borrower: string;
  vehicle: string;
  vehicleYear: number;
  vehicleType: 'Sedan' | 'Truck' | 'SUV' | 'Other';
  balance: number;
  rate: number;
  originalTerm: number;
  seasoning: number;
  dpd: number;
  enpv: number;
  enpvPercent: number;
  riskTier: 'Low' | 'Medium' | 'High';
  confidence: 'High' | 'Medium' | 'Low';
  creditScore: number;
  downPayment: number;
  state: string;
  ltv: number;
  paymentStatus: 'Good Payer' | 'Stressed' | 'Sporadic' | 'Pre-Default';
  riskFactors: string[];
  survivalData: number[];
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function generateSurvival(riskTier: string, seed: number): number[] {
  const rand = seededRandom(seed);
  const base = riskTier === 'Low' ? 0.985 : riskTier === 'Medium' ? 0.965 : 0.94;
  let pct = 100;
  return Array.from({ length: 48 }, () => {
    pct *= base + (rand() * 0.01 - 0.005);
    return Math.max(0, Math.round(pct * 10) / 10);
  });
}

export const mockLoans: Loan[] = [
  { id: 1, borrower: 'J. Williams', vehicle: '2019 Ford F-150', vehicleYear: 2019, vehicleType: 'Truck', balance: 14200, rate: 23.99, originalTerm: 48, seasoning: 14, dpd: 0, enpv: 11340, enpvPercent: 79.9, riskTier: 'Low', confidence: 'High', creditScore: 612, downPayment: 2000, state: 'GA', ltv: 108, paymentStatus: 'Good Payer', riskFactors: ['Moderate LTV'], survivalData: generateSurvival('Low', 1000) },
  { id: 2, borrower: 'M. Rodriguez', vehicle: '2018 Nissan Altima', vehicleYear: 2018, vehicleType: 'Sedan', balance: 8900, rate: 24.99, originalTerm: 42, seasoning: 18, dpd: 0, enpv: 7120, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 598, downPayment: 1500, state: 'GA', ltv: 112, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 1100) },
  { id: 3, borrower: 'T. Johnson', vehicle: '2020 Chevy Equinox', vehicleYear: 2020, vehicleType: 'SUV', balance: 16800, rate: 21.99, originalTerm: 48, seasoning: 8, dpd: 15, enpv: 11760, enpvPercent: 70.0, riskTier: 'Medium', confidence: 'Medium', creditScore: 542, downPayment: 2500, state: 'AL', ltv: 126, paymentStatus: 'Stressed', riskFactors: ['Low seasoning (8 months)', 'DPD trending upward'], survivalData: generateSurvival('Medium', 1200) },
  { id: 4, borrower: 'R. Davis', vehicle: '2017 Toyota Camry', vehicleYear: 2017, vehicleType: 'Sedan', balance: 6200, rate: 25.99, originalTerm: 36, seasoning: 24, dpd: 0, enpv: 5580, enpvPercent: 90.0, riskTier: 'Low', confidence: 'High', creditScore: 634, downPayment: 1000, state: 'GA', ltv: 92, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 1300) },
  { id: 5, borrower: 'S. Martinez', vehicle: '2019 Chevy Malibu', vehicleYear: 2019, vehicleType: 'Sedan', balance: 11400, rate: 22.99, originalTerm: 48, seasoning: 12, dpd: 0, enpv: 8550, enpvPercent: 75.0, riskTier: 'Low', confidence: 'High', creditScore: 587, downPayment: 1800, state: 'SC', ltv: 118, paymentStatus: 'Good Payer', riskFactors: ['Moderate LTV'], survivalData: generateSurvival('Low', 1400) },
  { id: 6, borrower: 'D. Brown', vehicle: '2018 Ford Explorer', vehicleYear: 2018, vehicleType: 'SUV', balance: 18200, rate: 23.99, originalTerm: 54, seasoning: 6, dpd: 30, enpv: 10920, enpvPercent: 60.0, riskTier: 'High', confidence: 'Medium', creditScore: 508, downPayment: 3000, state: 'GA', ltv: 142, paymentStatus: 'Sporadic', riskFactors: ['High LTV (142%)', 'Low seasoning (6 months)', 'DPD at 30'], survivalData: generateSurvival('High', 1500) },
  { id: 7, borrower: 'K. Wilson', vehicle: '2020 Nissan Altima', vehicleYear: 2020, vehicleType: 'Sedan', balance: 13600, rate: 21.99, originalTerm: 48, seasoning: 10, dpd: 0, enpv: 10880, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 604, downPayment: 2200, state: 'FL', ltv: 105, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 1600) },
  { id: 8, borrower: 'A. Garcia', vehicle: '2016 Chevy Malibu', vehicleYear: 2016, vehicleType: 'Sedan', balance: 5800, rate: 27.99, originalTerm: 36, seasoning: 28, dpd: 0, enpv: 5220, enpvPercent: 90.0, riskTier: 'Low', confidence: 'High', creditScore: 622, downPayment: 800, state: 'AL', ltv: 88, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 1700) },
  { id: 9, borrower: 'L. Thomas', vehicle: '2019 Ford F-150', vehicleYear: 2019, vehicleType: 'Truck', balance: 21400, rate: 22.99, originalTerm: 60, seasoning: 4, dpd: 45, enpv: 10700, enpvPercent: 50.0, riskTier: 'High', confidence: 'Low', creditScore: 492, downPayment: 2500, state: 'GA', ltv: 148, paymentStatus: 'Pre-Default', riskFactors: ['Very high LTV (148%)', 'Low seasoning (4 months)', 'DPD at 45', 'Credit score < 500'], survivalData: generateSurvival('High', 1800) },
  { id: 10, borrower: 'C. Anderson', vehicle: '2018 Toyota Tacoma', vehicleYear: 2018, vehicleType: 'Truck', balance: 15600, rate: 23.99, originalTerm: 48, seasoning: 16, dpd: 0, enpv: 12480, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 618, downPayment: 2000, state: 'SC', ltv: 98, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 1900) },
  { id: 11, borrower: 'P. Jackson', vehicle: '2017 Nissan Rogue', vehicleYear: 2017, vehicleType: 'SUV', balance: 9800, rate: 25.99, originalTerm: 42, seasoning: 22, dpd: 15, enpv: 6860, enpvPercent: 70.0, riskTier: 'Medium', confidence: 'Medium', creditScore: 558, downPayment: 1200, state: 'FL', ltv: 115, paymentStatus: 'Stressed', riskFactors: ['Intermittent DPD history'], survivalData: generateSurvival('Medium', 2000) },
  { id: 12, borrower: 'N. Harris', vehicle: '2020 Ford F-150', vehicleYear: 2020, vehicleType: 'Truck', balance: 24800, rate: 21.99, originalTerm: 60, seasoning: 5, dpd: 0, enpv: 18600, enpvPercent: 75.0, riskTier: 'Medium', confidence: 'Medium', creditScore: 572, downPayment: 3000, state: 'GA', ltv: 132, paymentStatus: 'Good Payer', riskFactors: ['High LTV (132%)', 'Low seasoning (5 months)'], survivalData: generateSurvival('Medium', 2100) },
  { id: 13, borrower: 'E. Clark', vehicle: '2019 Chevy Equinox', vehicleYear: 2019, vehicleType: 'SUV', balance: 12200, rate: 24.99, originalTerm: 48, seasoning: 11, dpd: 0, enpv: 9760, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 596, downPayment: 1800, state: 'AL', ltv: 110, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 2200) },
  { id: 14, borrower: 'W. Lewis', vehicle: '2016 Ford Escape', vehicleYear: 2016, vehicleType: 'SUV', balance: 7400, rate: 26.99, originalTerm: 36, seasoning: 26, dpd: 30, enpv: 4440, enpvPercent: 60.0, riskTier: 'High', confidence: 'Medium', creditScore: 514, downPayment: 900, state: 'GA', ltv: 135, paymentStatus: 'Sporadic', riskFactors: ['High LTV (135%)', 'Chronic DPD pattern'], survivalData: generateSurvival('High', 2300) },
  { id: 15, borrower: 'B. Robinson', vehicle: '2018 Chevy Silverado', vehicleYear: 2018, vehicleType: 'Truck', balance: 19200, rate: 22.99, originalTerm: 54, seasoning: 15, dpd: 0, enpv: 15360, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 608, downPayment: 2500, state: 'SC', ltv: 102, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 2400) },
  { id: 16, borrower: 'G. Walker', vehicle: '2017 Nissan Altima', vehicleYear: 2017, vehicleType: 'Sedan', balance: 6800, rate: 28.99, originalTerm: 36, seasoning: 30, dpd: 60, enpv: 2720, enpvPercent: 40.0, riskTier: 'High', confidence: 'Low', creditScore: 488, downPayment: 500, state: 'FL', ltv: 155, paymentStatus: 'Pre-Default', riskFactors: ['Very high LTV (155%)', 'DPD at 60', 'Credit score < 500', 'Near end of term'], survivalData: generateSurvival('High', 2500) },
  { id: 17, borrower: 'H. Young', vehicle: '2020 Toyota Corolla', vehicleYear: 2020, vehicleType: 'Sedan', balance: 10800, rate: 21.99, originalTerm: 42, seasoning: 9, dpd: 0, enpv: 8640, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 625, downPayment: 2000, state: 'GA', ltv: 96, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 2600) },
  { id: 18, borrower: 'F. King', vehicle: '2019 Ford Explorer', vehicleYear: 2019, vehicleType: 'SUV', balance: 17600, rate: 23.99, originalTerm: 54, seasoning: 13, dpd: 15, enpv: 12320, enpvPercent: 70.0, riskTier: 'Medium', confidence: 'Medium', creditScore: 548, downPayment: 2200, state: 'AL', ltv: 122, paymentStatus: 'Stressed', riskFactors: ['Moderate LTV (122%)', 'Recent late payment'], survivalData: generateSurvival('Medium', 2700) },
  { id: 19, borrower: 'V. Wright', vehicle: '2018 Chevy Malibu', vehicleYear: 2018, vehicleType: 'Sedan', balance: 8400, rate: 25.99, originalTerm: 42, seasoning: 20, dpd: 0, enpv: 6720, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 594, downPayment: 1400, state: 'GA', ltv: 104, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 2800) },
  { id: 20, borrower: 'I. Scott', vehicle: '2021 Nissan Frontier', vehicleYear: 2021, vehicleType: 'Truck', balance: 22600, rate: 20.99, originalTerm: 60, seasoning: 3, dpd: 0, enpv: 15820, enpvPercent: 70.0, riskTier: 'Medium', confidence: 'Medium', creditScore: 564, downPayment: 2800, state: 'SC', ltv: 128, paymentStatus: 'Good Payer', riskFactors: ['High LTV (128%)', 'Very low seasoning (3 months)'], survivalData: generateSurvival('Medium', 2900) },
  { id: 21, borrower: 'O. Green', vehicle: '2017 Ford F-150', vehicleYear: 2017, vehicleType: 'Truck', balance: 13200, rate: 24.99, originalTerm: 48, seasoning: 19, dpd: 0, enpv: 10560, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 610, downPayment: 1800, state: 'GA', ltv: 95, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 3000) },
  { id: 22, borrower: 'U. Adams', vehicle: '2019 Toyota Camry', vehicleYear: 2019, vehicleType: 'Sedan', balance: 9600, rate: 22.99, originalTerm: 42, seasoning: 17, dpd: 0, enpv: 7680, enpvPercent: 80.0, riskTier: 'Low', confidence: 'High', creditScore: 602, downPayment: 1600, state: 'FL', ltv: 100, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 3100) },
  { id: 23, borrower: 'Y. Nelson', vehicle: '2018 Chevy Equinox', vehicleYear: 2018, vehicleType: 'SUV', balance: 11000, rate: 25.99, originalTerm: 48, seasoning: 21, dpd: 30, enpv: 6600, enpvPercent: 60.0, riskTier: 'High', confidence: 'Medium', creditScore: 522, downPayment: 1200, state: 'AL', ltv: 130, paymentStatus: 'Sporadic', riskFactors: ['High LTV (130%)', 'DPD at 30', 'Inconsistent payment history'], survivalData: generateSurvival('High', 3200) },
  { id: 24, borrower: 'Q. Carter', vehicle: '2020 Ford Ranger', vehicleYear: 2020, vehicleType: 'Truck', balance: 20200, rate: 21.99, originalTerm: 54, seasoning: 7, dpd: 0, enpv: 15150, enpvPercent: 75.0, riskTier: 'Medium', confidence: 'Medium', creditScore: 576, downPayment: 2600, state: 'GA', ltv: 118, paymentStatus: 'Good Payer', riskFactors: ['Low seasoning (7 months)'], survivalData: generateSurvival('Medium', 3300) },
  { id: 25, borrower: 'Z. Mitchell', vehicle: '2016 Nissan Altima', vehicleYear: 2016, vehicleType: 'Sedan', balance: 5200, rate: 29.99, originalTerm: 36, seasoning: 29, dpd: 0, enpv: 4680, enpvPercent: 90.0, riskTier: 'Low', confidence: 'High', creditScore: 638, downPayment: 700, state: 'SC', ltv: 82, paymentStatus: 'Good Payer', riskFactors: [], survivalData: generateSurvival('Low', 3400) },
];
