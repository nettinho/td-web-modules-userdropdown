#! /bin/bash

cp -R /code /working_code
cd /working_code

echo "------ Install dependencies ------"
yarn
echo "------ Build project ------"
yarn build:es
yarn build:cjs
