var express = require('express');
var tree = require('./jsonTree.js');
var db = require("./readDB");
var app = express();
var path = require("path");

app.set('view engine', 'html');    // use .html extension for templates 
app.set('layout', 'layout');       // use layout.html as the default layout
app.enable('view cache');
app.engine('html', require('hogan-express'));


app.use(express.static(path.join(__dirname, 'public')));

app.use( ( req, res, next ) => {
  console.log(new Date().toLocaleTimeString(), req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.render('index')
});

// This responds a POST request to save data
app.get('/api/parents', (req, res) => {
  tree.getParents(req.query.userId, req.query.generationBack, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send('Something broke!');
    }
    else {
      res.json(data);
      res.end();
    }
  });
});

app.get('/api/children', (req, res) => {
  tree.getChildren(req.query.userId, req.query.generationBack, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send('Something broke!');
    }
    else {
      res.json(data);
      res.end();
    }
  });
});

var server = app.listen(8080, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
