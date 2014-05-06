var app = angular.module('airportApp', []);

app.controller('MainController', function($scope, $http) {
  $http.get('/airports').success(function(data) {
    $scope.airports = data;
    console.log($scope.airports);
  });
  $scope.setOrigin = function(name) {
    $scope.queryOrigin = name;
    $scope.$apply();
  }
  $scope.setDest = function(name) {
    $scope.queryDest = name;
    $scope.$apply();
  }
  $scope.getAirportData = function() {
    console.log("get data");
  }
  $scope.clearAirportData = function() {
    $scope.queryOrigin = "";
    $scope.queryDest = "";
  }
});

app.directive('selectAirport', [function () {
  return {
    restrict: 'A',
    scope: {
      set: "&"
    },
    link: function (scope, elm, attrs) {
      elm.on('click', function() {
        scope.set({name: elm.text()})
      });
    }
  };
}])
