var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Post = new mongoose.Schema({
  user: {type: String, required: true},
  title: {type: String, required: true},
  category: {type: String, required: true},
  thumbnail: {type: String, required: true},
  url: {type: String, required: true},
  score: {type: Number, default: 0},
  _comment: [{type: Schema.Types.ObjectId, ref:'Comment'}]
}, {timestamps:true});

mongoose.model('Post', Post);
