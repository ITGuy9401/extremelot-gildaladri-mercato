(function(require, exports) {
	'use strict';

	var Sequelize = require('sequelize');
	var connection = new Sequelize('extremelot_ladri', 'extremelot_ladri', null, {
		host: 'localhost',
		dialect: 'mysql',

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	});
	connection.authenticate().complete(function(err) {
		if (err) {
			console.error('Unable to connect to the database:', err);
		} else {
			console.debug('Connection has been established successfully.');
		}
	});

	var mapping = {};
	mapping.prodotto = connection.define('prodotto', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		firstName: {
			type: Sequelize.STRING,
			field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
		},
		lastName: {
			type: Sequelize.STRING
		}
	});

})(require, exports);
