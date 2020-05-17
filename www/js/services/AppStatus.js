/**
 * This file will help identify the status of the application
 */
myApp.service("AppStatus", function(StorageService) {
    var appStatus = null;

    (function() {
        appStatus = parseInt(StorageService.get('swAppStatus'));
        if (appStatus === null) {
            appStatus = 0;
        }
    })();

    setStatus = function (status) {
        appStatus = parseInt(status);
        StorageService.save('swAppStatus', status);
    };

    var currentStatus = function () {
        return appStatus;
    }

	return {
        currentStatus: currentStatus,
        setStatus: setStatus
	};
});
