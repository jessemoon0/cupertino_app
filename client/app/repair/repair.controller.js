'use strict';

angular.module('cupertinoApp')
  .controller('RepairCtrl', function ($scope, $state, $window, cfpLoadingBar, Restangular) {

    $scope.loading = null;
    $scope.order = {
      device: '',
      model: '',
      issue: '',
      customer: {
        displayName: '',
        email: '',
        phoneNumber: ''
      },
      pickup: {}
    };

    $state.transitionTo('repair.device');
    cfpLoadingBar.start();
    $scope.devices = [
      { title: 'iPhone', src: '/assets/images/iPhone.png' },
      { title: 'iPad', src: '/assets/images/iPad.png' },
      { title: 'iPod', src: '/assets/images/iPod.png' },
      { title: 'Android', src: '/assets/images/Android.png' }
    ];
    $scope.models = [
      ['6s Plus', '6s', '6 Plus', '6', '5s', '5c', '5', '4s', '4'], //iPhone
      ['Mini', 'Mini 2', 'Mini 3', 'Air', '1', '2', '3', '4'], //iPad
      ['Touch 6 gen', 'Touch 5 gen', 'Touch 4 gen'], //iPod
      ['S6 Edge', 'S6', 'S5', 'S4', 'S4 mini', 'S3', 'Note 4', 'Note 3', 'Note 2'] //Android
    ];
    $scope.issues = ['Screen', 'Batery', 'Charger', 'On/Off Button', 'Home Button'];
    $scope.prices = [
      [ //iPhone
        [ //6s Plus
          []
        ]
      ]
    ];
    $scope.showBackButton = false;

    $scope.selectDevice = function(index){
      $scope.showBackButton = true;
      $scope.order.device = {
        text: $scope.devices[index].title,
        index: index
      };
      $state.transitionTo('repair.model');
    };

    $scope.selectModel = function(index){
      $scope.order.model = {
        text: $scope.models[$scope.order.device.index][index],
        index: index
      };
      $state.transitionTo('repair.issue');
    };
    $scope.selectIssue = function(index){
      $scope.order.issue = {
        text: $scope.issues[index],
        index: index
      };
      $state.transitionTo('repair.address');
    };

    $scope.setLoadingBar = function(value){
      cfpLoadingBar.start();
      cfpLoadingBar.set(value);
    };

    $scope.goBack = function(){
      $window.history.back();
    };

    var ordersRepair = Restangular.all('api/orders/repair');
    $scope.requestOrder = function(){
      $scope.loading = 'Loading...';
      $scope.errMsg = null;

      var orderData = {
        device: $scope.order.device.text,
        model: $scope.order.model.text,
        issue: $scope.order.issue.text,
        customer: $scope.order.customer,
        pickup: $scope.order.pickup
      };

      console.log(orderData);
      ordersRepair.post(orderData)
        .then(function(){
          $scope.loading = null;
          cfpLoadingBar.complete();
          $state.transitionTo('order-confirmed');
        }, function(){
          $scope.errMsg = 'Error al procesar la orden, favor de intentar nuevamente :(';
          $scope.loading = null;
        });
    };

    $scope.$on('$destroy', function () {
      cfpLoadingBar.set(0);
    });

    $scope.$on('$stateChangeStart', function(event, toState){
      switch(toState.name){
        case 'repair.device':
          $scope.showBackButton = false;
              break;
        default:
          $scope.showBackButton = true;
      }
    });
  });
