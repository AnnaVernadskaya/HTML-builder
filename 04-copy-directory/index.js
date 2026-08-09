const fsPromises = require('fs/promises');
const path = require('path');

const sourceFolderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

async function copyDir(sourcePath, destinationPath) {
  const items = await fsPromises.readdir(sourcePath, {
    withFileTypes: true,
  });

  for (const item of items) {
    const sourceItemPath = path.join(sourcePath, item.name);
    const destinationItemPath = path.join(destinationPath, item.name);

    if (item.isFile()) {
      await fsPromises.copyFile(sourceItemPath, destinationItemPath);
    }

    if (item.isDirectory()) {
      await fsPromises.mkdir(destinationItemPath, {
        recursive: true,
      });

      await copyDir(sourceItemPath, destinationItemPath);
    }
  }
}

async function main() {
  await fsPromises.rm(copyFolderPath, {
    recursive: true,
    force: true,
  });

  await fsPromises.mkdir(copyFolderPath, {
    recursive: true,
  });

  await copyDir(sourceFolderPath, copyFolderPath);
}

main();
