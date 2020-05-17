var myApp = angular.module("App", [
    "ngRoute",
    "ngSanitize",
    "pascalprecht.translate",
    "onsen",
    "ngCordova"
]);

const env = 'PROD';

switch (env) {
    case 'LOCAL':
        myApp.constant("RESTURL", "http://4aeeeac9.ngrok.io");
        break;
    case 'PROD':
        myApp.constant("RESTURL", "http://157.245.87.42:8080");
        break;
}

myApp.constant("SWITCH", {
    app: {
        status: {
            NEWUSER: -1,
            INIT: 0,
            LANGUAGE_SET: 10,
            LOGGED_IN: 20,
            PROFILE_COMPLETE: 30,
            LOGGED_OUT: 40
        },
        profile: {}
    }
});

myApp.constant('APPVERSION', '1.0');
myApp.constant('APPID', 'XSWITCHIT-API-0105');

myApp.run(function ($rootScope, $injector, $location, $cordovaToast, StorageService,
    SWITCH, AppStatus, HttpService, UserProfile, RESTURL, APPVERSION) {

    if(localStorage.getItem('swAppStatus') == null) {
        localStorage.setItem('New User', 'true');
    }

    
    $rootScope.appPage = [];
    $rootScope.warningCloseApp = false;
    $rootScope.HttpServiceLoader = false;
    $rootScope.internetNotWorking = false;

    document.addEventListener("deviceready", function () {
        //Check App Version
        HttpService.post(RESTURL + '/app-version', { version: APPVERSION }, function (response) {
            if (response.data === 'OK') {
                $rootScope.allowVersionRequests = true;
            } else {
                //navigator.notification.alert('Update you app to the latest version', function () { }, 'App Update Required');
                //$cordovaToast.showShortBottom('Update your App');
                console.log('Update Your App');
                $rootScope.allowVersionRequests = false;
            }
        }, function () {
            //INTERNET IS NOT CONNECTED
            $rootScope.internetConnection = false;
        }, true);
    });


    //Middleware on completing the controller of route change
    $rootScope.$on('$routeChangeSuccess', function (event, current, next) {

        if (current != undefined) {
            callMiddlewares(current);
        }

        function callMiddlewares(current) {
            if ('$$route' in current) {
                if ('middleware' in current.$$route) {
                    if (typeof current.$$route.middleware === 'object') {
                        current.$$route.middleware.forEach(function (middle) {
                            callMiddleware(middle);
                        });
                    }
                }
            }
        }

        function callMiddleware(middleWare) {
            try {
                $injector.get(middleWare).run();
            } catch (e) {
                console.error('the factory : ' + middleWare + ' does not exist');
            }
        }
    });

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (current != undefined) {
            $rootScope.appPage.push(current.$$route.originalPath);
        }
    });

    $rootScope.clearPageHistory = function () {
        $rootScope.appPage = [];
    }

    $rootScope.addPage = function (page) {
        $rootScope.appPage.push(page);
    }

    $rootScope.backButton = function () {
        if ($rootScope.appPage.length > 0) {
            $rootScope.warningCloseApp = false;
            var pageToGo = $rootScope.appPage.pop();
            $location.path(pageToGo);
        } else {
            if ($rootScope.warningCloseApp) {
                navigator.app.exitApp();
            } else {
                $rootScope.warningCloseApp = true;
                $cordovaToast.showShortBottom('Press back button again to close the App');
            }
        }
    }

    $rootScope.backButtonMobile = function (e) {
        e.preventDefault();
        if ($rootScope.appPage.length > 0) {
            $rootScope.warningCloseApp = false;
            var pageToGo = $rootScope.appPage.pop();
            $location.path(pageToGo);
            $rootScope.$apply();
        } else {
            if ($rootScope.warningCloseApp) {
                navigator.app.exitApp();
            } else {
                $rootScope.warningCloseApp = true;
                $cordovaToast.showShortBottom('Press back button again to close the App');
            }
        }
    }

    //route to go to dashboard page
    $rootScope.gotoDashboard = function () {
        $location.path("/dashboard");
    };

    //User Logout
    $rootScope.logout = function () {

        var url = RESTURL + "/users/logout";
        HttpService.get(url, function (response) {
            console.log(response.data);
            StorageService.unset('switchLoginUser');
            AppStatus.setStatus(SWITCH.app.status.INIT);
            StorageService.unset('forgotEmail');
            StorageService.unset('switchXAuth');
            $location.path("/");
        }, function (error) {
            console.log(error);
            StorageService.unset('switchLoginUser');
            StorageService.unset('forgotEmail');
            AppStatus.setStatus(SWITCH.app.status.INIT);
            StorageService.unset('switchXAuth');
            $location.path("/");
        })
    }
    document.addEventListener("deviceready", function () {
        document.addEventListener("backbutton", $rootScope.backButtonMobile, false);
    });

})