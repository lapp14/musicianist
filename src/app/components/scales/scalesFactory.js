(function(){
    'use strict';

    angular
        .module('musicianist')
        .factory('scales', ['notes', 'instrument', 'state', 'svgSurface', scalesFactory]);

    function scalesFactory(notes, instrument, state, svgSurface) {

        var service =  {
            getNote: getNote,
            getNotesString: getNotesString,
            isNoteInKey: isNoteInKey,
            isRootNote: isRootNote,            
            drawScale: drawScale
        };

        return service;


        function getNote(note, root, scale) {
            note %= 12;

            var text;
            if(notes[note] == '-') {
                //check to see if scale[root] defaults to sharp or flat (ex Ab vs G#)
                if(scale == null || root == null || scale.defaults[root] == '#') {
                    text = notes[note - 1] + '#';
                } else {
                    text = notes[note + 1] + 'b';
                }
            } else {
                text = notes[note];
            }

            return text;
        };

        function getNotesString(scale, root) {
            var string = '';

            for(var i = 0; i < scale.halfSteps.length; i++) {
                var index = (scale.halfSteps[i] + root) % 12; 

                if(notes[index] == '-') {
                    if(scale.defaults[root] == '#') {
                        string += notes[index - 1] + '# ';
                    } else {
                        string += notes[index + 1] + 'b ';
                    }
                } else {
                    string += notes[index] + ' ';
                }
            }

            return string + ' ' + string.split(' ')[0];
        }

        function isNoteInKey(scale, root, note) {
            note %= 12;

            var len = scale.halfSteps.length;

            for(var i = 0; i < len; i++) {
                if(note == (scale.halfSteps[i] + root) % 12) {
                    return true;
                }
            }

            return false;
        }

        function isRootNote(root, note) {            
            if((note % 12) == root) {
                return true;
            }

            return false;
        }

        function drawScale(scale, root, tuning) {

            var inst       = instrument.getCurrentInstrument();
            var handedness = instrument.handedness;
            var surface = svgSurface.getSurface();
            var background = svgSurface.getGroup().background;

            svgSurface.getGroup().markers ? svgSurface.getGroup().markers.remove() : -1;

            var markers = surface.g(), m;  

            if(!tuning) {
                var x, y;

                for(var i = 0, end = scale.halfSteps.length; i < end; i++) {
                    var note = (scale.halfSteps[i] + root) % 12;
                    var markerColour = '#0cf';

                    x = inst.notes[note].x;
                    y = inst.notes[note].y;

                    if(this.isRootNote(root, note)) {
                        markerColour = '#bf5';
                    } 

                    for(var octave = 0; octave < 3; octave++) {                    
                        m = surface.circle(x + (161 * octave) , y - 0.5, 8).attr({ fill: markerColour, stroke: '#333', strokeWidth: 0.75, });
                        var label = surface.text(x + (161 * octave) , y + 2, this.getNote(note, root, scale)).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
                        markers.add(m, label);
                    }
                }

                svgSurface.setGroup('markers', markers);

                var transformGroup = surface.g();
                transformGroup.add(background, markers);

                svgSurface.setGroup('transformGroup', transformGroup);



            } else {
                var markerY = inst.markerY;
                var markerX = inst.markerX.slice(); //make COPY of markerX

                var offsets = {
                    scale: 0,
                    flip:  1
                };                

                var stringSlope = inst.stringSlope;

                if(state.handedness == 'Left') {
                    offsets.scale = inst.leftHanded.scaleOffset;        
                    offsets.flip  = -1;           
                }


                for(var string = 0, end = tuning.notes.length; string < end; string++) {

                    var openNote = tuning.notes[string];

                    for(var fret = 0; fret < markerX.length; fret++) {
                        var note = openNote + fret;


                        if(this.isNoteInKey(scale, root, note)) { 
                            var x = markerX[fret] * offsets.flip;

                            var b = markerY[string + markerY.length - end]; // y-intercept, or starting y position
                            var y = (stringSlope[string] * offsets.flip) * x + b; // y = mx + b

                            x += offsets.scale;

                            if(this.isRootNote(root, note)) {
                                m = surface.circle(x, y - 0.5, 8).attr({ fill: '#bf5', stroke: '#333', strokeWidth: 0.75, opacity: 1 });
                            } else {
                                m = surface.circle(x, y - 0.5, 8).attr({ fill: '#0cf', stroke: '#333', strokeWidth: 0.75, opacity: 1 });
                            }

                            var label = surface.text(x, y + 2, this.getNote(note, root, scale)).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
                            markers.add(m, label);
                        }
                    }
                }

                svgSurface.setGroup('markers', markers);

                var transformGroup = surface.g();
                transformGroup.add(background, markers/*, svgSurface.getGroup('fretMarkers')*/);

                svgSurface.setGroup('transformGroup', transformGroup);
            }
            
        } // drawScale()
    }; // scalesFactory()     
})();