app.controller('MainController', ['$scope', '$rootScope', '$location', '$state', function ($scope, $rootScope, $location, $state) {
  $scope.showLoader = true;
  $scope.frontPage = true;
  $scope.viewPage = false;
  $scope.$on("hideLoader", function() {
    $scope.showLoader = false;
  });
  if($location.path() === "/view") {
    $location.path("/");
  }
  $rootScope.$on('$locationChangeStart', function() {
    console.log("location change listener", $location.path());
    if($location.path() === "/") {
      $scope.frontPage = true;
      $scope.viewPage = false;
    } else if($location.path() === "/view") {
      $scope.frontPage = false;
      $scope.viewPage = true;
    }
  });
}]);

app.controller('ChooseAirportController', function($scope, $http, RequestService, $state, ShareScope, $rootScope, $location) {
  var originCode,destCode;
  $scope.limit = 10;
  $scope.callback = function (data) {
    return data;
  }
  $http.get('/airportReq').success(function(data) {
    $scope.airports = data.airports;
    $scope.$emit("hideLoader");
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
      //$scope.airportData = resp;
      $state.go("viewAirports");
      ShareScope.setAirports(resp);
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

app.controller('ViewAirportsController', ['$scope', 'ShareScope', function ($scope, ShareScope) {
  $scope.airportData = ShareScope.getAirports();
}]);
