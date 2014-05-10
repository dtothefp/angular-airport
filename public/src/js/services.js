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
