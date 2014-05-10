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

app.directive('verticalAlign', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attr) {
        function sizeElm() {
          elm.css("margin-top", "-" + elm[0].offsetHeight/2 + "px");
        }
        sizeElm();
        window.addEventListener('resize', sizeElm);
    }
  }
});
