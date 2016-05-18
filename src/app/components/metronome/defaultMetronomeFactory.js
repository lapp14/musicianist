(function() {
	'use strict';

	angular
		.module('musicianist')
		.factory('defaultMetronome', defaultMetronomeFactory);

	/**
	*  Chris Wilson's AudioContext metronome
	*  https://github.com/cwilso/metronome
	*/

	function defaultMetronomeFactory() {
		var audioContext = null;
		var isPlaying = false;      // Are we currently playing?
		var startTime;              // The start time of the entire sequence.
		var currentNote;        // What note is currently last scheduled?
		var tempo = 120;          // tempo (in beats per minute)
		var lookahead = 25;       // How frequently to call scheduling function 
		                          //(in milliseconds)
		var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
		                          // This is calculated from lookahead, and overlaps 
		                          // with next interval (in case the timer is late)
		var nextNoteTime = 0.0;     // when the next note is due.
		var noteResolution = 2;     // 0 == 16th, 1 == 8th, 2 == quarter note
		var noteLength = 0.05;      // length of "beep" (in seconds)

		var last16thNoteDrawn = -1; // the last "box" we drew on the screen
		var notesInQueue = [];      // the notes that have been put into the web audio,
		                          // and may or may not have played yet. {note, time}
		var timerWorker = null;     // The Web Worker used to fire timer messages

		var colors = {
			off: '#333',
			beatOne: '#64d220',
			downBeat: '#22d220',
			upBeat: '#0ff'
		}

		var blipColor = colors.off;

		var service = {

        	init: init,
        	play: play,
        	isPlaying: isMetronomePlaying,
        	blipColor: blipColor,

        	getNoteResolution: getNoteResolution,
        	setNoteResolution: setNoteResolution,
        	getTempo: getTempo,
        	setTempo: setTempo
		}

		return service;

		function getNoteResolution() {
			return noteResolution;
		}

		function setNoteResolution(r) {
			noteResolution = r;
		}

		function getTempo() {
			return tempo;
		}

		function setTempo(t) {
			tempo = t;
		}

		function isMetronomePlaying() {
			return isPlaying === true;
		}

		function nextNote() {
			// Advance current note and time by a 16th note...
			var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
			                                    // tempo value to calculate beat length.
			nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

			currentNote++;    // Advance the beat number, wrap to zero
			if (currentNote == 16) {
				currentNote = 0;
			}
		}

		function scheduleNote( beatNumber, time ) {
			// push the note on the queue, even if we're not playing.
			notesInQueue.push( { note: beatNumber, time: time } );

			if ( (noteResolution==1) && (beatNumber%2))
				return; // we're not playing non-8th 16th notes
			if ( (noteResolution==2) && (beatNumber%4))
				return; // we're not playing non-quarter 8th notes

			// create an oscillator
			var osc = audioContext.createOscillator();


			osc.connect( audioContext.destination );
			if (beatNumber % 16 === 0) {   // beat 0 == low pitch
				osc.frequency.value = 880.0;
			} else if (beatNumber % 4 === 0 ) {   // quarter notes = medium pitch 
				osc.frequency.value = 440.0;
			} else {                        // other 16th notes = high pitch
				osc.frequency.value = 220.0;
			}

			osc.start( time );
			osc.stop( time + noteLength );
		}

		function scheduler() {
			// while there are notes that will need to play before the next interval, 
			// schedule them and advance the pointer.
			while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
				  scheduleNote( currentNote, nextNoteTime );
				  nextNote();
			}
		}

		function play() {
			isPlaying = !isPlaying;

			if (isPlaying) { // start playing
				currentNote = 0;
				nextNoteTime = audioContext.currentTime;
				timerWorker.postMessage("start");
				return "stop";
			} else {
				timerWorker.postMessage("stop");
				return "play";
			}
		}

		function init(){
			// NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
			// Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
			// TO WORK ON CURRENT CHROME!!  But this means our code can be properly
			// spec-compliant, and work on Chrome, Safari and Firefox.

			//checkBrowserSupport();
			//console.log('metronome')

			//if(browserSupport.AudioContext && browserSupport.Worker) {
			audioContext = new AudioContext();

				timerWorker = new Worker("/app/components/metronome/metronomeWorker.js");
				timerWorker.onmessage = function(e) {
					if (e.data == "tick") {
						// console.log("tick!");
						scheduler();
					} else {
						console.log("message: " + e.data);
					}
				};
				
				timerWorker.postMessage({
			    	"interval": lookahead
			  });
				
				if(typeof requestAnimFrame === 'undefined') {
					requestAnim = false;
					console.log('requestAnimFrame undefined');
				}

			  // if we wanted to load audio files, etc., this is where we should do it.
			  requestAnimFrame(draw);
			//}

		}

		function draw() {
			var currentNote = last16thNoteDrawn;
			var currentTime = audioContext.currentTime;

			while (notesInQueue.length && notesInQueue[0].time < currentTime) {
				currentNote = notesInQueue[0].note;
				notesInQueue.splice(0,1);   // remove note from queue
			}

			// set up to draw again
			requestAnimFrame(draw);
		}
	}
})();