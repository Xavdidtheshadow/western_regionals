var app = angular.module('westernRegionals', ['selectize', 'ui.router'])
  
  // config
  .config([
    '$stateProvider', 
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider){

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/form.html',
          resolve: {
            teamsPromise: ['db', function(db){
              return db.getTeams();
            }]
          },
          controller: 'MainController'
        })


        .state('check', {
          url: '/check',
          templateUrl: 'views/check.html',
          controller: 'CheckController'
        });

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true);
  }])

  // factories
  .factory('db', ['$http', function($http){
    var o = {
      teams: []
    };

    o.getTeams = function(){
      return $http.get('/api/teams').success(function(data){
        angular.copy(data, o.teams);
      });
    };

    return o;
  }])

  // controllers
  .controller('MainController', ['$scope', 'db', function($scope, db){
    $scope.title = 'Register to Volunteer!';

    $scope.myModel = {};

    $scope.conf = {
      create: false,
      options: db.teams,
      valueField: '_id',
      labelField: 'name',
      sortField: '_id',
      searchField: 'name',
      maxItems: 1,
      placeholder: 'Type your team'
    };

  }])

  .controller('CheckController', ['$scope','db', function($scope, db){
    $scope.title = 'Check Registration Status';
    console.log(db);
  }]);