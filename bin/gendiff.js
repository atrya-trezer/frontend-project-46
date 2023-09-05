#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/diff.js';

const program = new Command();

const main = (filepath1, filepath2, type) => {
  console.log(genDiff(filepath1, filepath2, type.format));
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
