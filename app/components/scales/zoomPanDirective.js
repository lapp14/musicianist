(function() {
	'use strict';

	angular
		.module('musicianist')
		.directive('zoomPan', zoomPanDirective);

	zoomPanDirective.$inject = ['$document', 'svgSurface'];
	
	function zoomPanDirective($document, svgSurface) {

		var svg = svgSurface.zoomPan;
		var offset = 1;
		var mouse = {
			x: -1,
			y: -1
		}

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
				svg.startX = event.pageX - svg.x;
				svg.startY = event.pageY - svg.y;

				if(svgSurface.activeControl === 'zoom') {		
					svg.startZoom = svg.zoom;
				} 

				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
					
			}

			function mousemove(event) {
				if(svgSurface.activeControl === 'pan') {
					svg.y = event.pageY - svg.startY;
					svg.x = event.pageX - svg.startX;
				} else if (svgSurface.activeControl === 'zoom') {

					svg.zoom = -((event.pageY - mouse.y) / 100) + svg.startZoom;
					
					// min 0.35, max 4.0
					if(svg.zoom < 0.35) {
						svg.zoom = 0.35;
					} else if(svg.zoom > 4.0) {
						svg.zoom = 4;
					}


					var offsetX = -(mouse.x * svg.zoom);
					var offsetY = -(mouse.y * svg.zoom);

					//y = startY - offsetY;
					//x = startX - offsetX;
					//console.log('mouse.y ' + mouse.y)
					//console.log('pagey ' + event.pageY + ', startZoom ' + startZoom + ', zoom ' + zoom);
				}

				transform();
			}

			function mouseup() {
				if(svgSurface.activeControl === 'pan') {
					element.removeClass('cursor-grabbing');
					element.addClass('cursor-grab');
				}

				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}

			function transform() {
				var s = svgSurface.getGroup('transformGroup');
				var trans = 's' + svg.zoom + ',' + svg.zoom + 't' + (svg.x / offset / svg.zoom) + ',' + (svg.y / offset / svg.zoom);
				s.transform(trans);
			}
		}
	};
})();