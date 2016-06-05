(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('circleCtrl', circleController);

	function circleController() {
		var vm = this;

		vm.tonic = '0';
		vm.mode = '0';
		vm.draw = draw; //draw circle
		vm.getChordArray = getChordArray;

		var keys = {
			'-7': ['F', 'C', 'G', 'D', 'A', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'], 
			'-6': ['F', 'C', 'G', 'D', 'A', 'E', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'], 
			'-5': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'], 
			'-4': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'], 
			'-3': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'], 
			'-2': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'], 
			'-1': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'], 
			 '0': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'],
			 '1': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'],
			 '2': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb'],
			 '3': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb'],
			 '4': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb'],
			 '5': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'],
			 '6': ['E#', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'],
			 '7': ['E#', 'B#', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#']
		};

		var coords = [
			{ x: 250, y: 70  }, // 12:00
			{ x: 341, y: 94  }, // 1:00
			{ x: 410, y: 163 }, // 2:00
			{ x: 435, y: 252 }, // 3
			{ x: 410, y: 347 }, // 4
			{ x: 341, y: 414 }, // 5
			{ x: 250, y: 435 }, // 6
			{ x: 159, y: 414 }, // 7
			{ x: 90,  y: 347 }, // 8
			{ x: 65,  y: 252 }, // 9
			{ x: 90,  y: 163 }, // 10
			{ x: 159, y: 94  } // 11
		];

					 //  1  2  3  4  5  6  7
		var intervals = [1, 3, 5, 0, 2, 4, 6];	
		var circle = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'];

		var background, foreground, text;
		var surface = Snap('#circle-surface');
		var textAttr = {
			active:   { fontSize: '44px', textAnchor: 'middle', alignmentBaseline: 'middle' },
			inactive: { fontSize: '30px', textAnchor: 'middle', alignmentBaseline: 'middle' }
		}
		var rotation = -1;
		var notes = {};

		Snap.load('/assets/svg/circle/background.svg', function(f) {
            background = surface.g();
            background.append(f.select("g"));
            start();
		});

		Snap.load('/assets/svg/circle/foreground.svg', function(f) {
            foreground = surface.g();
            foreground.append(f.select("g"));  
            start();  
		});

		function draw() {
			rotation = parseInt(vm.tonic) + parseInt(vm.mode) - 1; // -1 for initial position of circle foreground
			rotateCircle();
			drawText();	
		}

		function drawText() {		
			var index;	
			var notes = getNotes();

			text.clear();

			for(var i = 0; i < 12; i++) {
				index = (rotation + 24 + i) % 12;
				
				text.append(surface.text(coords[index].x, coords[index].y, notes[i]).attr(i < 7 ? textAttr.active : textAttr.inactive)); 
			}
		}

		function rotateCircle() {
			if(foreground) {
				foreground.transform('r' + (rotation * 30) + ',250,250');
			}
		}

		function getNotes() {
			var index;
			var notes = [];

			for(var i = 0; i < 12; i++) {
				index = (i + 12 + parseInt(vm.tonic) + parseInt(vm.mode)) % 12;
				notes.push(keys[vm.tonic][index]);
			}

			return notes;
		}

		function getChordArray() {
			this.notes = {
				major: [],
				minor: [],
				diminished: null
			};

			for(var i = 0; i < 7; i++) {
				var index = (i + 12 + parseInt(vm.tonic) + parseInt(vm.mode)) % 12;

				if(i < 3) {
					this.notes.major.push(keys[vm.tonic][index]);
				} else if(i < 6) {
					this.notes.minor.push(keys[vm.tonic][index]);
				} else {
					this.notes.diminished = keys[vm.tonic][index];
				}
			}

			return this.notes;
		}
		
		function start() {
			if(background && foreground) {
				surface.attr({ viewBox: '0 0 500 500', transform: 'r15'});
				surface.append(background);
				surface.append(foreground);

				text = surface.g();
				draw();			
			}
		}
	}
})();