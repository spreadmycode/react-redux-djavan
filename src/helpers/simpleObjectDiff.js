import shallowEqual from 'shallowequal';

export default function simpleObjectDiff(source, target) {
  const result = {};

  for (const [key, value] of Object.entries(source)) {
    if (!shallowEqual(value, target[key])) {
      result[key] = target[key];
    }
  }

  return result;
}
