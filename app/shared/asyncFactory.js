(function() {
	'use strict';

	angular
		.module('musicianist')
		.factory('async', asyncFactory);

	function asyncFactory($http) {

		var service = {
			getJSON
		};

		return service;

		function getJSON(file) {
			return $http.get(file).then(function (response){
				if(typeof response === 'object') {
					return response.data;
				} else {
					return $q.reject(response.data);
				}	
			});	
		}		
	}
})(); 