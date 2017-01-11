'use strict';

angular.module('cupertinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('repair', {
        url: '/reparar',
        templateUrl: 'app/repair/repair.html',
        controller: 'RepairCtrl',
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('repair.device', {
        url: '/dispositivo',
        templateUrl: 'app/repair/steps/device.html',
        controller: function ($scope, $window) {
          $scope.order.device = {};
          $scope.setLoadingBar(0.166);
          $window.scrollTo(0, 0);
        },
        ncyBreadcrumb: {
          label: 'Dispositivo{{ (order.device.text ? ": " : " ") + order.device.text }}'
        }
      })
      .state('repair.model', {
        url: '/dispositivo/modelo',
        templateUrl: 'app/repair/steps/model.html',
        controller: function ($scope, $window) {
          $scope.order.model = {};
          $scope.setLoadingBar(0.333);
          $window.scrollTo(0, 0);
        },
        ncyBreadcrumb: {
          label: 'Model{{ (order.model.text ? ": " : " ") + order.model.text }}',
          parent: 'repair.device'
        }
      })
      .state('repair.issue', {
        url: '/dispositivo/modelo/color/operador/problema',
        templateUrl: 'app/repair/steps/issue.html',
        controller: function ($scope, $window) {
          $scope.order.issue = {};
          $scope.setLoadingBar(0.50);
          $window.scrollTo(0, 0);
        },
        ncyBreadcrumb: {
          label: 'Problema{{ (order.issue.text ? ": " : " ") + order.issue.text }}',
          parent: 'repair.model'
        }
      })
      .state('repair.address', {
        url: '/dispositivo/modelo/color/operador/problema/dirección',
        templateUrl: 'app/repair/steps/address.html',
        controller: 'AddressCtrl',
        ncyBreadcrumb: {
          label: 'Dirección{{ (order.pickup.formattedAddress ? ": " : " ") + order.pickup.formattedAddress }}',
          parent: 'repair.issue'
        }
      })
      .state('repair.request', {
        url: '/dispositivo/modelo/color/operador/problema/dirección/petición',
        templateUrl: 'app/repair/steps/request.html',
        controller: function ($scope, $window) {
          $scope.setLoadingBar(0.9);
          $window.scrollTo(0, 0);
        },
        ncyBreadcrumb: {
          label: 'Datos personales',
          parent: 'repair.address'
        }
      })
      .state('order-confirmed', {
        url: '/orden/confirmada',
        templateUrl: 'app/repair/steps/order.confirmed.html',
        controller: function ($scope, $window) {
          $window.scrollTo(0, 0);
        }
      });


  });
