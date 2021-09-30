export default function objectToOptions(object) {
  return Object.entries(object).map(([value, label]) => ({
    value,
    label,
  }));
}
