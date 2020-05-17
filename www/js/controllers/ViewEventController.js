myApp.controller("ViewEventController", function ($scope, $location, RESTURL, HttpService, StorageService,
    $rootScope, $route, $cordovaToast) {

    $scope.init = function () {
        $rootScope.clearPageHistory();//Clear Page History
        $rootScope.addPage('/dashboard');//Go to Event on click of back
        //$scope.photosToDisplay = []; //For Photos

        var url = RESTURL + "/event/my-events";
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.events = response.data;
        }, function (error) {
            $cordovaToast.showShortBottom('Some Error Happened While Fetching!')
        })
    }

    $scope.delete_event = function (data) {
        console.log(data);
        if (confirm("Press Ok to delete the event!")) {
            HttpService.delete(RESTURL + '/event/' + data, function (response) {
                $route.reload();
                $cordovaToast.showShortBottom("Successfully Deleted");
            }, function (error) {
                $cordovaToast.showShortBottom('Some Error Happened!')
            });
        }
    }

    $scope.edit_event = function (data) {
        var event_id = data;
        $location.path('/edit_event/' + event_id);
    }

    $scope.startDate = function (epochTime) {
        var time = epochTime;
        var date = new Date(time);
        return (date.toLocaleDateString('en-US', { hour12: true }));
    }

    $scope.endDate = function (epochTime) {
        var time = epochTime;
        var date = new Date(time);
        return (date.toLocaleDateString('en-US', { hour12: true }));
    }

    $scope.createDropbox = function (eventId) {
        var url = RESTURL + "/event/dropbox";
        var data = {
            eventId: eventId
        }
        HttpService.put(url, data, function (response) {
            $route.reload();
            $cordovaToast.showShortBottom('Dropbox Created Successfully');
        }, function (error) {
            $cordovaToast.showShortBottom('Some Error Happened. Try Again!');
        })
    }

    $scope.addEvent = function () {
        $location.path('/addEvent');
    }
})