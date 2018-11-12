# TrueDat Web Libraries

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

A monorepo for the libraries of Truedat Web.

## How To...

### Install depencencies

`yarn bootstrap`

### Run the tests

`yarn build:cjs && yarn test`

### Build the production build

`yarn build:es && yarn build:cjs`

### Publish changed modules

1.  Ensure working directory has no uncontrolled changes (e.g. `git clean`)
1.  `yarn build:es && yarn build:cjs && lerna publish`
