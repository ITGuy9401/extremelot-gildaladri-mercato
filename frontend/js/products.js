angular.module('mercatino').controller('productsCtrl', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {
	var vm = this;
	vm.getListProducts = getListProducts;
	vm.getListCategories = getListCategories;
	vm.elaboraFiltro = elaboraFiltro;

	vm.filter = {
		form: {},
		data: {}
	}

	vm.dataLoaded = false;

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
			$timeout(() => {
				vm.prodotti = response.data;
			}, 500)
		}, (response) => {
			alert("Errore nel recuperare l'elenco dei prodotti. Ricaricare la pagina.");
			console.error("Errore nel recuperare l'elenco dei prodotti. Ricaricare la pagina.", response);
		});
	}

	function getListCategories() {
		$http({
			method: 'GET',
			url: '/api/categories'
		}).then((response) => {
			$timeout(() => {
				vm.categorie = response.data;
			}, 500)
		}, (response) => {
			alert("Errore nel recuperare l'elenco delle categorie. Ricaricare la pagina.");
			console.error("Errore nel recuperare l'elenco delle categorie. Ricaricare la pagina.", response);
		});
	}
	getListProducts();
	getListCategories();
	$scope.$watch(() => {
		return [vm.categorie, vm.prodotti]
	}, (newValue) => {
		vm.dataLoaded = newValue[0] && newValue[1];
	}, true);
}]);;
