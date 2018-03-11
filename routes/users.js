var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var jwtauth = require('../middleware/jwtauth');

var User = require('../models/User');

//用户注册
router.post('/register', (req, res) => {
	if(!req.body.username || !req.body.password){
		res.json({'status':1, 'msg':'请输入账号密码'});
	}else{
		var newUser = new User({
			username: req.body.username,
			password: req.body.password
		});
		//保存账号
		newUser.save((err) => {
			if(err)
				return res.json({'status:':1, 'msg':'失败'});
			else
				res.json({'status':0, 'msg': '注册成功'});
		});
	}
});

//登录，检查账号密码并生成一个token返回
router.post('/login', (req, res) => {
	User.findOne({
		username: req.body.username
	}, (err, user) => {
		if(err) return res.json({'status':1, 'msg': '认证失败'});
		if(!user) return res.json({'status':1, 'msg': '用户不存在'});
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(isMatch && !err){
				var token = jwt.sign(
					{username: user.username},
					config.secret,
					{expiresIn: '2h'}
				);
				return res.json({'status':0,'token':token});
			}else{
				res.send({'status':1, 'msg':'密码错误，认证失败'});
			}
		});
	});
});

//刷新token
router.post('/refresh', 
	function(req, res, next){
		jwtauth(req, res, next);
	}, 
	function(req, res, next){
		User.findOne({
			'username': req.username
		}, (err, user)=>{
			if(err) return res.json({'status':1, 'msg': '认证失败'});
			if(!user) return res.json({'status':1, 'msg': '用户不存在'});
			var token = jwt.sign(
				{username: user.username},
				config.secret,
				{expiresIn: '2h'}
			);
			return res.json({'status':0,'token':token});
		});
	}
);

module.exports = router;
