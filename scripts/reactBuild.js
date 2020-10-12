const { copy, unlink, readdirSync, rmdirSync } = require('fs-extra')
const { execSync } = require('child_process')
const glob = require('glob')
const minify = require('@node-minify/core')
const htmlMinifier = require('@node-minify/html-minifier')
const cssnano = require('@node-minify/cssnano')
const uglifyES = require('@node-minify/uglify-es')

async function reactBuild () {
  await copy(
    './scripts/requirements/paths.js',
    './node_modules/react-scripts/config/paths.js'
  )
  await copy(
    './scripts/requirements/webpack.config.js',
    './node_modules/react-scripts/config/webpack.config.js'
  )

  execSync('npx react-scripts build')

  await unlink('./build/service-worker.js')
  await unlink(
    './build/' + readdirSync('./build').find((f) => f.startsWith('precache'))
  )
  await unlink('./build/asset-manifest.json')

  await copy('./build/css', './build/static/css', { recursive: true })
  await copy('./build/html', './build/static/html', { recursive: true })
  await copy('./build/js', './build/static/js', { recursive: true })
  await copy('./build/media', './build/static/media', {
    recursive: true
  })
  rmdirSync('./build/css', { recursive: true })
  rmdirSync('./build/html', { recursive: true })
  rmdirSync('./build/js', { recursive: true })
  rmdirSync('./build/media', { recursive: true })

  glob('./build/**/*.html', async (err, files) => {
    for (const file of files) {
      await minify({
        compressor: htmlMinifier,
        input: file,
        output: file,
        options: {
          ignoreCustomComments: [/^!/]
        }
      })
    }
  })
  glob('./build/**/*.css', async (err, files) => {
    for (const file of files) {
      await minify({
        compressor: cssnano,
        input: file,
        output: file
      })
    }
  })
  glob('./build/**/*.js', async (err, files) => {
    for (const file of files) {
      await minify({
        compressor: uglifyES,
        input: file,
        output: file,
        options: {
          output: {
            comments: /^!/
          }
        }
      })
    }
  })
}

reactBuild()
