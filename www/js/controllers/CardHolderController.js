myApp.controller('CardHolderController', function ($scope, $location, $rootScope, HttpService, RESTURL,
    StorageService, $route, $routeParams) {

    $scope.cardLength = [];
    $scope.activeModal = null;

    let options = {
        colorDark: "#000000",
        colorLight: "#ffffff",
    };

    $scope.init = function () {
        $rootScope.clearPageHistory(); //Clear Page History
        $rootScope.addPage('/dashboard'); //Go to dashboard on click of back

        var url = RESTURL + "/card-holder";
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.cardHolders = response.data.cardHolder;
            $scope.holderStatus = response.data;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.cardHolderModal = function (holderLength) {
        console.log(holderLength);
        if (holderLength.membership != 'Premium' && holderLength.cardHolder.length == 3) {
            $location.path('/premium');
        } else {
            activeModal = document.querySelector('ons-modal#card-holder');
            activeModal.show();
        }
    }

    $scope.closeCardHolderModal = function () {
        activeModal = document.querySelector('ons-modal#card-holder');
        activeModal.hide();
    }

    $scope.convertQrcode = function (data) {
        var qrCode = data;
        $location.path("/displayQRCode/" + qrCode);
    }

    $scope.displayQRCode = function() {
        $rootScope.clearPageHistory(); //Clear Page History
        $rootScope.addPage('/cardHolderPage'); //Go to dashboard on click of back
        $scope.qrCode = $routeParams.qrCode;
        var qrCodeContainer = new QRCode(document.getElementById('qrCodeContainer'), {
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        qrCodeContainer.makeCode($scope.qrCode);
    }

    $scope.saveCardHolder = function (name) {
        var data = {
            name: name
        }
        var url = RESTURL + "/card-holder";
        HttpService.post(url, data, function (response) {
            console.log(response.data);
            activeModal = document.querySelector('ons-modal#card-holder');
            activeModal.hide();
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }

    $scope.delete_cardHolder = function (holder_id) {
        var url = RESTURL + "/card-holder";
        HttpService.delete(url, function (response) {
            console.log(response.data);
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }

    $scope.closeEditHolderModal = function () {
        activeModal = document.querySelector('ons-modal#edit-card-holder');
        activeModal.hide();
    }

    $scope.edit_cardHolder = function (holder_id) {
        console.log(holder_id);
        HttpService.get(RESTURL + "/card-holder/getBy/" + holder_id, function (response) {
            console.log(response.data);
            $scope.holderName = response.data.name;
            $scope.holderId = response.data._id;
            activeModal = document.querySelector('ons-modal#edit-card-holder');
            activeModal.show();
        }, function (error) {
            console.log(error);
        })
    }

    $scope.updateCardHolder = function (holderName) {
        var data = {
            name: holderName,
            cardHolderId: $scope.holderId
        }
        var url = RESTURL + "/card-holder";
        HttpService.put(url, data, function (response) {
            console.log(response.data);
            activeModal = document.querySelector('ons-modal#edit-card-holder');
            activeModal.hide();
            $route.reload();
        })
    }

    $scope.delete_cardHolder = function (holderId) {
        var url = RESTURL + "/card-holder/" + holderId;
        if (confirm("Press Ok to delete the CardHolder!")) {
            HttpService.delete(url, function (response) {
                console.log(response.data);
                $route.reload();
            }, function (error) {
                console.log(error);
            })
        }
    }

    $scope.getMyCards = function (cardHolderId) {
        console.log(cardHolderId);
        $location.path("/acceptedCards/" + cardHolderId);
    }
})