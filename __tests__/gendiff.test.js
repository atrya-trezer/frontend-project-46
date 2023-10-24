import { fileURLToPath } from 'url';
import { dirname, join as pathJoin } from 'path';
import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => pathJoin(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff deep stylish', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toBe(readFile('expected_gendiffDeep.txt'));
});

test('genDiff json', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'json')).toBe(readFile('expected_gendiffJson.json'));
});

test('genDiff plain', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toBe(readFile('expected_gendiffPlain.txt'));
});

test('genDiff yml stylish', () => {
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish')).toBe(readFile('expected_gendiffYml.txt'));
});
