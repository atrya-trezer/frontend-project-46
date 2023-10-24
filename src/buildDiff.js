import _ from 'lodash';

const buildDiff = (obj1, obj2, previousKeys) => {
  const dataKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const diff = dataKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, diff: 'deleted', previousKeys };
    } if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        diff: buildDiff(obj1[key], obj2[key], _.concat(previousKeys, key)),
        previousKeys,
      };
    } if (!_.has(obj1, key)) {
      return { key, diff: 'added', previousKeys };
    } if (obj1[key] !== obj2[key]) {
      return { key, diff: 'updated', previousKeys };
    }
    return { key, diff: 'unchanged', previousKeys };
  });

  return diff;
};

export default buildDiff;
