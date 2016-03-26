(function(){	
	'use strict';

	angular
		.module('musicianist')
		.factory('svgSurface', svgSurfaceFactory);

	function svgSurfaceFactory() {
		var activeControl = 'pan';
		var surface = {};

		var service = {
			surface: surface,
			activeControl: activeControl,
			setActiveControl: setActiveControl,
			resetZoomPan: resetZoomPan,


			//refactor these variables
			startZoom: 1,
			zoom: 1,
			pan: {
				startX: 0,
				startY: 0,
				x: 0,
				y: 0
			}	
		};

		return service;

		function setActiveControl(controlType) {
			if(this.activeControl !== controlType) {
				this.activeControl = controlType;
			} else {
				this.activeControl = 'none';
			}
		};

		function resetZoomPan() {
			this.zoom = 1;
			this.startZoom = 1;
			this.pan.x = this.pan.y = 0;
			core.svg.group.transform("s" + this.zoom + "," + this.zoom + "t" + this.pan.x + "," + this.pan.y);
		};
	};
});