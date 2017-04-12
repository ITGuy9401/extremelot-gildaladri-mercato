angular.module('mercatino').controller('productCtrl', ['$http', '$scope', '$timeout', '$stateParams', function($http, $scope, $timeout, $stateParams) {
	var vm = this;
	vm.refresh = getDetailProduct;

	vm.dataLoaded = false;

	function getDetailProduct() {
		var productCode = $stateParams.productCode;

		$http({
			method: 'GET',
			url: '/api/products/' + productCode
		}).then((response) => {
			$timeout(() => {
				vm.data = response.data;
			}, 500)
		}, (response) => {
			alert("Errore nel recuperare il dettaglio del prodotto. Ricaricare la pagina.");
			console.error("Errore nel recuperare il dettaglio del prodotto. Ricaricare la pagina.", response);
		});
	}

	getDetailProduct();

	$scope.$watch(() => {
		return vm.data
	}, (newValue) => {
		vm.dataLoaded = newValue && true;
	}, true);
}]);
