
module.exports = {
	'secret': 'saregama',
	'database': 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.MONGO_SERVICE_HOST+':'+process.env.MONGO_SERVICE_PORT+'/'+process.env.DATABASE_NAME
};
