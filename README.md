This repo demonstrates simple development and deployment of polyglot microservices on OpenShift V3.  The diagram below is the architecture of the application that is made up of three sample micro services. 
1. UserRegistration Backend: This microservices exposes REST APIs to register users, display user list etc. The code is written in NodeJS and it persists the data into a MongoDB database
2. UserRegistration: This is frontend UI built using PHP. The job of this microservice is confined to creating web pages.
3. Email Service: This is a generic email service that receives a request and sends an email. This code is written in Python. We will also add an email log (thinking of MySQL DB).

![alt tag](https://raw.githubusercontent.com/debianmaster/microservices-on-openshift/master/Arch.jpeg)

# 
## Initial Setup
Create an OpenShift project where these microservices will be created for development purposes. As an example we are calling it msdev.
```sh
oc new-project msdev
```

If you wish to change the code, feel free to fork the code and use your git links instead.


Let us create some environment variable that makes it easy to deal with some of the parameters we use in the subsequent commands
```sh
export OSE_DOMAIN=<<your apps domain name..ex: apps.osecloud.com> 
export OSE_PROJECT=<<your openshift projectname. ex:msdev>
```


## Create the Email Micro Service
The below command creates a new application for email service. This code is written in Python. This service receives the email request and sends out the email.

```sh
oc new-app --context-dir='python-email-api' \
  https://github.com/debianmaster/microservices-on-openshift.git \
  --name=emailsvc --image-stream='python:2.7'  
```

Although we can expose this service using a URL, if we want this email service to be used by other applications over http using the command ``oc expose svc/python-email-api``, we are not doing it here as we intend to use this as an internal service. You will see in the next section that the User Registration service will use the internal service name ```emailsvc``` to send emails.

## Creating User Registration Backend Micro Service
This service contains two components. It has a database that saves the user data for which we are using MongoDB. It has business logic layer that exposes REST APIs to register a user, get userslist etc. This part of the application is written in NodeJS. We can deploy this microservice using one of the following two approaches. 

Approach 1<br>
1. Create a MongoDB database and expose it as an internal service<br>
2. Create a User Registration Service that talks to the database deployed in the previous step. We are going to name this as "userregsvc".<br>

Approach 2
If you want to create the whole microservice together we have provided a template that can be used to deploy the above two in a single step.

### Using Approach 1
1. Create a MongoDB database 
```sh
oc new-app -e MONGODB_USER=mongouser,MONGODB_PASSWORD=password,\
MONGODB_DATABASE=userdb,MONGODB_ADMIN_PASSWORD=password \
  registry.access.redhat.com/rhscl/mongodb-26-rhel7 --name mongodb
```

2. Create the User Registration Service and expose the service so that we can use a URL to make calls to the REST APIs exposed by this service
```sh
oc new-app -e EMAIL_APPLICATION_DOMAIN=http://emailsvc:8080,\
MONGODB_DATABASE=userdb,MONGODB_PASSWORD=password,\
MONGODB_USER=mongouser,DATABASE_SERVICE_NAME=mongodb \
--context-dir='nodejs-users-api' \
https://github.com/debianmaster/microservices-on-openshift.git --name='userregsvc'   

oc expose svc/userregsvc
```
Note that we are using internal emailsvc as the EMAIL_APPLICATION_DOMAIN

### Using Approach 2

Download the template included at the root of this repository with name nodejs-mongodb-template. This has slight modifications to the default template/instant app supplied with OpenShift. We added APPLICATION_NAME so that you can choose the name you want and added the EMAIL_APPLICATION_DOMAIN parameter that supplies this environment variable to the User Registration service.

Note: You can easily create this template after application is created using Approach 1.

```sh
oc process -f nodejs-mongodb-template.json -v APPLICATION_NAME=userregsvc,SOURCE_REPOSITORY_URL=https://github.com/debianmaster/microservices-on-openshift.git,CONTEXT_DIR=nodejs-users-api,DATABASE_SERVICE_NAME=mongodb,DATABASE_USER=mongouser,DATABASE_PASSWORD=password,DATABASE_NAME=userdb,DATABASE_ADMIN_PASSWORD=password,EMAIL_APPLICATION_DOMAIN=http://emailsvc:8080 | oc create -f -
```


## Create the frontend user registration application as a separate microservice 
This microservice produces html+javascript to run in a browser and makes ajax calls to the backend User Registration service using REST APIs.
Note that we are setting an environment variable for userregsvc to access the backend using REST APIs.

```sh
oc new-app -e USER_REGISTRATION_APPLICATION_DOMAIN="http://userregsvc-$OSE_PROJECT.$OSE_DOMAIN" \
--context-dir='php-ui' https://github.com/debianmaster/microservices-on-openshift.git --name='userreg' 

oc expose svc/userreg
```
The service exposed in the above step is our application front end. You can find the URL by running ```oc get route```

