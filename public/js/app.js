var app = angular.module('westernRegionals', ['selectize', 'ui.router'])
  .config([
    '$stateProvider', 
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider

        // home page
        .state('home', {
          url: '/',
          templateUrl: 'views/form.html',
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
  .controller('MainController', ['$scope', function($scope) {
    $scope.title = 'Register to Volunteer!';

    $scope.teams = [
     {id: 1, name: "Anteater Quidditch"},
     {id: 2, name: "Arizona Quidditch Club"},
     {id: 3, name: "Arizona State University"},
     {id: 4, name: "Cal Quidditch"},
     {id: 5, name: "California Dobbys"},
     {id: 6, name: "Crimson Elite"},
     {id: 7, name: "Crimson Fliers"},
     {id: 8, name: "Los Angeles Gambits"},
     {id: 9, name: "Mission Blues Quidditch"},
     {id: 10, name: "NAU Narwhals"},
     {id: 11, name: "Riverside Quidditch"},
     {id: 12, name: "San Jose State University Spartans"},
     {id: 13, name: "Santa Barbara Blacktips"},
     {id: 14, name: "Silicon Valley Skrewts"},
     {id: 15, name: "Silicon Valley Skyfighters"},
     {id: 16, name: "Stanford Quidditch"},
     {id: 17, name: "The Long Beach Funky Quaffles"},
     {id: 18, name: "The Lost Boys"},
     {id: 19, name: "University of Arizona Quidditch"},
     {id: 20, name: "University of California Los Angeles"},
     {id: 21, name: "University of Southern California"},
     {id: 22, name: "Utah State Quidditch Club"},
     {id: 23, name: "Wizards of Westwood"}
    ];

    $scope.myModel = "";

    $scope.conf = {
      create: false,
      options: $scope.teams,
      valueField: 'id',
      labelField: 'name',
      sortField: 'id',
      searchField: 'name',
      maxItems: 1,
      placeholder: 'Type your team'
    };

  }])
  .controller('CheckController', ['$scope', function($scope) {
    $scope.title = 'Check Registration Status';
  }]);