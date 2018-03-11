//文章标签
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var labelSchema = new Schema({
	label: Array
});

module.exports = labelSchema;