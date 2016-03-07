
module.exports = {
	'secret': 'saregama',
	'database': 'mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+process.env.MONGODB_SERVICE_HOST+':27017/'+process.env.MONGODB_DATABASE
};
