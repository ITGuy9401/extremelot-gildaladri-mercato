exports.configurePassport = (app, database) => {
	const expressSession = require('express-session');
	const passport = require('passport');
	const LocalStrategy = require('passport-local').Strategy;
	const Utils = require('./utils.js');
	const session = require('./passportutils.js');

	passport.use(new LocalStrategy({
		passReqToCallBack: true
	}, (usernameTxt, password, done) => {
		var findone = database.mapping.Utente.findOne({
			where: ["lower(username) like lower(?)", [usernameTxt]]
		}).then((user) => {
			if (user && Utils.validPassword(user, password)) {
				done(null, {
					id: user.id,
					lotname: user.lotname,
					username: user.username,
					email: user.email
				});
			}
			done(null, false);
			return;

		});
	}));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		database.mapping.Utente.findById(id, function(err, user) {
			console.log(err, user);
			done(err, user);
		});
	});
	app.get('/auth/session', Utils.ensureAuthenticated, session.session);
	app.post('/auth/session', session.login);
	app.del('/auth/session', session.logout);
}
