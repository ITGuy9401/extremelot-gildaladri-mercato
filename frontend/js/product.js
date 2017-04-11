angular.module('mercatino').controller('productCtrl', ['$http', '$scope', '$timeout', '$routeParams', function($http, $scope, $timeout, $routeParams) {
    var vm = this;
	 vm.refresh = getDetailProduct;

    vm.dataLoaded = false;

    function getDetailProduct() {
		 var productCode = $routeParams.productCode;

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
