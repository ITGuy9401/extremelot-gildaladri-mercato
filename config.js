const nconf = require('nconf');

// First consider commandline arguments and environment variables, respectively.
nconf.argv().env()
/*.file({
	file: 'config.json'
});*/


exports.nconf = nconf;
