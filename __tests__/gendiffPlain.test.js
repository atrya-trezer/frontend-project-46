import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import readFile from '../src/index_test.js';

const res = readFile('expected_gendiffPlain');

test('genDiff', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toBe(res);
});
