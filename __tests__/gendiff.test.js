import test from 'node:test';
import { expect } from 'expect';
import genDiff from '../src/diff.js';

const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

test('genDiff', () => {
  expect(genDiff('./data/file1.json', './data/file2.json', {})).toBe(res);
});
