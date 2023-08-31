import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .option('-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .parse(process.argv);
program.parse();