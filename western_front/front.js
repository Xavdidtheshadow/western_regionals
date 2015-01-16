// only the avatar, master of all 4 elements, could stop them

var app = angular.module('westernRegionals', ['ui.router','selectize'])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: "form.html",
          controller: "MainCtrl"
        })
        .state('check', {
            url: '/check',
            templateUrl: "base.html",
            controller: "CheckCtrl"
            // resolve: {
            //     post: ['$stateParams', 'posts', function($stateParams, posts){
            //         console.log('about to resolve');
            //         return posts.getOne($stateParams.id);
            //     }]
            // }
        });

      $urlRouterProvider.otherwise('/');

      // $locationProvider.html5Mode(true);
    }
  ])
  .factory('db', ['$http', function($http){
    var o = {
      teams: []
    };

    o.getTeams = function(){
      return $http.get('/teams').success(function(data){
        angular.copy(data, o.teams);
      });
    };
  }])
  .controller('MainCtrl', ['$scope', function($scope){
    console.log('in main');
  }])
  .controller('CheckCtrl', ['$scope', function($scope){
    console.log('in check');
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

    $scope.conf = {
      create: false,
      options: $scope.teams,
      valueField: 'id',
      labelField: 'name',
      sortField: 'id',
      maxItems: 1,
      placeholder: 'Type your team'
    };
  }]);