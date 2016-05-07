var Scales = Scales || {

    scales: [
        {
            name: 'Major',
            steps: ['1', '2', '3', '4', '5', '6', '7'],
            halfSteps: [0, 2, 4, 5, 7, 9, 11], //0 indexed to Scales.scales.notes
            defaults: ['#', '#', '#', '#', '#', 'b', 'b', '#', 'b', '#', 'b', '#']
        },

        {
            name: 'Natural Minor',
            steps: ['1', '2', '3b', '4', '5', '6b', '7b'],
            halfSteps: [0, 2, 3, 5, 7, 8, 10],
            defaults: ['#', '#', '#', 'b', '#', 'b', 'b', 'b', 'b', '#', 'b', '#']
        },

        {
            name: 'Harmonic Minor',
            steps: ['1', '2', '3b', '4', '5', '6b', '7'],
            halfSteps: [0, 2, 3, 5, 7, 8, 11],
            defaults: ['#', '#', '#', 'b', '#', 'b', 'b', 'b', 'b', '#', 'b', '#']
        }
    ],

    notes: [
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
    ],

    guitar: {
        tuning: [4, 9, 2, 7, 11, 4], //standard, 0 indexed

        coords: {
            markerY: [84, 67, 50, 33, 16, -1],
            markerX: [-18, 42, 108, 171, 236, 297, 353, 406, 458, 506, 551, 594, 634, 674, 710, 746, 779, 811, 840, 869, 895, 919, 941, 961, 980],
            fretNumbers: 115
        }
    },

    key: {
        rootNotes: [
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
        selectedScale: 0,

        getTonic: function() {
            return this.rootNotes[this.root];
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

        getCurrentScale: function() {
            return Scales.scales[this.selectedScale];
        },

        getNote: function(n) {
            n %= 12;

            var note;
            if(Scales.notes[n] == '-') {
                if(this.getCurrentScale().defaults[this.root] == '#') {
                    note = Scales.notes[n - 1] + '#';
                } else {
                    note = Scales.notes[n + 1] + 'b';
                }
            } else {
                note = Scales.notes[n];
            }

            return note;
        },

        getNotesString: function() {
            var key = Scales.scales[this.selectedScale];
            var string = '';

            for(var i = 0; i < key.halfSteps.length; i++) {
                var index = (key.halfSteps[i] + this.root) % 12; 

                if(Scales.notes[index] == '-') {
                    if(key.defaults[this.root] == '#') {
                        string += Scales.notes[index - 1] + '# ';
                    } else {
                        string += Scales.notes[index + 1] + 'b ';
                    }
                } else {
                    string += Scales.notes[index] + ' ';
                }
            }

            return string;
        },

        isNoteInKey: function(note) {
            note %= 12;

            var currentScale = Scales.key.getCurrentScale();
            var len = currentScale.halfSteps.length;

            for(var i = 0; i < len; i++) {
                if(note == (currentScale.halfSteps[i] + Scales.key.root) % 12) {
                    return true;
                }
            }

            return false;
        },

        isRootNote: function(note) {            
            if((note % 12) == this.root) {
                return true;
            }

            return false;
        }
    },

    canvas: {
        background:     null,
        foreground:     null,
        fretboard:      null,
        zoomFactor:     1,
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
        }               
    },

    events: {
        mouseDownEvent: function(event) {
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
        }
    },

    start: function(){
        var width = 1300;
        var height = 700;
        
        Scales.canvas.background = new Canvas('background', width, height);
        Scales.canvas.foreground = new Canvas('foreground', width, height);

        Scales.canvas.fretboard = document.createElement('canvas');
        Scales.canvas.fretboard.context = Scales.canvas.fretboard.getContext('2d');
        marker = document.createElement('canvas');
        marker.context = marker.getContext('2d');
        markerRoot = document.createElement('canvas');
        markerRoot.context = markerRoot.getContext('2d');
                        
        /*Music.foreground.canvas.addEventListener('click', function(evt) {
            var rect = Music.getBackgroundCanvas().getBoundingClientRect();
            var pos = new Point(
                Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * Music.getBackgroundCanvas().width),
                Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * Music.getBackgroundCanvas().height)
            );
            pos.logCoords('click');
            Music.selection.setSelection(pos, Music.util.randomInt(80) + 80, Music.util.randomInt(50) + 50);
        });*/

        canvg(Scales.canvas.fretboard, 'svg/guitar_fretboard.svg');
        canvg(marker, 'svg/marker.svg');
        canvg(markerRoot, 'svg/marker_root.svg');

        Scales.canvas.pan();

        Scales.canvas.background.setDirty();
        Scales.canvas.foreground.setDirty();

        window.requestAnimationFrame(Scales.canvas.draw);
    }
};
   
