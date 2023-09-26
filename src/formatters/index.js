import stylishDiffFormat from './stylish.js';
import plainDiffFormat from './plain.js';
import jsonDiffFormat from './json.js';

const diffFormat = (diff, parsedData1, parsedData2, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylishDiffFormat(diff, parsedData1, parsedData2, 0, '');
    case 'plain':
      return plainDiffFormat(diff, parsedData1, parsedData2);
    case 'json':
      return jsonDiffFormat(diff, parsedData1, parsedData2);
    default:
      console.error('Unsupported format: ', outputFormat);
      return '';
  }
};

export default diffFormat;
