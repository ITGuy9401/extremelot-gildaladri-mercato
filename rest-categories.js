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
	app.get('/api/categories/:categoryId', function(req, res) {
		database.mapping.Categoria.findById(req.params.categoryId).then((categoria) => {
			res.json(categoria);
		});
	});
	app.delete('/api/categories/:categoryId', function(req, res) {
		database.mapping.Categoria.findById(req.params.categoryId).then((categoria) => {
			categoria.destroy().then(() => {
				return res.status(200).send('DELETED');
			});
		});
	});
};
