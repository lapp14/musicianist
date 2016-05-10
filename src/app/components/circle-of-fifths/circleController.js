(function() {
	'use strict';

	angular
		.module('musicianist')
		.controller('circleCtrl', circleController);

	function circleController() {

		var background, foreground;
		var surface = Snap('#circle-surface');		
		surface.attr({ viewBox: '0 0 500 500'});

		Snap.load('/assets/svg/circle/background.svg', function(f) {
            background = f.select("g");
            drawCircle();
		});

		Snap.load('/assets/svg/circle/foreground.svg', function(f) {
            foreground = f.select("g");  
            drawCircle();  
		});

		function drawCircle() {
			if(background && foreground) {
				surface.append(background);
				surface.append(foreground);
			}
		}

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
			'7': ['E#', 'B#', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'],
		}


		var vm = this;

		vm.tonic = '0';
		vm.mode = '0';

		var circle = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb'];

					 //  1  2  3  4  5  6  7
		var intervals = [1, 3, 5, 0, 2, 4, 6];

		


		vm.getNotes = function() {
			var text = '';

			for(var i = 0; i < 7; i++) {
				var index = (i + 12 + parseInt(vm.tonic) + parseInt(vm.mode)) % 12;
				text += keys[vm.tonic][index] + ', ';
			}

			return text;
		}
	}
})();