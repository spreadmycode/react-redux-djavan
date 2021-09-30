#!/bin/bash

if [[ $NODE_ENV == "test" ]]; then
  npm install
  npm run test
else
  npm install
  npm run dev
fi
