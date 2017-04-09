const Utils = require('./utils.js');

exports.main = (app, database) => {
	app.get('/api/products', function(req, res) {
		database.mapping.Prodotto.findAll().then((prodotti) => {
			//console.log(JSON.stringify(prodotti));
			for (var i = 0; i < prodotti.length; i++) {
				Utils.bufferToBase64(prodotti[i], 'immagine');
			}
			//console.log(JSON.stringify(prodotti));
			res.json(prodotti);
		});
	});
	app.post('/api/products', function(req, res) {
		if (!req.files)
			return res.status(400).send('Non è stata selezionata l\'immagine.');

		let immagine = req.files.immagine;
		database.mapping.Prodotto.create({
			codice: req.body.codice,
			titolo: req.body.titolo,
			descrizione: req.body.descrizione,
			costo: req.body.costo,
			immagine: immagine
		}).then((prodotto) => {
			Utils.bufferToBase64(prodotto, 'immagine');
			res.json(prodotto);
		});
	});
	app.get('/api/products/:productCode', function(req, res) {
		database.mapping.Prodotto.findAll({
			where: {
				codice: req.params.productCode
			}
		}).then((prodotti) => {
			var prodotto = Utils.getSingleResult(prodotti);
			if (prodotto == 404) {
				return res.status(404).json({
					"error": "Prodotto non trovato"
				});
			} else if (prodotto == 400) {
				return res.status(400).json({
					"error": "Più di un prodotto trovato"
				});
			} else {
				Utils.bufferToBase64(prodotto, 'immagine');
				res.json(prodotto);
			}
		});
	});
	app.put('/api/products/:productCode/assign/:categoryCode', function(req, res) {
		database.mapping.Prodotto.findAll({
			where: {
				codice: req.params.productCode
			}
		}).then((prodotti) => {
			var prodotto = Utils.getSingleResult(prodotti);
			if (prodotto == 404) {
				return res.status(404).json({
					"error": "Prodotto non trovato"
				});
			} else if (prodotto == 400) {
				return res.status(400).json({
					"error": "Più di un prodotto trovato"
				});
			}
			database.mapping.Categoria.findAll({
				where: {
					codice: req.params.categoryCode
				}
			}).then((categorie) => {
				var categoria = Utils.getSingleResult(categorie);
				if (categoria == 404) {
					return res.status(404).json({
						"error": "Categoria non trovata"
					});
				} else if (categoria == 400) {
					return res.status(400).json({
						"error": "Più di una categoria trovata"
					});
				}
				database.mapping.ProdottoCategoria.create({
					categoria: categoria,
					prodotto: prodotto
				}).then((prodCat) => {
					res.json(prodCat);
				});
			});
		});
	});
	app.delete('/api/products/:productCode', function(req, res) {
		database.mapping.Prodotto.findAll({
			where: {
				codice: req.params.productCode
			}
		}).then((prodotti) => {
			var prodotto = Utils.getSingleResult(prodotti);
			if (prodotto == 404) {
				return res.status(404).json({
					"error": "Prodotto non trovato"
				});
			} else if (prodotto == 400) {
				return res.status(400).json({
					"error": "Più di un prodotto trovato"
				});
			}
			prodotto.destroy().then(() => {
				return res.status(200).send('DELETED');
			});
		});
	});
};
