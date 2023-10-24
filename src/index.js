import { readFileSync } from 'node:fs';
import { extname } from 'path';
import parseData from './parsers.js';
import diffFormat from './formatters/index.js';
import buildDiff from './builddiff.js';

const validateFileNames = (filepath1, filepath2) => {
  const extention1 = extname(filepath1).slice(1);
  const extention2 = extname(filepath2).slice(1);
  if (extention1 === extention2) {
    return extention1;
  }
  return undefined;
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const inputFormat = validateFileNames(filepath1, filepath2);

  if (!inputFormat) {
    return 'Error:  unsupported file format';
  }

  const data1 = readFileSync(filepath1, 'utf8');
  const data2 = readFileSync(filepath2, 'utf8');

  if (!data1 || !data2) {
    return 'Error: could not read files';
  }

  const parsedData1 = parseData(data1, inputFormat);
  const parsedData2 = parseData(data2, inputFormat);

  if (!parsedData1 || !parsedData2) {
    return `Error: unsupported format ${inputFormat}`;
  }

  const diff = buildDiff(parsedData1, parsedData2, []);

  const output = diffFormat(diff, parsedData1, parsedData2, outputFormat);
  return output;
};

export default genDiff;
