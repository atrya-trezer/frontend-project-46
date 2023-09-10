import _ from 'lodash';

const enrich = (diff, obj1, obj2) => {
  const enrichedDiff = {};
  const keys = Object.keys(diff);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (_.isObject(diff[key])) {
      enrichedDiff[key] = enrich(diff[key], obj1[key], obj2[key]);
    } else if (diff[key] === 'added') {
      enrichedDiff.added = enrichedDiff.added || {};
      enrichedDiff.added[key] = obj2[key];
    } else if (diff[key] === 'updated') {
      enrichedDiff.updated = enrichedDiff.updated || {};
      enrichedDiff.updated[key] = { was: obj1[key], replacedBy: obj2[key] };
    } else if (diff[key] === 'deleted') {
      enrichedDiff.removed = enrichedDiff.removed || {};
      enrichedDiff.removed[key] = obj1[key];
    } else if (diff[key] === 'unchanged') {
      enrichedDiff[key] = obj1[key];
    }
  }

  return enrichedDiff;
};

const jsonDiffFormat = (diff, obj1, obj2) => {
  const enrichedDiff = enrich(diff, obj1, obj2);
  return JSON.stringify(enrichedDiff, null, '  ');
};

export default jsonDiffFormat;
