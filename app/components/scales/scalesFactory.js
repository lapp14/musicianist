(function(){
    'use strict';

    angular
        .module('musicianist')
        .factory('scales', ['notes', 'svgSurface', scalesFactory]);

    function scalesFactory(notes, svgSurface) {

        var service =  {
            getNote,
            getNotesString,
            isNoteInKey,
            isRootNote,            
            drawScale
        };

        return service;


        function getNote(scale, root, note) {
            note %= 12;

            var text;
            if(notes[note] == '-') {
                //check to see if scale[root] defaults to sharp or flat (ex Ab vs G#)
                if(scale.defaults[root] == '#') {
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

        function drawScale(scale, root, instrument, tuning, handedness) {

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

            var surface = svgSurface.getSurface();
            var background = svgSurface.getGroup().background;

            svgSurface.getGroup().markers ? svgSurface.getGroup().markers.remove() : -1;

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

                        if(this.isNoteInKey(scale, root, note)) { 
                            var x = markerX[fret], y = markerY[string + markerY.length - end] + (stringOffset[string] * fret);

                            if(this.isRootNote(root, note)) {
                                m = surface.circle(x, y - 0.5, 8).attr({ fill: '#bf5', stroke: '#333', strokeWidth: 0.75, opacity: 1 });
                            } else {
                                m = surface.circle(x, y - 0.5, 8).attr({ fill: '#0cf', stroke: '#333', strokeWidth: 0.75, opacity: 1 });
                            }

                            var label = surface.text(x, y + 2, this.getNote(scale, root, note)).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
                            markers.add(m, label);
                        }
                    }
                }

                svgSurface.setGroup('markers', markers);

                var transformGroup = surface.g();
                transformGroup.add(background, markers, svgSurface.getGroup('fretMarkers'));

                svgSurface.setGroup('transformGroup', transformGroup);
            }
            
        } // drawScale()
    }; // scalesFactory()     
})();