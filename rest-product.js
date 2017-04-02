exports.main = (app, database) => {
	app.get('/products', function(req, res) {
		database.mapping.Prodotto.findAll().then((prodotti) => {
			res.json(prodotti);
		});
	});
	app.post('/products', function(req, res) {
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
			res.json(prodotto);
		});
	});
	app.get('/products/:productId', function(req, res) {
		database.mapping.Prodotto.findById(req.params.productId).then((prodotto) => {
			res.json(prodotto);
		});
	});
	app.put('/products/:productId/assign/:categoryId', function(req, res) {
		database.mapping.Prodotto.findById(req.params.productId).then((prodotto) => {
			database.mapping.Categoria.findById(req.params.categoryId).then((categoria) => {
				database.mapping.ProdottoCategoria.create({
					categoria: categoria,
					prodotto: prodotto
				}).then((prodCat) => {
					res.json(prodCat);
				});
			});
		});
	});
	app.delete('/products/:productId', function(req, res) {
		database.mapping.Prodotto.findById(req.params.productId).then((prodotto) => {
			prodotto.destroy().then(() => {
				return res.status(200).send('DELETED');
			});
		});
	});
};
