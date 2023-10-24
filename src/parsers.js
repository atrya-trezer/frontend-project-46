import yaml from 'js-yaml';

const parseData = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  } if (format === 'yml') {
    return yaml.load(data);
  }

  return undefined;
};

export default parseData;
