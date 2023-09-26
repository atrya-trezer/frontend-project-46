### Hexlet tests and linter status:
[![Actions Status](https://github.com/atrya-trezer/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/atrya-trezer/frontend-project-46/actions)
[![Node CI](https://github.com/atrya-trezer/frontend-project-46/workflows/Node%20CI/badge.svg)](https://github.com/atrya-trezer/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/36a90144627d99137b7a/maintainability)](https://codeclimate.com/github/atrya-trezer/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/36a90144627d99137b7a/test_coverage)](https://codeclimate.com/github/atrya-trezer/frontend-project-46/test_coverage)

[![asciicast](https://asciinema.org/a/8mNQJVqDyCXzr6OJnspT88oUh.svg)](https://asciinema.org/a/8mNQJVqDyCXzr6OJnspT88oUh)

## Setup

```bash
make install
```

## Run tests

```bash
make test
```

```bash
gendiff -h

  Usage: gendiff [options] <filepath1> <filepath2>

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -h, --help           output usage information
    -f, --format <type>  output format
  ```

  ```bash
  ./bin/gendiff.js --format json __fixtures__/file1.yml __fixtures__/file2.yml
[
  {
    "removed": {
      "follow": false
    }
  },
  {
    "host": "hexlet.io"
  },
  {
    "removed": {
      "proxy": "123.234.53.22"
    }
  },
  {
    "updated": {
      "timeout": {
        "was": 50,
        "replacedBy": 20
      }
    }
  },
  {
    "added": {
      "verbose": true
    }
  }
]
```