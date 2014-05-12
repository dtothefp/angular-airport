var app = angular.module('airportApp', ['ngResource', 'ngAnimate', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
//
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('chooseAirports', {
    url: "/",
    templateUrl: "templates/choose_airport.html"
  })
  .state('viewAirports', {
    url: "/view",
    templateUrl: "templates/view_airports.html"
  })
});
