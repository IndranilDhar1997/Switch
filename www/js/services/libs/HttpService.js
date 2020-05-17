myApp.service("HttpService", function ($http, AppStatus, SWITCH, StorageService, $rootScope, $cordovaToast, APPID) {

	$rootScope.allowVersionRequests = true;
	//this will not include x-auth
	//Save new data
	var post = function (URL, data, callback, errorback, appversionCheck) {
		$rootScope.HttpServiceLoader = true; //Show Loader

		var errorback = errorback || null;
		var headers = { "AppId": APPID }
		if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN) {
			headers["x-auth"] = StorageService.get('switchXAuth');
		}
		if ($rootScope.allowVersionRequests || appversionCheck) {
			$http({
				method: "POST",
				url: URL,
				data: data,
				headers: headers
			}).then(function (response, status, headers, config) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN && status == 505) {
					StorageService.unset('switchLoginUser');
					AppStatus.setStatus(SWITCH.app.status.INIT);
					StorageService.unset('switchXAuth');
				}
				callback(response, status, headers, config);
			}, function (response) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				var error = response.data;
				if (errorback) {
					errorback(error);
				}
			});
		} else {
			$cordovaToast.showShortBottom('Update Your App');
		}
	};
	//Get data from database
	var get = function (URL, callback, errorback) {
		$rootScope.HttpServiceLoader = true; //Show Loader

		var errorback = errorback || null;
		var headers = { "AppId": APPID }
		if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN) {
			headers["x-auth"] = StorageService.get('switchXAuth');
		}
		if ($rootScope.allowVersionRequests) {
			$http({
				method: "GET",
				url: URL,
				headers: headers
			}).then(function (response, status, headers, config) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN && status == 505) {
					StorageService.unset('switchLoginUser');
					AppStatus.setStatus(SWITCH.app.status.INIT);
					StorageService.unset('switchXAuth');
				}
				callback(response, status, headers, config);
			}, function (response) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				var error = response.data;
				if (errorback) {
					errorback(error);
				}
			});
		} else {
			$cordovaToast.showShortBottom('Update Your App');
		}
	};
	//Update data from database
	var put = function (URL, data, callback, errorback) {
		$rootScope.HttpServiceLoader = true; //Show Loader

		var errorback = errorback || null;
		var headers = { "AppId": APPID }
		if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN) {
			headers["x-auth"] = StorageService.get('switchXAuth');
		}
		if ($rootScope.allowVersionRequests) {
			$http({
				method: "PUT",
				url: URL,
				data: data,
				headers: headers
			}).then(function (response, status, headers, config) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN && status == 505) {
					StorageService.unset('switchLoginUser');
					AppStatus.setStatus(SWITCH.app.status.INIT);
					StorageService.unset('switchXAuth');
				}
				callback(response, status, headers, config);
			}, function (response) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				var error = response.data;
				if (errorback) {
					errorback(error);
				}
			});
		} else {
			$cordovaToast.showShortBottom('Update Your App');
		}
	};

	//delete from database
	var remove = function (URL, callback, errorback) {
		$rootScope.HttpServiceLoader = true; //Show Loader

		var errorback = errorback || null;
		var headers = { "AppId": APPID }
		if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN) {
			headers["x-auth"] = StorageService.get('switchXAuth');
		}
		if ($rootScope.allowVersionRequests) {
			$http({
				method: "DELETE",
				url: URL,
				headers: headers
			}).then(function (response, status, headers, config) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				if (AppStatus.currentStatus() == SWITCH.app.status.LOGGED_IN && status == 505) {
					StorageService.unset('switchLoginUser');
					AppStatus.setStatus(SWITCH.app.status.INIT);
					StorageService.unset('switchXAuth');
				}
				callback(response, status, headers, config);
			}, function (response) {
				$rootScope.HttpServiceLoader = false; //Hide Loader

				var error = response.data;
				if (errorback) {
					errorback(error);
				}
			});
		} else {
			$cordovaToast.showShortBottom('Update Your App');
		}
	};

	return {
		post: post,
		get: get,
		put: put,
		delete: remove
	};
});