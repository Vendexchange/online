angular
	.module('cqNgApp')
	.component('colorPicker', {
		controller: ColorPicker,
		templateUrl: './templates/colorpicker.html',
		controllerAs: 'colorPicker'
	});

ColorPicker.$inject = ['$element', '$rootScope', '$scope', 'CIQ'];

function ColorPicker($element, $rootScope, $scope, CIQ) {

	var colorPickerColors = [
		"ffffff", "ffd0cf", "ffd9bb", "fff56c", "eaeba3", "d3e8ae", "adf3ec", "ccdcfa", "d9c3eb",
		"efefef", "eb8b87", "ffb679", "ffe252", "e2e485", "c5e093", "9de3df", "b1c9f8", "c5a6e1",
		"cccccc", "e36460", "ff9250", "ffcd2b", "dcdf67", "b3d987", "66cac4", "97b8f7", "b387d7",
		"9b9b9b", "dd3e39", "ff6a23", "faaf3a", "c9d641", "8bc176", "33b9b0", "7da6f5", "9f6ace",
		"656565", "b82c0b", "be501b", "e99b54", "97a030", "699158", "00a99d", "5f7cb8", "784f9a",
		"343434", "892008", "803512", "ab611f", "646c20", "46603a", "007e76", "3e527a", "503567",
		"000000", "5c1506", "401a08", "714114", "333610", "222f1d", "00544f", "1f2a3c", "281a33"
	];

	var createColorPicker = function (div, fc) {
		var colors = colorPickerColors;
		CIQ.clearNode(div);
		var ul = document.createElement("ul");
		div.appendChild(ul);
		function clkFn(c) {
			return function () {
				fc(c);
				return false;
			};
		}

		for (var i = 0; i < colors.length; i++) {
			var c = colors[i];
			var li = document.createElement("li");
			var a = document.createElement("a");
			li.appendChild(a);
			a.href = "#";
			a.title = c;
			a.style.background = "#" + c;
			a.innerHTML = c;
			ul.appendChild(li);
			a.onclick = clkFn(c);
		}
	};

	var ctrl = this;
	ctrl.posLeft = 0;
	ctrl.posTop = 0;
	ctrl.caller = false;
	ctrl.launch = false;

	ctrl.$postLink = function () {
		$rootScope.$on('launchColorPicker', function (event, params) {
			createColorPicker($element[0].children.colorPicker.children[0], ctrl.setColor(params));
			var clicked = params.swatch;
			ctrl.posLeft = clicked.offsetLeft;
			ctrl.posTop = clicked.offsetHeight;
			ctrl.caller = clicked;
			ctrl.launch = true;
		});
	};

	ctrl.setColor = function (params) {
		return function () {
			$rootScope.$broadcast('setColorFromPicker', {color: arguments[0], source: ctrl.caller, params: params});
			ctrl.closeMe();
		};
	};

	ctrl.closeMe = function () {
		$scope.$apply(function () {
			ctrl.launch = false;
			ctrl.posLeft = 0;
			ctrl.posTop = 0;
		});
	};

}
