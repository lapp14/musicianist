var musicianist = angular.module('musicianist', []);


musicianist.value('notes',  [
    'C', //0
    '-', //1
    'D', //2
    '-', //3
    'E', //4
    'F', //5
    '-', //6
    'G', //7
    '-', //8
    'A', //9
    '-', //10
    'B'  //11
]);

musicianist.value('rootNotes', [
    'C', 
    'C#/Db',
    'D', 
    'Eb', 
    'E',
    'F', 
    'Gb/F#',
    'G', 
    'Ab', 
    'A', 
    'Bb', 
    'B'
]);

musicianist.directive('zoomPan', ['$document', function ($document) {
	return {
		link: function(scope, element, attr) {
			
		}
	}
}]);

musicianist.factory('util', ['notes', 'rootNotes', function (notes, rootNotes, n) {
	return {
		halfStepToNote: function(n) {
		    n %= 12;

		    var note;
		    if(notes[n] == '-') {
		       // if(this.getCurrentScale().defaults[this.root] == '#') {
		            note = notes[n - 1] + '#';
		        //} else {
		        //    note = notes[n + 1] + 'b';
		        //}
		    } else {
		        note = notes[n];
		    }

		    return note;
		},

		getRootNotes: function() {
			return rootNotes;
		}
	}
}]);

musicianist.factory('async', function ($http, $q) {
	return {
		getJSON: function(file) {
			return $http.get(file).then(function (response){
				if(typeof response === 'object') {
					return response.data;
				} else {
					return $q.reject(response.data);
				}	
			});	
		},

		loadBackground:  function(file, instrument, handedness){
			return $q (function (resolve, reject) {
		        var background;      
		        instrument = instrument || 'Guitar';

		        if(core.svg.surface) {
		        	core.svg.surface.clear();
		        }
		        
		        core.svg.surface = Snap('#svg-surface');
		        core.svg.surface.attr(core[instrument].snapAttributes);

		        Snap.load(file, function(f) {
		            var s = core.svg.surface;
		            
		            background = core.svg.surface.g();
		            background.append(f.select("g"));
		            background.append(f.select("defs"));
		            s.append(background);

		            if(instrument == 'Piano') {
		            	var coords = core['Piano'].coords;
		            	var x = coords.labels.x;
		            	var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
		            	var noteLabels = core.svg.surface.g();
		            	
		            	for(var i = 0, lim = 21; i < lim; i++) {
		            		noteLabels.append(s.text(x, coords.labels.y, notes[i % 7]).attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));
		            		x += coords.labels.increment;
			            }
			        	background.append(noteLabels);

		            } else {
				        var markerY = core[instrument].coords.markerY;
				        var markerX = core[instrument].coords.markerX.slice(); //create a COPY of the coords
			            var fretMarkers = core.svg.surface.g();
			            console.log('hand ' + handedness);

			        	if(handedness == 'Left') {
			        		background.transform('s-1,1');

			        		//reverse fret labels for leftys
			        		for(var i = 0, end = markerX.length; i < end; i++) {
			        			markerX[i] = 1000 - markerX[i];
			        		}
			        	}

			            fretMarkers.append(s.text(markerX[0], core[instrument].coords.fretNumbers, 'Open').attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));

			            for(var i = 1, lim = markerX.length; i < lim; i++) {
			                fretMarkers.append(s.text(markerX[i], core[instrument].coords.fretNumbers, i).attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));
			            }

			        	background.append(fretMarkers);
			        }

			        core.svg.background = background;
		            resolve(true);
		        });
		    });
	    }
	};
});

