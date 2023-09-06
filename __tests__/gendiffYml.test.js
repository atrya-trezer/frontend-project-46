import { test, expect } from '@jest/globals';
import genDiff from '../src/diff.js';

const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', () => {
  expect(genDiff('./data/file1.yml', './data/file2.yml', undefined)).toBe(res);
});
