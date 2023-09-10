import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import readFile from '../src/index_test.js';

const res = readFile('expected_gendiffDeep');

test('genDiff', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toBe(res);
});
