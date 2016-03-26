var Scales = Scales || {
    
    key: {
        tonicNotes: [
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
        ],

        root: 0,

        getTonic: function() {
            return this.tonicNotes[this.root];
        },

        getScaleName: function() {
            return Scales.scales[this.selectedScale].name;
        },

        getScalePitches: function() {
            var currentScale = Scales.scales[this.selectedScale];
            var pitches = '';

            for(var i = 0; i < currentScale.steps.length; i++) {
                pitches += currentScale.steps[i] + ' ';
            }

            return pitches;
        },

        getNote: function(scale, root, note) {
            note %= 12;

            var text;
            if(core.notes[note] == '-') {
                //check to see if scale[root] defaults to sharp or flat (ex Ab vs G#)
                if(scale.defaults[root] == '#') {
                    text = core.notes[note - 1] + '#';
                } else {
                    text = core.notes[note + 1] + 'b';
                }
            } else {
                text = core.notes[note];
            }

            return text;
        },

        getNotesString: function(scale, root) {
            var string = '';

            for(var i = 0; i < scale.halfSteps.length; i++) {
                var index = (scale.halfSteps[i] + root) % 12; 

                if(core.notes[index] == '-') {
                    if(scale.defaults[root] == '#') {
                        string += core.notes[index - 1] + '# ';
                    } else {
                        string += core.notes[index + 1] + 'b ';
                    }
                } else {
                    string += core.notes[index] + ' ';
                }
            }

            return string + ' ' + string.split(' ')[0];
        },

        isNoteInKey: function(scale, root, note) {
            note %= 12;

            var len = scale.halfSteps.length;

            for(var i = 0; i < len; i++) {
                if(note == (scale.halfSteps[i] + root) % 12) {
                    return true;
                }
            }

            return false;
        },

        isRootNote: function(root, note) {            
            if((note % 12) == root) {
                return true;
            }

            return false;
        },

        isNaturalNote: function(note) {
            return Scales.notes[note % 12] != '-';
        }
    },    

    drawScale: function(scale, root, instrument, tuning, handedness) {

        //References

        /**
         * tuning (array numbers)
         * scale half steps
         * root
         *
         *  Scales.key.isNoteInKey(note)
                scale.halfSteps
         *  Scales.key.isRootNote(note)
                root
         *  Scales.key.getNote(note)
         *      scale.defaults
         */

        var surface = core.svg.surface;
        var background = core.svg.background;

        core.svg.markers ? core.svg.markers.remove() : -1;
        
        var markers = surface.g(), m;  

        if(!tuning) {
            var x, y;

            for(var i = 0, end = scale.halfSteps.length; i < end; i++) {
                var note = (scale.halfSteps[i] + root) % 12;
                var markerColour = '#0cf';

                x = instrument.notes[note].x;
                y = instrument.notes[note].y;

                if(Scales.key.isRootNote(root, note)) {
                    markerColour = '#bf5';
                } 

                for(var octave = 0; octave < 3; octave++) {                    
                    m = surface.circle(x + (161 * octave) , y - 0.5, 8).attr({ fill: markerColour, stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });
                    var label = surface.text(x + (161 * octave) , y + 2, Scales.key.getNote(scale, root, note)).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
                    markers.add(m, label);
                }
            }

            core.svg.markers = markers;
            core.svg.group = surface.g();
            core.svg.group.add(background, markers);



        } else {
            var markerY = instrument.markerY;
            var markerX = instrument.markerX.slice(); //make COPY of markerX
            var stringOffset = instrument.stringOffset;
            //reverse scale for leftys
            if(handedness == 'Left') {
                for(var i = 0, end = markerX.length; i < end; i++) {
                    markerX[i] = 1002 - markerX[i];
                }
            }

            for(var string = 0, end = tuning.notes.length; string < end; string++) {

                var openNote = tuning.notes[string];

                for(var fret = 0; fret < markerX.length; fret++) {
                    var note = openNote + fret;

                    if(Scales.key.isNoteInKey(scale, root, note)) { 
                        var x = markerX[fret], y = markerY[string + markerY.length - end] + (stringOffset[string] * fret);

                        if(Scales.key.isRootNote(root, note)) {
                            m = surface.circle(x, y - 0.5, 8).attr({ fill: '#bf5', stroke: '#333', strokeWidth: 0.75, opacity: 1 });
                        } else {
                            m = surface.circle(x, y - 0.5, 8).attr({ fill: '#0cf', stroke: '#333', strokeWidth: 0.75, opacity: 1 });
                        }

                        var label = surface.text(x, y + 2, Scales.key.getNote(scale, root, note)).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
                        markers.add(m, label);
                    }
                }
            }

            core.svg.markers = markers;
            core.svg.group = surface.g();
            core.svg.group.add(background, markers, core.svg.fretMarkers);
        }
        
    }
};
   
