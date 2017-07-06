var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

/******
Setting up session
******/
var sessionConfig = {
	secret:'CookieMonster', // Secret name for decoding secret and such
	resave:false, // Don't resave session if no changes were made
	saveUninitialized: true, // Don't save session if there was nothing initialized
	name:'myCookie', // Sets a custom cookie name
	cookie: {
		secure: false, // This need to be true, but only on HTTPS
		httpOnly: false, // Forces cookies to only be used over http
		maxAge: 3600000
	}
};

/******
Setting up express w/ session
******/
app.use(express.static(path.join(__dirname, 'root', 'dist')));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session(sessionConfig));

//Mongoose requires the models
require('./server/config/mongoose.js');
//Routes require the controllers
require('./server/config/routes.js')(app);

/******
Test session
******/
app.use(function(req,res,next){
	if(!req.session.userId){
		res.sendStatus(401);
	}else{
		next();
	}
});

/****
Make sure are routes go through Angular
*****/
app.all('*', function(req,res, next){
	res.sendFile(path.resolve('./root/dist/index.html'));
});

/******
Set server port and listen
******/
app.listen(8000, function(){
	console.log("listening on port 8000");
});
