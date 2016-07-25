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
            instSelect: { path:'/assets/svg/instruments/profile/upright/les-paul.svg', viewbox: '0 0 52 168' },
            instPanel: { path:'/assets/svg/instruments/profile/horiz/les-paul.svg', viewbox: '0 0 512 171' },
            path:  '/assets/svg/instruments/les-paul-fretboard.svg',
            type: 'Guitar',
            strings: 6,

            markerY:  [100, 84, 67, 50, 33, 16],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 471, 526, 580, 630, 678, 723, 766, 805, 843, 878, 911, 943, 972, 1001, 1027, 1052],
            stringSlope: [ 0.0121, 0.0072, 0.0028, -0.0023, -0.0072, -0.01 ],
            fretNumbers: 130,
            fretNumberSlope: 0.013,
            leftHanded: {
                instrumentOffset: 486,
                scaleOffset: 1003
            },
            attr: { viewBox: "-32 -75 1100 300" }
        }, {
            name:  'Stratocaster',
            instSelect: { path: '/assets/svg/instruments/profile/upright/stratocaster.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/stratocaster.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/stratocaster-fretboard.svg',
            type: 'Guitar',
            strings: 6,

            markerY:  [103, 85, 67, 49, 32, 14],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [0, 56, 140, 222, 296, 368, 436, 498, 558, 614, 668, 717, 763, 808, 850, 890, 928, 963, 997, 1029, 1059, 1086, 1113],
            stringSlope: [0.0112, 0.0072, 0.0028, -0.0028, -0.0072, -0.0113],
            fretNumbers: 130,
            fretNumberSlope: 0.013,
            leftHanded: {
                instrumentOffset: 488,
                scaleOffset: 1003
            },
            attr: { viewBox: "-50 -75 1100 300" }            
	    }, {
            name:  'Telecaster',
            instSelect: { path: '/assets/svg/instruments/profile/upright/telecaster.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/telecaster.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/telecaster-fretboard.svg',
            type: 'Guitar',
            strings: 6,

            markerY:  [100, 83, 66, 48.5, 31, 14],  //[109, 92, 75, 58, 41, 24, 7],
            markerX: [-3, 57, 141, 218, 291, 363, 430, 491, 550, 607, 658, 707, 756, 800, 843, 882, 919, 954, 987, 1019, 1048, 1076],
            stringSlope: [0.0112, 0.0072, 0.0028, -0.0028, -0.0072, -0.0113],
            fretNumbers: 126,
            fretNumberSlope: 0.013,
            leftHanded: {
                instrumentOffset: 488,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }            
	    },


	    {
            name:  'JBM 27',
            instSelect: { path: '/assets/svg/instruments/profile/upright/jbm27-7.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/jbm27-7.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/jbm27-7-fretboard.svg',
            type: 'Guitar',
            strings: 7,

            markerY:   [105, 89, 72.5, 56, 40, 24, 8],
            markerX: [-3, 50, 130, 210, 280, 348, 412, 474, 532, 585, 635, 683, 727, 768, 809, 845, 880, 913, 945, 974, 1001, 1027, 1052, 1075, 1098],
            stringSlope: [0.0112, 0.0072, 0.0028, 0, -0.0028, -0.0072, -0.0113],
            fretNumbers: 130,
            fretNumberSlope: 0.014,
            leftHanded: {
                instrumentOffset: 288,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }            
	    },

	    {
            name:  'TAM 100',
            instSelect: { path: '/assets/svg/instruments/profile/upright/tam100-8.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/tam100-8.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/tam100-8-fretboard.svg',
            type: 'Guitar',
            strings: 8,

            markerY:  [ 117, 100, 83, 66, 49, 32, 15, -2 ],
            markerX: [-14, 50, 135, 218, 296, 368, 437, 502, 562, 620, 675, 725, 774, 819, 861, 901, 940, 976, 1008, 1040, 1070, 1099, 1126, 1151, 1174.5],
            stringSlope:  [ 0.0133, 0.0074, 0.003, 0.0012, -0.0012, -0.003, -0.0074, -0.0133 ],
            fretNumbers: 142,
            fretNumberSlope:  0.020,
            leftHanded: {
                instrumentOffset: 353,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }            
	    },


		{
			name:  'Precision Bass',
            instSelect: { path: '/assets/svg/instruments/profile/upright/precision-bass.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/precision-bass.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/precision-bass-fretboard.svg',
            type: 'Bass Guitar',
            strings: 4,

            markerY:   [ 90, 68, 46, 24 ],
            markerX: [-6, 54, 155, 246, 332, 414, 490, 564, 633, 696, 758, 815, 869, 921, 968, 1014, 1057, 1098, 1136, 1172, 1207],
            stringSlope:  [ 0.012, 0.0063, -0.0042, -0.0114 ],
            fretNumbers: 122,
            fretNumberSlope: 0.017,
            leftHanded: {
                instrumentOffset: 446,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Jazz Bass',
            instSelect: { path: '/assets/svg/instruments/profile/upright/jazz-bass.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/jazz-bass.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/jazz-bass-fretboard.svg',
            type: 'Bass Guitar',
            strings: 4,

            markerY:  [ 90, 68, 46, 24 ],
            markerX: [-6, 54, 155, 246, 332, 414, 490, 564, 633, 696, 758, 815, 869, 921, 968, 1014, 1057, 1098, 1136, 1172, 1207],
            stringSlope: [ 0.012, 0.0063, -0.0042, -0.0114 ],
            fretNumbers: 122,
            fretNumberSlope: 0.017,
            leftHanded: {
                instrumentOffset: 467,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Jazz Bass',
            instSelect: { path: '/assets/svg/instruments/profile/upright/jazz-bass2.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/jazz-bass2.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/jazz-bass2-fretboard.svg',
            type: 'Bass Guitar',
            strings: 4,

            markerY:  [ 90, 68, 46, 24 ],
            markerX: [-6, 54, 155, 246, 332, 414, 490, 564, 633, 696, 758, 815, 869, 921, 968, 1014, 1057, 1098, 1136, 1172, 1207],
            stringSlope: [ 0.012, 0.0063, -0.0042, -0.0114 ],
            fretNumbers: 122,
            fretNumberSlope:  0.017,
            leftHanded: {
                instrumentOffset: 467,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Precision Bass 5',
            instSelect: { path: '/assets/svg/instruments/profile/upright/precision-bass-5.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/precision-bass-5.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/precision-bass-5-fretboard.svg',
            type: 'Bass Guitar',
            strings: 5,

            markerY:   [ 95, 75, 54, 34, 14 ],
            markerX: [-6, 54, 155, 246, 332, 414, 490, 564, 633, 696, 758, 815, 869, 921, 968, 1014, 1057, 1098, 1136, 1172, 1207],
            stringSlope:  [ 0.0149, 0.0085, 0.0009, -0.0085, -0.0153 ],
            fretNumbers: 122,
            fretNumberSlope: 0.023,
            leftHanded: {
                instrumentOffset: 446,
                scaleOffset: 1005
            },
            attr: { viewBox: "-50 -75 1100 300" }
		}, {
			name:  'Stiletto 6',
            instSelect: { path: '/assets/svg/instruments/profile/upright/stiletto-6.svg', viewbox: '0 0 512 168' },
            instPanel: { path: '/assets/svg/instruments/profile/horiz/stiletto-6.svg', viewbox: '0 0 512 168' },
            path:  '/assets/svg/instruments/stiletto-6-fretboard.svg',
            type: 'Bass Guitar',
            strings: 6,

            markerY:  [103, 87, 70, 53, 37, 21],  
            markerX: [-3, 53, 145, 228, 311, 383, 457, 523, 586, 646, 704, 757, 806, 854, 899, 940, 981, 1018, 1055, 1088, 1120.5, 1150.5, 1178.5, 1205.5, 1231],
            stringSlope: [ 0.0229, 0.0157, 0.0085, 0.002, -0.0063, -0.0128 ],
            fretNumbers: 135,
            fretNumberSlope: 0.023,
            leftHanded: {
                instrumentOffset: 483,
                scaleOffset: 1002
            },
            attr: { viewBox: "-50 -75 1100 300" }
		},

        {
			name: 'Piano',
			instSelect: { path: '/assets/svg/instruments/piano_keys.svg', viewbox: '0 0 100 100'},
            instPanel: { path: '/assets/svg/instruments/piano_keys.svg', viewbox: '0 0 100 100'},
			path: '/assets/svg/instruments/piano_keys.svg',
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






