(function() {
	'use strict'; 
	
	angular
		.module('musicianist')
		.config(routing);

	function routing($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl : 'app/components/home/home.html',
			controller  : null
		})

		.when('/scales', {
			templateUrl : 'app/components/scales/scales.html',
			controller  : 'scalesCtrl'
		})

		.when('/chords', {
			templateUrl : 'app/components/chords/chords.html',
			controller  : null
		})

		.when('/circle-of-fifths', {
			templateUrl : 'app/components/circle-of-fifths/circle-of-fifths.html',
			controller  : null
		});

		$locationProvider.html5Mode(true);
	}
})();