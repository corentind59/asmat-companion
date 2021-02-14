export function numberOrBlank(n: number | null): number | '' {
  return n === 0 ? 0 : (n || '');
}
