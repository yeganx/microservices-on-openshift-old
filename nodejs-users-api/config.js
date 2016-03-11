var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
var mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"];
var mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"];
var mongoUser = process.env.MONGODB_USER

console.log("mongohost :"+mongoHost);
module.exports = {
	'secret': 'saregama',
	'database': 'mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+process.env.MONGODB_SERVICE_HOST+':'+process.env.MONGODB_SERVICE_PORT+'/'+process.env.MONGODB_DATABASE
};
