angular.module('mercatino', ['ngCookies', 'ngSanitize', 'ui.router', 'ui.bootstrap']).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/mercatino');

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'loginCtrl',
		controllerAs: 'vm'
	}).state('mercatino', {
		url: '/mercatino',
		templateUrl: 'views/mercatino.html'
	}).state('regolamento', {
		url: '/regolamento',
		templateUrl: 'views/regolamento.html'
	}).state('prodotti', {
		url: '/prodotti',
		templateUrl: 'views/prodotti.html',
		controller: 'productsCtrl',
		controllerAs: 'vm'
	}).state('prodotto', {
		url: '/prodotto/:productCode',
		templateUrl: 'views/prodotto.html',
		controller: 'productCtrl',
		controllerAs: 'vm'
	}).state('admin', {
		url: '/admin',
		templateUrl: 'views/admin.html',
		controller: 'adminCtrl',
		controllerAs: 'vm'
	});


}).controller('menuCtrl', function($scope) {
	var vm = this;
});
