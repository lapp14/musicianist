angular.module('musicianist').controller('chordsCtrl', ['$scope', 'async', 'util', function ($scope, async, util) {
	$scope.JSONData = {};

	$scope.state = {
		chordStructure: 'open',
		chordTonic: 'A',
		chordType: 'Major'
	}

	$scope.first = -28;
	$scope.sec = 0;
	$scope.third = 196;
	$scope.fourth = 135;
   
	$scope.scale = 1;
	$scope.pan = 0;

	async.getJSON('/assets/json/chords.json').then(function (data) {
		$scope.JSONData.chords = data.chords;
		start();
	}, function (error) {
		//console.log('async.get error tunings.json');
	});		

	$scope.change = function() {
		core.svg.surface.attr({ viewBox: $scope.first + ' ' + $scope.sec + ' ' + ($scope.third + 166) + ' ' + $scope.fourth});
	};

	$scope.action = function() {
		Chords.drawChordBarre(1, 1, 6);
	};

	function start() {
		$scope.draw.drawChord();
	}

	$scope.draw = {
		drawChord: function() {
			Chords.drawChord($scope.JSONData.chords.guitar[$scope.state.chordStructure][$scope.state.chordType][$scope.state.chordTonic]);
		}
	}

	async.loadBackground(core['Guitar'].svg/*, $scope.instrument, $scope.handedness*/);
	$scope.change();
}]);
