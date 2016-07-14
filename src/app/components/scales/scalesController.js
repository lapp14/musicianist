(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('scalesCtrl', scalesController);

	scalesController.$inject = ['$location', 'async', 'state', 'svgSurface', 'scales', 'instrument'];

	function scalesController($location, async, state, svgSurface, scales, instrument){
		var appLoaded = false;
		var vm = this;

		vm.JSONData = {};
		vm.drawing = {};

		vm.state = state;
		vm.instrument = instrument;
		vm.svgSurface = svgSurface;

		vm.modal = null;
		vm.tooltip = null;		
			
		vm.setInstrument = setInstrument;
		vm.getCurrentTuningNotes = getCurrentTuningNotes;
		
		vm.scale = {
			getTitle: 	 getScaleTitle,
			getSubtitle: getScaleSubtitle
		};

		vm.drawing.drawScale = drawScale;
		vm.drawing.reload = reload;
		vm.action = action; //testing only

		async.getJSON('/assets/json/tunings.json').then(function (data) {
			vm.JSONData.tunings = data.tunings;
			start();
		}, function (error) {
			//console.log('async.get error tunings.json');
		});		

		async.getJSON('/assets/json/scales.json').then(function (data) {
			vm.JSONData.scales = data.scales;		
			vm.JSONData.tonics = data.tonics;	
			start();
		}, function (error) {
			//console.log('async.get error scales.json');
		});		


		function drawScale() {
			var scale      	= vm.JSONData.scales[state.scale];
			var tonic      	= parseInt(state.tonic);
			var tuningIndex = vm.instrument.getCurrentTuning();
			var tuning     	= vm.instrument.type == 'Piano' ? null : vm.JSONData.tunings[tuningIndex];

			scales.drawScale(scale, tonic, tuning);
			vm.scaleNotes = scales.getNotesString(scale, tonic);

			if(appLoaded) {
				state.writeCookie();
			}

			appLoaded = true;
		};

		function setInstrument(index) {
			instrument.setSelection(index || 0);
			svgSurface.loadBackground(instrument.getCurrentInstrument(), state.handedness).then(drawScale);
		}

		function reload() {			
			svgSurface.loadBackground(instrument.getCurrentInstrument(), state.handedness).then(drawScale);	
		}

		function start() {
			if(vm.JSONData.tunings && vm.JSONData.scales && vm.JSONData.tonics) {
				vm.drawing.reload();
			}
		}

		function getCurrentTuningNotes() {
			if(vm.JSONData.tunings == null) {
				return '';
			}

			var index = vm.instrument.getCurrentTuning();

			if(index == null) {
				return null;
			}

			var notes = vm.JSONData.tunings[index].notes;
			var string = '';

			for(var i = 0; i < notes.length; i++) {
				string += scales.getNote(notes[i]);
			}

			return string;
		}

		function getScaleTitle() {
			if(vm.JSONData.scales) {
				var s = vm.JSONData.scales[state.scale];
				return s.h1 || s.name;
			}
		}

		function getScaleSubtitle() {
			if(vm.JSONData.scales) {
				var s = vm.JSONData.scales[state.scale];
				return s.h2 || '';
			}
		}

		function action() {
			svgSurface.getGroup().transformGroup.transform("s0.5,0.5t200,10");
		}
	}
})();