#!/bin/sh

rm -rf ./dist;
mkdir dist;
mkdir -p dist/public/style;
mkdir -p dist/public/script;
npm run build:style;
npm run build:client;
npm run build:server;