musicianist.controller('chordsCtrl', ['$scope', 'async', 'util', function ($scope, async, util) {
	$scope.JSONData = {};

	$scope.state = {
		chordStructure: 'open',
		chordTonic: 'A',
		chordType: 'Major'
	}

	$scope.first = -28;
	$scope.sec = 0;
	$scope.third = 196;
	$scope.fourth = 135;
   
	$scope.scale = 1;
	$scope.pan = 0;

	async.getJSON('../json/chords.json').then(function (data) {
		$scope.JSONData.chords = data.chords;
		start();
	}, function (error) {
		console.log('async.get error tunings.json');
	});		

	$scope.change = function() {
		core.svg.surface.attr({ viewBox: $scope.first + ' ' + $scope.sec + ' ' + ($scope.third + 166) + ' ' + $scope.fourth});
	};

	$scope.action = function() {
		Chords.drawChordBarre(1, 1, 6);
	};

	function start() {
		$scope.draw.drawChord();
	}

	$scope.draw = {
		drawChord: function() {
			Chords.drawChord($scope.JSONData.chords.guitar[$scope.state.chordStructure][$scope.state.chordType][$scope.state.chordTonic]);
		}
	}

	async.loadBackground(core['Guitar'].svg/*, $scope.instrument, $scope.handedness*/);
	$scope.change();
}]);


musicianist.controller('scalesCtrl', ['$scope', '$location', 'async', 'util', function ($scope, $location, async, util){

	$scope.JSONData = {};
	$scope.drawing = {};

	$scope.modal = null;
	$scope.tooltip = null;

	$scope.util = util;
	$scope.instrument = 		$location.search().instrument || 'Guitar';
	$scope.handedness = 		$location.search().handedness || 'Right';
	$scope.selectedStrings = 	$location.search().strings || "6"; 
	$scope.selectedTuning =		$location.search().tuning || "0";
	$scope.selectedScale = 		$location.search().scale || "0";
	$scope.selectedTonic = 		$location.search().tonic ||"0";

	$scope.scale = {
		infoUrl: null
	};

	$scope.loc = $location.search();

	async.getJSON('../json/tunings.json').then(function (data) {
		$scope.JSONData.tunings = data.tunings;
		start();
	}, function (error) {
		console.log('async.get error tunings.json');
	});		

	async.getJSON('../json/scales.json').then(function (data) {
		$scope.JSONData.scales = data.scales;		
		$scope.JSONData.tonics = data.tonics;	
		start();
	}, function (error) {
		console.log('async.get error scales.json');
	});		

	function drawScale() {
		$scope.updateURL();

		var scale      = $scope.JSONData.scales[$scope.selectedScale];
		var tonic      = parseInt($scope.selectedTonic);
		var instrument = $scope.instrument;
		var tuning     = instrument == 'Piano' ? null : $scope.JSONData.tunings[$scope.instrument][$scope.selectedStrings][$scope.selectedTuning];
		var handedness = $scope.handedness;

		Scales.drawScale(scale, tonic, instrument, tuning, handedness);
		//Scales.drawTitle(scale, tonic, instrument, tuning);
		$scope.scaleNotes = Scales.key.getNotesString(scale, tonic);
	};

	$scope.drawing.drawScale = drawScale;

	$scope.setInstrument = function(instrument) {
		$scope.instrument = instrument;
		$scope.updateURL();

		switch(instrument) {
			case 'Guitar':
				$scope.selectedStrings = "6"; 
				break;

			case 'Bass Guitar':
				$scope.selectedStrings = "4"; 
				break;

			case 'Piano':
				break;

			default:

		}
		
		async.loadBackground(core[instrument].svg, instrument, $scope.handedness).then(drawScale);
	}

	$scope.drawing.reload = function() {
		async.loadBackground(core[$scope.instrument].svg, $scope.instrument, $scope.handedness).then(drawScale);	
	}

	function start() {
		if($scope.JSONData.tunings && $scope.JSONData.scales && $scope.JSONData.tonics) {
			$scope.drawing.reload();
		}

		$scope.updateURL();
	}

	$scope.updateURL = function() {
		if($scope.JSONData.scales) {
			$scope.scale.infoUrl = $scope.JSONData.scales[$scope.selectedScale].infoUrl;
		}

		if($scope.instrument == 'Piano') {
			$location.path('/').search({
				instrument: $scope.instrument,
				tonic: 		$scope.selectedTonic,
				scale: 		$scope.selectedScale
			});
		} else {
			$location.path('/').search({
				instrument: $scope.instrument,
				tonic: 		$scope.selectedTonic,
				scale: 		$scope.selectedScale,
				strings: 	$scope.selectedStrings,
				tuning: 	$scope.selectedTuning
			});
		}
	}

	$scope.action = function() {
		core.svg.background.transform("t200,10");
		core.svg.markers.transform("t200,10");
	}
}]);

