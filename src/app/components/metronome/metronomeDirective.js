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

			// Tap tempo variables
			var tap = {
	            timeout: null,
	            lastTap: null,
	            times: []
	        };
			
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
			vm.tapButtonPress	 = tapButtonPress;
			vm.toggleDialog 	 = toggleDialog; 
			vm.play 			 = play;

			vm.showToolbarControl = false;
			vm.isTapping		  = false;

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

//			vm.blipColor = Metronome.blipColor;

			function play() {
				Metronome.play();
				vm.showToolbarControl = true;
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
			    } else {
			    	console.log('default metronome not supported')
			    }
			}

			/** Tap Tempo **/
			function tapButtonPress() {
	        	console.log('tapClick ')
	            var t = tap.lastTap;
	            tap.lastTap = Date.now();

	            if(t) {
	                var c = tap.lastTap - t;
	                tap.times.push(c);
	                console.log('tap interval: ' + c);
	            }

	            clearTimeout(tap.timeout);
	            vm.isTapping = true;
	            tap.timeout = setTimeout(tapSetTempo, 3000);
	        }     

	        function tapSetTempo() {

	        	console.log('clear')

                var bpm = msToBpm(tapGetAverageTempo(tap.times));
                console.log('bpm ' + bpm);
                vm.tempo = bpm;
                $scope.$apply();

                tap.lastTap = null;
                tap.times = [];
	 
	            setTempo();
	            vm.isTapping = false;
	            $scope.$apply();
	            console.log('time '  + bpm)
	        }  

	        function msToBpm(ms) {
	        	return Math.round(1000 / (ms / 60));
	        }

	        function tapGetAverageTempo(arr) {
	            if(Array.isArray(arr)) {	 
	                var sum = 0;
	                for(var i = 0, end = arr.length; i < end; i++) {
	                    sum += arr[i];
	                }

	                var avg = sum / arr.length;

	                console.log('tapGetAverageTempo: ' + avg);

	                if(avg >= 1) {
	                	return avg;
	                }
	            }

	            return 0;
	        }    
	        /** **/ 
		}

	};
})();