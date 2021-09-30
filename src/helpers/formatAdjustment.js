import formatMoney from './formatMoney';

export default function formatAdjustment({
  modifier,
  value,
}) {
  const sign = value < 0 ? '-' : '+';
  if (modifier === '%') {
    return `${sign} ${Math.abs(value)}%`;
  } else if (modifier === '+') {
    return `${sign} ${formatMoney(Math.abs(value))}`;
  }

  throw new Error(`Unlnown adjustment modifier ${modifier}`);
}
