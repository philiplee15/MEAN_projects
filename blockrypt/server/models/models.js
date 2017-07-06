var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var User = new mongoose.Schema({
  username: {type: String, required: true, minlength: 1, maxlength: 20}
}, {timestamps:true});

mongoose.model('User', User);
