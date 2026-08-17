const round = (value) => {
  const rounded = Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  return Object.is(rounded, -0) ? 0 : rounded;
};

export function hhmmToDecimal(value) {
  const match = /^(\d+):(\d{2})$/.exec(value);
  if (!match || Number(match[2]) > 59) throw new Error('duration must use valid HH:MM');
  return round(Number(match[1]) + Number(match[2]) / 60);
}

export function decimalToHhmm(value) {
  const minutes = Math.round(Number(value) * 60);
  if (!Number.isFinite(minutes) || minutes < 0) throw new Error('duration cannot be negative');
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

export function percentage(part, whole) {
  if (Number(whole) === 0) throw new Error('whole cannot be zero');
  return round((Number(part) / Number(whole)) * 100);
}

export const grossMargin = (revenue, cost) => percentage(Number(revenue) - Number(cost), revenue);
export const interest = (principal, rate, periods) => {
  if (!Number.isInteger(periods) || periods < 0) throw new Error('periods must be a non-negative integer');
  return round(Number(principal) * ((1 + Number(rate)) ** periods - 1));
};
export const turnoverRate = (terminations, averageHeadcount) => percentage(terminations, averageHeadcount);
export const allocation = (total, weights) => {
  const sum = Object.values(weights).reduce((acc, weight) => acc + Number(weight), 0);
  if (sum <= 0) throw new Error('weights must have a positive total');
  return Object.fromEntries(Object.entries(weights).map(([key, weight]) => [key, round(Number(total) * Number(weight) / sum)]));
};
export const agingBucket = (daysPastDue) => daysPastDue <= 0 ? 'CURRENT' : daysPastDue <= 30 ? 'D1_30' : daysPastDue <= 60 ? 'D31_60' : daysPastDue <= 90 ? 'D61_90' : 'D91_PLUS';
export const straightLineDepreciation = (cost, residual, usefulLifeMonths) => {
  if (!Number.isInteger(usefulLifeMonths) || usefulLifeMonths <= 0 || Number(residual) > Number(cost)) throw new Error('invalid depreciation inputs');
  return round((Number(cost) - Number(residual)) / usefulLifeMonths);
};
export const npv = (rate, cashflows) => round(cashflows.reduce((total, flow, period) => total + Number(flow) / ((1 + Number(rate)) ** period), 0));
export function irr(cashflows, tolerance = 0.000001) {
  if (!cashflows.some((item) => item < 0) || !cashflows.some((item) => item > 0)) throw new Error('cashflows need positive and negative values');
  let low = -0.9999; let high = 10;
  for (let index = 0; index < 200; index += 1) {
    const midpoint = (low + high) / 2; const value = npv(midpoint, cashflows);
    if (Math.abs(value) < tolerance) return midpoint;
    if (value > 0) low = midpoint; else high = midpoint;
  }
  return (low + high) / 2;
}
