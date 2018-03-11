//连接数据库并定义schema和model
const mongoose = require('mongoose');
const config = require('./config');
module.exports = () => {
	// mongoose.Promise = global.Promise; //promise问题
	mongoose.connect(config.mongodb);
	//实例化连接对象
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, '连接错误：'));
	db.once('open', (callback) => {
		console.log('MongoDB连接成功！');
	});
	return db;
}