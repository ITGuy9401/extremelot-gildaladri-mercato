'use strict';

angular.module('mercatino')
	.factory('Auth', function Auth($location, $rootScope, $q, $cookieStore) {
		$rootScope.currentUser = $cookieStore.get('user') || null;
		$cookieStore.remove('user');
		return {
			login: function(username, password) {
				return $http({
					method: 'POST',
					url: '/api/login',
					data: {
						'username': username,
						'password': password
					}
				});
			},
			logout: function() {
				return $http({
					method: 'DELETE',
					url: '/api/login'
				});
			},
			currentSession: function() {
				// Initialize a new promise
				var deferred = $q.defer(); // Make an AJAX call to check if the user is logged in
				$http.get('/auth/session').then(function(user) { // Authenticated
					if (user !== '0') deferred.resolve(); // Not Authenticated
					else {
						deferred.reject();
						$location.url('/login?message=notLoggedIn');
					}
				});
				return deferred.promise;
			},
			changePassword: function(oldPwd, newPwd) {
				return $http({
					method: 'POST',
					url: '/api/changePassword',
					data: {
						'username': oldPwd,
						'password': newPwd
					}
				});
			}
		};
	});
