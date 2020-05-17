myApp.factory('routeAuth', function (AppStatus, SWITCH, $location) {

    var authMiddleware = this;
    //if user is not logged in re-direct to login route
    authMiddleware.run = function () {
        if (AppStatus.currentStatus() === SWITCH.app.status.INIT) {
            $location.path("/");
        }
        if (AppStatus.currentStatus() === SWITCH.app.status.LANGUAGE_SET) {
            $location.path("/login");
        }
        if (AppStatus.currentStatus() === SWITCH.app.status.LOGGED_IN) {
            $location.path("/dashboard");
        }
    };

    return {
        run: authMiddleware.run
    };
});