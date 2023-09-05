import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { extname } from 'path';
import { load as loadYml } from 'js-yaml';

const genDiff = (filepath1, filepath2, type) => {
  let output = '';
  const data1 = readFileSync(filepath1, 'utf8');
  const data2 = readFileSync(filepath2, 'utf8');
  if (data1 && data2) {
    const extention1 = extname(filepath1);
    const extention2 = extname(filepath2);
    const diff = {};
    let parsedData1;
    let parsedData2;
    if (extention1 === '.json' && extention2 === '.json') {
      parsedData1 = JSON.parse(data1);
      parsedData2 = JSON.parse(data2);
    } else if (extention1 === '.yml' && extention2 === '.yml') {
      parsedData1 = loadYml(data1);
      parsedData2 = loadYml(data2);
    }

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
    }
    const sortedKeys = _.sortBy(Object.keys(diff));
    if (!type.format) {
      output += '{\n';
      for (let i = 0; i < sortedKeys.length; i += 1) {
        const key = sortedKeys[i];
        if (diff[key].unchanged) {
          output += `    ${key}: ${parsedData1[key]}\n`;
        } else if (diff[key].deleted) {
          output += `  - ${key}: ${parsedData1[key]}\n`;
        } else if (diff[key].added) {
          output += `  + ${key}: ${parsedData2[key]}\n`;
        } else if (diff[key].updated) {
          output += `  - ${key}: ${parsedData1[key]}\n`;
          output += `  + ${key}: ${parsedData2[key]}\n`;
        }
      }
      output += '}';
    }
  } else {
    console.error('Bad filenames provided');
  }
  return output;
};

export default genDiff;
