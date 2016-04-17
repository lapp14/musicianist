(function() {
	'use strict';

	angular
		.module('musicianist')
		.directive('zoomPan', zoomPanDirective);

	zoomPanDirective.$inject = ['$document', 'svgSurface'];
	
	function zoomPanDirective($document, svgSurface) {

		var startX = 0, startY = 0, x = 0, y = 0;
		var startZoom = 1, zoom = 1;
		var mouse = {
			x: -1,
			y: -1
		}
		var offset = 1;

		return {
			link: zoomPan
		}

		function zoomPan(scope, element, attr) {

			element.on('mousedown', mousedown);

			
			function mousedown(event) {
				if(svgSurface.activeControl === 'none') {
					return;
				}

				console.log('offsetX: ' + event.offsetX + ', offsetY: ' + event.offsetY);
				event.preventDefault();

				offset = element[0].clientWidth / element[0].viewBox.animVal.width;
				mouse.x = event.pageX;
				mouse.y = event.pageY;

				//init pan whether its zoom or pan
				startX = event.pageX - x;
				startY = event.pageY - y;

				if(svgSurface.activeControl === 'zoom') {		
					startZoom = zoom;
				} 

				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
					
			}

			function mousemove(event) {
				if(svgSurface.activeControl === 'pan') {
					y = event.pageY - startY;
					x = event.pageX - startX;
				} else if (svgSurface.activeControl === 'zoom') {
					zoom = ((event.pageY - mouse.y) / 100) + startZoom;

					var offsetX = -(mouse.x * zoom);
					var offsetY = -(mouse.y * zoom);

					//y = startY - offsetY;
					//x = startX - offsetX;
					console.log('mouse.y ' + mouse.y)
					console.log('pagey ' + event.pageY + ', startZoom ' + startZoom + ', zoom ' + zoom);
				}

				var s = svgSurface.getGroup('transformGroup');
				s.transform('s' + zoom + ',' + zoom + 't' + (x / offset / zoom) + ',' + (y / offset / zoom));
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		}
	};
})();