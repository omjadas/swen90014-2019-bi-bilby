#!/bin/sh

git config core.hooksPath .githooks
npm run install-all-dev

exit $?
