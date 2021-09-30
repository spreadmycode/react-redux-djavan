import numeral from 'numeral';

export default function formatMoney(n) {
  const formatted = numeral(Math.abs(n)).format('0,0.00');
  return n < 0 ? `-$${formatted}` : `$${formatted}`;
}
