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

			scope.$watch(function() {return svgSurface.activeControl}, function(newValue) {
				if(newValue) {

					if(newValue === 'zoom') {
						element.removeClass('cursor-grab');
						element.addClass('cursor-zoom');
					} else if(newValue === 'pan') {
						element.removeClass('cursor-zoom');
						element.addClass('cursor-grab');
					} else {
						element.removeClass('cursor-zoom');
						element.removeClass('cursor-grab');
					}
				}
			}, true);

			element.on('mousedown', mousedown);
			
			function mousedown(event) {

				if(svgSurface.activeControl === 'none') {
					return;
				} else if(svgSurface.activeControl === 'pan') {
					element.removeClass('cursor-grab');
					element.addClass('cursor-grabbing');
				}

				event.preventDefault();

				offset = (element[0].clientWidth || element[0].parentNode.clientWidth) / element[0].viewBox.animVal.width;

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
					//console.log('mouse.y ' + mouse.y)
					//console.log('pagey ' + event.pageY + ', startZoom ' + startZoom + ', zoom ' + zoom);
				}

				var s = svgSurface.getGroup('transformGroup');
				var trans = 's' + zoom + ',' + zoom + 't' + (x / offset / zoom) + ',' + (y / offset / zoom);
				s.transform(trans);
			}

			function mouseup() {
				if(svgSurface.activeControl === 'pan') {
					element.removeClass('cursor-grabbing');
					element.addClass('cursor-grab');
				}

				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		}
	};
})();