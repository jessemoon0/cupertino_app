'use strict';
/**
 * Created by marcochavezf on 7/6/15.
 */
angular.module('cupertinoApp')
  .controller('AddressCtrl', function ($scope, $geolocation, $state, $window, ngDialog, addressHelper) {
    $scope.setLoadingBar(0.75);
    $window.scrollTo(0, 0);

    $scope.map = {
      center: {
        latitude: addressHelper.CONSTANTS.DEFAULT_COORDS.lat,
        longitude: addressHelper.CONSTANTS.DEFAULT_COORDS.lng
      },
      zoom: 12,
      options: {
        streetViewControl: false,
        mapTypeControl: false
      },
      control: {},
      events: {
        dblclick: function (mouseEvent, eventName, args) {
          var lat = args[0].latLng.lat();
          var lng = args[0].latLng.lng();
          addressHelper.geocodeAndCreateAddressModel({
            map: $scope.map,
            scope: $scope,
            marker: $scope.marker,
            location: { lat: lat, lng: lng },
            references: $scope.order.pickup.references
          }, function(res){
            $scope.order.pickup = res;
            $scope.pickUpAddress = $scope.order.pickup.formattedAddress;
          });
        }

      }
    };
    $scope.autocompleteOptions = {
      types: ['geocode']
    };
    $scope.marker = {
      id: 0,
      coords: {
        latitude: $scope.order.pickup.lat || addressHelper.CONSTANTS.DEFAULT_COORDS.lat,
        longitude: $scope.order.pickup.lng || addressHelper.CONSTANTS.DEFAULT_COORDS.lng
      },
      options: {
        draggable: true,
        animation: addressHelper.CONSTANTS.DROP_ANIMATION
      },
      events: {
        dragend: function (marker) {
          var lat = marker.getPosition().lat();
          var lng = marker.getPosition().lng();
          addressHelper.geocodeAndCreateAddressModel({
            map: $scope.map,
            scope: $scope,
            marker: $scope.marker,
            location: { lat: lat, lng: lng },
            references: $scope.order.pickup.references
          }, function(res){
            $scope.order.pickup = res;
            $scope.pickUpAddress = $scope.order.pickup.formattedAddress;
          });
        }
      }
    };

    $scope.pickUpAddress = null;
    $scope.$watch('pickUpAddress', function (place) {
      if (place === null || typeof(place) !== 'object') {
        return;
      }
      var loc = place.geometry.location;
      $scope.order.pickup = addressHelper.createAddressModel({
        map: $scope.map,
        marker: $scope.marker,
        location: {lat: loc.lat(), lng: loc.lng()},
        references: $scope.order.pickup.references,
        formattedAddress: place.formatted_address,
        addressComponents: place.address_components
      });
    }, true);

    $scope.loading = false;
    $scope.validPosition = function () {
      if (typeof $scope.order.pickup.lat === 'undefined') {
        $scope.showHelp = {pin: true};
        $scope.errorMsg = 'Favor de posicionar el PIN ROJO lo más cercano a la dirección de recolección.';
        /*
        ngDialog.open({
          template: 'client/app/dialogs/no-valid-dialog.html',
          controller: ['$scope', function($scope){
            $scope.errorMsg = 'Favor de posicionar el PIN ROJO lo más cercano a la dirección de recolección.'
          }]
        });
        */
        return;
      }
      if (!addressHelper.hasStreetNumber($scope.pickUpAddress, $scope.order.pickup.formattedAddress)) {
        $scope.errorMsg = 'Favor de agregar el número de la calle.';
        /*
        ngDialog.open({
          template: 'client/app/dialogs/no-valid-dialog.html',
          controller: ['$scope', function($scope){
            $scope.errorMsg = 'Favor de agregar el número de la calle.'
          }]
        });
        */
        return;
      }
      $state.transitionTo('repair.request');
    };

    if (typeof $scope.order.pickup.lat === 'undefined') {
      $geolocation.getCurrentPosition({enableHighAccuracy: true})
        .then(function (position) {
          addressHelper.updatePos($scope.map, $scope.marker, position.coords.latitude, position.coords.longitude, true, true);
        });
    } else {
      $scope.pickUpAddress = $scope.order.pickup.formattedAddress;
      addressHelper.updatePos($scope.map, $scope.marker, $scope.order.pickup.lat, $scope.order.pickup.lng, true);
    }

    if (typeof $scope.order.pickup.formattedAddress !== 'undefined') {
      $scope.pickUpAddress = $scope.order.pickup.formattedAddress;
    }

    $scope.$on('$destroy', function () {
      if (typeof $scope.pickUpAddress === 'string') {
        if ($scope.order.pickup.formattedAddress !== $scope.pickUpAddress) {
          /* The user has changed the address without google places (manually) */
          var lat = $scope.order.pickup.lat;
          var lng = $scope.order.pickup.lng;
          var references = $scope.order.pickup.references;
          $scope.order.pickup = {};
          $scope.order.pickup.street = $scope.pickUpAddress;
          $scope.order.pickup.sublocality = $scope.pickUpAddress;
          $scope.order.pickup.references = references;
          $scope.order.pickup.lat = lat;
          $scope.order.pickup.lng = lng;
        }
        $scope.order.pickup.formattedAddress = $scope.pickUpAddress;
      }
      if (typeof $scope.order.pickup.postalCode === 'undefined' || $scope.order.pickup.postalCode === '') {
        if (typeof $scope.order.pickup.formattedAddress !== 'undefined') {
          var postalCodeValue = $scope.order.pickup.formattedAddress.match(/\d{5}/);
          if (postalCodeValue !== null) {
            $scope.order.pickup.postalCode = postalCodeValue[0];
          }
        }
      }
    });

    $scope.$on('gpsPositionRequested',function(){
      $geolocation.getCurrentPosition({enableHighAccuracy: true})
        .then(function (position) {
          addressHelper.geocodeAndCreateAddressModel({
            map: $scope.map,
            scope: $scope,
            marker: $scope.marker,
            location: { lat: position.coords.latitude, lng: position.coords.longitude },
            references: $scope.order.pickup.references
          }, function(res){
            $scope.order.pickup = res;
            $scope.pickUpAddress = $scope.order.pickup.formattedAddress;
          });
        });
    });
  })
  .controller('ControlGpsPositionController', function ($scope) {
    $scope.loadingGpsPosition = false;
    $scope.getGpsLocation = function () {
      $scope.loadingGpsPosition = true;
      $scope.$emit('gpsPositionRequested');
    };
    $scope.$on('gpsPositionRequestFinished', function(){
      $scope.loadingGpsPosition = false;
    });
  });
