'use strict';

const fs = require('fs');
const path = require('path');
const pjPath = path.resolve(path.dirname(__filename), '../package.json');
const versionPath = path.resolve(path.dirname(__filename), '../version');
const distVersionPath = path.resolve(path.dirname(__filename), '../dist/hermanas-client/assets/version');
const distVersionPathEn = path.resolve(path.dirname(__filename), '../dist/hermanas-client/en/assets/version');
const distVersionPathEnUs = path.resolve(path.dirname(__filename), '../dist/hermanas-client/en-US/assets/version');
const distVersionPathFr = path.resolve(path.dirname(__filename), '../dist/hermanas-client/fr/assets/version');

const pj = require(pjPath);

console.log(`### INFO: Current Version: ${pj.version}`);
fs.writeFileSync(versionPath, pj.version);

fs.access(distVersionPath, (f) => {
    if (f) {
        console.log(`### INFO: File not found : ${distVersionPath}`);
    } else {
        fs.writeFileSync(distVersionPath, pj.version);
        console.log(`### INFO: File found : ${distVersionPath}`);

    }
});

fs.access(distVersionPathFr, (f) => {
    if (f) {
        console.log(`### INFO: File not found : ${distVersionPathFr}`);
    } else {
        fs.writeFileSync(distVersionPathFr, pj.version);
        console.log(`### INFO: File found : ${distVersionPathFr}`);
    }
});

fs.access(distVersionPathEn, (f) => {
    if (f) {
        console.log(`### INFO: File not found : ${distVersionPathEn}`);
    } else {
        fs.writeFileSync(distVersionPathEn, pj.version);
        console.log(`### INFO: File found : ${distVersionPathEn}`);
    }
});

fs.access(distVersionPathEnUs, (f) => {
    if (f) {
        console.log(`### INFO: File not found : ${distVersionPathEnUs}`);
    } else {
        fs.writeFileSync(distVersionPathEnUs, pj.version);
        console.log(`### INFO: File found : ${distVersionPathEnUs}`);
    }
});

module.exports = pj.version;
