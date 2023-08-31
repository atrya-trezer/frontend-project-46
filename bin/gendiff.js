import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
const program = new Command();

const genDiff = (filepath1, filepath2, type) => {
  let data1, data2;
  try { data1 = readFileSync(filepath1, "utf8")
    //console.log("File content:", data1);
} catch (err) { console.error(err); }
  try { data2 = readFileSync(filepath2, "utf8")
    //console.log("File content:", data2);
} catch (err) { console.error(err); }
  if (data1 && data2){
    let diff = {};
    let json_data1, json_data2
    try {
      json_data1 = JSON.parse(data1)
      //console.log(json_data1)
    } catch(err) {
      console.error(err)
    }
    try {
      json_data2 = JSON.parse(data2)
      //console.log(json_data2)
    } catch(err) {
      console.error(err)
    }
    for (const key in json_data1) {
      //console.log(`${key} = ${json_data1[key]}`)
      if (!_.has(json_data2, key)){
        diff[key] = {'deleted': true}
      } else {
        if (json_data1[key] !== json_data2[key]){
          diff[key] = {'updated': true}
        } else {
          diff[key] = {'unchanged': true}
        }
      }
    }
    for (const key in json_data2) {
      //console.log(`${key} = ${json_data1[key]}`)
      if (!_.has(json_data1, key)){
        diff[key] = {'added': true}
      }
    }
    console.log(diff)
  }
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(genDiff)
  .parse(process.argv);