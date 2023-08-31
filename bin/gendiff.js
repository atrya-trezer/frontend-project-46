import { Command } from 'commander';
import { readFileSync } from 'node:fs';
const program = new Command();

const genDiff = (filepath1, filepath2, type) => {
  console.log(readFileSync(filepath1, "utf8"));
  console.log(readFileSync(filepath2,"utf8"));
  console.log(type);
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