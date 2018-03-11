//博客后台
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var jwtauth = require('../middleware/jwtauth');

var Article = require('../models/Article');
var User = require('../models/User');

//挂载中间件
router.use(function(req, res, next){
	jwtauth(req, res, next);
},function(req, res, next){
	if(req.username != 'admin'){
		return res.json({'status':1, 'msg': '非管理员账号'});
	}
	next();
});

//博客列表
router.get('/article-index', function(req, res, next){
	Article.find({},{'title':1, 'post-time':1, 'label':1},function(err, doc){
		if(err) return res.json({'status':1, 'msg':"获取失败"});
		res.json(doc);
	});
});

//某一篇博客
router.get('/article/:_id', function(req, res, next){
	var id = req.params._id;
	Article.findOne({'_id':_id}, {'__v':0}, function(err, doc){
		if(err) return res.json({'status':1, 'msg':"获取失败"});
		res.json(doc);
	});
});

//添加博客
router.post('/add', function(req, res, next){
	var article = new Article({
		'title': req.body.title,
		'post-time': new Date().toLocaleDateString(),
		'alter-time': new Date().toLocaleDateString(),
		'poster': 'admin',
		'des': req.body.des,
		'content': req.body.content,
		'label': req.body.label
	});
	article.save((err) => {
		console.log('save status:', err ? 'failes' : 'success');
		if(err){
			res.json({'status':1, 'msg':"失败"});
		}else{
			res.json({'status':0, 'msg':"成功"});
		}
	});
});

//删除博客
router.get('/del/:_id', function(req, res, next){
	var id = req.params._id;
	Article.deleteOne({'_id': _id}, (err)=>{
		console.log('delete status:', err ? 'failes' : 'success');
		if(err){
			res.json({'status':1, 'msg':"失败"});
		}else{
			res.json({'status':0, 'msg':"成功"});
		}
	});
});

//修改博客
router.post('/alter', function(req, res, next){
	var id = req.body._id;
	var article = {
		'title': req.body.title,
		'alter-time': new Date().toLocaleDateString(),
		'des': req.body.des,
		'content': req.body.content,
		'label': req.body.label
	};
	Article.updateOne({'_id':_id}, {$set: article}, (err)=>{
		console.log('alter status:', err ? 'failes' : 'success');
		if(err){
			res.json({'status':1, 'msg':"失败"});
		}else{
			res.json({'status':0, 'msg':"成功"});
		}
	});
});

//通过token获取用户信息
router.get('/userinfo',  
	function(req, res, next){
		jwtauth(req, res, next);
	}, 
	function(req, res, next){
		User.findOne({'username': req.username}, (err, doc)=>{
			if(err) return res.json({'status':1, 'msg':'获取失败'});
			res.json({'status':0, 'data':doc});
		});
	}
);
module.exports = router;
