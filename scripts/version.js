'use strict';

const fs = require('fs');
const path = require('path');
const pjPath = path.resolve(path.dirname(__filename), '../package.json');
const versionPath = path.resolve(path.dirname(__filename), '../version');
const distVersionPathEn = path.resolve(path.dirname(__filename), '../dist/hermanas-client/en/assets/version');
const distVersionPathEnUs = path.resolve(path.dirname(__filename), '../dist/hermanas-client/en-US/assets/version');
const distVersionPathFr = path.resolve(path.dirname(__filename), '../dist/hermanas-client/fr/assets/version');

const pj = require(pjPath);

console.log(`### INFO: Current Version: ${pj.version}`);
fs.writeFileSync(versionPath, pj.version);
fs.writeFileSync(distVersionPathEn, pj.version);
fs.writeFileSync(distVersionPathEnUs, pj.version);
fs.writeFileSync(distVersionPathFr, pj.version);

module.exports = pj.version;
