var mongoose = require('mongoose');
var CommentSchema = require('../schemas/CommentSchema');
//mongo会把集合自动改成复数,数据库中的集合名为articles
var Comment = mongoose.model('article', CommentSchema);

module.exports = Comment;