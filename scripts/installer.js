const path = require('path')
const fs = require('fs')
const cp = require("child_process")

function installDeps(functionDir, cb) {
  cp.exec("npm i", { cwd: functionDir }, cb)
}

(async () => {
  console.log('Installing example deps. This can take some time')
  console.log('Alternatively, you can cd into your example of choice and run "npm install"')
  console.log()
  const directory = path.join(__dirname, '..', 'examples')
	const foldersWithDeps = fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== 'node_modules')
    .filter((entry) => fs.existsSync(path.join(directory, entry.name, 'package.json')))
    .map((entry) => `${entry.name}/package.json`)

  const folders = foldersWithDeps.map(fnFolder => {
    return fnFolder.substring(0, fnFolder.indexOf("package.json"))
  }).map((folder) => {
    console.log(`Installing ${folder} deps`)
    installDeps(path.join(__dirname, '..', 'examples', folder), () => {
      console.log(`${folder} dependencies installed`)
    })
  })

})()
