(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('scalesCtrl', scalesController);

	scalesController.$inject = ['$location', '$routeParams', '$rootScope', 'async', 'state', 'svgSurface', 'scales', 'instrument'];

	function scalesController($location, $routeParams, $rootScope, async, state, svgSurface, scales, instrument) {
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
			console.log('drawScale()');
			var scale      	= vm.JSONData.scales[state.scale];
			var tonic      	= parseInt(state.tonic);
			var tuningIndex = vm.instrument.getCurrentTuning();

			var tuning     	= vm.state.type == 'Piano' ? null : vm.JSONData.tunings[tuningIndex];

			scales.drawScale(scale, tonic, tuning);
			vm.scaleNotes = scales.getNotesString(scale, tonic);

			if(appLoaded) {
				state.writeCookie();
			}

			appLoaded = true;
			setUrlParameters();
		};

		function setInstrument(index) {
			console.log('setInstrument()');
			instrument.setSelection(index || 0);
			svgSurface.loadBackground(instrument.getCurrentInstrument(), state.handedness).then(drawScale);
		}

		function reload() {			
			console.log('reload()');
			svgSurface.loadBackground(instrument.getCurrentInstrument(), state.handedness).then(drawScale);	
		}

		function setUrlParameters() {
			console.log('setUrlParameters()')
			var j = vm.JSONData;
			var t = vm.state.type;

			$location.update_path('/scales/' + t.replace(/ /g, '-') + '/' + j.tonics[vm.state.tonic].replace(/\//g, '-') + '/' + j.scales[vm.state.scale].name.replace(/ /g, '-'));
			$rootScope.pageTitle = 'Musicianist - ' + j.tonics[vm.state.tonic] + ' ' + j.scales[vm.state.scale].name + ' ' + t + ' scale pattern';
			$rootScope.pageDesc = 'Learn your ' + t.toLowerCase() + ' scales with our Interactive Scale Diagram app. Choose your instrument and tuning, and pick from the most popular scales.'
			/*

			$location.search({
				instType: vm.state.type,
				tonic: j.tonics[vm.state.tonic],
				scale: j.scales[vm.state.scale]
			})*/
			
			/*$route.updateParams({
				instType: vm.state.type,
				scale: vm.state.scale,
				tonic: vm.state.tonic
			});*/
		}

		function start() {
			if(vm.JSONData.tunings && vm.JSONData.scales && vm.JSONData.tonics) {
				console.log('start()');

				var updateCookie = false; 

				if(typeof $routeParams.instType != 'undefined') {
					var t = $routeParams.instType.replace(/-/g, ' ');

					console.log('t: ' + t + ', state.type: ' + vm.state.type);

					if(t != vm.state.type) {
						setInstrument(vm.instrument.getInstrumentTypeIndex(t));
					}

					updateCookie = true;
				}

				if(typeof $routeParams.tonic != 'undefined') {
					var t = 0;

					for(var i = 0; i < vm.JSONData.tonics.length; i++) {
						if(vm.JSONData.tonics[i] == $routeParams.tonic.replace(/-/g, '/')) {
							t = i;
						}
					}

					vm.state.setTonic(t);
					updateCookie = true;
				}

				if(typeof $routeParams.scale != 'undefined') {
					var s = 0;

					for(var i = 0; i < vm.JSONData.scales.length; i++) {
						if(vm.JSONData.scales[i].name == $routeParams.scale.replace(/-/g, ' ')) {
							console.log('scale name match')
							s = i;
						}
					}
					
					vm.state.setScale(s);
					updateCookie = true;
				}

				if(updateCookie) {
					vm.state.writeCookie();
				}

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