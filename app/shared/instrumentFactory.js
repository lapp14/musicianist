

angular.module('musicianist').factory('instrument', ['instruments', function(instruments) {

	return {
		arr: instruments,
		instrumentType: 'Guitar',
		selectedStrings: {
			'Guitar': '6',
			'Bass Guitar': '4',
			'Piano': '0'
		},

		selectedTuning: {
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
		},

		index: 0,
		handedness: '',

		getCurrentInstrument: function() {			
			return instruments[this.index];			
		},

		getCurrentTuning: function() {
			var i = this.instrumentType;

			return this.selectedTuning[i][this.selectedStrings[i]];
		},

		setSelection: function(index) {
			index = parseInt(index);
			this.index = index;
			console.log(index)
			console.log(instruments[index])
			this.instrumentType = instruments[index].type;
		}
	}
}]);
