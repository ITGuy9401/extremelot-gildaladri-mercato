const database = require('./database.js').database;
const express = require('express');
const app = express();
require('./rest-product.js')(app, database);

app.listen(4242, function() { // FIXME rendere variabile la porta
	console.log('GILDALADRI-MARKET LISTENING ON PORT 4242\nTELL ME I\'M PRETTY');
});
