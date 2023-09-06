import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { extname } from 'path';
import parseData from './parsers.js';

const readFiles = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf8');
  const data2 = readFileSync(filepath2, 'utf8');
  if (data1 && data2) {
    const extention1 = extname(filepath1);
    const extention2 = extname(filepath2);
    if (extention1 === extention2) {
      return [data1, data2, extention1];
    }
    return [undefined, undefined, undefined, 'unsupported file format'];
  }
  return [undefined, undefined, undefined, 'could not read files'];
};

const prettyPrint = (obj, level) => {
  const ident = '    ';
  if (obj === null) {
    return 'null\n';
  }
  const sortedKeys = _.sortBy(Object.keys(obj));
  let result = '{\n';
  for (let i = 0; i < sortedKeys.length; i += 1) {
    const key = sortedKeys[i];
    if (typeof obj[key] === 'object') {
      result += `${ident.repeat(level)}    ${key}: `;
      result += prettyPrint(obj[key], level + 1);
    } else {
      result += `${ident.repeat(level)}    ${key}: ${obj[key]}\n`;
    }
  }
  result += `${ident.repeat(level)}}\n`;
  return result;
};

const serializeObject = (diff, obj1, obj2, level, toplevel) => {
  const ident = '    ';
  const sortedKeys = _.sortBy(Object.keys(diff));

  let result = `${ident.repeat(level)}${toplevel}{`;
  for (let i = 0; i < sortedKeys.length; i += 1) {
    const key = sortedKeys[i];

    if (i === 0) {
      result += '\n';
    }
    if (typeof diff[key] === 'object') {
      result += serializeObject(diff[key], obj1[key], obj2[key], level + 1, `${key}: `);
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
  }
  result += `${ident.repeat(level)}}`;
  if (level > 0) {
    result += '\n';
  }
  return result;
};

const generateOutput = (diff, parsedData1, parsedData2, outputFormat) => {
  let result = '';
  if (!outputFormat) {
    result = serializeObject(diff, parsedData1, parsedData2, 0, '');
  }

  return result;
};

const compareObjects = (obj1, obj2) => {
  const diff = {};
  if (obj1 && obj2) {
    const data1Keys = Object.keys(obj1);
    for (let i = 0; i < data1Keys.length; i += 1) {
      const key = data1Keys[i];

      if (!_.has(obj2, key)) {
        diff[key] = 'deleted';
      } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        diff[key] = compareObjects(obj1[key], obj2[key]);
      } else if (obj1[key] !== obj2[key]) {
        diff[key] = 'updated';
      } else {
        diff[key] = 'unchanged';
      }
    }
    const data2Keys = Object.keys(obj2);
    for (let i = 0; i < data2Keys.length; i += 1) {
      const key = data2Keys[i];
      if (!_.has(obj1, key)) {
        diff[key] = 'added';
      }
    }
  }
  return diff;
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const [data1, data2, inputFormat, error] = readFiles(filepath1, filepath2);
  if (error) {
    console.error(error);
    return '';
  }

  const parsedData1 = parseData(data1, inputFormat);
  const parsedData2 = parseData(data2, inputFormat);

  const diff = compareObjects(parsedData1, parsedData2);

  const output = generateOutput(diff, parsedData1, parsedData2, outputFormat);
  return output;
};

export default genDiff;
