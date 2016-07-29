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
		vm.getMode = getMode;
		vm.getTonic = getTonic;


		var modes = {
			'1':  'Lydian',
			'0':  'Major (Ionian)',
			'-1': 'Mixolydian',
			'-2': 'Dorian',
			'-3': 'Natural Minor (Aolean)',
			'-4': 'Phrygian',
			'-5': 'Locrian'
		}

		var numbers = {
			'1':  ['I', 'V', 'II', 'vi', 'iii', 'vii', 'iv°'],
			'0':  ['IV', 'I', 'V', 'ii', 'vi', 'iii', 'vii°'],
			'-1': ['VII', 'IV', 'I', 'v', 'ii', 'vi', 'iii°'],
			'-2': ['III', 'VII', 'IV', 'i', 'v', 'ii', 'vi°'],
			'-3': ['VI', 'III', 'VII', 'iv', 'i', 'v', 'ii°'],
			'-4': ['II', 'VI', 'III', 'vii', 'iv', 'i', 'v°'],
			'-5': ['V', 'II', 'VI', 'iii', 'vii', 'iv', 'i°']
		}

		var tonics = {
			'-7': 'C♭',
			'-6': 'G♭',
			'-5': 'D♭',
			'-4': 'A♭',
			'-3': 'E♭',
			'-2': 'B♭',
			'-1': 'F',
			'0':  'C',
			'1':  'G',
			'2':  'D',
			'3':  'A',
			'4':  'E',
			'5':  'B',
			'6':  'F♯',
			'7':  'C♯'
		}

		var keys = {
			'-7': ['F', 'C', 'G', 'D', 'A', 'Fb', 'C♭', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭'], 
			'-6': ['F', 'C', 'G', 'D', 'A', 'E', 'C♭', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭'], 
			'-5': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭'], 
			'-4': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'], 
			'-3': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'], 
			'-2': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'], 
			'-1': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'], 
			 '0': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'],
			 '1': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'],
			 '2': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'A♭', 'E♭', 'B♭'],
			 '3': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'E♭', 'B♭'],
			 '4': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'B♭'],
			 '5': ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
			 '6': ['E♯', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
			 '7': ['E♯', 'B♯', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯']
		};

		var coords = {
			notes: [
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
			],

			numbers: [
				{ x: 250, y: 139  }, // 12:00
				{ x: 305, y: 154  }, // 1:00
				{ x: 345, y: 195 }, // 2:00
				{ x: 361, y: 252 }, // 3
				{ x: 346, y: 307 }, // 4
				{ x: 305, y: 350 }, // 5
				{ x: 250, y: 365 }, // 6
				{ x: 194, y: 349 }, // 7
				{ x: 153,  y: 307 }, // 8
				{ x: 138,  y: 252 }, // 9
				{ x: 152,  y: 196 }, // 10
				{ x: 194, y: 154  } // 11
			]
		};

					 //  1  2  3  4  5  6  7
		var intervals = [1, 3, 5, 0, 2, 4, 6];	
		var circle = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭'];

		var background, foreground, arrow, text;
		var surface = Snap('#circle-surface');
		var textAttr = {
			active:   { fontSize: '44px', textAnchor: 'middle', os: 11 }, //removed alignmentBaseline and dominantBaseline due to IE and FF text alignment bugs
			inactive: { fontSize: '30px', textAnchor: 'middle', os: 7 },
			numbers:  { fontSize: '20px', textAnchor: 'middle', os: 5 }
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

		Snap.load('/assets/svg/circle/arrow.svg', function(f) {
            arrow = surface.g();
            arrow.append(f.select("g"));  
            start();  
		});

		function draw() {
			rotation = parseInt(vm.tonic) + parseInt(vm.mode) - 1; // -1 for initial position of circle foreground
			rotateCircle();
			rotateArrow();
			drawText();	
		}

		function drawText() {		
			var index;	
			var notes = getNotes();

			text.clear();

			var number = 4;

			for(var i = 0; i < 12; i++) {
				index = (rotation + 24 + i) % 12;
				
				var x = coords.notes[index].x;
				var y = coords.notes[index].y;
				var noteAttr = textAttr.inactive;


				if(i < 7) {
					noteAttr = textAttr.active;
					text.append(surface.text(coords.numbers[index].x, coords.numbers[index].y + textAttr.numbers.os, numbers[vm.mode][i]).attr(textAttr.numbers)); 					
				}

				text.append(surface.text(x, y + noteAttr.os, notes[i]).attr(noteAttr)); 

			}
		}

		function rotateCircle() {
			if(foreground) {
				foreground.transform('r' + (rotation * 30) + ',250,250');
			}
		}

		function rotateArrow() {
			if(arrow) {
				var tonic = parseInt(vm.tonic);
				arrow.transform('r' + (tonic * 30) + ',250,250');
			}
		}

		function getMode() {
			return modes[vm.mode];
		}

		function getTonic() {
			return tonics[vm.tonic];
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
			if(background && foreground && arrow) {
				surface.attr({ viewBox: '0 0 500 500'/*, transform: 'r15'*/});
				surface.append(background);
				surface.append(foreground);
				surface.append(arrow);

				text = surface.g();
				draw();			
			}
		}
	}
})();