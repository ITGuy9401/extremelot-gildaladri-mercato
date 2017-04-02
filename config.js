const nconf = require('nconf');

// First consider commandline arguments and environment variables, respectively.
nconf.argv().env();

// Then load configuration from a designated file.
nconf.file({
	file: 'config.json'
});

// Provide default values for settings not provided above.
nconf.defaults({
	'env': 'development',
	'http': {
		'port': 4242
	}
});

exports.nconf = nconf;
