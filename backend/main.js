require('dotenv').config();
const fs = require('fs');

const TARGET_DIRECTORY = process.env.TARGET_DIRECTORY || './data';

const prependEmoji = (emoji, text) => `${emoji} ${text}`;
const displayDir = (dirname) => prependEmoji('📂', dirname);
const displayFile = (filename) => prependEmoji('📄', filename);

logDirectory();
logDirectory('/G_US_HAM_46-1987', 1);
logDirectory('/G_US_HAM_46-1987/04_UV', 2);


function logDirectory(relativePath, indentation) {
  const files = fs.readdirSync(TARGET_DIRECTORY + (relativePath || ''), {withFileTypes: true});

  files.forEach((file) => {
    const string = " ".repeat(indentation*2) + (file.isDirectory() ? displayDir(file.name) : displayFile(file.name));
    console.log(string);
  });
}



