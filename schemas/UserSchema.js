//UseSchema.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//创建Schema
var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true}
});

//对用户存入的密码进行bcrypt加密的中间件
userSchema.pre('save', function(next){
	var user = this;
	if(this.isModified('password') || this.isNew){
		bcrypt.genSalt(10, function(err, salt){
			if(err){
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash){
				if(err){
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	}else{
		return next();
	}
});

//检验用户输入的密码是否正确
userSchema.methods.comparePassword = function(password, cb){
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if(err){
			return cb(err);
		}
		cb(null, isMatch);
	});
}
module.exports = userSchema;