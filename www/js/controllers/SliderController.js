myApp.controller('SliderController', function($scope, $location, AppStatus, SWITCH) {

    $scope.skipIntro = function() {
        AppStatus.setStatus(SWITCH.app.status.INIT);
        $location.path('/');
    }

    $scope.nextToSecondSlide = function() {
        $location.path('/new-user/second-slider');
    }

    $scope.nextToThirdSlide = function() {
        $location.path('/new-user/third-slider');
    }

    $scope.previousToFirstSlide = function() {
        $location.path('/new-user/first-slider');
    }

    $scope.previousToSecondSlide = function() {
        $location.path('/new-user/second-slider');
    }

    $scope.finishIntro = function() {
        AppStatus.setStatus(SWITCH.app.status.INIT);
        $location.path('/');
    }
})