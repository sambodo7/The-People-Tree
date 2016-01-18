var express = require('express');
var tree = require('./jsonTree.js');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World\n');
})

// This responds a POST request to save data
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('data sent');
})

app.get('/view_tree', function (req, res) {
   console.log("Got a GET request for /view_tree");
   res.send(tree.getParents());
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
