myApp.controller("NotificationController", function ($scope, $location, RESTURL, HttpService, $route) {

    $scope.init = function () {
        var url = RESTURL + "/notification";
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.notifications = response.data;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.acceptRequest = function (notificationId) {
        var data = {
            notificationId: notificationId
        }
        var url = RESTURL + "/notification/accept-request";
        HttpService.post(url, data, function (response) {
            console.log(response.data);
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }

    $scope.rejectRequest = function (notificationId) {
        $scope.notificationId = notificationId;
        var url = RESTURL + "/notification/cancel-request/" + notificationId;
        HttpService.delete(url, function (response) {
            console.log(response.data);
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }
})