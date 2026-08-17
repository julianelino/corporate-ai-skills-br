export const classifyAging = (daysPastDue) => daysPastDue <= 0 ? 'CURRENT' : daysPastDue <= 30 ? 'D1_30' : daysPastDue <= 60 ? 'D31_60' : daysPastDue <= 90 ? 'D61_90' : 'D91_PLUS';
