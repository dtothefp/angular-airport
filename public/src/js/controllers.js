app.controller('MainController', function($scope, $http, RequestService) {
  var originCode,destCode;
  $scope.showLoader = true;
  $scope.callback = function (data) {
    return data;
  }
  $http.get('/airportReq').success(function(data) {
    $scope.airports = data.airports;
    $scope.showLoader = false;
  });
  $scope.setOrigin = function(airport) {
    originCode = airport.code;
    $scope.queryOrigin = airport.name;
  }
  $scope.setDest = function(airport) {
    destCode = airport.code;
    $scope.queryDest = airport.name;
  }
  $scope.getAirportData = function() {
    RequestService.compareAirports.get({
      origin: originCode,
      dest: destCode
    }, function(resp) {
      $scope.airportData = resp;
    }, function(err) {
      console.log("error", err);
    });
  }
  $scope.clearAirportData = function() {
    $scope.queryOrigin = "";
    $scope.queryDest = "";
    $scope.airportData = "";
  }
});
