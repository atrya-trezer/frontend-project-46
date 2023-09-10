import yaml from 'js-yaml';

const parseData = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml') {
    return yaml.load(data);
  }
  console.error(`unsupported format: ${format}`);
  return console.error(data);
};

export default parseData;
