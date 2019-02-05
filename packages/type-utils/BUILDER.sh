#!/usr/bin/env bash

PROJECT=type-utils

test() {
    npx jest --watchAll --verbose=false -c "packages/$PROJECT/jest.config.js"
}

test_ci() {
    npx jest -c "packages/$PROJECT/jest.config.js"
}


build() {
    npx ng-packagr -p "packages/$PROJECT/package.json"
}

release() {
    build
    
    node tools/update_version type-utils &&
    cd "@ts-kit/$PROJECT" &&
    npm publish --access public
}


