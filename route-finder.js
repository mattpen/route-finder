var express = require('express');
var app = express();
var boodle = express();

boodle.get('/', function(req, res) {
  console.log("we got a req");
  res.json( {poop : 'squat' } );
});

app.use('/boodle-am', boodle);

app.get('/', function(req,res) {
  console.log(req);
  res.send('Hello World');
});

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});