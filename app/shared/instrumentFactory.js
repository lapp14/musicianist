(function(){
	'use strict';

	angular
		.module('musicianist')
		.factory('instrument', instrumentFactory);

	instrumentFactory.$inject = ['instruments', 'state'];

	function instrumentFactory(instruments) {

		var type = 'Guitar';
		
		var index = 3; //0 for default

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
			type: type,
			selectedStrings: selectedStrings,
			selectedTuning: selectedTuning,
			index: index,
			handedness: handedness,

			getCurrentInstrument: getCurrentInstrument,
			getCurrentTuning: getCurrentTuning,
			setStrings: setStrings,
			setSelection: setSelection
		}

		return service;
			

		function getCurrentInstrument() {			
			return instruments[this.index];			
		};

		function getCurrentTuning() {
			var i = this.type;

			return this.selectedTuning[i][this.selectedStrings[i]];
		};

		function setStrings(strings) {
			this.selectedStrings[this.type] = strings;
		};

		function setSelection(index) {
			index = parseInt(index);
			this.index = index;
			this.type = instruments[index].type;
		};	
	}
})();