export function formatCurrency(value: string = '', currency: string = '$'): string {
  let splitted = value?.split('.');
  let endPart = '';

  if (splitted?.[1]) {
    endPart = `.${splitted[1]}`;
    splitted.splice(1, 1);
  }
  splitted = splitted[0].split('');
  const result: string[] = [];

  let length = splitted.length;
  const partsCount = Math.floor(length / 3);

  for (let i = 0; i < partsCount; i++) {
    const part = splitted.splice(length - 3, length);
    result.unshift(part.join(''));
    length = splitted.length;
  }
  if (!splitted.length) {
    return '';
  }
  result.unshift(splitted.join(''));
  return `${currency}${result.join(',')}${endPart}`;
}
