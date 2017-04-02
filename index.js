const database = require('./database.js').database;
const express = require('express');
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


app.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})
);


require('./rest-product.js')(app, database);

app.listen(4242, function() { // FIXME rendere variabile la porta
	console.log('GILDALADRI-MARKET LISTENING ON PORT 4242\nTELL ME I\'M PRETTY');
});
