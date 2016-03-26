(function() {
	'use strict';

	angular
		.module('musicianist')
		.factory('async', asyncFactory);

	function asyncFactory($http, $q) {

		function getJSON(file) {
			return $http.get(file).then(function (response){
				if(typeof response === 'object') {
					return response.data;
				} else {
					return $q.reject(response.data);
				}	
			});	
		}

		//Takes an 'Instrument' object from instrument value
		function loadBackground(instrument, handedness){
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

		return {
			getJSON,
			loadBackground
		};
	}

})(); 