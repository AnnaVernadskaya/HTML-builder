const fsPromises = require('fs/promises');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const projectFolderPath = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(projectFolderPath, 'bundle.css');

async function main() {
  const items = await fsPromises.readdir(stylesFolderPath, {
    withFileTypes: true,
  });

  const styles = [];

  for (const item of items) {
    if (item.isFile() && path.extname(item.name) === '.css') {
      const styleFilePath = path.join(stylesFolderPath, item.name);

      const styleContent = await fsPromises.readFile(styleFilePath, {
        encoding: 'utf8',
      });

      styles.push(styleContent);
    }
  }

  const bundleContent = styles.join('\n\n');

  await fsPromises.mkdir(projectFolderPath, {
    recursive: true,
  });

  await fsPromises.writeFile(bundleFilePath, bundleContent, {
    encoding: 'utf8',
  });
}

main();
