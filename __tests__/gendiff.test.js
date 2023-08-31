import test from 'node:test';
import { expect } from 'expect';
import genDiff from '../src/diff.js';

test('genDiff', () => {
  expect(genDiff('../data/file1.json', '../data/file2.json')).toBe(3);
});
