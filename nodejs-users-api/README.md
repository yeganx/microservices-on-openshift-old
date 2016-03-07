# create a mongodb  app from templates

# for python email-api 
oc new-app debianmaster/python-email-api
oc expose dc/python-email-api --port 8080
oc expose svc/python-email-api 

#for php-ui 
oc new-app --context-dir='php-ui' https://github.com/debianmaster/microservices-on-openshift.git 
oc env dc/php-ui NODEJS_APPLICATION_DOMAIN=http://nodejs-users-api-microservices.apps.osecloud.com

#for nodejs-users-api
oc new-app --context-dir='nodejs-users-api' https://github.com/debianmaster/microservices-on-openshift.git
oc env dc/nodejs-users-api MONGODB_DATABASE=sampledb MONGODB_PASSWORD=password MONGODB_USER=app_user MONGODBDATABASE_SERVICE_NAME=mongodb   MONGODB_SERVICE_HOST=172.30.170.222 PYTHON_APPLICATION_DOMAIN=http://python-email-api-microservices.apps.osecloud.com
