import _ from 'lodash';

const prettyPrint = (obj, level) => {
  const ident = '    ';
  if (obj === null) {
    return 'null\n';
  }
  const sortedKeys = _.sortBy(Object.keys(obj));
  let result = '{\n';

  sortedKeys.forEach((key) => {
    if (typeof obj[key] === 'object') {
      result += `${ident.repeat(level)}    ${key}: `;
      result += prettyPrint(obj[key], level + 1);
    } else {
      result += `${ident.repeat(level)}    ${key}: ${obj[key]}\n`;
    }
  });
  result += `${ident.repeat(level)}}\n`;
  return result;
};

const stylishDiffFormat = (diff, obj1, obj2, level, toplevel) => {
  const ident = '    ';
  const sortedKeys = _.sortBy(Object.keys(diff));

  let result = `${ident.repeat(level)}${toplevel}{`;
  
  sortedKeys.forEach(function(key) {
    if (i === 0) {
      result += '\n';
    }
    if (typeof diff[key] === 'object') {
      result += stylishDiffFormat(diff[key], obj1[key], obj2[key], level + 1, `${key}: `);
    } else if (diff[key] === 'unchanged') {
      result += `${ident.repeat(level)}    ${key}: ${obj1[key]}\n`;
    } else if (diff[key] === 'deleted') {
      let res = `${obj1[key]}\n`;
      if (typeof obj1[key] === 'object') {
        res = prettyPrint(obj1[key], level + 1);
      }
      result += `${ident.repeat(level)}  - ${key}: ${res}`;
    } else if (diff[key] === 'added') {
      let res = `${obj2[key]}\n`;
      if (typeof obj2[key] === 'object') {
        res = prettyPrint(obj2[key], level + 1);
      }
      result += `${ident.repeat(level)}  + ${key}: ${res}`;
    } else if (diff[key] === 'updated') {
      let res1 = `${obj1[key]}\n`;
      let res2 = `${obj2[key]}\n`;
      if (typeof obj1[key] === 'object') {
        res1 = prettyPrint(obj1[key], level + 1);
      }
      if (typeof obj2[key] === 'object') {
        res2 = prettyPrint(obj2[key], level + 1);
      }
      result += `${ident.repeat(level)}  - ${key}: ${res1}`;
      result += `${ident.repeat(level)}  + ${key}: ${res2}`;
    }
  });
  result += `${ident.repeat(level)}}`;
  if (level > 0) {
    result += '\n';
  }
  return result;
};

export default stylishDiffFormat;
