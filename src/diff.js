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

const generateOutput = (diff, parsedData1, parsedData2, outputFormat) => {
  const sortedKeys = _.sortBy(Object.keys(diff));
  let result = '';
  if (!outputFormat) {
    result += '{\n';
    for (let i = 0; i < sortedKeys.length; i += 1) {
      const key = sortedKeys[i];
      if (diff[key].unchanged) {
        result += `    ${key}: ${parsedData1[key]}\n`;
      } else if (diff[key].deleted) {
        result += `  - ${key}: ${parsedData1[key]}\n`;
      } else if (diff[key].added) {
        result += `  + ${key}: ${parsedData2[key]}\n`;
      } else if (diff[key].updated) {
        result += `  - ${key}: ${parsedData1[key]}\n`;
        result += `  + ${key}: ${parsedData2[key]}\n`;
      }
    }
    result += '}';
  }

  return result;
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const [data1, data2, inputFormat, error] = readFiles(filepath1, filepath2);
  if (error) {
    console.error(error);
    return '';
  }

  const parsedData1 = parseData(data1, inputFormat);
  const parsedData2 = parseData(data2, inputFormat);

  const diff = {};
  if (parsedData1 && parsedData2) {
    const data1Keys = Object.keys(parsedData1);
    for (let i = 0; i < data1Keys.length; i += 1) {
      const key = data1Keys[i];
      if (!_.has(parsedData2, key)) {
        diff[key] = { deleted: true };
      } else if (parsedData1[key] !== parsedData2[key]) {
        diff[key] = { updated: true };
      } else {
        diff[key] = { unchanged: true };
      }
    }
    const data2Keys = Object.keys(parsedData2);
    for (let i = 0; i < data2Keys.length; i += 1) {
      const key = data2Keys[i];
      if (!_.has(parsedData1, key)) {
        diff[key] = { added: true };
      }
    }
  } else {
    console.error('Bad files provided');
    return '';
  }

  const output = generateOutput(diff, parsedData1, parsedData2, outputFormat);
  return output;
};

export default genDiff;
