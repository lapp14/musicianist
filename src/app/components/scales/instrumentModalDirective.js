(function() {
	'use strict';

	angular
		.module('musicianist')
		.directive('instrumentModal', instrumentModal);

	
	function instrumentModal() {
		return {
			templateUrl: '/app/components/scales/instrumentSelectModal.html'
		}
	}
})();