require('dotenv').config();

const fs = require('fs');
const sharp = require('sharp');
const exiftool = require('exiftool-vendored').exiftool;
const cors = require('cors');
const express = require('express');
const app = express();
const zip = require('express-easy-zip');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(zip());

const TARGET_DIRECTORY = process.env.TARGET_DIRECTORY ?? './data';
const FILE_PATTERN = process.env.FILE_PATTERN ?? '(.*)\\.(jpg|jpeg)';
const PORT = process.env.PORT ?? 3000;
const VALIDFIELDS = process.env?.FIELDS?.split(',').map((field)=>field.trim()) ?? [];
const VALID_IPTC_TAGS = process.env?.TAGS?.split(',').map((field)=>field.trim()) ?? [];

app.post('*', cors(), async (req, res) => {
  if(!req.originalUrl){
    res.status(500).send('Could not handle the request. It has no original URL.');
    return;
  }

  if(req.originalUrl.indexOf('/../') >= 0) {
    res.status(501).send('Backwards navigation not allowed.');
    return;
  }

  const urlPath = req.originalUrl.split('?')[0];
  const relativePath = urlPath === '/' ? '' : urlPath;
  const absolutePath = getAbsolutePath(urlPath);

  if(!isServed(absolutePath)) {
    res.status(504).send('Directory or file not found.');
    return;
  }
  
  if(!fs.lstatSync(absolutePath).isDirectory()) {
    res.status(505).send('This action is only possible on whole directories.');
    return;
  }

  if(!req.body) {
    res.status(506).send('There are no tags to set in request body.');
    return;
  }

  let successful = await setIPTCTagsOnDirectoryContent(relativePath, req.body);
  if(successful) {
    res.send({urlPath, relativePath, absolutePath});
  } else {
    res.status(507).send('Unable to update IPTC data.');
  }
});

app.get('*', async (req, res) => {
  if(!req.originalUrl){
    res.status(500).send('Could not handle the request. It has no original URL.');
    return;
  }

  if(req.originalUrl.indexOf('/../') >= 0) {
    res.status(501).send('Backwards navigation not allowed.');
    return;
  }
  
  const searchQuery = req.query['filter'];
  const action = req.query['action'];
  const urlPath = req.originalUrl.split('?')[0];
  const relativePath = urlPath === '/' ? '' : urlPath;
  const absolutePath = getAbsolutePath(urlPath);

  if(!isServed(absolutePath)) {
    res.status(504).send('Directory or file not found.');
    return;
  }
  
  if(fs.lstatSync(absolutePath).isDirectory()) {
    if(searchQuery) {
      res.send(getFilteredDirectoryContent(relativePath, searchQuery));
    }
    else {
      if(action === 'download') {
        res.zip({
          files: [{ path: getAbsolutePath(relativePath), name: relativePath.slice(1) ? relativePath.slice(1) : 'cda' }],
          filename: `${relativePath.slice(1) ? relativePath.slice(1) : 'cda' }.zip`,
        });
      } else {
        res.send(getDirectoryContent(relativePath)); 
      }
    }
  } else {
    if(absolutePath.endsWith('.json')){
      res.send(fs.readFileSync(absolutePath));
    } else {
      res.send(await getMetadata(absolutePath));
    }
  }
})



app.listen(PORT, () => {
  console.log(`Cranach metadata service listening at http://localhost:${PORT}`)
})

function getAbsolutePath(relativePath) {
  return TARGET_DIRECTORY + (relativePath ?? '')
}

function isServed(absolutePath) {
  const doesntExist = !fs.existsSync(absolutePath);
  if(doesntExist) return false;
  const isDirectory = fs.lstatSync(absolutePath).isDirectory();
  const fileMatchesPattern = (new RegExp(FILE_PATTERN)).test(absolutePath);
  if(isDirectory || fileMatchesPattern) return true;
  return false;
}

async function getMetadata(absolutePath){
  const exists = fs.existsSync(absolutePath);
  const isFile = fs.lstatSync(absolutePath).isFile();
  if(exists && isFile){
    const data = {};

    try {
      const meta = await sharp(absolutePath).metadata().exif;
      const filteredMeta = Object.fromEntries(Object.entries(meta ?? {}).filter((entry)=>VALIDFIELDS.indexOf(entry[0]) > -1));
      data.meta = filteredMeta ?? {};
    } catch {
      data.meta = {};
    }
    
    try {
      const iptc = await exiftool.read(absolutePath);
      const filteredIPTC = Object.fromEntries(Object.entries(iptc).filter((entry) => true || VALID_IPTC_TAGS.indexOf(entry[0]) > -1));
      data.iptc = filteredIPTC ?? {};
    } catch {
      data.iptc = {}
    }
    
    data.image = `data:image;base64,${fs.readFileSync(absolutePath).toString('base64')}`;
    return data;
  }
}

function getFilteredDirectoryContent(relativePathToDirectory, searchQuery) {
  return getDirectoryContent(relativePathToDirectory).filter((dir)=>
    dir.name.indexOf(searchQuery) >= 0
  );
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
    if(isServed(absolutePath)){
      const displayName = (item.isDirectory() ? displayDir(item.name) : displayFile(item.name));
      const name = item.name;
      const resource = `${relativePathToDirectory}/${item.name}`;
      const type = item.isDirectory() ? 'directory' : item.name.endsWith('json') ? 'file' : 'image';
      content.push({displayName, name, resource, type});
    };
  });

  return content;
}

function setIPTCTagsOnDirectoryContent(relativePath, tags) {
  let content = getDirectoryContent(relativePath);
  content.forEach((item) => {
    if(item.type === 'file'){
      exiftool.write(`${getAbsolutePath(relativePath)}/${item.name}`, tags, ['-overwrite_original']);
      exiftool.end();
    }
  });
  return true;
  try {
    
  } catch {
    return false;
  }
  return true;
}