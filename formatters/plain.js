import _ from 'lodash';

const stringify = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  } if (_.isString(obj)) {
    return `'${obj}'`;
  }
  return obj;
};

const plainDiffFormat = (diff, obj1, obj2, path) => {
  const sortedKeys = _.sortBy(Object.keys(diff));
  let result = '';
  let p = path.join('.');
  if (p.length > 0) {
    p += '.';
  }

  for (let i = 0; i < sortedKeys.length; i += 1) {
    const key = sortedKeys[i];

    const acrualPath = p + key;
    if (_.isObject(diff[key])) {
      path.push(key);
      result += plainDiffFormat(diff[key], obj1[key], obj2[key], path);
      path.pop();
    } else if (diff[key] === 'deleted') {
      result += `Property '${acrualPath}' was removed\n`;
    } else if (diff[key] === 'added') {
      const newValue = stringify(obj2[key]);
      result += `Property '${acrualPath}' was added with value: ${newValue}\n`;
    } else if (diff[key] === 'updated') {
      const oldValue = stringify(obj1[key]);
      const newValue = stringify(obj2[key]);
      result += `Property '${acrualPath}' was updated. From ${oldValue} to ${newValue}\n`;
    }
  }
  return result;
};

export default plainDiffFormat;
