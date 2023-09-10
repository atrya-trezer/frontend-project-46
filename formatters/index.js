import _ from 'lodash';

import stylishDiffFormat from './stylish.js';
import plainDiffFormat from './plain.js';
import jsonDiffFormat from './json.js';

const diffFormat = (diff, parsedData1, parsedData2, outputFormat) => {
  if (outputFormat === 'stylish') {
    return stylishDiffFormat(diff, parsedData1, parsedData2, 0, '');
  } if (outputFormat === 'plain') {
    return _.trimEnd(plainDiffFormat(diff, parsedData1, parsedData2, []), '\n');
  } if (outputFormat === 'json') {
    return jsonDiffFormat(diff, parsedData1, parsedData2, []);
  }
  console.error('Unsupported format: ', outputFormat);
  return '';
};

export default diffFormat;
