//Article.js
var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/ArticleSchema');
//mongo会把集合自动改成复数,数据库中的集合名为articles
var Article = mongoose.model('article', ArticleSchema);

module.exports = Article;
