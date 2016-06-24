(function(){
	'use strict';

	angular
		.module('musicianist')
		.factory('svgSurface', svgSurfaceFactory);

	function svgSurfaceFactory($q){
		var activeControl = 'pan';
		var surface = null;
		var groups = {};

		var startX = 0, startY = 0, x = 0, y = 0;
		var startZoom = 1, zoom = 1;
		
		var service = {
			activeControl: activeControl,

			zoomPan: {
				startX: 	startX,
				startY: 	startY,
				x: 			x,
				y: 			y,
				startZoom: 	startZoom,
				zoom: 		zoom
			},

			setActiveControl: setActiveControl,
			resetZoomPan: resetZoomPan,
			getSurface: getSurface,

			setGroup: setGroup,
			getGroup: getGroup,

			loadBackground: loadBackground
		};

		return service;

		function getSurface() {
			return surface;
		}

		/**
		 *	If group is null return entire object 'group'
		 */
		function getGroup(group) {
			if(group == null) {
				return groups;
			} 

			return groups[group];
		}

		function setGroup(group, value) {
			groups[group] = value;
		}

		function setActiveControl(controlType) {

			if(this.activeControl !== controlType) {
				this.activeControl = controlType;
			} else {
				this.activeControl = 'none';
			}
		};
		
		function resetZoomPan() {
			service.zoomPan.startX = 0;
			service.zoomPan.startY = 0;
			service.zoomPan.x = 0;
			service.zoomPan.y = 0;
			service.zoomPan.startZoom = 1;
			service.zoomPan.zoom = 1;			
			getGroup('transformGroup').transform('s1,1t0,0');
		};

		//Takes an 'Instrument' object from instrument value
		function loadBackground(instrument, handedness){
			return $q (function (resolve, reject) {

		        var background;
		        
		        if(surface) {
		        	surface.clear();
		        }
		        
		        surface = Snap('#svg-surface');
		        surface.attr(instrument.attr);


		        Snap.load(instrument.path, function(f) {
		            		            
		            background = surface.g();
		            background.append(f.select("g"));
		            background.append(f.select("defs"));
		            surface.append(background);


		            if(!instrument.strings) {
		            	var coords = instrument.coords;
		            	var x = coords.labels.x;
		            	var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
		            	var noteLabels = surface.g();
		            	
		            	for(var i = 0, lim = 21; i < lim; i++) {
		            		noteLabels.append(s.text(x, coords.labels.y, notes[i % 7]).attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" }));
		            		x += coords.labels.increment;
			            }
			        	background.append(noteLabels);

		            } else {

				        var markerY = instrument.markerY;
				        var markerX = instrument.markerX.slice();  //create a COPY of the coords
			            var fretMarkers = surface.g();
							
						var textAttr = { fontSize: '12px', 
										opacity: 1, 
										'text-anchor': 'middle', 
										strokeWidth: 0.4,
										'font-weight': 'bold',
										strokeOpacity: .4,
										stroke: '#fff', 
										fill: '#000' };

						if(handedness == 'Left') {
							textAttr['transform'] = 's-1,1';
						}

			            fretMarkers.append(surface.text(markerX[0], instrument.fretNumbers, 'Open').attr(textAttr));

			            for(var i = 1, lim = markerX.length; i < lim; i++) {
			            	var x = markerX[i];
			            	var y = instrument.fretNumberSlope * x + instrument.fretNumbers;

			                fretMarkers.append(surface.text(x, y, i).attr(textAttr));
			            }

			            background.append(fretMarkers);

		            	if(handedness == 'Left') {
		            		background.transform('s-1,1t' + instrument.leftHanded.instrumentOffset + ',0');
		            	}

			        	//groups.fretMarkers = fretMarkers;
			        }

			        groups.background = background;
		            resolve(true);
		        });
		    });
	    };
	}
})();