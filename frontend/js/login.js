angular.module('mercatino').controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
	var vm = this;
	vm.doSubmit = doSubmit;
	vm.form = {};
	vm.alerts = [];

	vm.addAlert = (type, message) => {
		vm.alerts.push({
			msg: message,
			type: type
		});
	};

	vm.closeAlert = (index) => {
		vm.alerts.splice(index, 1);
	};

	function doSubmit() {
		$http({
			method: 'POST',
			url: '/api/login',
			data: {
				'username': vm.form.username,
				'password': vm.form.password
			}
		}).then((response) => {
			console.log(JSON.stringify(response));
		}, (response) => {
			if (response.status == 401) {
				vm.addAlert('warning', 'Username o password errati');
			} else if (response.status > 500 || response.status == 404) {
				vm.addAlert('danger', 'Il server è andato in errore. Riprova più tardi');
			} else {
				vm.addAlert('danger', 'Errore non gestito: ' + response.statusText + ' ' + response.status + ' - ' + response.data);
			}
			console.error("Errore nella login", response);
		});
	}
}]);
