(function() {
	'use strict'; 
	
	angular
		.module('musicianist')
		.config(routing)
		.run(run);
		
	function routing($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			pageTitle	: 'Musicianist - Interactive Scale Diagrams for Guitar, Bass Guitar and Piano',
			pageDesc	: 'Music makes you feel. Learn to play. Interactive scale diagram app for Guitar, Bass Guitar and Piano. Figure out your chords and keys with the Circle of Fifths.',	
			templateUrl : 'app/components/home/home.html',
			controller  : null
		})

		.when('/scales/', {
			pageTitle	: 'Musicianist - Interactive Scale Diagrams for Guitar, Bass Guitar and Piano',
			pageDesc	: 'Learn your scales with our Interactive Scale Diagram app. Choose your instrument and tuning, and pick from the most popular scales.',
			templateUrl : 'app/components/scales/scales.html',

			controller  : 'scalesCtrl',
			controllerAs: 'Scales'
		})

		.when('/scales/:instType', {
			pageTitle	: 'Musicianist - Interactive Scale Diagrams for Guitar, Bass Guitar and Piano',
			pageDesc	: 'Learn your scales with our Interactive Scale Diagram app. Choose your instrument and tuning, and pick from the most popular scales.',
			templateUrl : 'app/components/scales/scales.html',
			controller  : 'scalesCtrl',
			controllerAs: 'Scales'
		})

		.when('/scales/:tonic/:scale', {
			pageTitle	: 'Musicianist - Interactive Scale Diagrams for Guitar, Bass Guitar and Piano',
			pageDesc	: 'Learn your scales with our Interactive Scale Diagram app. Choose your instrument and tuning, and pick from the most popular scales.',
			templateUrl : 'app/components/scales/scales.html',
			controller  : 'scalesCtrl',
			controllerAs: 'Scales'
		})

		.when('/scales/:instType/:tonic/:scale', {
			pageTitle	: 'Musicianist - Interactive Scale Diagrams for Guitar, Bass Guitar and Piano',
			pageDesc	: 'Learn your scales with our Interactive Scale Diagram app. Choose your instrument and tuning, and pick from the most popular scales.',
			templateUrl : 'app/components/scales/scales.html',
			controller  : 'scalesCtrl',
			controllerAs: 'Scales'
		})

		/*.when('/chords', {
			templateUrl : 'app/components/chords/chords.html',
			controller  : null
		})*/

		.when('/circle-of-fifths', {
			pageTitle	: 'Musicianist - Circle of Fifths',
			pageDesc	: 'No matter what instrument, the Circle of Fifths is an important tool for figuring out chord progressions and musical keys. Switch betweenthe 7 modern modes, and learn the chords in each key.',
			templateUrl : 'app/components/circle-of-fifths/circle-of-fifths.html',
			controller  : 'circleCtrl',
			controllerAs: 'Circle'
		})

		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
	}

	function run($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.pageTitle = current.$$route.pageTitle;
			$rootScope.pageDesc  = current.$$route.pageDesc;
		});
	};
})();