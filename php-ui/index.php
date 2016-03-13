<!DOCTYPE html>
<html lang="en">
<?php
 include 'head.php';
?>
<body ng-app="myApp">
    <div class="container" ng-controller="appController">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-4">
                                <a href="#" ng-class="currentPage=='login'?'active':'';" id="login-form-link" ng-click="currentPage='login'">Login</a>
                            </div>
                            <div class="col-xs-4">
                                <a href="#" ng-class="currentPage=='register'?'active':'';"  id="register-form-link" ng-click="currentPage='register'">Register</a>
                            </div>
                            <div class="col-xs-4">
                                <a href="#" ng-class="currentPage=='friends'?'active':'';" id="friends-form-link" ng-click="currentPage='friends'">Friends List</a>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="panel-body">
                        <input type=hidden id="hdnTarget" value="<?= getenv('NODEJS_APPLICATION_DOMAIN'); ?>">
                        <div class="row">
                            <div class="col-lg-12">
                                <?php
                                 include 'login.php';
                                 include 'register.php';
                                ?>
                            </div>
                        </div>
                        <div class="row">
                            <?php
                             include 'profile.php';
                            ?>
                        </div>
                        <div class="row">
                            <?php
                             include 'friends.php';
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</body>

</html>