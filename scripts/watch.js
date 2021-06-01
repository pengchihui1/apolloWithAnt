const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs-extra')

const scriptsFolder = __dirname
const rootFolder = path.join(scriptsFolder, '../')
const modulesFolder = path.join(rootFolder, 'modules')
const pagesFolder = path.join(rootFolder, 'pages')

const addPage = async (filePath) => {
  const pagePath = path.relative(modulesFolder, filePath).split(path.sep).splice(2).join(path.sep)
  const importPath = path.relative(rootFolder, filePath).replace(/\\/g, '/')

  const fileContent = await fs.readFile(filePath)
  const regex = /^export const config/gm
  let content = ''
  if (regex.test(fileContent)) {
    content = `export { default, config } from '${importPath}'\n`
  } else {
    content = `export { default } from '${importPath}'\n`
  }

  const outputPath = path.join(pagesFolder, pagePath)
    .replace(/\{/g, '[')
    .replace(/\}/g, ']')
  await fs.outputFile(outputPath, content)
}

const removePage = async (filePath) => {
  const pagePath = path.relative(modulesFolder, filePath).split(path.sep).splice(2).join(path.sep)
  await fs.remove(path.join(pagesFolder, pagePath))
}

const watch = async () => {
  chokidar
    .watch(path.join(modulesFolder, '*/pages/**/*.js'), { ignoreInitial: true })
    .on('add', filePath => addPage(filePath))
    .on('change', filePath => addPage(filePath))
    .on('unlink', filePath => removePage(filePath))
}

process.on('SIGINT', () => {
  process.exit(0)
})

watch()
