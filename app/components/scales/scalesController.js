(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('scalesCtrl', scalesController);

	scalesController.$inject = ['$location', 'async', 'state', 'svgSurface', 'scales', 'instrument'];

	function scalesController($location, async, state, svgSurface, scales, instrument){
		var vm = this;

		vm.JSONData = {};
		vm.drawing = {};

		vm.selection = scales.selection;
		vm.instrument = instrument;
		vm.svgSurface = svgSurface;

		vm.modal = null;
		vm.tooltip = null;		
			
		vm.setInstrument = setInstrument;
		vm.getCurrentTuningNotes = getCurrentTuningNotes;
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
			var scale      	= vm.JSONData.scales[scales.selection.scale];
			var tonic      	= parseInt(scales.selection.tonic);
			var tuningIndex = vm.instrument.getCurrentTuning();
			var tuning     	= vm.instrument.type == 'Piano' ? null : vm.JSONData.tunings[tuningIndex];

			scales.drawScale(scale, tonic,  tuning);
			vm.scaleNotes = scales.getNotesString(scale, tonic);
		};

		function setInstrument(index) {
			var i = vm.instrument;		
			vm.instrument.setSelection(index || 0);
			svgSurface.loadBackground(i.getCurrentInstrument(), i.handedness).then(drawScale);
		}

		function reload() {
			var i = vm.instrument;
			svgSurface.loadBackground(i.getCurrentInstrument(), i.handedness).then(drawScale);	
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
			var notes = vm.JSONData.tunings[index].notes;
			var string = '';

			for(var i = 0; i < notes.length; i++) {
				string += scales.getNote(notes[i]);
			}

			return string;
		}

		function action() {
			svgSurface.getGroup().transformGroup.transform("s0.5,0.5t200,10");
		}
	}
})();