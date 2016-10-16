var express = require('express');
var app = express();
var path = require("path");
var api = require("./routes/api");
var auth = require("./routes/auth");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require("./config");

app.set('view engine', 'html');    // use .html extension for templates 
app.set('layout', 'layout');       // use layout.html as the default layout
app.enable('view cache');
app.engine('html', require('hogan-express'));


app.use( express.static(path.join(__dirname, 'public') ) );
app.use( cookieParser( 'cat' ) );
app.use( bodyParser.json());
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( session( { 
	secret: 'cat',
    resave: false,
    saveUninitialized: true,
} ) );

app.use( ( req, res, next ) => {
    console.log(new Date().toLocaleTimeString(), req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.render('login')
});

app.get('/leaf', (req, res) => {

    if (req.session && req.session.passport ) {
        res.locals = { apiBase: `http://${ config.url }:${ config.port }/api`}
        res.cookie("session", new Buffer( JSON.stringify( req.session.passport ) ).toString("base64") ).render('index');
    } else {
  	    res.redirect("/");
    }

});

app.use('/api', api);

app.use("/auth", auth);

var server = app.listen( config.port, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Tree app listening at http://%s:%s", host, port);
});
