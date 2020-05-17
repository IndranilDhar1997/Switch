myApp.controller("EditOrganizationController", function ($scope, $location, $routeParams, $rootScope, RESTURL,
    StorageService, HttpService, $cordovaToast, $route) {



    $scope.init = function () {
        $rootScope.clearPageHistory();//Clear Page History
        $rootScope.addPage('/organizations');//Go to Organisation on click of back
        $scope.organisation = {};
        $scope.organisationId = $routeParams.organisation_id;
        var url = RESTURL + "/organization/getBy/" + $routeParams.organization_id;
        HttpService.get(url, function (response) {
            console.log(response.data);
            $rootScope.organisationId = response.data._id;
            $scope.organisation = response.data;
            $scope.cover_image_url = response.data.coverPhoto;
            $scope.logo_image_url = response.data.logo;
        }, function (error) {
            console.log(error);
        })
    }

    //Open Cover Image Modal
    $scope.openCoverImageModal = function () {
        activeModal = document.querySelector('ons-modal#coverImageModal');
        activeModal.show();
    }

    //Close Cover Image Modal
    $scope.closeCoverImageModal = function () {
        activeModal = document.querySelector('ons-modal#coverImageModal');
        activeModal.hide();
    }

    //Open Logo Image Modal
    $scope.openLogoImageModal = function (key) {
        activeModal = document.querySelector('ons-modal#logoImageModal');
        activeModal.show();
    }

    //Close Logo Image Modal
    $scope.closeLogoImageModal = function () {
        activeModal = document.querySelector('ons-modal#logoImageModal');
        activeModal.hide();
    }

    //Remove Cover Image
    $scope.removeCoverImage = function () {
        if ($scope.cover_image_url != null) {
            var url = RESTURL + "/organization/coverPhotoDelete/" + $rootScope.organisationId;
            HttpService.delete(url, function (response) {
                delete $scope.cover_image_url;
                activeModal = document.querySelector('ons-modal#coverImageModal');
                activeModal.hide();
                $route.reload();
            }, function (error) {
                $cordovaToast.showShortBottom('Some Error Happened!')
            })
        } else {
            $cordovaToast.showShortBottom('Some Error Happened!')
        }
    }

    $scope.removeLogoImage = function () {
        if ($scope.logo_image_url != null) {
            var url = RESTURL + "/organization/logoPhotoDelete/" + $rootScope.organisationId;
            HttpService.delete(url, function (response) {
                delete $scope.logo_image_url;
                activeModal = document.querySelector('ons-modal#logoImageModal');
                activeModal.hide();
                $route.reload();
            }, function (error) {
                $cordovaToast.showShortBottom('Some Error Happened!')
            })
        } else {
            $cordovaToast.showShortBottom('Some Error Happened!')
        }
    }



    //Upload Cover Photo From Gallery
    $scope.takeCoverPhotoFromGallery = function () {
        navigator.camera.getPicture(function (coverImageData) {
            $scope.cover_image_url = "data:image/jpeg;base64," + coverImageData;
            activeModal = document.querySelector('ons-modal#coverImageModal');
            activeModal.hide();
        }, function (err) {
            activeModal = document.querySelector('ons-modal#coverImageModal');
            activeModal.hide();
            $cordovaToast.showShortBottom('Error Happened');
        }, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 450
            });
    }

    //Upload Cover Photo From Camera
    $scope.takeLogoPhotoFromGallery = function () {
        navigator.camera.getPicture(function (logoImageData) {
            $scope.logo_image_url = "data:image/jpeg;base64," + logoImageData;
            activeModal = document.querySelector('ons-modal#logoImageModal');
            activeModal.hide();
        }, function (err) {
            activeModal = document.querySelector('ons-modal#logoImageModal');
            activeModal.hide();
            $cordovaToast.showShortBottom('Error Happened');
        }, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 450
            });
    }

    $scope.updateOrganisation = function (organisationData) {
        var data = {
            organisationData: organisationData,
            id: $scope.organisationId
        }
        var url = RESTURL + "/organization";
        HttpService.put(url, data, function (response) {
            $cordovaToast.showShortBottom('Updated Successfully');
            var user_token = StorageService.get('switchXAuth');
            var cover_file_name = $scope.cover_image_url.replace(/\?.*$/g, "");
            // Now send cover image
            var coverOptions = new FileUploadOptions();
            coverOptions.chunkedMode = false;
            coverOptions.fileKey = "cover";
            coverOptions.fileName = cover_file_name;
            coverOptions.mimeType = "image/jpeg";
            coverOptions.params = {
                organisationData: organisationData
            };
            var cft = new FileTransfer();
            var COVERIMGUPLOADURL = RESTURL + '/organization/coverPhotoUpload/' + $rootScope.organisationId + '/' + user_token;
            var logo_file_name = $scope.logo_image_url.replace(/\?.*$/g, "");
            cft.upload($scope.cover_image_url, encodeURI(COVERIMGUPLOADURL), function (res) {
                $cordovaToast.showShortBottom('Cover Image Updated Successfully');
                var logoOptions = new FileUploadOptions();
                logoOptions.chunkedMode = false;
                logoOptions.fileKey = "logo";
                logoOptions.fileName = logo_file_name;
                logoOptions.mimeType = "image/jpeg";
                logoOptions.params = {
                    organisationData: organisationData
                };
                var lft = new FileTransfer();
                var LOGOIMGUPLOADURL = RESTURL + '/organization/logoPhotoUpload/' + $rootScope.organisationId + '/' + user_token;;
                lft.upload($scope.logo_image_url, encodeURI(LOGOIMGUPLOADURL), function (res) {

                    $route.reload();
                    delete $rootScope.organisationId;
                    $cordovaToast.showShortBottom('Logo Updated Successfully');
                }, function (err) {
                    $cordovaToast.showShortBottom('Some Error Happened!');
                }, logoOptions);
            }, function (err) {
                $cordovaToast.showShortBottom('Some Error Happened!');
            }, coverOptions);
        }, function (error) {
            $cordovaToast.showShortBottom('Try Again Please');
        });
    }
})
