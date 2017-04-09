const crypto = require('crypto');
const hash = crypto.createHash('sha256');

exports.validPassword = (user, password) => {
	return hash.digest(password) == user.password
};

exports.passwordChipher = (password) => {
	return hash.digest(password);
};

exports.getSingleResult = (results) => {
	if (!results || results.size == 0) {
		return 404;
	} else if (results.size > 1) {
		return 400;
	}
	return results[0];
};

exports.bufferToBase64 = (obj, prop) => {
	if (obj && obj[prop])
		obj[prop] = obj[prop].toString('base64');
}
