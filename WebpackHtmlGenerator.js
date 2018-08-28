const FileSystem = require('fs')
const Path = require('path')

class WebpackHtmlGenerator {
  constructor(bundleName) {
    this.bundleName = bundleName
  }
  apply(compiler) {
    compiler.plugin('done', (stats) => {
      if (!stats.errors) {
        const html = FileSystem.readFileSync(Path.join(__dirname, 'public', 'template.html'), 'utf8')
        const htmlOutput = html.replace(/(bundle)/g, this.bundleName).replace(/\[hash\]/g, stats.hash)
        FileSystem.writeFileSync(Path.join(__dirname, 'public', 'index.html'), htmlOutput)
      }
    })
  }
}

module.exports = WebpackHtmlGenerator
