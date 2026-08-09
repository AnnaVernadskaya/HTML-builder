const fs = require('fs');
const path = require('path');
const readline = require('readline');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.setPrompt('Enter text: ');
readlineInterface.prompt();

readlineInterface.on('line', (input) => {
  if (input === 'exit') {
    writeStream.end();
    readlineInterface.close();
  } else {
    writeStream.write(`${input}\n`);
    readlineInterface.prompt();
  }
});

readlineInterface.on('SIGINT', () => {
  writeStream.end();
  readlineInterface.close();
});

readlineInterface.on('close', () => {
  console.log('Goodbye!');
});
