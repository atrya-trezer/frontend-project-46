import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
const program = new Command();

const genDiff = (filepath1, filepath2, type) => {
  let data1 = readFileSync(filepath1, "utf8");
  let data2 = readFileSync(filepath2, "utf8");
  if (data1 && data2){
    let diff = {};
    let json_data1 = JSON.parse(data1);
    let json_data2 = JSON.parse(data2);
    if (json_data1 && json_data2) {
      for (const key in json_data1) {
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
        if (!_.has(json_data1, key)){
          diff[key] = {'added': true}
        }
      }
    } else {
      console.error('Bad files provided')
    }
    //console.log(diff)
    const sortedKeys = _.sortBy(Object.keys(diff))
    console.log('{') 
    for (const key of sortedKeys){
      if (diff[key]['unchanged']){
        console.log(`  ${key}: ${json_data1[key]}`)
      } else if (diff[key]['deleted']){
        console.log(`- ${key}: ${json_data1[key]}`)
      } else if (diff[key]['added']) {
        console.log(`+ ${key}: ${json_data2[key]}`)
      }else if (diff[key]['updated']) {
        console.log(`- ${key}: ${json_data1[key]}`)
        console.log(`+ ${key}: ${json_data2[key]}`)
      }
    }
    console.log('}') 
  } else {
    console.error('Bad filenames provided')
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