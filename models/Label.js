var mongoose = require('mongoose');
var LabelSchema = require('../schemas/LabelSchema');
//mongo会把集合自动改成复数
var Label = mongoose.model('label', LabelSchema);
module.exports = Label;