angular.module('mercatino').controller('loginCtrl', function($scope) {
	var vm = this;
	vm.doSubmit = doSubmit;
	vm.form = {};

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
			alert("Errore nella login.\n");
			console.error("Errore nella login", response);
		});
	}
});
