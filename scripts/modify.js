const path = require('path')
const glob = require('glob-promise')
const fs = require('fs-extra')

const scriptsFolder = __dirname
const rootFolder = path.join(scriptsFolder, '../')
const modulesFolder = path.join(rootFolder, 'modules')
const pagesFolder = path.join(rootFolder, 'pages')

const replaceAt = function (str, index, replacement, extra = '') {
  return str.substr(0, index) + replacement + extra + str.substr(index + replacement.length)
}

const start = async () => {
  const jsPaths = await glob(path.join(modulesFolder, '**/*.js'))
  for (let i = 0; i < jsPaths.length; i++) {
    const jsPath = jsPaths[i]
    let content = await fs.readFile(jsPath, 'utf8')

    const regex = /\{([^}]*)\}.*db\/models/gm
    const matches = content.matchAll(regex)
    for (const match of matches) {
      // console.log(i, jsPath)
      // console.log(match[0].replace(/\s/g, ''), '>>>>>', match.index, '>>>>>', match[1].replace(/\s/g, ''))
      const modelFuncs = match[1].replace(/\s/g, '').split(',')
      // console.log('found model functions', modelFuncs)

      modelFuncs.forEach(funcName => {
        const re = new RegExp(`^(?!.*(//)).*\\b${funcName}\\b[(](?!db,)`, 'gm')
        console.log(re)
        const funcMatches = content.matchAll(re)
        let k = 0
        for (const fm of funcMatches) {
          if (k > -1) {
            const line = fm[0]
            if (
              !line.includes('logger.') &&
              !line.includes('console.log')
            ) {
              // console.log(i, jsPath)
              console.log(fm.index, fm[0])
              content = replaceAt(content, fm.index + k * 4, fm[0], 'db, ')
              fs.outputFileSync(jsPath, content)
            }
          }
          k++
        }
      })
    }

    // console.log(content)
  }
}

start()
