const database = require('./database.js').database;
const express = require('express');
const morgan = require('morgan'); // log requests to the console (express4)
const bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const fileUpload = require('express-fileupload');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Utils = require('./utils.js');
const Config = require('./config.js').nconf;

const app = express();

passport.use(new LocalStrategy(
	function(username, password, done) {
		database.mapping.Utente.findOne({
			username: username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username.'
				});
			}
			if (!Utils.validPassword(user, password)) {
				return done(null, false, {
					message: 'Incorrect password.'
				});
			}
			return done(null, {
				'id': user.id,
				'lotname': user.lotname,
				'username': user.username
			});
		});
	}));

app.use(express.static(__dirname + '/frontend')); // set the static files location eg. /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());
app.use(fileUpload());

app.set('env', Config.get('ENV'));

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		'error': {
			message: err.message,
			error: (app.get('ENV') === 'development') ? err : {}
		}
	});
});

app.get('/market', (req, res) => {
	res.sendfile('./frontend/market.html');
});

app.post('/login',
	passport.authenticate('local', {
		successRedirect: '/market/#!/admin',
		failureRedirect: '/market/#!/login',
		failureFlash: true
	})
);

require('./rest-products.js').main(app, database);
require('./rest-categories.js').main(app, database);

app.get('*', function(req, res) {
	res.sendfile('./frontend/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(Config.get('PORT'), function() {
	console.log('GILDALADRI-MARKET LISTENING ON PORT ' + Config.get('PORT'));
});
