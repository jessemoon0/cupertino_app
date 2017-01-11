'use strict';
/**
 * Created by marcochavezf on 1/18/16.
 */
angular.module('cupertinoApp')
  .factory('addressHelper', function ($geolocation, ngDialog, lodash) {

    var addressHelper = {};
    var geocoder = new google.maps.Geocoder;

    function isNotSet(stringVar) {
      return stringVar === '' || typeof stringVar === 'undefined';
    }

    function mapAddressComponents(addressComponents, addressObj) {
      for (var i = 0; i < addressComponents.length; i++) {
        mapAddressComponent(addressComponents[i], addressObj);
      }
    }

    function mapAddressComponent(addressComponent, addressObj) {
      var type = addressComponent.types[0];
      var longName = addressComponent.long_name;
      var shortName = addressComponent.short_name;
      switch (type) {
        case 'street_address':
        case 'route':
          if (isNotSet(addressObj.street)) {
            addressObj.street = longName;
          } else {
            addressObj.street = longName + ' ' + addressObj.street;
          }
          break;

        case 'street_number':
          if (isNotSet(addressObj.street)) {
            addressObj.street = longName;
          } else {
            addressObj.street += ', ' + longName;
          }
          break;

        case 'country':
          addressObj.country = longName;
          addressObj.isoCountry = shortName;
          break;

        case 'political':
        case 'administrative_area':
        case 'administrative_area_level_1':
        case 'administrative_area_level_2':
        case 'administrative_area_level_3':
        case 'administrative_area_level_4':
        case 'administrative_area_level_5':
          if (isNotSet(addressObj.administrativeArea)) {
            addressObj.administrativeArea = longName;
          } else {
            addressObj.administrativeArea += ', ' + longName;
          }
          break;

        case 'locality':
          if (isNotSet(addressObj.locality)) {
            addressObj.locality = longName;
          } else {
            addressObj.locality += ', ' + longName;
          }
          break;

        case 'sublocality':
        case 'sublocality_level_1':
        case 'sublocality_level_2':
        case 'sublocality_level_3':
        case 'sublocality_level_4':
        case 'sublocality_level_5':
        case 'neighborhood':
          if (isNotSet(addressObj.sublocality)) {
            addressObj.sublocality = longName;
          } else {
            addressObj.sublocality += ', ' + longName;
          }
          break;

        case 'postal_code':
          addressObj.postalCode = longName;
          break;
      }
    }

    addressHelper.updatePos = function(map, marker, lat, lng, centerMap, defaultZoom, disableZoom) {
      lat = lat || addressHelper.CONSTANTS.DEFAULT_COORDS.lat;
      lng = lng || addressHelper.CONSTANTS.DEFAULT_COORDS.lng;
      var position = {latitude: lat, longitude: lng};
      if (centerMap) {
        map.center = position;
      }
      if (!disableZoom) {
        map.zoom = defaultZoom ? addressHelper.CONSTANTS.ZOOM_OUT : addressHelper.CONSTANTS.ZOOM_IN;
      }
      marker.coords = position;
    };

    addressHelper.geocode = function(location, callback){
      if(!geocoder){
        geocoder = new google.maps.Geocoder;
      }
      geocoder.geocode({'location': location}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var addressResult = results[0];
          if (addressResult) {
            callback(null, addressResult);
          } else {
            callback({ message: 'No hubo resultados para la posición actual :(' });
          }
        } else {
          callback({ message: 'Hubo un error al obtener la posición actual :( Favor de intentar nuevamente' });
        }
      });
    };

    addressHelper.createAddressModel = function(params){
      var map = params.map;
      var marker = params.marker;
      var location = params.location;
      var references = params.references;
      var formattedAddress = params.formattedAddress;
      var addressComponents = params.addressComponents;
      var centerMap = lodash.isUndefined(params.centerMap) ? true : params.centerMap;
      var disableZoom = params.disableZoom;
      var defaultZoom = params.defaultZoom;

      var addressModel = {};
      addressModel.lat = location.lat;
      addressModel.lng = location.lng;
      addressModel.references = references;
      addressModel.formattedAddress = formattedAddress;

      mapAddressComponents(addressComponents, addressModel);
      addressHelper.updatePos(map, marker, location.lat, location.lng, centerMap, defaultZoom, disableZoom);

      if (!addressHelper.containsPostalCode(addressModel.formattedAddress)) {
        if (addressHelper.containsPostalCode(addressModel.postalCode)) {
          addressModel.formattedAddress += ', C.P. ' + addressModel.postalCode;
        }
      }
      var center = new google.maps.LatLng(marker.coords.latitude, marker.coords.longitude);
      map.control.refresh();
      map.control.getGMap().panTo(center);
      return addressModel;
    };

    addressHelper.geocodeAndCreateAddressModel = function(params, callback){
      var map = params.map;
      var scope = params.scope;
      var marker = params.marker;
      var location = params.location;
      var centerMap = params.centerMap;
      var references = params.references;
      var defaultZoom = params.defaultZoom;
      var disableZoom = params.disableZoom;
      addressHelper.geocode(location, function(err, res){
        if (err){
          scope.$broadcast('gpsPositionRequestFinished');
          addressHelper.errorMsg = err.message;
          scope.errorMsg = err.message;
          return;
          /*
          return ngDialog.open({
            template: 'views/dialogs/no-valid-dialog.html',
            scope: addressHelper
          });
          */
        }
        var addressModel = addressHelper.createAddressModel({
          map: map,
          marker: marker,
          location: location,
          centerMap: centerMap,
          references: references,
          defaultZoom: defaultZoom,
          disableZoom: disableZoom,
          formattedAddress: res.formatted_address,
          addressComponents: res.address_components
        });
        scope.$broadcast('gpsPositionRequestFinished');
        callback(addressModel);
      });
    };

    addressHelper.containsPostalCode = function (stringAddress) {
      if (typeof stringAddress !== 'string') {
        return false;
      }
      var hasPostalCode = /\d{5}/;
      return hasPostalCode.test(stringAddress);
    };
    addressHelper.hasStreetNumber = function (fieldAddress, formattedAddress) {
      var hasStreetNumber = /\d/;
      if (typeof fieldAddress === 'string') {
          return hasStreetNumber.test(fieldAddress);
      } else {
          return hasStreetNumber.test(formattedAddress);
      }
    };

    addressHelper.CONSTANTS = {
      DROP_ANIMATION: 2,//google.maps.Animation.DROP}
      DEFAULT_COORDS: {
        lat: 19.41,
        lng: -99.16
      },
      ZOOM_OUT: 12,
      ZOOM_IN: 16
    };

    return addressHelper;
  });
