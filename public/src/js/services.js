app.factory('RequestService', function($resource) {
  var makeRequest = {};

  makeRequest.allAirports = $resource('/airportReq');

  makeRequest.compareAirports = $resource('/api/:origin/:dest', {
      origin: '@origin',
      dest: '@dest'
    }
  );

  return makeRequest;
});

app.factory('ShareScope', function($rootScope) {
  var selectedAirports, sc = {};

  sc.setAirports = function(response) {
    selectedAirports = response;
  },
  sc.getAirports = function() {
    $rootScope.$broadcast("dataShared");
    return selectedAirports;
  }

  return sc;
});
