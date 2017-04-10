angular.module('mercatino', ['ngRoute', 'ui.bootstrap']).config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/mercatino', {
        templateUrl: 'views/mercatino.html'
    }).when('/regolamento', {
        templateUrl: 'views/regolamento.html'
    }).when('/prodotti', {
        templateUrl: 'views/prodotti.html',
        controller: 'productsCtrl',
        controllerAs: 'vm'
    }).when('/admin', {
        templateUrl: 'views/admin.html'
    }).when('/login', {
        templateUrl: 'views/login.html'
    }).otherwise({
        redirectTo: '/mercatino'
    });

}).controller('menuCtrl', function($scope) {
    var vm = this;
});
