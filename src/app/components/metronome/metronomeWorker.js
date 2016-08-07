(function(){
	var timerID  = null;
	var interval = 100;

	self.onmessage=function(e){
		if (e.data == "start") {
			//console.log("starting");
			timerID = setInterval(tick, interval);

		} else if (e.data.interval) {
			interval = e.data.interval;
			
			if (timerID) {
				clearInterval(timerID);
				timerID = setInterval(tick ,interval)
			}
		} else if (e.data == "stop") {
			//console.log("stopping");
			clearInterval(timerID);
			timerID = null;
		}

		function tick() {
			postMessage('tick');
		}
	};
})();