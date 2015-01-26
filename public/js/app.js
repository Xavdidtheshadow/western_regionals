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
        })

        .state('info', {
          url: '/info',
          templateUrl: 'views/info.html'
        })

        .state('confirm', {
          url: '/confirm',
          templateUrl: 'views/conf.html',
          controller: 'ConfController',
        })

        .state('stats', {
          url: '/stats',
          templateUrl: 'views/stats.html',
          resolve: {
            peoplePromise: ['db', function(db){
              return db.getPeople();
            }]
          },
          controller: 'StatsController'
        });

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
  }])

  // factories
  .factory('db', ['$http', function($http){
    var o = {
      teams: [],
      people: []
    };

    o.getTeams = function(){
      return $http.get('/api/teams').success(function(data){
        angular.copy(data, o.teams);
      });
    };

    o.getPeople = function(){
      return $http.get('/api/people').success(function(data){
        angular.copy(data, o.people);
      });
    };

    o.createPerson = function(p){
      return $http.post('/api/people', p).success(function(data){
        o.info = data;
      });
    };

    o.findPerson = function(e){
      return $http.get('/api/search/' + e).success(function(data){
        o.person = data;
      });
    };

    return o;
  }])

  // controllers
  .controller('MainController', ['$scope', '$state', 'db', function($scope, $state, db){
    // initialize model
    $scope.formModel = {};
    $scope.formModel.name = '';
    $scope.formModel.email = '';
    $scope.formModel.available = [
      {key: "sat", status: true, name: "Saturday (2/14)"},
      {key: "sun", status: true, name: "Sunday (2/15)"}
    ];

    $scope.formModel.qualifications = [
      {key: "hr", status: false, name: "Head Referee"},
      {key: "sr", status: false, name: "Snitch Referee"},
      {key: "ar", status: false, name: "Assistant Referee"},
      {key: "gr", status: false, name: "Goal Referee"},
      {key: "sc", status: false, name: "Scorekeeper"}
    ];

    $scope.formModel.playing = "true";
    $scope.formModel.team = "54bb6231b613d914fb750506";
    $scope.formModel.other = '';

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


    $scope.createPerson = function(){
      // fake some validation
      if ($scope.formModel.name === '' || $scope.formModel.email === '')
        {return;}

      db.createPerson($scope.formModel)
        .success(function(data){
          $state.go('confirm');
        })
        .error(function(err){
          $scope.error = "Server Error! Probably caused by trying to use a non-unique email. If the issue persists, contact"; // email in view
        });
    };
  }])

  .controller('CheckController', ['$scope', 'db', function($scope, db){
    $scope.model = {email: ''};
    $scope.message = "";

    $scope.searchPerson = function(){
      db.findPerson($scope.model.email)
        .success(function(data){
          if(data){
            $scope.message = "You've registered!";
          }
          else {
            $scope.message = "No registration with that email found.";
          }
        });
    };
  }])

  .controller('ConfController', ['$scope', 'db', function($scope, db){
    $scope.formModel = db.info;

    // I can't beleive JS allows this
    $scope.colors = {
      true: 'info',
      false: 'danger'
    };
  }])

  .controller('StatsController', ['$scope', 'db', function($scope, db){
    console.log(db.people);
    $scope.num = db.people.length;

    if ($scope.num < 20){
      $scope.color = 'red';
    }
    else if ($scope.num < 40) {
      $scope.color = 'yellow';
    }
    else {
      $scope.color = 'green';
    }

    $scope.teams = [
      {name: 'asdf', num: 3},
      {name: 'qwer', num: 2},
      {name: 'zxcv', num: 1}
    ];
  }]);