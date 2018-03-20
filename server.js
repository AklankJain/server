
var express = require('express');
var app = express();

 // Our first route
app.get('/', function (req, res) {
  res.send('Hello Node + GitHub! This code push has auto-deployed!');
});

var port = process.env.PORT

 // Listen to port 5000
 app.listen(port, function () {
   console.log('Dev app listening on port 5000!');
 });

 // Our second route
  app.get('/dev', function (req, res) {
     res.send('Hello, you are now on the Dev route!');
  })