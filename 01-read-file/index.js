//import modules START

const fs = require('fs');
const path = require('path');

//import modules END

const filePath = path.resolve(__dirname, 'text.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

