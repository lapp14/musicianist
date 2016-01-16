var Chords = Chords || {

	drawChord: function(chord) {
		var surface = core.svg.surface;
        var background = core.svg.background;

        if(core.svg.markers) {
            core.svg.markers.remove();
        }

        var markers = surface.g(), m;  

		var markerY = core['Guitar'].coords.markerY;
        var markerX = core['Guitar'].coords.markerX.slice(); //make COPY of markerX
        //reverse scale for leftys
       /* if(handedness == 'Left') {
            for(var i = 0, end = markerX.length; i < end; i++) {
                markerX[i] = 1002 - markerX[i];
            }
        }*/
        	var bars = [];

        	//for each note in the chord
            for(var i = 0; i < chord.notes.length; i++) {
            	
                    var x = markerX[chord.notes[i]], y = markerY[markerY.length - chord.notes.length + i];

                    //if the string is played
                    if(chord.notes[i] >= 0 ) {
                    	var barre = Chords.checkChordBarre(i, chord);

                    	if(bars.indexOf(chord.notes[i]) < 0) {
	                    	if(barre >= 0) {
	                    		Chords.drawChordBarre(chord, i, barre, markers);
	                    		bars.push(chord.notes[i]);
	                    	} else {
		                        var c = chord.fingers[i] || 'O';
		                        var color = chord.fingers[i] ? '#0cf' : '#6d0';
		                        m = surface.circle(x, y - 0.5, 8).attr({ fill: color, stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });

			                    var label = surface.text(x, y + 2, c).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
			                    markers.add(m, label);
			               	}    
			            }    
                    } else {
                    	x = markerX[0];
                    	m = surface.circle(x, y - 0.5, 8).attr({ fill: '#c01', stroke: '#500', strokeWidth: 0.75, opacity: 1 });

	                    var label = surface.text(x + 0.5, y + 3, 'X').attr({ 
	                    	fontSize: '10px', 
	                    	opacity: 1, 
	                    	"text-anchor": "middle", 
	                    	"font-weight": "bold",
	                    	fill: '#311',
	                    	//stroke: '#333', 
	                    	strokeWidth: 1, 
	                    	opacity: 1 
	                    });	                    

	                    markers.add(m, 	label);
                    }
                
            }
        core.svg.markers = markers;
        
	},

	drawChordBarre: function(chord, index, end, markers) {
		var surface = core.svg.surface;
		var markerY = core['Guitar'].coords.markerY;
        var markerX = core['Guitar'].coords.markerX.slice(); //make COPY of markerX
        var yOffset = markerY.length - chord.notes.length;
        var fret = chord.notes[index];

        var x1 = markerX[fret] - 8, y1 = markerY[end + yOffset] - 8;
        var x2 = 16, y2 = markerY[index + yOffset] - markerY[end + yOffset] + 16;

        m = surface.rect(x1, y1, x2, y2, 8, 8).attr({ fill: '#0cf', stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });

		var label = surface.text(markerX[fret], markerY[index + yOffset], chord.fingers[index]).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });

		markers.add(m, label);
	},

	checkChordBarre: function(index, chord) {
		var fng = chord.fingers[index];
		var end = -1;

		if(fng <= 0) {
			return -1;
		}

		for(var i = index + 1; i < chord.notes.length; i++) {
			if(chord.fingers[i] === fng) {
				end = i;
			}
		}

		return end;
	}
}