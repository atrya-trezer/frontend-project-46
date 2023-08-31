install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

test:
	npm test --test-reporter=spec

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish
