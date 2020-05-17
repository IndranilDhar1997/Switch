myApp.controller("UpcomingEventsController", function ($scope, $location, RESTURL, HttpService) {

    $scope.init = function () {

        var url = RESTURL + "/event/all-upcoming-events";
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.upcomingEvents = response.data;
        }, function (error) {
            console.log(error);
        })
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
})