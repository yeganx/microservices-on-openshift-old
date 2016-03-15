> This repo demos usage of  microservices on open-shift.  
> Microservices created in different languages communicate over REST as per picture below

![alt tag](https://raw.githubusercontent.com/debianmaster/microservices-on-openshift/master/Arch.png)

## for mongodb
```sh
oc new-app -e MONGODB_USER=app_user,MONGODB_PASSWORD=password,\
MONGODB_DATABASE=sampledb,MONGODB_ADMIN_PASSWORD=admin_pass \
  registry.access.redhat.com/rhscl/mongodb-26-rhel7 --name mongodb
```
## for python email-api 

```sh
oc new-app --context-dir='python-email-api' \
  https://github.com/debianmaster/microservices-on-openshift.git \
  --name 'python-email-api' --image-stream='python:2.7'
```

## for php-ui 
```sh
oc new-app -e NODEJS_APPLICATION_DOMAIN=http://nodejs-users-api-microservices.apps.demov3.osecloud.com --context-dir='php-ui' https://github.com/debianmaster/microservices-on-openshift.git --name='php-ui'
```

## for nodejs-users-api
```sh
oc new-app -e PYTHON_APPLICATION_DOMAIN=http://python-email-api-microservices.apps.demov3.osecloud.com,MONGODB_DATABASE=sampledb,MONGODB_PASSWORD=password,MONGODB_USER=app_user,DATABASE_SERVICE_NAME=mongodb --context-dir='nodejs-users-api' https://github.com/debianmaster/microservices-on-openshift.git --name='nodejs-users-api'  
```
