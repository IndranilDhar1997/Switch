myApp.controller('ScanCardController', function ($scope, HttpService, RESTURL, $routeParams, $interpolate,
    $sce, $route, $rootScope) {

    $scope.init = function () {
        $rootScope.clearPageHistory();
        $rootScope.addPage('/dashboard');
        $scope.qrcode = $routeParams.qrcode;
        var url = RESTURL + "/visiting-card/qrcode/" + $scope.qrcode;
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.status = response.data.status;
            $scope.cardData = {}; //Rendered Card Data
            $scope.cardHolderData = response.data.cardHolders;
            $scope.notificationId = response.data.notificationId;
            $scope.visibility_status = response.data.visitingCard.visibility;
            $scope.templateData = response.data.visitingCard._templateId.template;
            $scope.cardField = response.data.visitingCard._templateId.fields;
            for (name in response.data.visitingCard.data) {
                $scope.cardData[response.data.visitingCard.data[name].name] = {};
                switch (response.data.visitingCard.data[name].format) {
                    case 'element':
                        $scope.cardData[response.data.visitingCard.data[name].name]['element'] = response.data.visitingCard.data[name].element;
                        $scope.cardData[response.data.visitingCard.data[name].name]['class'] = response.data.visitingCard.data[name].class;
                        $scope.cardData[response.data.visitingCard.data[name].name]['style'] = response.data.visitingCard.data[name].style;
                        $scope.cardData[response.data.visitingCard.data[name].name]['format'] = response.data.visitingCard.data[name].format;
                        $scope.cardData[response.data.visitingCard.data[name].name]['displayName'] = response.data.visitingCard.data[name].displayName;
                        $scope.cardData[response.data.visitingCard.data[name].name]['name'] = response.data.visitingCard.data[name].name;
                        break;
                    case 'imgUpload':
                        $scope.cardData[response.data.visitingCard.data[name].name]['element'] = response.data.visitingCard.data[name].element;
                        $scope.cardData[response.data.visitingCard.data[name].name]['class'] = response.data.visitingCard.data[name].class;
                        $scope.cardData[response.data.visitingCard.data[name].name]['style'] = response.data.visitingCard.data[name].style;
                        $scope.cardData[response.data.visitingCard.data[name].name]['format'] = response.data.visitingCard.data[name].format;
                        $scope.cardData[response.data.visitingCard.data[name].name]['displayName'] = response.data.visitingCard.data[name].displayName;
                        $scope.cardData[response.data.visitingCard.data[name].name]['name'] = response.data.visitingCard.data[name].name;
                        $scope.cardData[response.data.visitingCard.data[name].name]['src'] = response.data.visitingCard.data[name].src;
                        $scope.cardData[response.data.visitingCard.data[name].name]['visible'] = response.data.visitingCard.data[name].visible;
                        break;
                    case 'qrcode':
                        $scope.cardData[response.data.visitingCard.data[name].name]['element'] = response.data.visitingCard.data[name].element;
                        $scope.cardData[response.data.visitingCard.data[name].name]['class'] = response.data.visitingCard.data[name].class;
                        $scope.cardData[response.data.visitingCard.data[name].name]['style'] = response.data.visitingCard.data[name].style;
                        $scope.cardData[response.data.visitingCard.data[name].name]['format'] = response.data.visitingCard.data[name].format;
                        $scope.cardData[response.data.visitingCard.data[name].name]['displayName'] = response.data.visitingCard.data[name].displayName;
                        $scope.cardData[response.data.visitingCard.data[name].name]['name'] = response.data.visitingCard.data[name].name;
                        $scope.cardData[response.data.visitingCard.data[name].name]['src'] = response.data.visitingCard.data[name].src;
                        $scope.cardData[response.data.visitingCard.data[name].name]['visible'] = response.data.visitingCard.data[name].visible;
                        break;
                    case 'text':
                        $scope.cardData[response.data.visitingCard.data[name].name]['class'] = response.data.visitingCard.data[name].class;
                        $scope.cardData[response.data.visitingCard.data[name].name]['style'] = response.data.visitingCard.data[name].style;
                        $scope.cardData[response.data.visitingCard.data[name].name]['format'] = response.data.visitingCard.data[name].format;
                        $scope.cardData[response.data.visitingCard.data[name].name]['displayName'] = response.data.visitingCard.data[name].displayName;
                        $scope.cardData[response.data.visitingCard.data[name].name]['name'] = response.data.visitingCard.data[name].name;
                        $scope.cardData[response.data.visitingCard.data[name].name]['visible'] = response.data.visitingCard.data[name].visible;
                        $scope.cardData[response.data.visitingCard.data[name].name]['value'] = response.data.visitingCard.data[name].value;
                        if (response.data.visitingCard.data[name].icon) {
                            $scope.cardData[response.data.visitingCard.data[name].name]['icon'] = response.data.visitingCard.data[name].icon;
                        }
                        if (response.data.visitingCard.data[name].textFormatting) {
                            $scope.cardData[response.data.visitingCard.data[name].name].textFormatting = {
                                classes: response.data.visitingCard.data[name].textFormatting.classes,
                                bold: response.data.visitingCard.data[name].textFormatting.bold,
                                italic: response.data.visitingCard.data[name].textFormatting.italic,
                                underline: response.data.visitingCard.data[name].textFormatting.underline,
                                color: response.data.visitingCard.data[name].textFormatting.color,
                                bgColor: response.data.visitingCard.data[name].textFormatting.bgColor,
                                fontsize: response.data.visitingCard.data[name].textFormatting.fontsize,
                                fontStyle: response.data.visitingCard.data[name].textFormatting.fontStyle
                            }
                        }
                        break;
                }
                $scope.data = $interpolate($scope.templateData)($scope);
                $scope.template_data = $sce.trustAsHtml($scope.data);
            }
        }, function (error) {
            console.log(error);
            $scope.cardStatus = error;
        })
    }

    $scope.selectedHolder = function (data) {
        console.log(data);
        $scope.cardHolderId = data._id;
    }

    $scope.addCard = function () {
        var uniqueId = {
            qrcode: $scope.qrcode,
            cardHolderId: $scope.cardHolderId
        };
        var url = RESTURL + "/notification/add-card";
        HttpService.post(url, uniqueId, function (response) {
            console.log(response.data);
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }

    $scope.sendRequest = function () {
        var uniqueId = {
            qrcode: $scope.qrcode
        }
        var url = RESTURL + "/notification/send-request";
        HttpService.post(url, uniqueId, function (response) {
            console.log(response.data);
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }

    $scope.cancelRequest = function () {
        var url = RESTURL + "/notification/cancel-request/" + $scope.notificationId;
        if (confirm("Press Ok to cancel the request!")) {
            HttpService.delete(url, function (response) {
                console.log(response.data);
                $route.reload();
            }, function (error) {
                console.log(error);
            })
        }
    }
}) 