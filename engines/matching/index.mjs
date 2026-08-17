export function classifyMatch(left, right) {
  if (left.id && left.id === right.id) return 'EXACT_MATCH';
  if (left.amount !== undefined && right.amount !== undefined && Number(left.amount) === Number(right.amount) && left.date === right.date) return 'PROBABLE_MATCH';
  if (left.amount === undefined || right.amount === undefined) return 'UNIDENTIFIED';
  return 'EXCEPTION';
}
