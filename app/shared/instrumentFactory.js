angular.module('musicianist').factory('instrument', ['instruments', function(instruments) {

	return {
		arr: instruments,
		instrumentType: 'Guitar',
		selectedStrings: {
			'Guitar': '6',
			'Bass Guitar': '4',
			'Piano': '0'
		},

		index: 0,
		handedness: '',

		getCurrentInstrument: function() {			
			return instruments[this.index];			
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
