const fsPromises = require('fs').promises
const path = require('path')

async function removeEmptyDirectories (directory) {
  const fileStats = await fsPromises.lstat(directory)
  if (!fileStats.isDirectory()) {
    return
  }
  let fileNames = await fsPromises.readdir(directory)
  if (fileNames.length > 0) {
    const recursiveRemovalPromises = fileNames.map(
      (fileName) => removeEmptyDirectories(path.join(directory, fileName))
    )
    await Promise.all(recursiveRemovalPromises)

    fileNames = await fsPromises.readdir(directory)
  }

  if (fileNames.length === 0) {
    console.log('Removing: ', directory)
    await fsPromises.rmdir(directory)
  }
}

const scriptsFolder = __dirname
const rootFolder = path.join(scriptsFolder, '../')
const modulesFolder = path.join(rootFolder, 'modules')
const pagesFolder = path.join(rootFolder, 'pages')

removeEmptyDirectories(pagesFolder)
  .then(() => removeEmptyDirectories(modulesFolder))
