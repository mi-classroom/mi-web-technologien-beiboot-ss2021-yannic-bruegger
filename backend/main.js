require('dotenv').config();
const fs = require('fs');

const TARGET_DIRECTORY = process.env.TARGET_DIRECTORY || './data';

logDirectory();
logDirectory('/G_US_HAM_46-1987');
logDirectory('/G_US_HAM_46-1987/01_Overall');


function logDirectory(relativePath) {
  fs.readdir(TARGET_DIRECTORY + (relativePath || ''), {withFileTypes: true}, (err, files) => {
    if(err) throw err;
    files.forEach((file) => {
      console.log(file.isDirectory() ? displayDir(file.name) : displayFile(file.name));
    });
  });
}


const prependEmoji = (emoji, text) => `${emoji} ${text}`;
const displayDir = (dirname) => prependEmoji('📂', dirname);
const displayFile = (filename) => prependEmoji('📄', filename);
