.POSIX:
.SUFFIXES:

.PHONY: default
default: test

node_modules:
	npm install

.PHONY: run
run: node_modules
	npm run dev

.PHONY: test
test: node_modules
	npm run test

.PHONY: format
format: node_modules
	npm run format
