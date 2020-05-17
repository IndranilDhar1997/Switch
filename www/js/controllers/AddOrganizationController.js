myApp.controller("AddOrganizationController", function ($scope, $location, $rootScope, $cordovaToast,
    HttpService, StorageService, RESTURL, $route) {

    $scope.init = function () {
        //Clear Page History
        $rootScope.clearPageHistory();
        $rootScope.addPage('/organizations');
        $scope.saveClicked = false;
        $scope.backButtonClicked = false;
        $scope.organisation = {};
        $scope.organisation.cover_image = [];
        $scope.organisation.logo_image = [];

        ons.ready(function () {
            var carousel = document.addEventListener('postchange', function (organisation) {
            });
        });
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
    $scope.openLogoImageModal = function () {
        activeModal = document.querySelector('ons-modal#logoImageModal');
        activeModal.show();
    }

    //Close Logo Image Modal
    $scope.closeLogoImageModal = function () {
        activeModal = document.querySelector('ons-modal#logoImageModal');
        activeModal.hide();
    }

    // Upload Cover Image from gallery
    $scope.takeCoverPhotoFromGallery = function () {
        navigator.camera.getPicture(function (coverImageData) {
            $scope.cover_image_url = "data:image/jpeg;base64," + coverImageData;
            activeModal = document.querySelector('ons-modal#coverImageModal');
            activeModal.hide();
        }, function (err) {
            alert(JSON.stringify(err));
            activeModal = document.querySelector('ons-modal#coverImageModal');
            activeModal.hide();
            //$cordovaToast.showShortBottom('Error Happened');
        }, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                //destinationType: Camera.DestinationType.FILE_URI,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 450
            });
    }

    //Upload logo image from gallery
    $scope.takeLogoPhotoFromGallery = function () {
        navigator.camera.getPicture(function (logoImageData) {
            $scope.logo_image_url = "data:image/jpeg;base64," + logoImageData;
            activeModal = document.querySelector('ons-modal#logoImageModal');
            activeModal.hide();
        }, function (err) {
            alert(JSON.stringify(err));
            activeModal = document.querySelector('ons-modal#logoImageModal');
            activeModal.hide();
            //$cordovaToast.showShortBottom('Error Happened');
        }, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                //destinationType: Camera.DestinationType.FILE_URI,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 450
            });
    }

    //Remove Cover Image
    $scope.removeCoverImage = function () {
        if ($scope.cover_image_url != null) {
            delete $scope.cover_image_url;
            activeModal = document.querySelector('ons-modal#eventImageModal');
            activeModal.hide();
        } else {
            alert('Nothing to remove');
        }
    }

    //Remove Logo Image
    $scope.removeLogoImage = function () {
        if ($scope.logo_image_url != null) {
            delete $scope.logo_image_url;
            activeModal = document.querySelector('ons-modal#eventImageModal');
            activeModal.hide();
        } else {
            alert('Nothing to remove');
        }
    }


    $scope.saveOrganisation = function (organisationData) {
        var data = {
            organisationData: organisationData
        }
        var url = RESTURL + "/organization";
        HttpService.post(url, data, function (response) {
            var organizationId = response.data._id;
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
            var COVERIMGUPLOADURL = RESTURL + '/organization/coverPhotoUpload/' + organizationId + '/' + user_token;
            var logo_file_name = $scope.logo_image_url.replace(/\?.*$/g, "");
            cft.upload($scope.cover_image_url, encodeURI(COVERIMGUPLOADURL), function (res) {
                var logoOptions = new FileUploadOptions();
                logoOptions.chunkedMode = false;
                logoOptions.fileKey = "logo";
                logoOptions.fileName = logo_file_name;
                logoOptions.mimeType = "image/jpeg";
                logoOptions.params = {
                    organisationData: organisationData
                };
                var lft = new FileTransfer();
                var LOGOIMGUPLOADURL = RESTURL + '/organization/logoPhotoUpload/' + organizationId + '/' + user_token;;
                lft.upload($scope.logo_image_url, encodeURI(LOGOIMGUPLOADURL), function (res) {
                    $route.reload();
                    $cordovaToast.showShortBottom('Organization Created Successfully');
                }, function (err) {
                    alert(JSON.stringify(err));
                }, logoOptions);
            }, function (err) {
                alert(JSON.stringify(err));
                //$cordovaToast.showShortBottom('Some Error Happened!');
            }, coverOptions);
        }, function (error) {
            alert(JSON.stringify(error));
            $cordovaToast.showShortBottom('Try Again Please');
        });
    }

})