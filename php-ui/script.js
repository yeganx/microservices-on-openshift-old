/*  Dummy comments */
var app = angular.module('myApp', []);
app.controller('appController', function($scope,$http) { 
	$scope.currentPage='register';
	$scope.friends=[];
	$scope.form={
		username:'foobar',
		password:'foobar',
		cpassword:'foobar',
		email:'foobar@gmail.com',
		fname:'foo',
		lname:'bar'
	};
	$scope.loginform={
		username:'foobar',
		password:'foobar'
	};
	$scope.target=document.getElementById('hdnTarget').value;
	$scope.$watch('currentPage',function(old,newval) {
		$scope.token='';
	});
    $scope.login = function (){
	  	$http.post($scope.target+"/api/authenticate",$scope.loginform).success(function(data, status) {
            if(data['success']==true){
            	alert('Login successful, click link to get friends list.');
            	$scope.token=data.token;
            }
            else{
            	alert('username/password incorrect');
            }
        });
	};
	$scope.getFriendsList=function(){
	    $http.get($scope.target+"/api/users?token="+$scope.token).success(function(data, status) {
	            console.log(data);
	            $scope.friends=data;
	            $scope.currentPage='friends';
            });	
	};
	$scope.getTweets=function(user){
	   $http.get($scope.tweetsTarget+"/simple-service-webapp/tweets/tweets?name="+user).success(function(data, status) {
		    console.log(data);
	            $scope.tweets=data;
	            $scope.currentPage='tweets';
            });	
	}
	$scope.register = function (){
	  	$http.post($scope.target+"/users", $scope.form).success(function(data, status) {
            if(data['success']==true){
            	alert('Registration successful, please login');
            	$scope.currentPage='login';
            }
            else{
            	alert('Error while registering, please retry')
            }
        });
	};
});
