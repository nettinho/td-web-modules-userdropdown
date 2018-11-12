#! /bin/bash

cp -R /code /working_code
cd /working_code

echo "----- Install dependencies -----"
yarn
echo "----- Linter -----"
yarn test --ci
