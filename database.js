(function(require, exports) {
	'use strict';

	const Utils = require('./utils.js');
	const Sequelize = require('sequelize');
	const Config = require('./config.js').nconf;
	console.log(Config);
	console.log(Config.get("JAWSDB_URL"));

	var connection = new Sequelize(Config.get('database:dbname'), Config.get('database:username'), Config.get('database:password'), {
		host: Config.get('database:host'),
		dialect: Config.get('database:dialect'),

		pool: {
			max: Config.get('database:pool:max'),
			min: Config.get('database:pool:min'),
			idle: Config.get('database:pool:idle')
		}
	});
	/*connection.authenticate().complete(function(err) {
		if (err) {
			console.error('Unable to connect to the database:', err);
		} else {
			console.debug('Connection has been established successfully.');
		}
	});*/

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
			type: Sequelize.STRING,
			allowNull: false
		},
		descrizione: {
			type: Sequelize.STRING,
			allowNull: false
		},
		costo: {
			type: Sequelize.DECIMAL,
			allowNull: false
		},
		immagine: {
			type: Sequelize.BLOB,
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
			type: Sequelize.STRING,
			allowNull: false
		},
		descrizione: {
			type: Sequelize.STRING,
			allowNull: false
		},
		immagine: {
			type: Sequelize.BLOB,
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
			type: Sequelize.DATE,
			allowNull: false
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
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
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
