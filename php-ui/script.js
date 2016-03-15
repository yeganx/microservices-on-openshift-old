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

	$scope.$watch('currentPage',function(old,newval) {
		$scope.token='';
	});
    $scope.login = function (){
	  	$http.post("http://userregsvc-msdemo.apps.demov3.osecloud.com:8080/api/authenticate",$scope.form).success(function(data, status) {
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
		$http.get("http://userregsvc-msdemo.apps.demov3.osecloud.com:8080/api/users?token="+$scope.token).success(function(data, status) {
            console.log(data);
            $scope.friends=data;
            $scope.currentPage='friends';
        });	
	};
	$scope.register = function (){
	  	$http.post("http://userregsvc-msdemo.apps.demov3.osecloud.com:8080/users", $scope.form).success(function(data, status) {
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
