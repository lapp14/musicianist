(function(){
	'use strict';

	angular.module('musicianist').factory('instrument', ['instruments', instrumentFactory]);

	function instrumentFactory(instruments) {

		var instrumentType = 'Guitar';
		var index = 0;
		var handedness = 'Right';
		var selectedStrings = {
			'Guitar': '6',
			'Bass Guitar': '4',
			'Piano': '0'
		};
		var selectedTuning = {
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

		var service = {
			arr: instruments,
			instrumentType,
			selectedStrings,
			selectedTuning,
			index,
			handedness,

			getCurrentInstrument,
			getCurrentTuning,
			setSelection
		}

		return service;
			

		function getCurrentInstrument() {			
			return instruments[this.index];			
		};

		function getCurrentTuning() {
			var i = this.instrumentType;

			return this.selectedTuning[i][this.selectedStrings[i]];
		};

		function setSelection(index) {
			index = parseInt(index);
			this.index = index;
			console.log(index)
			console.log(instruments[index])
			this.instrumentType = instruments[index].type;
		};	
	}
})();