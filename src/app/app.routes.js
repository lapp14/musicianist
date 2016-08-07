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

		.when('/scales/', {
			templateUrl : 'app/components/scales/scales.html',
			controller  : 'scalesCtrl',
			controllerAs: 'Scales'
		})

		.when('/scales/:instType/:tonic/:scale', {
			templateUrl : 'app/components/scales/scales.html',
			controller  : 'scalesCtrl',
			controllerAs: 'Scales'
		})

		/*.when('/chords', {
			templateUrl : 'app/components/chords/chords.html',
			controller  : null
		})*/

		.when('/circle-of-fifths', {
			templateUrl : 'app/components/circle-of-fifths/circle-of-fifths.html',
			controller  : 'circleCtrl',
			controllerAs: 'Circle'
		})

		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
	}
})();