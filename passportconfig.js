// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var database = require("./database.js");
var Config = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
	secretOrKey: Config.get('JWT_SECRET'),
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
	var strategy = new Strategy(params, function(payload, done) {
		var usernameTxt = payload.username;
		var password = payload.password;
		database.mapping.Utente.findOne({
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

		}, (err) => {
			return done(new Error("User not found"), null);
		});

	});
	passport.use(strategy);
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
			return passport.authenticate("jwt", Config.get('JWT_SECRET'));
		}
	};
};
