angular.module('mercatino').controller('productsCtrl', ['$http', function($http) {
	var vm = this;
	vm.getListProducts = getListProducts;
	vm.getListCategories = getListCategories;
	vm.elaboraFiltro = elaboraFiltro;

	vm.filter = {
		form: {},
		data: {}
	}

	function elaboraFiltro() {
		let categoria = vm.filter.form.categoria;
		let titolo = vm.filter.form.titolo;
		if (categoria && categoria.length == 0) {
			categoria = undefined;
		}
		if (titolo && titolo.length == 0) {
			titolo = undefined;
		}
		vm.filter.data.categoria = categoria;
		vm.filter.data.titolo = titolo;
	}

	function getListProducts() {
		$http({
			method: 'GET',
			url: '/api/products'
		}).then((response) => {
			vm.prodotti = response.data;
		}, (response) => {
			alert.show("Errore nel recuperare l'elenco dei prodotti. Ricaricare la pagina.");
			console.error("Errore nel recuperare l'elenco dei prodotti. Ricaricare la pagina.", response);
		});
	}

	function getListCategories() {
		$http({
			method: 'GET',
			url: '/api/categories'
		}).then((response) => {
			vm.categorie = response.data;
		}, (response) => {
			alert.show("Errore nel recuperare l'elenco delle categorie. Ricaricare la pagina.");
			console.error("Errore nel recuperare l'elenco delle categorie. Ricaricare la pagina.", response);
		});
	}
	getListProducts();
	getListCategories();
}]);
