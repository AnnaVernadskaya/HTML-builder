const fsPromises = require('fs/promises');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

async function main() {
  const files = await fsPromises.readdir(secretFolderPath, {
    withFileTypes: true,
  });

  for (const file of files) {
    if (file.isFile()) {
      const fileName = path.basename(file.name, path.extname(file.name));
      const fileExtension = path.extname(file.name).slice(1);

      const filePath = path.join(secretFolderPath, file.name);
      const fileStats = await fsPromises.stat(filePath);

      const fileSize = fileStats.size;

      const fileDescription = `${fileName} - ${fileExtension} - ${fileSize}`;

      console.log(fileDescription);
    }
  }
}

main();
