var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Comment = new mongoose.Schema({
  text: {type: String, required: true},
}, {timestamps:true});

mongoose.model('Comment', Comment);
