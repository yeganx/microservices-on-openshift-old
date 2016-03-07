
module.exports = {
	'secret': 'saregama',
	'database': 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVICE_NAME+'_HOST:27017/'+process.env.DATABASE_NAME
};
