var express = require('express');
var app = express();
var jsonfile = require('jsonfile');

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/read_all', function (req, res) {
   jsonfile.readFile( "database.json", 'utf8', function (err, data) {
      res.send( JSON.stringify(data, null, 4) );
      console.log('read_all sent ...');
    });
});

app.get('/:key', function (req, res) {
  jsonfile.readFile( "database.json", 'utf8', function (err, data) {
      var key_name = req.params.key
      console.log(key_name);
        res.send(JSON.stringify(data[key_name], null, 4));
      });
  });

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('toysfortots_api is running on http://localhost:' + port);
});
