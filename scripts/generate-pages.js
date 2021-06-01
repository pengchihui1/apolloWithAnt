const path = require('path')
const glob = require('glob-promise')
const fs = require('fs-extra')

const scriptsFolder = __dirname
const rootFolder = path.join(scriptsFolder, '../')
const modulesFolder = path.join(rootFolder, 'modules')
const pagesFolder = path.join(rootFolder, 'pages')

const generateModulePages = async (module) => {
  const modulePagesFolder = path.join(modulesFolder, module, 'pages')
  const pagePaths = await glob(path.join(modulePagesFolder, '**/*.js'))
  for (let i = 0; i < pagePaths.length; i++) {
    const filePath = pagePaths[i]
    const pagePath = path.relative(modulePagesFolder, filePath)
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
}

const generatePages = async () => {
  const modulePaths = await glob(path.join(modulesFolder, '*/'))
  const modules = modulePaths.map(match => path.relative(modulesFolder, match))
  // console.log('found modules', modules)
  await Promise.all(modules.map(module => generateModulePages(module)))
}

const removePages = async () => {
  const pagePaths = await glob(path.join(pagesFolder, '*'))
  const pages = pagePaths.map(match => path.relative(pagesFolder, match))
  // console.log('found pages', pages)
  await Promise.all(pages.map(page => {
    if (page !== '.gitkeep') {
      return fs.remove(path.join(pagesFolder, page))
    }
    return null
  }))
}

removePages()
  .then(generatePages)
