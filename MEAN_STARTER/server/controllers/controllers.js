var mongoose = require('mongoose');
var User = mongoose.model('User');

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
  getUser: function(req, res){
    User.findOne({_id: req.session.userId}, function(err, current){
      if(err){
        res.json(err);
      }else{
        console.log("Found current.");
        res.json(current);
      }
    })
  },
  logout: function(req, res){
    req.session.userId = null;
    req.session.user = null;
    res.sendStatus(200);
  }
}
