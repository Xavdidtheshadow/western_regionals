var app = angular.module('westernRegionals', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index',
        controller: MainCtrl
      }).
      when('/check', {
        templateUrl: 'havei',
        controller: CheckCtrl
      }); //.
      // otherwise({
        // redirectTo: '/'
      // });
    // $locationProvider.html5Mode(true);
  }])
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.david = 'asdf';
    $scope.names = ['a','b','c'];
  }])
  .controller('CheckCtrl', ['$scope', function($scope){
    $scope.david = 'qwer';
  }]);
