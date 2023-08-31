const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
program.parse();