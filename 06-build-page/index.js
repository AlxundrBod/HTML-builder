//import modules START

const fs = require('fs');
const path = require('path');

//import modules END
const stylesPath = path.resolve(__dirname, 'styles');
const assetsFilePath = path.resolve(__dirname, 'assets');
const destPath = path.resolve(__dirname, 'project-dist');
const destStylesPath = path.resolve(__dirname, 'project-dist', 'style.css');
const assetsDest = path.resolve(__dirname, 'project-dist', 'assets');
const componentsPath = path.resolve(__dirname, 'components');

//Copy assets START

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
      await copyDir(dirPath, destPath);
    } else {
      await fs.promises.copyFile(dirPath, destPath);
    }
  }

  try {
    await createBundle(stylesPath, destStylesPath);
    console.log('Bundle was successfully created');
  } catch (err) {
    console.log('Error creating bundle:', err);
  }
};

//Copy assets END

// Style bundle creation START



async function createBundle(directory, destination) {
  const stylesWriteStream = fs.createWriteStream(destStylesPath);
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
      fileReadStream.pipe(stylesWriteStream, {end: false});
    }
  }
};

//Style bundle creation END


async function BuildPage() {
  try {
    await copyDir(assetsFilePath, assetsDest);
    console.log('Directory was successfully copied');
  } catch (err) {
    console.log('Error copying directory:', err);
  }
}

BuildPage();