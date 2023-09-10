import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import readFile from '../src/index_test.js';

const res = readFile('expected_gendiffYml');

test('genDiff', () => {
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish')).toBe(res);
});
