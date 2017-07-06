var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var async = require('async');
var snoowrap = require('snoowrap');

const r = new snoowrap({
	userAgent: "crypto",
  clientId: 'hfirjI-y2y0BQw',
  clientSecret: '_PDMY4oz8LVz7kF1x2eGcj7gRkg',
  refreshToken: '10925478-iIV2DpVKUa2JmSh-oQkDLs1ep7w',
	accessToken: 'EwlogG2A-QAOoqwpO-c5aVB9PV8'
});

module.exports = {
  login: function(req, res){
    console.log("We're in the login controller.");
    User.findOne({username:req.body.username}, function(err, foundUser){
      if(foundUser==null) {
        console.log("NO user in db, making new.");
        var user = new User(req.body);
        user.save(function(err, newUser){
          if(err){
            console.log("Error adding new User.");
            res.json(err);
          } else{
  					req.session.user = newUser;
            req.session.userId = newUser._id;
            res.json(newUser);
          }
        })
      }else{
        console.log("Added OLD user.", foundUser._id);
        req.session.userId=foundUser._id;
  			req.session.user = foundUser;
        res.json(foundUser);
      }
    })
  },
  getHot: function(req, res){
    r.getSubreddit(req.params.subreddit).getHot()
    .then(all=>{
      for(var i=0; i<all.length; i++){
        var post = new Post({user: all[i].name, title:all[i].title, category: all[i].subreddit.display_name, thumbnail:all[i].thumbnail, url: all[i].url, score: all[i].score });
        post.save(function(err, post){
          if(err){
            console.log(err);
            res.json(err);
          }
        })
      }
      res.json(all);
    });
  },
  getPosts: function(req, res){
    Post.find({})
    .exec(function(err, posts){
      if(err) {
       console.log("Querying posts failed.");
       res.json(err);
      } else {
       console.log("Found all posts success");
       res.json(posts);
      }
    })
  },
  getSingle: function(req, res){
    console.log(req.params.pid);
    Post.findOne({_id:req.params.pid}, function(err, post){
      if(err) {
       console.log("Querying posts failed.");
       res.json(err);
      } else {
       console.log("Found it");
       res.json(post);
      }
    })
  },
  postComment: function(req, res){
    Post.findOne({_id:req.body.id}, function(err, found){

    })
  }
}
