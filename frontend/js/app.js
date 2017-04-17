angular.module('mercatino', ['ngCookies', 'ngSanitize', 'ui.router', 'ui.bootstrap']).config(function($httpProvider, $stateProvider, $urlRouterProvider) {
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
		controllerAs: 'vm',
		resolve: {
			loggedIn: checkLoggedin
		}
	});
	$httpProvider.interceptors.push('loginInterceptor');
}).factory('loginInterceptor', function($q, $location) {
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
}).controller('menuCtrl', function($scope) {
	var vm = this;
});
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
	// Initialize a new promise
	var deferred = $q.defer(); // Make an AJAX call to check if the user is logged in
	$http.get('/auth/session').success(function(user) { // Authenticated
		if (user !== '0') deferred.resolve(); // Not Authenticated
		else {
			deferred.reject();
			$location.url('/login?message=notLoggedIn');
		}
	});
	return deferred.promise;
};
