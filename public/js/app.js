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
          controller: 'MainController',
          activeTab: "home"
        })


        .state('check', {
          url: '/check',
          templateUrl: 'views/check.html',
          controller: 'CheckController',
          activeTab: "check"
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

    $scope.formModel = {};

    $scope.formModel.quals = [
      {key: "hr", status: false, name: "Head Referee"},
      {key: "sr", status: false, name: "Snitch Referee"},
      {key: "ar", status: false, name: "Assistant Referee"},
      {key: "gr", status: false, name: "Goal Referee"},
      {key: "sc", status: false, name: "Scorekeeper"}
    ];

    $scope.formModel.dates = {
      sat: {status: true, name: "Saturday (2/14)"},
      sun: {status: true, name: "Sunday (2/15)"}
    };

    $scope.formModel.playing = "true";
    $scope.formModel.team = "54bb6231b613d914fb750506";

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

  .controller('CheckController', ['$scope', 'db', function($scope, db){
    $scope.title = 'Check Registration Status';
  }]);