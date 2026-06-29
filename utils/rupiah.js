export function onlyNumber(value) {
  return String(value ?? '').replace(/[^\d]/g, '');
}

export function toNumber(value) {
  return Number(onlyNumber(value)) || 0;
}

export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

export function inputRupiah(value) {
  const number = onlyNumber(value);
  return number ? formatRupiah(number).replace('Rp', 'Rp') : '';
}
