const { pathExists, remove, copy } = require('fs-extra')
const exec = require('util').promisify(require('child_process').exec)

async function tscBuild () {
  if (await pathExists('./build')) await remove('./build', { recursive: true })
  await exec('npx tsc')
  await copy('./src/renderer', './build/renderer')
  await copy('./src/resources', './build/resources')
}

tscBuild()
