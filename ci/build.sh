#! /bin/bash

cp -R /code /working_code
cd /working_code

echo "------ Install dependencies ------"
yarn
yarn bootstrap
echo "------ Build project ------"
yarn build:cjs
yarn build:es
echo "------ Test project ------"
yarn test
