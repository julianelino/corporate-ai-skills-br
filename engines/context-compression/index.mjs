export function retainMaterialContext(items) {
  const seen = new Set();
  return items.filter((item) => item && item.material !== false && !seen.has(item.id) && seen.add(item.id));
}
