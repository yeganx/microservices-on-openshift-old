
module.exports = {
	'secret': 'saregama',
	'database': 'mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+process.env.MONGO_SERVICE_HOST+':'+process.env.MONGO_SERVICE_PORT+'/'+process.env.MONGODB_DATABASE
};
