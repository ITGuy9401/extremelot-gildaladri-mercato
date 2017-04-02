const database = require('./database.js').database;
const express = require('express');
const morgan = require('morgan'); // log requests to the console (express4)
const bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Utils = require('./utils.js');

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

app.use(express.static(__dirname + '/frontend')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());
app.get('*', function(req, res) {
	res.sendfile('./frontend/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})
);


require('./rest-product.js').main(app, database);

app.listen(4242, function() { // FIXME rendere variabile la porta
	console.log('GILDALADRI-MARKET LISTENING ON PORT 4242\nTELL ME I\'M PRETTY');
});
