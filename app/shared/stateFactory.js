(function() {
	'use strict';

	angular
		.module('musicianist')
		.factory('state', stateFactory);

	function stateFactory() {
		var selection = {
			instrument: 'Guitar',			
			strings: {
				'Guitar': '6',
				'Bass Guitar': '4',
				'Piano': '0'
			},
			tuning: {
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
			}
		};

		var model = {
			instrument: {
				index: 		0,
				type: 		'Guitar',
				strings: 	'6',
				tuning: 	'0'
			},

			scale: {	
				index: 	'0',
				tonic: 	'0'
			},

			hand: 		'Right'
		};

		var service = {
			selection: selection,
			model: model
		};

		return service;
	};

})();