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
			thumb: '/assets/svg/instruments/piano_keys.svg',
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






