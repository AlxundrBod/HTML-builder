//import modules START

const fs = require('fs');
const path = require('path');
const readline = require('readline');

//import modules END

const filePath = path.resolve(__dirname, 'text.txt');

const rLine = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
});

async function getInput() {
  rLine.question('waiting for information to write ', async (input) => {
    if (input === 'exit') {
      console.log('See you later');
      rLine.close();
      return;
    }
  
    try {
      await fs.promises.appendFile(filePath, input + '\n');
      console.log('information has been recorded');
    } catch(err) {
      console.error(err);
    }

    getInput();
});
}

getInput();