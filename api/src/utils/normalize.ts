export function normalizeSearchField(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['-]/g, ' ')
    .toLowerCase();
}
