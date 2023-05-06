//import modules START

const fs = require('fs');
const path = require('path');

//import modules END
const dirPath = path.resolve(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Files in secret-folder: ');
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(dirPath, file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${file.name} - ${path.extname(file.name).slice(1)} - ${Number(stats.size / 1024).toFixed(3)}kb`);
      })
    }
  });
});