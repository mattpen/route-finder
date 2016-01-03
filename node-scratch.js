var request = require("request");
var geolib = require("geolib");

var headers =  {
  "Api-Key": "gwp3chq2nkybbqa6rsxqq5usqpwybxnu",
  "Authorization": "Bearer 62da55727ebac6745642180744b550e9bed0d54f",
  "X-Originating-Ip": "198.11.31.126",
  "Content-Type": "application/json"
};

function FindRoutesURI(lat, lng, min, max, radius) {
  var _index = 0;
  this.getURI = function() {
    var offset = 40 * _index;
    _index = _index + 1;
    return "https://oauth2-api.mapmyapi.com/v7.1/route/?limit=40&search_radius=" + radius + "&close_to_location=" + lat + "%2C" + lng + "&minimum_distance=" + min + "&maximum_distance=" + max + "&offset=" + offset;
  };
  this.reset = function() {
    _index = 0;
  };
};

function getShortURI(lat, lng, min, max, radius) {
  return "https://oauth2-api.mapmyapi.com/v7.1/route/?limit=1&search_radius=" + radius + "&close_to_location=" + lat + "%2C" + lng + "&minimum_distance=" + min + "&maximum_distance=" + max;
}

var findRoutesURI = new FindRoutesURI(39.9388730, -105.2582940, 7.45*1600, 7.55*1600);
var c = [];

getShortURI(39.96449067924025,-105.50994873046875, 7*1600, 8*1600, 50000);

function getRoutesCallback (error, response, body) {
  start = Date.now();
  if (error || response.statusCode !== 200) {
      console.log( response.request.uri.path + "CODE: " + response.statusCode + " " + response.statusMessage);
  }
  else {
    console.log(coll.length + "/" + JSON.parse(body).total_count);          
    if (coll.length < JSON.parse(body).total_count){
      while ((Date.now() - start) < 40) {};
      return JSON.parse(body)._embedded.routes.concat( request({
        uri: fru.getURI(),
        method: "GET",
        headers: headers
      },  function(error, response, body) {getRoutesCallback(error, response, body);} );
    }
    else{
      done = true;
      return JSON.parse(body)._embedded.routes;
    }
  }

function RequestObject(uri) {
  this.uri = "https://oauth2-api.mapmyapi.com/" + uri;
  this.method = "GET";
  this.headers = headers;
}

function requestCallback(error, response, body) {
  if (error || response.statusCode !== 200) {
      console.log( response.request.uri.path + "CODE: " + response.statusCode + " " + response.statusMessage);
  }
  else {
    var bodyObj = JSON.parse(body);
    self.coll = self.coll.append( bodyObj._embedded.routes );
    if (bodyObj._links.next) {
      request(new RequestObject(bodyObj._links.next[0].href), requestCallback);
    }
    else {
      done = true;
    }
  }  
}

function getRoutes(initialURI) {
  var self = this;
  self.coll = [];
  var done = false;
  request(new RequestObject(initialURI), requestCallback);
  
  setInterval( function() {
    if (done) {
      clearInterval(this);
    }
  }, 1000);
  console.log( self.coll );
}






  
  request({
        uri: uri,
        method: "GET",
        headers: headers
      },  function(error, response, body) {this.x = body;});
      
      
function( findRoutesURI, getRoutesCallback) {
  request({
      uri: fru.getURI(),
      method: "GET",
      headers: headers
    }, function(error, response, body) {getRoutesCallback(error, response, body);});
}

  
  var coll = [];
  var done = false;
  fru.reset();
  getRoutes();
  setInterval( function () {
    if (done) {
      console.log("done?...");
      c = coll;
      clearInterval(this);
    } 
    else {
      console.log('thinking?....');
    }
  }, 1000);
}


function getDistance(o1, o2) {
  var loc1 = {
    latitude: o1.starting_location.coordinates[1],
    longitude: o1.starting_location.coordinates[0]
  }
  var loc2 = {
    latitude: o2.starting_location.coordinates[1],
    longitude: o2.starting_location.coordinates[0]
  }
  
  return geolib.getDistance(loc1, loc2, 1,1)
};
  

// var exec = require('child_process').execFile;

// var fun =function(){
   // console.log("fun() start");
   // exec('googleearth.exe', function(err, data) {  
        // console.log(err)
        // console.log(data.toString());                       
    // });  
// }
// fun();