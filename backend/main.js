require('dotenv').config();
const fs = require('fs');
const sharp = require('sharp');
var exif = require('exif-reader');


const TARGET_DIRECTORY = process.env.TARGET_DIRECTORY || './data';

(async () => {
  logDirectory();
  logDirectory('/G_US_HAM_46-1987');
  logDirectory('/G_US_HAM_46-1987/04_UV');
  getMetadata('/G_US_HAM_46-1987/04_UV/G_US_HAM_46-1987_UV-001.tif.jpg');
})();

function getAbsolutePath(relativePath){
  return TARGET_DIRECTORY + (relativePath || '')
}

async function getMetadata(pathToFile){
  const absolutePath = getAbsolutePath(pathToFile);
  // TODO: Check if path is actually a file, not a directory.
  const isFile = fs.existsSync(absolutePath);

  if(isFile){
    const metadata = exif(await (await sharp(absolutePath).metadata()).exif).image;
    return metadata;
  }
}

function logDirectory(relativePath) {
  const prependEmoji = (emoji, text) => `${emoji} ${text}`;
  const displayDir = (dirname) => prependEmoji('📂', dirname);
  const displayFile = (filename) => prependEmoji('📄', filename);

  const files = fs.readdirSync(getAbsolutePath(relativePath), {withFileTypes: true});

  files.forEach((file) => {
    const string = (file.isDirectory() ? displayDir(file.name) : displayFile(file.name));
    console.log(string);
  });
}



