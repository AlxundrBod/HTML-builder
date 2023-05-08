//import modules START

const fs = require('fs');
const path = require('path');

//import modules END
const dirPath = path.resolve(__dirname, 'styles');
const destPath = path.resolve(__dirname, 'project-dist');
const destFilePath = path.resolve(__dirname, 'project-dist', 'bundle.css');

const destWriteStream = fs.createWriteStream(destFilePath);

async function createBundle(directory, destination) {
  try {
    await fs.promises.access(destination, fs.constants.F_OK);
  } catch (err) {
    await fs.promises.mkdir(destination, {recursive: true});
  }

  const files = await fs.promises.readdir(directory);

  for(const file of files) {
    const dirPath = path.resolve(directory, file);

    const fileStat = await fs.promises.stat(dirPath);

    if (fileStat.isFile() && path.extname(file) === '.css') {
      const fileReadStream = fs.createReadStream(dirPath);
      fileReadStream.pipe(destWriteStream, {end: false});
    }
  }
}

createBundle(dirPath, destPath)
  .then(() => console.log('Bundle was successfully created'))
  .catch((err) => console.log('Error:', err))