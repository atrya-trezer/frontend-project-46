import yaml from 'js-yaml';

const parseData = (data, format) => {
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.load;
  } else {
    console.error(`unsupported format: ${format}`);
    parse = console.error;
  }

  return parse(data);
};

export default parseData;
