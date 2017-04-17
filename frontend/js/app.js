angular.module('mercatino', ['ngCookies', 'ngSanitize', 'ui.router', 'ui.bootstrap'])
	.factory('loginInterceptor', function($q, $location) {
		return {
			response: function(response) {
				// do something on success
				return response;
			},
			responseError: function(response) {
				if (response.status === 401) $location.url('/login');
				else if (response.status === 403) alert('Non sei atorizzato ad eseguire questa azione.');
				return $q.reject(response);
			}
		};
	})
	.config(function($httpProvider, $location, $stateProvider, $urlRouterProvider) {
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
		$httpProvider.interceptors.push('loginInterceptor');
	}).controller('menuCtrl', function($scope) {
		var vm = this;
	});
