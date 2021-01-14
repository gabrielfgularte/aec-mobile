#!/usr/bin/env bash

npm run setenv-release
cd android
./gradlew bundleRelease
cd ..
npm run setenv-debug
