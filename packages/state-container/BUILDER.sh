#!/usr/bin/env bash

PROJECT=state-container

test() {
    npx jest --verbose=false -c "packages/$PROJECT/jest.config.js" ${@}
}

build() {
    npx ng-packagr -p "packages/$PROJECT/package.json"
}

release() {
    build &&
    node tools/update_version "$PROJECT" &&
    cd "@ts-kit/$PROJECT" &&
    npm publish --access public --registry "https://registry.npmjs.org"
}
