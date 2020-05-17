myApp.controller("DashboardController", function($scope, $location, RESTURL, HttpService, StorageService,
    $cordovaBarcodeScanner, $cordovaToast) {

    var login = {};
    $scope.init = function() {
        login.user = JSON.parse(StorageService.get('switchLoginUser')); //Get the stored user details
        console.log(login.user);
        $scope.userName = login.user.name;
        $scope.profile_pic_url = login.user.profilePhoto;
        var user_details = RESTURL + "/dashboard";
        HttpService.get(user_details, function(response) {
            StorageService.save('switchXAuth', response.data.token);
            StorageService.save('switchLoginUser', JSON.stringify(response.data));
            $scope.notification = response.data._notification;
            $scope.premium_status = response.data.membership;
            if ($scope.notification.length > 0) {
                $scope.not_badge = $scope.notification.length;
            } else {
                $scope.not_badge = 0;
            }
        }, function(error) {
            $cordovaToast.showShortBottom('Some Error While Fetching Personal Data!')
        });
        var getEventsUrl = RESTURL + "/event/dashboard-events";
        HttpService.get(getEventsUrl, function(response) {
            $scope.event_data = response.data;
        }, function(error) {
            $cordovaToast.showShortBottom('Some Error Happened While Fetching Events!')
        });
        var recentlyMetFriends = RESTURL + "/dashboard/recently-met";
        HttpService.get(recentlyMetFriends, function(response) {
            $scope.peopleMet = response.data;
        }, function(error) {
            console.log(error);
            $cordovaToast.showShortBottom('Some Error Happened While Fetching Recently Met Friends');
        })
    }

    $scope.startDate = function(epochTime) {
        var time = epochTime;
        var date = new Date(time);
        return (date.toLocaleDateString('en-US', { hour12: true }));
    }
    $scope.aboutus = function() {
        $location.path("/aboutus");
    }

    $scope.contactus = function() {
        $location.path("/contactus");
    }

    $scope.profile = function() {
        $location.path("/profile");
    }

    $scope.premium = function() {
        $location.path("/premium");
    }

    $scope.notifications = function() {
        $location.path("/notifications");
    }

    $scope.cardHolderPage = function() {
        $location.path("/cardHolderPage");
    }

    $scope.getOwnCard = function() {
        $location.path('/ownCards');
    }

    $scope.getEvents = function() {
        $location.path("/events");
    }

    $scope.getOrganizations = function() {
        $location.path('/organizations');
    }

    $scope.upcomingEvents = function() {
        $location.path('/upcomingEvents');
    }

    $scope.scan_qrcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            var qrcode = imageData.text;
            $location.path('/view-scanned-card/' + qrcode);
        }, function(error) {
            console.log(error);
            alert(error);
        })
    }

    $scope.get_scanned_card = function() {
        console.log($scope.scanned_data);
    }

    $scope.searchPage = function() {
        $location.path("/search");
    }

    $scope.viewRecentlyMet = function(searchId) {
        $location.path('/search_profile/' + searchId);
    }

    $scope.showEnterCodeModal = function () {
		$scope.activeModal = document.querySelector("#enter-code-modal");
		$scope.activeModal.show();
	}

	$scope.hideEnterCodeModal = function () {
		if ($scope.activeModal) {
			$scope.activeModal.hide();
		}
    }
    
    $scope.enterDropboxCode = function(data) {
        console.log(data);
        var dropboxCode = data.code;
        $location.path('/view-my-cards/' + dropboxCode);
        if ($scope.activeModal) {
			$scope.activeModal.hide();
		}
    }

    $scope.scanDropboxCode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            console.log(imageData.text);
            var dropboxCode = imageData.text;
            $location.path('/view-my-cards/' + dropboxCode);
            if ($scope.activeModal) {
                $scope.activeModal.hide();
            }
        }, function(error) {
            console.log(error);
            alert(error);
        })
    }

    $scope.showScanModal = function () {
		$scope.activeModal = document.querySelector("#scan-modal");
		$scope.activeModal.show();
	}

	$scope.hideScanModal = function () {
		if ($scope.activeModal) {
			$scope.activeModal.hide();
		}
    }
    

})