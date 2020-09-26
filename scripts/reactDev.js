const { copyFileSync } = require('fs')
const { exec } = require('child_process')

copyFileSync(
  './scripts/requirements/paths.js',
  './node_modules/react-scripts/config/paths.js'
)
copyFileSync(
  './scripts/requirements/webpack.config.js',
  './node_modules/react-scripts/config/webpack.config.js'
)

exec('npx react-scripts start')
