(function() {
	'use strict';

	angular
		.module('musicianist')
		.factory('state', stateFactory);

	stateFactory.$inject = ['$cookies'];

	function stateFactory($cookies) {

		var consent = $cookies.get('consent');
		var s = $cookies.getObject('state') || {};

		console.log('crap ' +s.index)
		
		var type =  s.type || 'Guitar';		
		var index = s.index || 0; //0 for default
		var handedness 	= s.handedness || 'Right';

		var selectedStrings = s.selectedStrings  || {
			'Guitar': '6',
			'Bass Guitar': '4',
			'Piano': '0'
		};

		var selectedTuning = s.selectedTuning || {
			'Guitar': {
				'6': '0',
				'7': '5',
				'8': '7'
			},
			'Bass Guitar': {
				'4': '8',
				'5': '9',
				'6': '10'
			},

			'Piano': null
		};


		var scale = s.scale || '0';
        var tonic = s.tonic || '0';
		
		var service = {
			type: type,
			index: index,
			handedness: handedness,
			selectedStrings: selectedStrings,
			selectedTuning: selectedTuning,
			scale: scale,
			tonic: tonic,
			writeCookie: writeCookie
		}

		function writeCookie() {
			if($cookies.get('consent')) {
				$cookies.putObject('state', service);
				console.log('s.index ' + s.index);
				console.log('service.index ' + service.index);
				console.log('writing cookie');
			}
		}
		
		return service;
	};

})();