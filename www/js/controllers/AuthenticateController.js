myApp.controller("AuthenticateController", function ($scope, $location, RESTURL, HttpService, StorageService, 
    AppStatus, SWITCH, $cordovaToast) {

    $scope.googleLogin = function () {
        var url = RESTURL + "/users/googleLogin";
        window.plugins.googleplus.login({}, function (result) {
            HttpService.post(url, result, function (response) {
                StorageService.save('switchXAuth', response.data.token);
                StorageService.save('switchLoginUser', JSON.stringify(response.data));
                AppStatus.setStatus(SWITCH.app.status.LOGGED_IN);
                $location.path('/dashboard');
            });
        }, function (error) {
            console.log(error);
            alert(error);
        })
    }

    $scope.signup = function(signUpdata) {
        var url = RESTURL + '/users/register';
        var data = {
            name: signUpdata.name,
            email: signUpdata.email,
            password: signUpdata.password
        }
        HttpService.post(url, data, function(response) {
            $location.path('/');
            $cordovaToast.showShortBottom('Successfully Registered');
        }, function(error) {
            console.log(error);
            $scope.signupError = error;
            $cordovaToast.showShortBottom(error);
        })
    }

    $scope.normalLogin = function(logindata) {
        var url = RESTURL + '/users/login';
        var data = {
            email: logindata.email,
            password: logindata.password
        }
        HttpService.post(url, data, function(response) {
            StorageService.save('switchXAuth', response.data.token);
            StorageService.save('switchLoginUser', JSON.stringify(response.data));
            AppStatus.setStatus(SWITCH.app.status.LOGGED_IN);
            $location.path('/dashboard');
            $cordovaToast.showShortBottom('Successfully Registered');
        }, function(error) {
            console.log(error);
            $scope.loginError = error;
            $cordovaToast.showShortBottom(error);
        })
    }

    //Send mail to registered email Id
    $scope.sendEmail = function(email) {
        var url = RESTURL + "/users/forgot-password";
        HttpService.post(url, email, function(response){
            StorageService.save('forgotEmail', response.data);
            $location.path('/sendEmail');
            $cordovaToast.showShortBottom('Please check your mail');
        }, function(error) {
            console.log(error);
            $cordovaToast.showShortBottom('MailId is not registered');
        })
    }

    //Submit Otp send to mail
    $scope.submitOTP = function(otpToSend) {
        var data = {
            pin: otpToSend.otp,
            email: StorageService.get('forgotEmail')
        }
        var url = RESTURL + "/users/verify-pin";
        HttpService.post(url, data, function(response) {
            $location.path('/submitOTP');
            $cordovaToast.showShortBottom('OTP verified successfully');
        }, function(error) {
            console.log(error);
            $cordovaToast.showShortBottom('OTP Mismatch');
        })
    }

    $scope.setPassword = function(passwordToSend) {
        var data = {
            password: passwordToSend.password,
            cpassword: passwordToSend.password,
            email: StorageService.get('forgotEmail')
        }
        var url = RESTURL + "/users/change-password";
        HttpService.put(url, data, function(response) {
            $location.path("/");
            $cordovaToast.showShortBottom('Password Changed Successfully');
            StorageService.unset('forgotEmail');
        }, function(error) {
            console.log(error);
            $cordovaToast.showShortBottom('Password Dont Match');
        })
    }

    $scope.resendOTP = function() {
        var data = {
            email: StorageService.get('forgotEmail')
        }
        var url = RESTURL + "/users/forgot-password";
        HttpService.post(url, data, function(response){
            StorageService.save('forgotEmail', response.data);
            $cordovaToast.showShortBottom('Sent Successfully');
        }, function(error) {
            console.log(error);
            $cordovaToast.showShortBottom('Retry Again.');
        })

    }
})