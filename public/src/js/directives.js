app.directive('selectAirport', [function () {
  return {
    restrict: 'A',
    scope: {
      set: "&"
    },
    link: function (scope, elm, attrs) {
      elm.on('click', function() {
        scope.set({name: elm.text()});
      });
    }
  };
}]);
