<!DOCTYPE html>
<html lang="en">
<?php
 include 'head.php';
?>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="#" class="active" id="login-form-link">Login</a>
                            </div>
                            <div class="col-xs-6">
                                <a href="#" id="register-form-link">Register</a>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>

</html>