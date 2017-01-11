'use strict';

describe('Controller: RepairCtrl', function () {

  // load the controller's module
  beforeEach(module('cupertinoApp'));

  var RepairCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepairCtrl = $controller('RepairCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
