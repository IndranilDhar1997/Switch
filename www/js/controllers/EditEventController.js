myApp.controller("EditEventController", function ($scope, $route, $routeParams, $rootScope, RESTURL,
    StorageService, HttpService, $cordovaToast) {

    $scope.activeModal = null;
    $scope.timingToDisplay = {};
    $scope.timingToDisplay.set = false;
    $scope.timingToDisplay.timing = '';

    $scope.init = function () {
        $rootScope.clearPageHistory();//Clear Page History
        $rootScope.addPage('/events');//Go to Event on click of back
        $scope.event = {};
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
            '02:30 AM',
            '03:00 AM',
            '03:30 AM'
        ];
        ons.ready(function () {
            var carousel = document.addEventListener('postchange', function (event) {
            });
        });

        console.log($routeParams.event_id);
        var url = RESTURL + "/event/eventBy/" + $routeParams.event_id;
        HttpService.get(url, function (response) {
            console.log(response.data);
            var event = response.data;
            $scope.event = response.data;
            $scope.event.startDate = new Date(response.data.startDate);
            $scope.event.endDate = new Date(response.data.endDate);
            $scope.event.timing_from = response.data.timingFrom;
            $scope.event.timing_to = response.data.timingTo;
            $scope.event_photos = response.data.photos;
        }, function (error) {
            console.log(error);
        })
    }


    $scope.showModal = function (selector) {
        $scope.activeModal = document.querySelector('ons-modal' + selector);
        $scope.activeModal.show();
    }

    //hide the current modal window
    $scope.hideModal = function () {
        if ($scope.activeModal) {
            $scope.activeModal.hide();
        }
    }

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

    $scope.openEditEventImageModal = function () {
        activeModal = document.querySelector('ons-modal#editEventImageModal');
        activeModal.show();
    }

    $scope.closeEditEventImageModal = function () {
        activeModal = document.querySelector('ons-modal#editEventImageModal');
        activeModal.hide();
    }

    $scope.removeEditEventImage = function () {
        if ($scope.event_photos != null) {
            var url = RESTURL + "/event/photoDelete/" + $routeParams.event_id;
            HttpService.delete(url, function (response) {
                alert(response.data);
                delete $scope.event_photos;
                activeModal = document.querySelector('ons-modal#editEventImageModal');
                activeModal.hide();
                $route.reload();
            }, function (error) {
                console.log(error);
            })
        }
    }

    $scope.takePictureFromGallery = function () {
        navigator.camera.getPicture(function (imageData) {
            $scope.event_photos = imageData;
            $scope.imageChanged = true;
            navigator.camera.cleanup(); //Clean the camera image
            $scope.$apply();
            activeModal = document.querySelector('ons-modal#editEventImageModal');
            activeModal.hide();
        }, function (err) {
            alert(err);
            console.log(err);
            activeModal = document.querySelector('ons-modal#editEventImageModal');
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

    $scope.updateEvent = function (eventData) {
        var data = {
            eventData: eventData,
            eventTiming: $scope.event.timing,
            eventId: $routeParams.event_id
        }
        var url = RESTURL + "/event";
        HttpService.put(url, data, function (response) {
            var eventId = response.data._id;
            var user_token = StorageService.get('switchXAuth');
            if ($scope.imageChanged) {
                // Now send image
                var options = new FileUploadOptions();
                options.chunkedMode = false;
                options.fileKey = "file";
                options.fileName = $scope.event_photos.replace(/\?.*$/g, "");
                options.mimeType = "image/jpeg";
                options.params = {
                    eventId: eventId
                };
                var ft = new FileTransfer();
                var IMGUPLOADURL = RESTURL + '/event/photoUpload/' + $routeParams.event_id + "/" + user_token;
                ft.upload($scope.event_photos, encodeURI(IMGUPLOADURL), function (res) {
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
})
