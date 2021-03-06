var component = angular.module('ecoposApp');

component.directive('delivery', function () {
	'use strict';

	var directionsDisplay = new google.maps.DirectionsRenderer(),
		directionsService = new google.maps.DirectionsService(),
		geocoder = new google.maps.Geocoder(),
		map,
		marker,
		mapObj,
		infowindow;

	mapObj = {
		restrict: 'EAC',
		scope: {
			destination: '@',
			markerContent: '@',
			zoom: '=',
			type: '@',
			directions: '@'
		},
		replace: true,
		templateUrl: 'app/directives/components/delivery/delivery.html',
		link: function (scope, element, attrs) {
			scope.init = function () {
				var mapOptions = {
					zoom: scope.zoom !== undefined ? scope.zoom : 15,
					mapTypeId: scope.type,
					streetViewControl: false
				};
				map = new google.maps.Map(document.getElementById('theMap'), mapOptions);
				scope.endPoint = scope.destination !== undefined ? scope.destination : '6812 Alberni St, Powell River, BC V8A 2B4';

				geocoder.geocode({
					address: scope.endPoint
				}, function (results, status, $log) {
					var location = results[0].geometry.location;
					if (status === google.maps.GeocoderStatus.OK) {
						map.setCenter(location);
						marker = new google.maps.Marker({
							map: map,
							position: location,
							animation: google.maps.Animation.DROP
						});
						infowindow = new google.maps.InfoWindow({
							content: scope.markerContent !== undefined ? scope.markerContent : 'Google HQ'
						});
						google.maps.event.addListener(marker, 'click', function () {
							return infowindow.open(map, marker);
						});

					} else {
						$log('Cannot Geocode');

					}

				});


			};

			scope.init();

			scope.getDirections = function () {
				var request = {
					origin: scope.origin,
					destination: scope.endPoint,
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				};
				directionsService.route(request, function (response, status) {
					if (status === google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						document.getElementById('wrongAddress').style.display = "none";
					} else {
						document.getElementById('wrongAddress').style.display = "block";
					}
				});
				directionsDisplay.setMap(map);

				directionsDisplay.setPanel(document.getElementById('directionsList'));

			};

			scope.clearDirections = function () {
				scope.init();
				directionsDisplay.setPanel(null);
				scope.origin = '';
			};



		}
	};

	return mapObj;



});