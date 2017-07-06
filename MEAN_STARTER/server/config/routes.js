var mongoose = require('mongoose');
var display = require('../controllers/controllers.js');

module.exports = function(app) {
  app.post('/login', function(req,res){
    display.login(req,res);
  });
  app.get('/getuser', function(req, res){
    console.log("Routed and shooting back to service.");
    display.getUser(req,res);
  });
  app.get('/logout', function(req, res){
    display.logout(req,res);
  })
}
