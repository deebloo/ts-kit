const { resolve } = require('path');
const { writeFileSync } = require('fs');

const packageJson = require(resolve(__dirname, '../package.json'));
const version = packageJson.version;
const packageName = process.argv[2];
const namedPackageJsonPath = resolve(__dirname, `../@ts-kit/${packageName}/package.json`);
const namedPackageJson = require(namedPackageJsonPath);

namedPackageJson.version = version;

writeFileSync(namedPackageJsonPath, JSON.stringify(namedPackageJson, null, 2));
