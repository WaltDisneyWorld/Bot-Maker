const { copyFileSync } = require('fs')

function reactDevRequiements () {
  copyFileSync(
    './scripts/requirements/paths.js',
    './node_modules/react-scripts/config/paths.js'
  )
  copyFileSync(
    './scripts/requirements/webpack.config.js',
    './node_modules/react-scripts/config/webpack.config.js'
  )
}

reactDevRequiements()
