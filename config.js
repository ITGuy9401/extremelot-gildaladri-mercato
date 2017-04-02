const nconf = require('nconf');

// First consider commandline arguments and environment variables, respectively.
nconf.argv().env();

exports.nconf = nconf;
