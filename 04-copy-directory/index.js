//import modules START

const fs = require('fs');
const path = require('path');

//import modules END
const dirPath = path.resolve(__dirname, 'files');
const destPath = path.resolve(__dirname, 'files-copy');

async function copyDir(directory, destination) {
  try {
    await fs.promises.access(destination, fs.constants.F_OK);
  } catch (err) {
    await fs.promises.mkdir(destination, {recursive: true});
  }

  const files = await fs.promises.readdir(directory);

  for(const file of files) {
    const dirPath = path.resolve(directory, file);
    const destPath = path.resolve(destination, file);

    const fileStat = await fs.promises.stat(dirPath);

    if (fileStat.isDirectory()) {
      await copyDir(dirPath, destPath)
    } else {
      await fs.promises.copyFile(dirPath, destPath);
    }
  }
}

copyDir(dirPath, destPath)
  .then(() => console.log('Directory was successfully copied'))
  .catch((err) => console.log('Error:', err))
