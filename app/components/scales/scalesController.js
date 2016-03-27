(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('scalesCtrl', ['$scope', '$location', 'async', 'svgSurface', 'scales', 'instrument', scalesController]);

	function scalesController($scope, $location, async, svgSurface, scales, instrument){

		$scope.JSONData = {};
		$scope.drawing = {};

		$scope.modal = null;
		$scope.tooltip = null;

		$scope.instrument = instrument;	
		$scope.instrument.instrumentType = 	$location.search().instrument || 'Guitar';
		$scope.instrument.handedness = 			$location.search().handedness || 'Right';
		//$scope.instrument.selectedStrings = 	$scope.instrument.instrumentType == 'Piano' ? null : $location.search().strings || "6"; 

		$scope.selectedTuning =		$location.search().tuning || "0";
		$scope.selectedScale = 		$location.search().scale || "0";
		$scope.selectedTonic = 		$location.search().tonic ||"0";

		$scope.scale = {
			infoUrl: null
		};

		$scope.loc = $location.search();

		async.getJSON('/assets/json/tunings.json').then(function (data) {
			$scope.JSONData.tunings = data.tunings;
			start();
		}, function (error) {
			console.log('async.get error tunings.json');
		});		

		async.getJSON('/assets/json/scales.json').then(function (data) {
			$scope.JSONData.scales = data.scales;		
			$scope.JSONData.tonics = data.tonics;	
			start();
		}, function (error) {
			console.log('async.get error scales.json');
		});		

		function drawScale() {
			$scope.updateURL();

			var scale      	= $scope.JSONData.scales[$scope.selectedScale];
			var tonic      	= parseInt($scope.selectedTonic);
			var instrument 	= $scope.instrument.getCurrentInstrument();
			var tuningIndex = $scope.instrument.getCurrentTuning();
			var tuning     	= $scope.instrument.instrumentType == 'Piano' ? null : $scope.JSONData.tunings[tuningIndex];
			var handedness 	= $scope.instrument.handedness;

			scales.drawScale(scale, tonic, instrument, tuning, handedness);
			$scope.scaleNotes = scales.getNotesString(scale, tonic);
		};

		$scope.drawing.drawScale = drawScale;

		$scope.setInstrument = function(index) {
			var ins = $scope.instrument;		
			$scope.instrument.setSelection(index || 0);
			
			$scope.updateURL();


			/*switch(instrument) {
				case 'Guitar':
					$scope.instrument.selectedStrings = "6"; 
					break;

				case 'Bass Guitar':
					$scope.instrument.selectedStrings = "4"; 
					break;

				case 'Piano':
					$scope.instrument.selectedStrings = null; 
					break;

				default:

			}	*/

			var i = $scope.instrument;
			svgSurface.loadBackground(i.getCurrentInstrument(), i.handedness).then(drawScale);
		}

		$scope.drawing.reload = function() {
			var i = $scope.instrument;
			console.log('reload()');
			svgSurface.loadBackground(i.getCurrentInstrument(), i.handedness).then(drawScale);	
		}

		function start() {
			if($scope.JSONData.tunings && $scope.JSONData.scales && $scope.JSONData.tonics) {
				$scope.drawing.reload();
			}

			$scope.updateURL();
		}

		$scope.updateURL = function() {
		/*	if($scope.JSONData.scales) {
				$scope.scale.infoUrl = $scope.JSONData.scales[$scope.selectedScale].infoUrl;
			}

			if($scope.instrument.instrumentType == 'Piano') {
				$location.path('/').search({
					instrument: $scope.instrument.instrumentType,
					tonic: 		$scope.selectedTonic,
					scale: 		$scope.selectedScale
				});

			} else {
				$location.path('/').search({
					instrument: $scope.instrument.instrumentType,
					tonic: 		$scope.selectedTonic,
					scale: 		$scope.selectedScale,
					strings: 	$scope.instrument.selectedStrings[$scope.instrument.instrumentType],
					tuning: 	$scope.selectedTuning
				});
			}*/
		}

		$scope.action = function() {
			svgSurface.getGroup().transformGroup.transform("s0.5,0.5t200,10");
		}
	}
})();