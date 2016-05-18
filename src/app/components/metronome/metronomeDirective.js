(function() {
	'use strict';

	angular
		.module('musicianist')
		.directive('metronome', metronomeDirective);

	metronomeDirective.$inject = ['defaultMetronome'];

	function metronomeDirective(defaultMetronome) {
		var browserSupport = {};
		var Metronome = null;

		var directive = {
			restrict: 'E',
			templateUrl: '/app/components/metronome/metronome.html',
			controller: metronomeController,
			controllerAs: 'Metronome'
		}

		return directive;

		function metronomeController($scope) {
			var vm = this;

			vm.tempo = 90;
			vm.noteResolution = 2;
			vm.supportedMetronome = 0;
			vm.isPlaying = false;
			vm.measure = {
				upper: 4,
				lower: 4
			}
			vm.dialog = {
				show: false
			}

			vm.setMeasure		 = setMeasure;
			vm.setNoteResolution = setNoteResolution;
			vm.setTempo 		 = setTempo;
			vm.toggleDialog 	 = toggleDialog; 
			vm.play 			 = play;

			
			$scope.$watch(function() {
				return defaultMetronome.blipColor
			}, function(newValue, oldValue){
		    	vm.blipColor = newValue;
			});

			checkBrowserSupport();
			if(browserSupport.AudioContext && browserSupport.Worker) {
				Metronome.setTempo(vm.tempo);
				Metronome.init();
			}

			vm.blipColor = Metronome.blipColor;

			function play() {
				Metronome.play();
				vm.isPlaying = Metronome.isPlaying();
			}

			function toggleDialog() {
				vm.dialog.show = !vm.dialog.show;
			}

			function setTempo() {
				if(vm.tempo < 0) {
					vm.tempo = 0;
					Metronome.setTempo(vm.tempo);
				} else if (vm.tempo > 300) {
					vm.tempo = 300;
					Metronome.setTempo(vm.tempo);
				}

				Metronome.setTempo(vm.tempo);
			}

			function setMeasure() {

			}

			function setNoteResolution() {
				Metronome.setNoteResolution(vm.noteResolution);
			}

			function checkBrowserSupport() {
			    browserSupport.AudioContext = (typeof AudioContext !== 'undefined');
			    browserSupport.Worker = (typeof Worker !== 'undefined');
			    
			    if(browserSupport.AudioContext && browserSupport.Worker) {
			    	Metronome = defaultMetronome;
			    	vm.supportedMetronome = 1;
			    	console.log('setting to default metronome ' + Metronome.init);
			    }
			}
		}

	};
})();