var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');
//mongo会把集合自动改成复数
var User = mongoose.model('user', UserSchema);
module.exports = User;