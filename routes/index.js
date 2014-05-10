var http = require('http');
var fs   = require('fs');
var _    = require('lodash');
var queryString = "?user_key=033fcb2988c4919a8b8146bdec241905";
var __request = require('./helpers/request');

function setPath() {
  if(arguments.length === 1) {
    return "/airport/" + arguments[0] + queryString;
  } else if(arguments.length === 2) {
    return "/airport/distance/" + arguments[0] + "/" + arguments[1] + queryString;
  }
}

exports.json = function(req, res) {
  options.path = setPath(req.params.origin);

  var handleOriginRes = function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      res.send({origin: str});
    });
  }
  http.request(options, handleOriginRes).end();
};

exports.airportList = function(req, res) {
  fs.readFile('./airports.json', function (err, data) {
    if (err) {
        throw err;
    }
    var parsed = JSON.parse(data.toString());
    var filtered = _.filter(parsed, {"iso":"US"});
    res.json(filtered);
  });
};

var options = {
  hostname: 'airport.api.aero',
  path: '/airport?user_key=033fcb2988c4919a8b8146bdec241905'
};

exports.getAirports = function(req, res) {

  function callback(data) {
    return _.filter(data.airports, {"country":"United States"});
  };

  var handleAirportRes = function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {

      res.send({airports: eval( str )});
    });
  }
  http.request(options, handleAirportRes).end();
}

exports.api = function(req, res) {
  var origin = req.params.origin,
    dest = req.params.dest,
    processedResponses = {},
    urls = [],
    host = "http://airport.api.aero/airport/";

  _.forOwn(req.params, function(airport) {
    urls.push(host + airport + queryString);
  });
  urls.push(host + "distance/" + origin + "/" + dest + queryString);

  var callback = function(data) {
    if (data.distance) {
      this.distance = Math.round( Number( data.distance.replace(/[, ]/, "") )/0.539957 );
    } else if (data.airports) {
      if (data.airports[0].code === origin) {
        this.origin = data.airports[0];
      } else if (data.airports[0].code === dest) {
        this.dest = data.airports[0];
      }
    }
  }.bind(processedResponses);

  __request(urls, function(responses) {
    _.forOwn(responses, function(response, key) {
      eval(response.body);
    });
    res.send(processedResponses);
  });
}
