'use strict';

angular.module('cupertinoApp', [
  'cupertinoApp.auth',
  'cupertinoApp.admin',
  'cupertinoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'cfp.loadingBar',
  'ncy-angular-breadcrumb',
  'ngMaterial',
  'ngLodash',
  'uiGmapgoogle-maps',
  'google.places',
  'ngGeolocation',
  'restangular',
  'ngDialog'
])
  .config(function($urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    cfpLoadingBarProvider.autoIncrement = false;
    cfpLoadingBarProvider.includeSpinner = false;
  });
