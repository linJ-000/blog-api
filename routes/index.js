var express = require('express');
var router = express.Router();

var Article = require('../models/Article');
var Label = require('../models/Label');
var Comment = require('../models/Comment');

/* 主页 */
router.get('/', function(req, res, next) {
	//文章列表
	Article.find({},{'title':1, 'post-time':1, 'label':1},function(err, doc){
		if(err){
			return res.json({'status':1, 'msg':'失败'});
		}
		var index = doc;
		//所有标签
		Label.find({'_id':0}, function(err, doc){
			if(err){
				return res.json({'status':1, 'msg':'失败'});
			}
			var label = doc;
			res.json({'index':index, 'label': label});
		});
	});
});

//标签查文章列表
router.get('/:label',function(req, res, next){
	var label = req.params.label;
	var data=[];
	Article.find({},{'title':1, 'post-time':1, 'label':1}, function(err, doc) {
		if(err) return res.json({'status':1, 'msg':'失败'});
		else{
			for(var i=0, l=doc.length; i<l; i++){
				for(var x=0, y=doc[i].label.length; x<y; x++){
					if(doc[i].label[x] == label){
						data.push(doc[i]);
					}
				}
			}
		}
		res.json({'data':data});
	});
});

//某一篇文章
router.get('/article/:_id', function(req, res, next){
	var _id = req.params._id;
	Article.findOne({'_id':_id}, {'__v':0}, function(err, doc){
		if(err){
			return res.json({'status':1, 'msg':'获取文章失败'});
		}
		var art = doc;
		Comment.find({'article_id':_id}, {'__v':0}, function(err, doc){
			if(err){
				return res.json({'status':1, 'msg':'获取评论失败'});
			}
			var com = doc;
			res.json({'status':0, 'article':art, 'comment':com});
		});
	});
});

//评论提交
router.post('/postComment', 
	function(req, res, next){
		jwtauth(req, res, next);
	}, function(req, res, next){
		var fromUser = req.username;
		var comment = new Comment({
			'article_id':req.body.article_id,
			'content':req.body.article_id,,
			'post-time':new Date().toLocaleTimeString(),
			'from':fromUser,
			'to':req.body.toUser
		});
		comment.save((err) => {
			if(err){
				res.json({'status':1, 'msg':"评论失败"});
			}else{
				res.json({'status':0, 'msg':"评论成功"});
			}
		});
	}
);

module.exports = router;
