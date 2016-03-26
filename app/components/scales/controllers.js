
// REMOVE THIS CRAP
var core = {
	svg: {

	},

	notes: [
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
    ]
};



angular.module('musicianist').value('notes',  [
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

angular.module('musicianist').value('rootNotes', [
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

angular.module('musicianist').value('instruments', 
		[{ 
            name:  'Les Paul',
            thumb: { path:'/assets/svg/instruments/profile/les-paul.svg', viewbox: '0 0 52 168' },
            path:  '/assets/svg/instruments/les-paul-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/stratocaster.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/stratocaster-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/telecaster.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/telecaster-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/jbm27-7.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/jbm27-7-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/tam100-8.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/tam100-8-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/precision-bass.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/precision-bass-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/jazz-bass.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/jazz-bass-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/jazz-bass2.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/jazz-bass2-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/precision-bass-5.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/precision-bass-5-fretboard.svg',
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
            thumb: { path: '/assets/svg/instruments/profile/stiletto-6.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/stiletto-6-fretboard.svg',
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
	        path: '/assets/svg/instruments/piano_keys.svg'
    	}]);


angular.module('musicianist').factory('svgSurface', function() {
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

angular.module('musicianist').directive('zoomPan', ['$document', 'svgSurface', function ($document, svgSurface) {
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
				svgWidth = element[0].clientWidth; //1688.6875
				svgHeight = element[0].clientHeight;
				mouseDown.x = event.pageX - ((window.innerWidth - svgWidth) / 2);
				mouseDown.y = event.pageY - ((window.innerHeight - svgHeight) / 2);

				console.log(element);
				console.log('pageX: ' + mouseDown.x + ', pageY: ' + mouseDown.y);

				console.log('clientWidth: ' + svgWidth + ', clientHeight: ' + svgHeight);
				console.log('wid: ' + window.innerWidth);





				/*if(svgSurface.activeControl === 'pan') {	
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
				}*/
			});

			function mousemove(event) {
				
				/*if(svgSurface.activeControl === 'pan') {
					svgSurface.pan.y = event.pageY - svgSurface.pan.startY;
					svgSurface.pan.x = (event.pageX - svgSurface.pan.startX) - ( event.pageX / svgWidth / 2);
				} else if(svgSurface.activeControl === 'zoom') {
					svgSurface.zoom = 1 - (event.pageY / mouseDown.y) + svgSurface.startZoom;
					//console.log(mouseDown.y + ' ' + event.pageY + ' zoom: ' + svgSurface.zoom)
				} */

				core.svg.group.transform("s" + svgSurface.zoom + "," + svgSurface.zoom + "t" + svgSurface.pan.x + "," + svgSurface.pan.y);
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		}
	}
}]);

//////////////////////////////////////////
// REMOVE ///////////////////////////////
angular.module('musicianist').factory('util', ['notes', 'rootNotes', function (notes, rootNotes) {
	return {
		halfStepToNote: function(n) {
		    n %= 12;
		    console.log('yeh')

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
///////////////////////////






