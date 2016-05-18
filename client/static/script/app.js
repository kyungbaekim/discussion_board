var discussion = angular.module('discussion_board', ['ngRoute']);
discussion.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/login.html'
    })
    .when('/dashboard',{
      templateUrl: 'partials/dashboard.html'
    })
    .when('/topic/:id',{
      templateUrl: 'partials/topic.html'
    })
    .when('/user/:id',{
      templateUrl: 'partials/user.html'
    })
      redirectTo: '/dashboard'
    });

discussion.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max);
    for (var i=min; i<=max; i++)
      input.push(i);
    return input;
  };
});
