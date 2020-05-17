myApp.controller("ProfileController", function ($scope, RESTURL, HttpService, $route, $rootScope,
    $cordovaToast, StorageService) {

    $scope.init = function () {
        $rootScope.clearPageHistory();
        $rootScope.addPage('/dashboard');
        $scope.profile = {};
        //Dashboard
        $rootScope.addPage('/dashboard');
        var url = RESTURL + "/users/profile";
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.profileData = response.data;
            $scope.profile_pic_url = $scope.profileData.profilePhoto;
            $scope.userName = $scope.profileData.name;
            $scope.email = $scope.profileData.primaryEmail;
            $scope.profileOrganization = $scope.profileData.profileOrganization;
            $scope.profileDesignation = $scope.profileData.profileDesignation;
            $scope.tagline = $scope.profileData.tagline;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.openProfileModal = function (profileData) {
        console.log(profileData);
        $scope.userName = profileData.name;
        $scope.profileDesignation = profileData.profileDesignation;
        $scope.profileOrganization = profileData.profileOrganization;
        $scope.profileTagline = profileData.tagline;
        $scope.profile_pic_url = profileData.profilePhoto;
        activeModal = document.querySelector('ons-modal#update-profile');
        activeModal.show();
    }

    $scope.closeProfileModal = function () {
        activeModal = document.querySelector('ons-modal#update-profile');
        activeModal.hide();
        $route.reload();
    }

    $scope.openProfileImageModal = function () {
        activeModal = document.querySelector('ons-modal#profileImageModal');
        activeModal.show();
    }

    $scope.closeProfileImageModal = function () {
        activeModal = document.querySelector('ons-modal#profileImageModal');
        activeModal.hide();
    }

    $scope.takeProfilePictureFromGallery = function () {
        navigator.camera.getPicture(function (imageData) {
            $scope.profile_pic_url = imageData;
            activeModal = document.querySelector('ons-modal#profileImageModal');
            activeModal.hide();
        }, function (err) {
            alert(JSON.stringify(err));
            activeModal = document.querySelector('ons-modal#profileImageModal');
            activeModal.hide();
            //$cordovaToast.showShortBottom('Error Happened');
        }, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.FILE_URI,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 450
            });
    }

    $scope.removeProfileImage = function () {
        if ($scope.profile_pic_url != null) {
            var url = RESTURL + "/users/photoDelete";
            HttpService.delete(url, function (response) {
                activeModal = document.querySelector('ons-modal#profileImageModal');
                activeModal.hide();
                $cordovaToast.showShortBottom('Profile Picture Removed');
                $route.reload();
            }, function (error) {
                alert(JSON.stringify(error));
            })
        } else {
            alert('Nothing to Remove')
        }
    }

    $scope.updateProfile = function (profile) {
        var url = RESTURL + "/users/profile";
        console.log(profile);
        var data = {
            profile: profile
        }
        console.log(data);
        HttpService.put(url, data, function (response) {
            if ($scope.profile_pic_url != null || $scope.profile_pic_url != undefined) {
                var userId = response.data._id;
                var userToken = StorageService.get('switchXAuth');
                var options = new FileUploadOptions();
                options.chunkedMode = false;
                options.fileKey = "file";
                options.fileName = $scope.profile_pic_url.replace(/\?.*$/g, "");
                options.mimeType = "image/jpeg";
                options.params = {
                    userId: userId
                };
                var ft = new FileTransfer();
                var IMGUPLOADURL = RESTURL + '/users/photoUpload/' + userToken;
                ft.upload($scope.profile_pic_url, encodeURI(IMGUPLOADURL), function (res) {
                    activeModal = document.querySelector('ons-modal#update-profile');
                    activeModal.hide();
                    $route.reload();
                    $cordovaToast.showShortBottom('Profile Updated Successfully');
                }, function (err) {
                    $cordovaToast.showShortBottom('Some Error Happened!');
                }, options);
            } else {
                activeModal = document.querySelector('ons-modal#update-profile');
                activeModal.hide();
                $route.reload();
                $cordovaToast.showShortBottom('Profile Updated Successfully');
            }
        }, function (error) {
            console.log(error);
        })
    }
})