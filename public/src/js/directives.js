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

app.directive('map', function($rootScope, $timeout, ShareScope) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
        // setTimeout(function() {
        //   debugger;
        // }.bind(ShareScope), 2000);
      var airportData = this.getAirports();
      var map;
      var bounds = new google.maps.LatLngBounds();
      var mapOptions = {
          mapTypeId: 'roadmap'
      };

      map = new google.maps.Map(elm[0], mapOptions);

      var markers = [
            [airportData.origin.name, airportData.origin.lat, airportData.origin.lng],
            [airportData.dest.name, airportData.dest.lat, airportData.dest.lng]
          ];

      var infoWindowContent = [
          ['<div class="info_content">' +
          '<h3>Origin: ' + airportData.origin.name + '</h3>' +
          '<p>Distance to Destination: ' + airportData.distance + ' Nautical Miles</p></div>'],
          ['<div class="info_content">' +
          '<h3>Destination: ' + airportData.dest.name + '</h3>' +
          '<p>Distance to Origin: ' + airportData.distance + ' Nautical Miles</p></div>']
      ];

      var infoWindow = new google.maps.InfoWindow(), marker, i;

      for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
                infoWindow.close();
            }
        })(marker, i));
      }

      map.fitBounds(bounds);
      window.addEventListener('resize', function() {
        map.fitBounds(bounds);
      });

     // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
      var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
          this.setZoom(4);
          google.maps.event.removeListener(boundsListener);
      });
    }.bind(ShareScope)
  }
});

// function initialize() {
//     var map;
//     var bounds = new google.maps.LatLngBounds();
//     var mapOptions = {
//         mapTypeId: 'roadmap'
//     };

//     // Display a map on the page
//     map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//     map.setTilt(45);

//     // Multiple Markers
//     var markers = [
//         ['London Eye, London', 51.503454,-0.119562],
//         ['Palace of Westminster, London', 51.499633,-0.124755]
//     ];

//     var infoWindowContent = [
//         ['<div class="info_content">' +
//         '<h3>Origin' +  + '</h3>' +
//         '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
//         ['<div class="info_content">' +
//         '<h3>Palace of Westminster</h3>' +
//         '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//         '</div>']
//     ];

//     // Info Window Content
//     var infoWindowContent = [
//         ['<div class="info_content">' +
//         '<h3>London Eye</h3>' +
//         '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
//         ['<div class="info_content">' +
//         '<h3>Palace of Westminster</h3>' +
//         '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//         '</div>']
//     ];

//     // Display multiple markers on a map
//     var infoWindow = new google.maps.InfoWindow(), marker, i;

//     // Loop through our array of markers & place each one on the map
//     for( i = 0; i < markers.length; i++ ) {
//         var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//         bounds.extend(position);
//         marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: markers[i][0]
//         });

//         // Allow each marker to have an info window
//         google.maps.event.addListener(marker, 'click', (function(marker, i) {
//             return function() {
//                 infoWindow.setContent(infoWindowContent[i][0]);
//                 infoWindow.open(map, marker);
//             }
//         })(marker, i));

//         // Automatically center the map fitting all markers on the screen
//         map.fitBounds(bounds);
//     }

//     // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
//     var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
//         this.setZoom(14);
//         google.maps.event.removeListener(boundsListener);
//     });

// }
