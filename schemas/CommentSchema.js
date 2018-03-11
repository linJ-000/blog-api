var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	'article_id':String,
	'content':String,
	'post-time':String,
	'from':String,
	'to':String
});

module.exports = commentSchema;