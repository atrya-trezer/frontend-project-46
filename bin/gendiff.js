import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const program = new Command();

const genDiff = (filepath1, filepath2, type) => {
  let output = '';
  const data1 = readFileSync(filepath1, 'utf8');
  const data2 = readFileSync(filepath2, 'utf8');
  if (data1 && data2) {
    const diff = {};
    const jsonData1 = JSON.parse(data1);
    const jsonData2 = JSON.parse(data2);
    if (jsonData1 && jsonData2) {
      const jsonData1Keys = Object.keys(jsonData1);
      for (let i = 0; i < jsonData1Keys.length; i += 1) {
        const key = jsonData1Keys[i];
        if (!_.has(jsonData2, key)) {
          diff[key] = { deleted: true };
        } else if (jsonData1[key] !== jsonData2[key]) {
          diff[key] = { updated: true };
        } else {
          diff[key] = { unchanged: true };
        }
      }
      const jsonData2Keys = Object.keys(jsonData2);
      for (let i = 0; i < jsonData2Keys.length; i += 1) {
        const key = jsonData2Keys[i];
        if (!_.has(jsonData1, key)) {
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
          output += `    ${key}: ${jsonData1[key]}\n`;
        } else if (diff[key].deleted) {
          output += `  - ${key}: ${jsonData1[key]}\n`;
        } else if (diff[key].added) {
          output += `  + ${key}: ${jsonData2[key]}\n`;
        } else if (diff[key].updated) {
          output += `  - ${key}: ${jsonData1[key]}\n`;
          output += `  + ${key}: ${jsonData2[key]}\n`;
        }
      }
      output += '}';
    }
  } else {
    console.error('Bad filenames provided');
  }
  return output;
};

const main = (filepath1, filepath2, type) => {
  console.log(genDiff(filepath1, filepath2, type));
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(main)
  .parse(process.argv);
