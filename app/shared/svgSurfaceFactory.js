(function(){
	'use strict';

	angular
		.module('musicianist')
		.factory('svgSurface', svgSurfaceFactory);

	function svgSurfaceFactory($q){
		var activeControl = 'pan';
		var surface = null;
		var groups = {};

		var service = {
			activeControl: activeControl,

			//refactor these
			startZoom: 1,
			zoom: 1,
			pan: {
				startX: 0,
				startY: 0,
				x: 0,
				y: 0
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
			this.zoom = 1;
			this.startZoom = 1;
			this.pan.x = this.pan.y = 0;
			core.svg.group.transform("s" + this.zoom + "," + this.zoom + "t" + this.pan.x + "," + this.pan.y);
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
							
							//reverse fret labels and flip fretboard for leftys
			        	if(handedness == 'Left') {
			        		background.transform('s-1,1');
			        		for(var i = 0, end = markerX.length; i < end; i++) {
			        			markerX[i] = 1000 - markerX[i];
			        		}
			        	}

			        	var textAttr = { fontSize: '12px', 
										opacity: 1, 
										"text-anchor": "middle", 
										strokeWidth: 0.4,
										'font-weight': 'bold',
											strokeOpacity: .4,
										stroke: '#fff', 
										fill: '#000' };

			            fretMarkers.append(surface.text(markerX[0], instrument.fretNumbers, 'Open').attr(textAttr));

			            for(var i = 1, lim = markerX.length; i < lim; i++) {
			            	var x = markerX[i];
			            	var y = instrument.fretNumbers + instrument.fretNumberOffset * i;

			                fretMarkers.append(surface.text(x, y, i).attr(textAttr));
			            }

			        	groups.fretMarkers = fretMarkers;
			        }

			        groups.background = background;
		            resolve(true);
		        });
		    });
	    };
	}
})();