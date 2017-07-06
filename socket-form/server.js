var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

console.log(__dirname);

app.get('/', function(req, res) {
  res.render('index');
});


var server = app.listen(port, function(){
  console.log("Listening on port:", port);
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  console.log("We are on sockets id:", socket.id);
  /** server side socket methods:
    socket.emit - to 1,
    socket.broadcast.emit - all but me,
    io.emit - full broadcast
  **/
  socket.on("submitted", function (data){
    io.emit('update_chat', data);
  })
});
