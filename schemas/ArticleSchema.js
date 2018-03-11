//ArticleAchema.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var articleSchema = new Schema({
	'title':String,
	'post-time':String,
	'alter-time':String,
	'poster':String,
	'des':String,
	'content':String,
	'label':Array
});
module.exports = articleSchema;