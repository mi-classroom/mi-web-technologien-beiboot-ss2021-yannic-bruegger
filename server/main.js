require('dotenv').config();
const fs = require('fs');
const sharp = require('sharp');
const exif = require('exif-reader');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

const TARGET_DIRECTORY = process.env.TARGET_DIRECTORY || './data';
const FILE_PATTERN = process.env.FILE_PATTERN || '(.*)\\.(jpg|jpeg)';
const PORT = process.env.PORT || 3000;
const VALIDFIELDS = process.env?.FIELDS?.split(',').map((field)=>field.trim()) ?? [];

app.get('*', async (req, res) => {
  if(!req.originalUrl){
    res.status(500).send('Could not handle the request. It has no original URL.');
    return;
  }

  if(req.originalUrl.indexOf('/../') >= 0) {
    res.status(501).send('Backwards navigation not allowed.');
    return;
  }
  
  const relativePath = req.originalUrl === '/' ? '' : req.originalUrl;
  const absolutePath = getAbsolutePath(req.originalUrl);

  if(!isServed(absolutePath)) {
    res.status(504).send('Directory or file not found.');
    return;
  }
  
  if(fs.lstatSync(absolutePath).isDirectory()) {
    res.send(getDirectoryContent(relativePath));
  } else {
    res.send(await getMetadata(absolutePath));
  }
})

app.listen(PORT, () => {
  console.log(`Cranach metadata service listening at http://localhost:${PORT}`)
})

function getAbsolutePath(relativePath) {
  return TARGET_DIRECTORY + (relativePath || '')
}

function isServed(absolutePath) {
  const doesntExist = !fs.existsSync(absolutePath);
  const isDirectory = fs.lstatSync(absolutePath).isDirectory();
  const fileMatchesPattern = (new RegExp(FILE_PATTERN)).test(absolutePath);
  if(doesntExist) return false;
  if(isDirectory || fileMatchesPattern) return true;
  return false;
}

async function getMetadata(absolutePath){
  const exists = fs.existsSync(absolutePath);
  const isFile = fs.lstatSync(absolutePath).isFile();
  if(exists && isFile){
    const data = {};
    const fullMeta = exif(await (await sharp(absolutePath).metadata()).exif).image;
    if(VALIDFIELDS.length > 0) {
      data.meta = {};
      Object.keys(fullMeta).filter((key)=>VALIDFIELDS.includes(key)).forEach((key) => {
        data.meta[key] = fullMeta[key];
      });
    } else {
      data.meta = fullMeta;
    }
    data.image = `data:image;base64,${fs.readFileSync(absolutePath).toString('base64')}`;
    return data;
  }
}

function getDirectoryContent(relativePathToDirectory) {
  const prependEmoji = (emoji, text) => `${emoji} ${text}`;
  const displayDir = (dirname) => prependEmoji('📂', dirname);
  const displayFile = (filename) => prependEmoji('📄', filename);
  
  const pathToDirectory = getAbsolutePath(relativePathToDirectory)

  const items = fs.readdirSync(pathToDirectory, {withFileTypes: true});
  const content = [];
  items.forEach((item) => {
    const absolutePath = getAbsolutePath(`${relativePathToDirectory}/${item.name}`);
    console.log(absolutePath)
    if(isServed(absolutePath)){
      const displayName = (item.isDirectory() ? displayDir(item.name) : displayFile(item.name));
      const name = item.name;
      const resource = `${relativePathToDirectory}/${item.name}`;
      const type = item.isDirectory() ? 'directory' : 'file';
      content.push({displayName, name, resource, type});
    };
  });

  return content;
}
