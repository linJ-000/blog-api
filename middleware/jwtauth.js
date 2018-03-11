//jwtauth.js
//jwt验证中间件
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function(req, res, next){
	req.username = "";
	var token = (req.body && req.body.token) || (req.query && req.query.token) || 
				req.headers['x-access-token'];
	if(!token)
		res.json({'status':1, 'msg':'缺少token'});
	else{
		try{
			jwt.verify(token, config.secret, function(err, decode){
				if(err) res.json({'status':1, 'msg':'token解析失败'});
				else{
					if(decode.exp >= Date.now())
						res.json({'status':1, 'msg':'token已过期'});
					else {
						req.username = decode.username;
						next();
					}
				}
			});
		}catch(err){
			res.json({'status':1, 'msg':'token解析失败'});
		}
	}
}