import _ from 'lodash';

import stylishDiffFormat from './stylish.js';
import plainDiffFormat from './plain.js';
import jsonDiffFormat from './json.js';

const diffFormat = (diff, parsedData1, parsedData2, outputFormat) => {
  let result = '';
  if (outputFormat === 'stylish') {
    result = stylishDiffFormat(diff, parsedData1, parsedData2, 0, '');
  } else if (outputFormat === 'plain') {
    result = _.trimEnd(plainDiffFormat(diff, parsedData1, parsedData2, []), '\n');
  } else if (outputFormat === 'json') {
    result = jsonDiffFormat(diff, parsedData1, parsedData2, []);
  } else {
    console.error('Unsupported format: ', outputFormat);
  }

  return result;
};

export default diffFormat;
