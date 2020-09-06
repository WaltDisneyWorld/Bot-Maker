const { exec } = require('child_process');
const { copyFileSync } = require('fs');

exec('npx react-scripts start');
exec('npx electron public/main');

copyFileSync(
  './custom.webpack.config.js', 
  './node_modules/react-scripts/config/webpack.config.js'
);
