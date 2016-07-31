var express = require('express');
var app = express();
var path = require("path");
var api = require("./routes/api");
var auth = require("./routes/auth");

app.set('view engine', 'html');    // use .html extension for templates 
app.set('layout', 'layout');       // use layout.html as the default layout
app.enable('view cache');
app.engine('html', require('hogan-express'));


app.use(express.static(path.join(__dirname, 'public')));

app.use( ( req, res, next ) => {
  console.log(new Date().toLocaleTimeString(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.render('login')
});

app.get('/leaf', (req, res) => {
  res.render('index')
});

app.use('/api', api);

app.use("/auth", auth);

var server = app.listen(8080, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Tree app listening at http://%s:%s", host, port);
});
