import _ from 'lodash';
// так как у нас 3 объекта из которых мы рекурсивно собираем 1 stringify использовать не получится
const enrich = (diff, obj1, obj2) => {
  const enrichedDiff = diff.map((element) => {
    const { key } = element;
    const value = element.diff;
    if (_.isObject(value)) {
      return { [key]: enrich(value, obj1[key], obj2[key]) };
    }
    if (value === 'added') {
      return { added: { [key]: obj2[key] } };
    }
    if (value === 'updated') {
      return { updated: { [key]: { was: obj1[key], replacedBy: obj2[key] } } };
    }
    if (value === 'deleted') {
      return { removed: { [key]: obj1[key] } };
    }
    // unchanged
    return { [key]: obj1[key] };
  });

  return enrichedDiff;
};

const jsonDiffFormat = (diff, obj1, obj2) => {
  const enrichedDiff = enrich(diff, obj1, obj2);
  return JSON.stringify(enrichedDiff, null, '  ');
};

export default jsonDiffFormat;
