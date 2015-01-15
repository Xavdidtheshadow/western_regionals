var app = angular.module('westernRegionals', ['ui.router','selectize'])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: "base.html",
          controller: "MainCtrl"

        })
        .state('check', {
            url: '/check',
            templateUrl: "form.html",
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
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.david = 'asdf';
    $scope.names = ['a','b','c'];
  }])
  .controller('CheckCtrl', ['$scope', function($scope){
    $scope.david = 'qwer';
    $scope.teams = ["Anteater Quidditch", "Arizona Quidditch Club", "Arizona State University", "Cal Quidditch", "California Dobbys", "Crimson Elite", "Crimson Fliers", "Los Angeles Gambits", "Mission Blues Quidditch", "NAU Narwhals", "Riverside Quidditch", "San Jose State University Spartans", "Santa Barbara Blacktips", "Silicon Valley Skrewts", "Silicon Valley Skyfighters", "Stanford Quidditch", "The Long Beach Funky Quaffles", "The Lost Boys", "University of Arizona Quidditch", "University of California Los Angeles", "University of Southern California", "Utah State Quidditch Club", "Wizards of Westwood"];

    $scope.conf = {
      create: false,
      options: $scope.teams,
      sortField: 'id',
      maxItems: 1,
      placeholder: 'Type your team'
    };
  }]);