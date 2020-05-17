myApp.controller("ViewOrganizationController", function ($scope, $location, $rootScope, HttpService,
    RESTURL, $route) {

    $scope.init = function () {
        $rootScope.clearPageHistory();//Clear Page History
        $rootScope.addPage('/dashboard');//Go to Dashboard
        $scope.photosToDisplay = []; //For Photos

        var url = RESTURL + "/organization";
        HttpService.get(url, function (response) {
            $scope.organisations = response.data;
        }, function (error) {
            $cordovaToast.showShortBottom('Some Error Happened while Fetching!')
        })
    }

    $scope.deleteOrganisation = function (organisation_id) {
        console.log(organisation_id);
        var url = RESTURL + "/organization/" + organisation_id;
        if (confirm("Press Ok to delete the Organisation!")) {
            HttpService.delete(url, function (response) {
                $route.reload();
                $cordovaToast.showShortBottom('Deleted Successfully');
            }, function (error) {
                $cordovaToast.showShortBottom('Some Error Happened!');
            })
        }
    }

    $scope.editOrganisation = function (organization_id) {
        $location.path("/edit-organization/" + organization_id);
    }

    $scope.addOrganization = function () {
        $location.path('/addOrganization');
    }

})