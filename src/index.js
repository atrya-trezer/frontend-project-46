import { readFileSync } from 'node:fs';
import { extname } from 'path';
import parseData from './parsers.js';
import diffFormat from './formatters/index.js';
import compareObjects from './compare.js';

const readFiles = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf8');
  const data2 = readFileSync(filepath2, 'utf8');
  if (data1 && data2) {
    const extention1 = extname(filepath1).slice(1);
    const extention2 = extname(filepath2).slice(1);
    if (extention1 === extention2) {
      return [data1, data2, extention1];
    }
    return [undefined, undefined, undefined, 'unsupported file format'];
  }
  return [undefined, undefined, undefined, 'could not read files'];
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
