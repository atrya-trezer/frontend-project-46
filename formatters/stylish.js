import _ from 'lodash';

const prettyPrint = (obj, level) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const ident = '    ';
  if (obj === null) {
    return 'null\n';
  }
  const sortedKeys = _.sortBy(Object.keys(obj));

  const result = `{\n${sortedKeys.map((key) => {
    if (_.isObject(obj[key])) {
      return `${ident.repeat(level)}    ${key}: ${prettyPrint(obj[key], level + 1)}`;
    }
    return `${ident.repeat(level)}    ${key}: ${obj[key]}`;
  }).join('\n')}\n${ident.repeat(level)}}`;
  return result;
};

const stylishDiffFormat = (diff, obj1, obj2, level, toplevel) => {
  const ident = '    ';

  const result = `${ident.repeat(level)}${toplevel}{\n${diff.map((element) => {
    const { key } = element;
    const value = element.diff;
    if (_.isObject(value)) {
      return stylishDiffFormat(value, obj1[key], obj2[key], level + 1, `${key}: `);
    }
    if (value === 'unchanged') {
      return `${ident.repeat(level)}    ${key}: ${obj1[key]}`;
    }
    if (value === 'deleted') {
      return `${ident.repeat(level)}  - ${key}: ${prettyPrint(obj1[key], level + 1)}`;
    }
    if (value === 'added') {
      return `${ident.repeat(level)}  + ${key}: ${prettyPrint(obj2[key], level + 1)}`;
    }
    if (value === 'updated') {
      return `${ident.repeat(level)}  - ${key}: ${prettyPrint(obj1[key], level + 1)}\n${ident.repeat(level)}  + ${key}: ${prettyPrint(obj2[key], level + 1)}`;
    }
    return '';
  }).join('\n')}\n${ident.repeat(level)}}`;

  return result;
};

export default stylishDiffFormat;
