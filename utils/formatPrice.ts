export function formatAEDPrice(value: string | number): string {
  const raw = typeof value === 'string' ? Number(value) : value;
  if (isNaN(raw) || value === "" || value == null) {
    return "Price upon request";
  }
  if (raw >= 1_000_000) {
    return `AED ${(raw / 1_000_000).toFixed(1)}M`;
  }
  return `AED ${raw.toLocaleString()}`;
}