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

    svg: {

    },

    canvas: {
      /*   zoomFactor:     1,
        isMouseDown:    false,

        position:       new Point(),
        mousePosition:  new Point(),  
        panPosition:    new Point(),
        dragOffset:     new Point(), 

        pan: function() {
            var zoomFactor = this.zoomFactor;
            var width = this.background.getWidth();
            var height = this.background.getHeight();

            this.position.x = (width / zoomFactor - this.fretboard.width) / 2 + this.panPosition.x + this.dragOffset.x;
            this.position.y = (height / zoomFactor - this.fretboard.height) / 2 + this.panPosition.y + this.dragOffset.y;
            this.background.setDirty();
            this.foreground.setDirty();
        },

       draw: function() {
            if(Scales.canvas.background.isDirty) {
                var bg = Scales.canvas.background;
                var markerX = Scales.guitar.coords.markerX;
                
                bg.context.setTransform(1, 0, 0, 1, 0, 0);
                bg.clearAll();

                bg.context.font = "12px Calibri";
                bg.context.textAlign = "center";


                bg.context.scale(Scales.canvas.zoomFactor, Scales.canvas.zoomFactor);
                bg.context.translate(Scales.canvas.position.x, Scales.canvas.position.y);
                bg.drawCanvas(Scales.canvas.fretboard, 0, 0);

                for(var i = 0; i < markerX.length; i++) {
                    bg.context.fillText(i, markerX[i] + 8, Scales.guitar.coords.fretNumbers);
                }
                
                bg.isDirty = false;
            }

            if(Scales.canvas.foreground.isDirty) {
                var fg = Scales.canvas.foreground;

                var markerY = Scales.guitar.coords.markerY;
                var markerX = Scales.guitar.coords.markerX;

                fg.context.setTransform(1, 0, 0, 1, 0, 0);
                fg.clearAll();

                fg.context.font = "10px Calibri";
                fg.context.textAlign = "center";

                fg.context.scale(Scales.canvas.zoomFactor, Scales.canvas.zoomFactor);
                fg.context.translate(Scales.canvas.position.x, Scales.canvas.position.y);
                
                for(var string = 0; string < markerY.length; string++) {

                    var openNote = Scales.guitar.tuning[string];

                    for(var fret = 0; fret < markerX.length; fret++) {
                        var note = openNote + fret;

                        if(Scales.key.isNoteInKey(note)) {                      
                            if(Scales.key.isRootNote(note)) {
                                fg.drawCanvas(markerRoot, markerX[fret], markerY[string]);
                            } else {
                                fg.drawCanvas(marker, markerX[fret], markerY[string]);
                            }

                            fg.context.fillText(Scales.key.getNote(note), markerX[fret] + 8, markerY[string] + 12);
                        }
                    }
                }

                fg.isDirty = false;
            }

            window.requestAnimationFrame(Scales.canvas.draw);
        }   */            
    },

    events: {
       /* mouseDownEvent: function(event) {
            console.log('down');
            Scales.canvas.isMouseDown = true;
            Scales.canvas.mousePosition.x = event.pageX;
            Scales.canvas.mousePosition.y = event.pageY;

            window.addEventListener('mousemove', Scales.events.mouseMoveEvent, false);
            window.addEventListener('mouseup', Scales.events.mouseUpEvent, false);
        },

        mouseMoveEvent: function(event) { 
            Scales.canvas.dragOffset.x = (event.pageX - Scales.canvas.mousePosition.x) / Scales.canvas.zoomFactor;
            Scales.canvas.dragOffset.y = (event.pageY - Scales.canvas.mousePosition.y) / Scales.canvas.zoomFactor;
            Scales.canvas.pan();
        },

        mouseUpEvent: function() {
            Scales.canvas.isMouseDown = false;
            window.removeEventListener('mousemove', Scales.events.mouseMoveEvent, false);
            window.removeEventListener('mouseup', Scales.events.mouseUpEvent, false);
            Scales.canvas.panPosition.x += Scales.canvas.dragOffset.x;
            Scales.canvas.panPosition.y += Scales.canvas.dragOffset.y;
            Scales.canvas.dragOffset = new Point();
        }*/
    },

    /*loadScales: function() {
        $.ajaxSetup({
            async: false
        });

        $.getJSON("../../json/scales.json", function(data) {
            Scales.scales = [];

            $.each(data.scales, function(key, val) {
                Scales.scales.push(val);
            });
        });  

        $.ajaxSetup({
            async: true
        });
    },

    start: function(){
        var markerY = Scales.guitar.coords.markerY;
        var markerX = Scales.guitar.coords.markerX;
        var width = 1300;
        var height = 700;
        var fretboard;      

        Scales.svg.surface = Snap('#svg-surface');
        Scales.svg.surface.attr({ viewBox: "-30 -45 1050 160" });

        Scales.svg.fretboard = Snap.load('../svg/guitar_fretboard2.svg', function(f) {

            var s = Scales.svg.surface;
            
            fretboard = f.select("g");
            fretboard.append(f.select("defs"));
            s.append(fretboard);

            s.text(markerX[0], Scales.guitar.coords.fretNumbers, 'Open').attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" });

            for(var i = 1, lim = markerX.length; i < lim; i++) {
                s.text(markerX[i], Scales.guitar.coords.fretNumbers, i).attr({ fontSize: '10px', opacity: 1, "text-anchor": "middle" });
            }
        });
    },*/

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

        if(instrument == 'Piano') {
            var x, y;

            for(var i = 0, end = scale.halfSteps.length; i < end; i++) {
                var note = (scale.halfSteps[i] + root) % 12;
                var markerColour = '#0cf';

                x = core.Piano.notes[note].x;
                y = core.Piano.notes[note].y;

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


            /*for(var note = 0, end = 36; note < end; note++) {
                
                if(Scales.key.isNoteInKey(scale, root, note)) { 

                    var offset = 0;
                    
                    if(Scales.key.isNaturalNote(note)) {
                        y = Scales.Piano.coords.whiteKeys.y 
                    } else {
                        y = Scales.Piano.coords.blackKeys.y;
                        offset = 10;
                    }
                    
                    if(Scales.key.isRootNote(root, note)) {
                        m = surface.circle(x + offset, y - 0.5, 8).attr({ fill: '#bf5', stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });
                    } else {
                        m = surface.circle(x + offset, y - 0.5, 8).attr({ fill: '#0cf', stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });
                    }

                    var label = surface.text(x + offset, y + 2, Scales.key.getNote(scale, root, note)).attr({ fontSize: '8px', opacity: 1, "text-anchor": "middle" });
                    markers.add(m, label);
                    x += Scales.Piano.coords.whiteKeys.increment;
                }
            }*/

        } else {
            var markerY = core[instrument].coords.markerY;
            var markerX = core[instrument].coords.markerX.slice(); //make COPY of markerX
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
                        var x = markerX[fret], y = markerY[string + markerY.length - end];

                        if(Scales.key.isRootNote(root, note)) {
                            m = surface.circle(x, y - 0.5, 8).attr({ fill: '#bf5', stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });
                        } else {
                            m = surface.circle(x, y - 0.5, 8).attr({ fill: '#0cf', stroke: '#333', strokeWidth: 0.75, opacity: 0.8 });
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
        
    },

    drawTitle: function(scale, tonic, tuning) {

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


        core.svg.title ? core.svg.title.remove() : -1;
        
        var title = core.svg.surface.g(), key, notes;

        var text = Scales.key.tonicNotes[tonic] + ' ' + scale.name;
        
        key = core.svg.surface.text(0, -32, text).attr({ fontSize: '22px', opacity: 1});
        notes = core.svg.surface.text(0, -10, Scales.key.getNotesString(scale, tonic)).attr({ fontSize: '16px', opacity: 1});
        title.add(key, notes);

        core.svg.title = title;
    }
};
   
