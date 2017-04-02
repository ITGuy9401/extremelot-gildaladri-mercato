exports.main = (app, database) => {
	app.get('/api/categories', function(req, res) {
		database.mapping.Categoria.findAll().then((categorie) => {
			res.json(categorie);
		});
	});
	app.post('/api/categories', function(req, res) {

		let immagine = req.files ? req.files.immagine : null;
		database.mapping.Categoria.create({
			codice: req.body.codice,
			titolo: req.body.titolo,
			descrizione: req.body.descrizione,
			immagine: immagine
		}).then((categoria) => {
			res.json(categoria);
		});
	});
	app.get('/api/categories/:categoryCode', function(req, res) {
		database.mapping.Categoria.findAll({
			where: {
				codice: req.params.categoryCode
			}
		}).then((categorie) => {
			if (categoria == 404) {
				return res.status(404).json({
					"error": "Categoria non trovata"
				});
			} else if (categoria == 400) {
				return res.status(400).json({
					"error": "Più di una categoria trovata"
				});
			}
			res.json(categoria);
		});
	});
	app.delete('/api/categories/:categoryCode', function(req, res) {
		database.mapping.Categoria.findAll({
			where: {
				codice: req.params.categoryCode
			}
		}).then((categorie) => {
			if (categoria == 404) {
				return res.status(404).json({
					"error": "Categoria non trovata"
				});
			} else if (categoria == 400) {
				return res.status(400).json({
					"error": "Più di una categoria trovata"
				});
			}
			categoria.destroy().then(() => {
				return res.status(200).send('DELETED');
			});
		});
	});
};
