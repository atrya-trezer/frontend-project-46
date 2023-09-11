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

const compareObjects = (obj1, obj2, previousKeys) => {
  const dataKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const diff = dataKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, diff: 'deleted', previousKeys };
    } if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        diff: compareObjects(obj1[key], obj2[key], _.concat(previousKeys, key)),
        previousKeys,
      };
    } if (!_.has(obj1, key)) {
      return { key, diff: 'added', previousKeys };
    } if (obj1[key] !== obj2[key]) {
      return { key, diff: 'updated', previousKeys };
    }
    return { key, diff: 'unchanged', previousKeys };
  });

  return _.sortBy(diff, ['key']);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const [data1, data2, inputFormat, error] = readFiles(filepath1, filepath2);
  if (error) {
    console.error(error);
    return '';
  }

  const parsedData1 = parseData(data1, inputFormat);
  const parsedData2 = parseData(data2, inputFormat);

  const diff = compareObjects(parsedData1, parsedData2, []);

  const output = diffFormat(diff, parsedData1, parsedData2, outputFormat);
  return output;
};

export default genDiff;
