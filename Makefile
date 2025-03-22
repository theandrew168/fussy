.POSIX:
.SUFFIXES:

.PHONY: default
default: build

node_modules:
	npm install

.PHONY: run
run: node_modules
	npm run dev

.PHONY: build
build: node_modules
	npm run build

.PHONY: test
test: node_modules
	npm run test

.PHONY: check
check: node_modules
	npm run check

.PHONY: format
format: node_modules
	npm run format
