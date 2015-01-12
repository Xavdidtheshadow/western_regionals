var app = angular.module('westernRegionals', [])
    // config
    // .config([])
    .controller('MainCtrl', ['$scope', function($scope){
        $scope.david = 'asdf';
        $scope.names = ['a','b','c'];
    }]);
