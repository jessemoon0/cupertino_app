'use strict';

angular.module('cupertinoApp.auth', [
  'cupertinoApp.constants',
  'cupertinoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
