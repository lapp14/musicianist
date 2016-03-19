var musicianist = angular.module('musicianist', ['ngCookies']);

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

musicianist.value('instruments', 
		[{ 
            name:  'Les Paul',
            thumb: { path:'../svg/instruments/profile/les-paul.svg', viewbox: '0 0 52 168' },
            path:  '../svg/instruments/les-paul-fretboard.svg',
            type: 'Guitar',
            strings: 6,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }
        }, {
            name:  'Stratocaster',
            thumb: { path: '../svg/instruments/profile/stratocaster.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/stratocaster-fretboard.svg',
            type: 'Guitar',
            strings: 6,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }            
	    }, {
            name:  'Telecaster',
            thumb: { path: '../svg/instruments/profile/telecaster.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/telecaster-fretboard.svg',
            type: 'Guitar',
            strings: 6,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }            
	    },


	    {
            name:  'JBM 27',
            thumb: { path: '../svg/instruments/profile/jbm27-7.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/jbm27-7-fretboard.svg',
            type: 'Guitar',
            strings: 7,

            markerY:  [109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47, 0],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }            
	    },

	    {
            name:  'TAM 100',
            thumb: { path: '../svg/instruments/profile/tam100-8.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/tam100-8-fretboard.svg',
            type: 'Guitar',
            strings: 8,

            markerY:  [130, 109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47, 0, 0],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }            
	    },


		{
			name:  'Precision Bass',
            thumb: { path: '../svg/instruments/profile/precision-bass.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/precision-bass-fretboard.svg',
            type: 'Bass Guitar',
            strings: 4,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Jazz Bass',
            thumb: { path: '../svg/instruments/profile/jazz-bass.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/jazz-bass-fretboard.svg',
            type: 'Bass Guitar',
            strings: 4,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Jazz Bass',
            thumb: { path: '../svg/instruments/profile/jazz-bass2.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/jazz-bass2-fretboard.svg',
            type: 'Bass Guitar',
            strings: 4,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Precision Bass 5',
            thumb: { path: '../svg/instruments/profile/precision-bass-5.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/precision-bass-5-fretboard.svg',
            type: 'Bass Guitar',
            strings: 5,

            markerY:  [10, 100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47, 0],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Stiletto 6',
            thumb: { path: '../svg/instruments/profile/stiletto-6.svg', viewbox: '0 0 512 168' },
            path:  '../svg/instruments/stiletto-6-fretboard.svg',
            type: 'Bass Guitar',
            strings: 6,

            markerY:  [10, 100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringOffset: [0.55, 0.32, 0.1, -0.1, -0.32, -0.47, 0],
            fretNumbers: 130,
            fretNumberOffset: 0.6,
            attr: { viewBox: "-50 -75 1100 300" }
		},



		 {
			name: 'Piano',
			thumb: '',
			path: '',
			type: 'Piano',
			strings: 0,
	    	coords: {
	            whiteKeys: {
	                x: 12.5,
	                y: 130,
	                increment: 23
	            },

	            blackKeys: {
	                x: 90,
	                y: 85
	            },

	            labels: {
	                y: 165,
	                x: 12,
	                increment: 23
	            },
	        },

	        notes: [
	            {x: 12.5, y: 130},  //C
	            {x: 22, y: 85},     //C#/Db
	            {x: 35.5, y: 130},  //D
	            {x: 49.2, y: 85},   //D#
	            {x: 58.5, y: 130},  //E
	            {x: 81.5, y: 130},  //F
	            {x: 90.6, y: 85},  //F#
	            {x: 104.5, y: 130},  //G
	            {x: 115.5, y: 85},  //G#
	            {x: 127.5, y: 130},  //A
	            {x: 140.5, y: 85},  //A#
	            {x: 150.5, y: 130},  //B
	        ],

	        attr: { viewBox: "-110 -16 700 200" },//{ viewBox: "-30 -70 550 300" },
	        path: '../svg/instruments/piano_keys.svg'
    	}]);

musicianist.factory('instrument', ['instruments', function(instruments) {

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

musicianist.factory('svgSurface', function() {
	return {
		activeControl: 'pan',
		setActiveControl: function(controlType) {
			if(this.activeControl !== controlType) {
				this.activeControl = controlType;
			} else {
				this.activeControl = 'none';
			}
		},

		resetZoomPan: function() {
			this.zoom = 1;
			this.startZoom = 1;
			this.pan.x = this.pan.y = 0;
			core.svg.group.transform("s" + this.zoom + "," + this.zoom + "t" + this.pan.x + "," + this.pan.y);
		},
		startZoom: 1,
		zoom: 1,
		pan: {
			startX: 0,
			startY: 0,
			x: 0,
			y: 0
		}	
	}
});

musicianist.directive('zoomPan', ['$document', 'svgSurface', function ($document, svgSurface) {
	return {
		link: function(scope, element, attr) {
			
			var svgWidth, svgHeight;
			var mouseDown = {
				x: 0,
				y: 0
			}

			scope.$watch('svgSurface.activeControl', function(newValue, oldValue) {
				if(newValue) {

					if(newValue === 'zoom') {
						element.removeClass('cursor-grab');
						element.addClass('cursor-zoom');
					} else if(newValue === 'pan') {
						element.removeClass('cursor-zoom');
						element.addClass('cursor-grab');
					} else {
						element.removeClass('cursor-zoom');
						element.removeClass('cursor-grab');
					}
				}
			}, true);

			element.on('mousedown', function(event){
				mouseDown.x = event.pageX;
				mouseDown.y = event.pageY;

				console.log(element)

				svgWidth = element[0].clientWidth;
				svgHeight = element[0].clientHeight;

				if(svgSurface.activeControl === 'pan') {	
					event.preventDefault();
					svgSurface.pan.startX = event.pageX - svgSurface.pan.x;
					svgSurface.pan.startY = event.pageY - svgSurface.pan.y;
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);

					element.addClass('cursor-grab');

				} else if(svgSurface.activeControl === 'zoom') {	
					event.preventDefault();
					svgSurface.startZoom = svgSurface.zoom;
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				}
			});

			function mousemove(event) {
				
				if(svgSurface.activeControl === 'pan') {
					svgSurface.pan.y = event.pageY - svgSurface.pan.startY;
					svgSurface.pan.x = (event.pageX - svgSurface.pan.startX) - ( event.pageX / svgWidth / 2);
				} else if(svgSurface.activeControl === 'zoom') {
					svgSurface.zoom = 1 - (event.pageY / mouseDown.y) + svgSurface.startZoom;
					console.log(mouseDown.y + ' ' + event.pageY + ' zoom: ' + svgSurface.zoom)
				} 

				core.svg.group.transform("s" + svgSurface.zoom + "," + svgSurface.zoom + "t" + svgSurface.pan.x + "," + svgSurface.pan.y);
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
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

		//Takes an 'Instrument' object from instrument value
		loadBackground: function(instrument, handedness){
			return $q (function (resolve, reject) {
		        var background;      
		        
		        if(core.svg.surface) {
		        	core.svg.surface.clear();
		        }
		        
		        core.svg.surface = Snap('#svg-surface');
		        core.svg.surface.attr(instrument.attr);

		        Snap.load(instrument.path, function(f) {
		            var s = core.svg.surface;
		            
		            background = core.svg.surface.g();
		            background.append(f.select("g"));
		            background.append(f.select("defs"));
		            s.append(background);

		            if(!instrument.strings) {
		            	var coords = instrument.coords;
		            	var x = coords.labels.x;
		            	var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
		            	var noteLabels = core.svg.surface.g();
		            	
		            	for(var i = 0, lim = 21; i < lim; i++) {
		            		noteLabels.append(s.text(x, coords.labels.y, notes[i % 7]).attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));
		            		x += coords.labels.increment;
			            }
			        	background.append(noteLabels);

		            } else {
				        var markerY = instrument.markerY;
				        var markerX = instrument.markerX.slice();  //create a COPY of the coords
			            var fretMarkers = core.svg.surface.g();
			            console.log('hand ' + handedness);
 						
 						//reverse fret labels and flip fretboard for leftys
			        	if(handedness == 'Left') {
			        		background.transform('s-1,1');
			        		for(var i = 0, end = markerX.length; i < end; i++) {
			        			markerX[i] = 1000 - markerX[i];
			        		}
			        	}

			            fretMarkers.append(s.text(markerX[0], instrument.fretNumbers, 'Open').attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));

			            for(var i = 1, lim = markerX.length; i < lim; i++) {
			            	var x = markerX[i];
			            	var y = instrument.fretNumbers + instrument.fretNumberOffset * i;

			                fretMarkers.append(s.text(x, y, i).attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));
			            }

			        	core.svg.fretMarkers = fretMarkers;
			        }

			        core.svg.background = background;
		            resolve(true);
		        });
		    });
	    }
	};
});

musicianist.factory('cookies', ['$cookies', function($cookies) {
	
}]);

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


musicianist.controller('scalesCtrl', ['$scope', '$location', 'svgSurface', 'async', 'util', 'instrument', function ($scope, $location, svgSurface, async, util, instrument){

	$scope.JSONData = {};
	$scope.drawing = {};

	$scope.modal = 'instrument';//null;
	$scope.tooltip = null;

	$scope.util = util;
	$scope.svgSurface = svgSurface;

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
		var instrument = $scope.instrument.getCurrentInstrument();
		var tuning     = $scope.instrument.instrumentType == 'Piano' ? null : $scope.JSONData.tunings[instrument.type][instrument.strings][0];
		var handedness = $scope.instrument.handedness;

		Scales.drawScale(scale, tonic, instrument, tuning, handedness);
		//Scales.drawTitle(scale, tonic, instrument, tuning);
		$scope.scaleNotes = Scales.key.getNotesString(scale, tonic);
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
		async.loadBackground(i.getCurrentInstrument(), i.handedness).then(drawScale);
	}

	$scope.drawing.reload = function() {
		var i = $scope.instrument;
		console.log('reload()');
		async.loadBackground(i.getCurrentInstrument(), i.handedness).then(drawScale);	
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
		core.svg.background.transform("t200,10");
		core.svg.markers.transform("t200,10");
	}
}]);

