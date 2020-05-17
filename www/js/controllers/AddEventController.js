myApp.controller("AddEventController", function ($rootScope, $scope, RESTURL, HttpService, UserProfile,
    $location, StorageService, $cordovaToast, $route) {

    //For timing
    $scope.timingToDisplay = {};
    $scope.timingToDisplay.set = false;
    $scope.timingToDisplay.timing = '';

    $scope.init = function () {
        //Clear Page History
        $rootScope.clearPageHistory();
        //Go to my events
        $rootScope.addPage('/events');
        $scope.saveClicked = false;
        $scope.backButtonClicked = false;
        $scope.pageTitle = 'Add Your Event';
        //Business Details
        $scope.event = {};
        $scope.event.images = [];
        $scope.event.timing = {}; //Timing
        $scope.times = [
            '04:00 AM',
            '04:30 AM',
            '05:00 AM',
            '05:30 AM',
            '06:00 AM',
            '06:30 AM',
            '07:00 AM',
            '07:30 AM',
            '08:00 AM',
            '08:30 AM',
            '09:00 AM',
            '09:30 AM',
            '10:00 AM',
            '10:30 AM',
            '11:00 AM',
            '11:30 AM',
            '12:00 Noon',
            '12:30 PM',
            '01:00 PM',
            '01:30 PM',
            '02:00 PM',
            '02:30 PM',
            '03:00 PM',
            '03:30 PM',
            '04:00 PM',
            '04:30 PM',
            '05:00 PM',
            '05:30 PM',
            '06:00 PM',
            '06:30 PM',
            '07:00 PM',
            '07:30 PM',
            '08:00 PM',
            '08:30 PM',
            '09:00 PM',
            '09:30 PM',
            '10:00 PM',
            '10:30 PM',
            '11:00 PM',
            '11:30 PM',
            '12:00 AM',
            '12:30 AM',
            '01:00 AM',
            '01:30 AM',
            '02:00 AM',
            '02:30 AM'
        ];
        ons.ready(function () {
            var carousel = document.addEventListener('postchange', function (event) {
            });
        });
    }

    //Show Timing modal
    $scope.showModal = function (selector) {
        $scope.activeModal = document.querySelector('ons-modal' + selector);
        $scope.activeModal.show();
    }

    //Hide Timing Modal
    $scope.hideModal = function () {
        if ($scope.activeModal) {
            $scope.activeModal.hide();
        }
    }

    //Open Event Image Modal
    $scope.openEventImageModal = function () {
        activeModal = document.querySelector('ons-modal#eventImageModal');
        activeModal.show();
    }

    //Close Event Image Modal
    $scope.closeEventImageModal = function () {
        activeModal = document.querySelector('ons-modal#eventImageModal');
        activeModal.hide();
    }

    //Delete Event Image
    $scope.removeEventImage = function () {
        if ($scope.event_image_url != null) {
            delete $scope.event_image_url;
            activeModal = document.querySelector('ons-modal#eventImageModal');
            activeModal.hide();
        } else {
            alert('Nothing to remove');
        }
    }

    // Set Timing to display
    $scope.setTiming = function () {
        $scope.timingToDisplay.set = false;
        var error = false;

        for (var key in $scope.event.timing) {
            if ($scope.event.timing[key] == null || typeof $scope.event.timing[key] == 'undefined') {
                delete $scope.event.timing[key];
            }
        }

        //Validate Timings
        if ((('timing_from' in $scope.event.timing) && !('timing_to' in $scope.event.timing))
            || (!('timing_from' in $scope.event.timing) && ('timing_to' in $scope.event.timing))) {
            //Throw Error
            $scope.event.timing.timing_error = 'Please check the timing';
            error = true;
            delete $scope.timingToDisplay.timing;
        } else {
            if ($scope.event.timing.timing_from == undefined && $scope.event.timing.timing_to == undefined) {
                delete $scope.timingToDisplay.sat;
            } else {
                $scope.timingToDisplay.timing = $scope.event.timing.timing_from + " to " + $scope.event.timing.timing_to;
            }
            delete $scope.event.timing.timing_error;
        }

        // If there is any timing selected
        if (Object.keys($scope.event.timing).length == 0) {
            $scope.timingToDisplay.set = false;
            $scope.hideModal();
            return;
        }

        if (!error) {
            $scope.timingToDisplay.set = true;
            $scope.hideModal();
        }
    }

    //Choose Image from Gallery
    $scope.takePictureFromGallery = function () {
        navigator.camera.getPicture(function (imageData) {
            $scope.event_image_url = imageData;
            $scope.imageChanged = true;
            navigator.camera.cleanup(); //Clean the camera image
            $scope.$apply();
            activeModal = document.querySelector('ons-modal#eventImageModal');
            activeModal.hide();
        }, function (err) {
            alert(err);
            console.log(err);
            activeModal = document.querySelector('ons-modal#eventImageModal');
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

    //Save Event
    $scope.saveEvent = function (eventData) {
        var data = {
            eventData: eventData,
            eventTiming: $scope.event.timing
        }
        var url = RESTURL + "/event";
        HttpService.post(url, data, function (response) {
            var eventId = response.data._id;
            var user_token = StorageService.get('switchXAuth');
            if ($scope.imageChanged) {
                // Now send image
                var options = new FileUploadOptions();
                options.chunkedMode = false;
                options.fileKey = "file";
                options.fileName = $scope.event_image_url.replace(/\?.*$/g, "");
                options.mimeType = "image/jpeg";
                options.params = {
                    eventId: eventId
                };
                var ft = new FileTransfer();
                var IMGUPLOADURL = RESTURL + '/event/photoUpload/' + eventId + "/" + user_token;
                ft.upload($scope.event_image_url, encodeURI(IMGUPLOADURL), function (res) {
                    $route.reload();
                    $cordovaToast.showShortBottom('Event Created Successfully');
                }, function (err) {
                    console.log(err);
                    alert(JSON.stringify(err));
                    //$cordovaToast.showShortBottom('Some Error Happened!');
                }, options);
            } else {
                $cordovaToast.showShortBottom('Successfully Updated your profile');
                $route.reload();
            }
        }, function (error) {
            $cordovaToast.showShortBottom('Try Again Please');
        });
    }
});