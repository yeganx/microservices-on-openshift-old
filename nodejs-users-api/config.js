
module.exports = {
	'secret': 'saregama',
	'database': 'mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+process.env.MONGODB_SERVICE_HOST+':'+process.env.MONGODB_SERVICE_PORT+'/'+process.env.MONGODB_DATABASE
};
