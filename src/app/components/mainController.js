(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('mainController', mainController);

	function mainController($scope, $location) {
		
		var vm = this;

		vm.menuClass = menuClass;

		function menuClass(page) {
			var current = $location.path().substring(1);
			return current.includes(page) ? 'active' : '';
		}
	} 
})();