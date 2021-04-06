'use strict';

const fs = require('fs');
const path = require('path');
const redirectFile = path.resolve(path.dirname(__filename), '../src/redirect.html');
const indexFile = path.resolve(path.dirname(__filename), '../dist/hermanas-client/index.html');

fs.copyFile(redirectFile, indexFile,  () => {
    console.log(`### INFO: File copied from : ${redirectFile} to ${indexFile}`);
});
