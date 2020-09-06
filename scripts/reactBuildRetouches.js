const { 
	unlinkSync, 
	readdirSync, 
	copyFileSync 
} = require('fs');

unlinkSync('./build/service-worker.js');
unlinkSync(
  './build/' + readdirSync('./build')
    .find(f => f.startsWith('precache'))
);
unlinkSync('./build/asset-manifest.json');
copyFileSync(
  './custom.webpack.config.js', 
  './node_modules/react-scripts/config/webpack.config.js'
);
