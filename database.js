(function(require, exports) {
	'use strict';

	const Utils = require('./utils.js');
	const Sequelize = require('sequelize');
	var connection = new Sequelize('extremelot_ladri', 'extremelot_ladri', null, { //FIXME rendere la configurazione variabile
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
	mapping.Prodotto = connection.define('prodotto', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		codice: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		titolo: {
			type: Sequelize.STRING
			allowNull: false
		},
		descrizione: {
			type: Sequelize.STRING
			allowNull: false
		},
		costo: {
			type: Sequelize.DECIMAL
			allowNull: false
		},
		immagine: {
			type: Sequelize.BLOB
			allowNull: false
		}
	});

	mapping.ProdottoCategoria = connection.define('prodotto_categoria', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	});

	mapping.Categoria = connection.define('categoria', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		codice: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		titolo: {
			type: Sequelize.STRING
			allowNull: false
		},
		descrizione: {
			type: Sequelize.STRING
			allowNull: false
		},
		immagine: {
			type: Sequelize.BLOB
			allowNull: false
		}
	});

	mapping.Prodotto.hasMany(mapping.ProdottoCategoria, {
		as: 'Categorie',
		foreignKey: 'id_prodotto'
	});

	mapping.ProdottoCategoria.belongsTo(mapping.Prodotto, {
		as: 'Prodotto',
		foreignKey: 'id_prodotto'
	});

	mapping.Categoria.hasMany(mapping.ProdottoCategoria, {
		as: 'Prodotti',
		foreignKey: 'id_categoria'
	});

	mapping.ProdottoCategoria.belongsTo(mapping.Categoria, {
		as: 'Categoria',
		foreignKey: 'id_categoria'
	});

	mapping.Acquisto = connection.define('acquisto', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		dataAcquisto: {
			type: Sequelize.DATE
		},
		dataConsegna: {
			type: Sequelize.DATE
		}
	});

	mapping.Utente = connection.define('utente', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		lotname: {
			type: Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	} {
		setterMethods: {
			password: function(value) {
				this.setDataValue('password', Utils.passwordChipher(value));
			}
		}
	});

	mapping.Prodotto.hasMany(mapping.Acquisto, {
		as: 'Acquisti',
		foreignKey: 'id_prodotto'
	});

	mapping.Acquisto.belongsTo(mapping.Prodotto, {
		as: 'Prodotto',
		foreignKey: 'id_prodotto'
	});

	mapping.Utente.hasMany(mapping.Acquisto, {
		as: 'Acquisti',
		foreignKey: 'id_utente'
	});

	mapping.Acquisto.belongsTo(mapping.Utente, {
		as: 'Utente',
		foreignKey: 'id_utente'
	});

	connection.sync();

	exports.database = {
		"mapping": mapping,
		"connection": connection
	};
})(require, exports);
