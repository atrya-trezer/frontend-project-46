import _ from 'lodash';

const stringify = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  } if (_.isString(obj)) {
    return `'${obj}'`;
  }
  return obj;
};

const plainDiffFormat = (diff, obj1, obj2) => {
  const result = diff.map((element) => {
    const { key } = element;
    const value = element.diff;
    const path = _.concat(element.previousKeys, key).join('.');
    if (_.isObject(value)) {
      return plainDiffFormat(value, obj1[key], obj2[key]);
    }
    if (value === 'deleted') {
      return `Property '${path}' was removed`;
    }
    if (value === 'added') {
      const newValue = stringify(obj2[key]);
      return `Property '${path}' was added with value: ${newValue}`;
    }
    if (value === 'updated') {
      const oldValue = stringify(obj1[key]);
      const newValue = stringify(obj2[key]);
      return `Property '${path}' was updated. From ${oldValue} to ${newValue}`;
    }
    return '';
  }).filter((x) => x !== '').join('\n');

  return result;
};

export default plainDiffFormat;
