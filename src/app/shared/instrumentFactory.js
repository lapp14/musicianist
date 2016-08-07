(function(){
	'use strict';

	angular
		.module('musicianist')
		.factory('instrument', instrumentFactory);

	instrumentFactory.$inject = ['instruments', 'state'];

	function instrumentFactory(instruments, state) {		

		var service = {
			arr: instruments,

			getCurrentInstrument: getCurrentInstrument,
			getInstrumentIndex: getInstrumentIndex,
			getCurrentTuning: getCurrentTuning,
			isStringedInstrument: isStringedInstrument,
			setStrings: setStrings,
			setSelection: setSelection
		}

		return service;
			

		function getCurrentInstrument() {
			return instruments[state.index];			
		};

		function getInstrumentIndex() {
			return state.index;						
		}

		function getCurrentTuning() {
			var i = getCurrentInstrument().type;

			if(state.selectedTuning[i] == null) {
				//console.log('undef')
				return null;
			}

			return state.selectedTuning[i][state.selectedStrings[i]];
		};

		function isStringedInstrument() {
			if(getCurrentTuning() == null) {
				return false;
			}

			return true;
		}

		function setStrings(strings) {
			state.selectedStrings[state.type] = strings;
		};

		function setSelection(index) {
			index = parseInt(index);
			state.index = index;
			state.type = instruments[index].type;
			//console.log('state index ' + state.index);
			//console.log('state type ' + state.type);
		};	
	}
})();