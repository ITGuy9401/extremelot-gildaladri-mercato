const crypto = require('crypto');
const hash = crypto.createHash('sha256');

exports.validPassword = (user, password) => {
	return hash.digest(password) == user.password
};

exports.passwordChipher = (password) => {
	return hash.digest(password);
};
