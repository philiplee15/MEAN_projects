var mongoose = require('mongoose');
var display = require('../controllers/controllers.js');

module.exports = function(app) {
  app.post('/login', function(req,res){
    display.login(req,res);
  });
  app.get('/api/reddit/:subreddit', function(req, res){
    console.log("Routing to Reddit API call.");
    display.getHot(req,res);
  });
  app.get('/get/posts', function(req, res){
    console.log("Routing to Post query");
    display.getPosts(req,res);
  });
  app.get('/get/post/:pid', function(req, res){
    display.getSingle(req,res);
  });
  app.get('/logout', function(req, res){
    display.logout(req,res);
  });
  app.post('/post/comment', function(res, res){
    display.postComment(req, res);
  })
}
