myApp.service("UserProfile", function ($rootScope, StorageService, AppStatus,
    SWITCH, $translate, RESTURL, HttpService, $location, $http, APPID, $cordovaToast) {

    var language = null;
    var login = {};

    (function () {
        document.addEventListener("deviceready", function () {
            (function () {
                login.user = JSON.parse(StorageService.get('switchLoginUser')); //Get the stored user details
                if (login.user) {
                    var URL = RESTURL + '/users/' + login.user._id + '/login-status';
                    var headers = { "x-auth": StorageService.get('switchXAuth') };
                    $http({
                        method: "GET",
                        url: URL,
                        headers: headers
                    }).then(function (response) {
                        AppStatus.setStatus(SWITCH.app.status.LOGGED_IN);
                        if (response.data.updatedAt > login.user.updatedAt) {
                            //Sync value as in Login
                            login.user = response.data;
                            StorageService.save('switchLoginUser', JSON.stringify(response.data.user));
                            StorageService.save('switchXAuth', response.data.user.token);
                        }
                    }, function (error) {
                        console.log(error);
                        if (error.data != null) {
                            StorageService.unset('switchLoginUser');
                            AppStatus.setStatus(SWITCH.app.status.INIT);
                            StorageService.unset('switchXAuth');
                            $location.path("/");
                            //$cordovaToast.showShortBottom('Login Failed! Please try again');
                        } else {
                            //TOAST -> Internet Connection Failed
                            $cordovaToast.showShortBottom('No Internet Connection!');
                            $rootScope.internetNotWorking = true;
                        }
                    })
                } else if(localStorage.getItem('swAppStatus') == null) {
                    AppStatus.setStatus(SWITCH.app.status.NEWUSER);
                    $location.path('/new-user/first-slider');
                }
            })();

        }, false);
    })();

    var getUser = function () {
        return login.user;
    }

    return {
        user: getUser
    };
});
