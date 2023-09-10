import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { extname } from 'path';
import parseData from './src/parsers.js';
import diffFormat from './formatters/index.js';

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

  const output = diffFormat(diff, parsedData1, parsedData2, outputFormat);
  return output;
};

export default genDiff;
