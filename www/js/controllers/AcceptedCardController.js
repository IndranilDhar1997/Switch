myApp.controller('AcceptedCardController', function ($scope, $location, RESTURL, HttpService, $routeParams,
    $interpolate, $sce, $route, $rootScope) {

    $scope.init = function () {
        $rootScope.clearPageHistory();//Clear Page History
        $rootScope.addPage('/cardHolderPage');//Go to Organisation on click of back
        var url = RESTURL + "/card-holder/getBy/" + $routeParams.cardHolderId;
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.visitingCardDetails = response.data._cards;
            $scope.cardHolderLength = response.data._cards.length;
            $scope.cardData = {}; //Rendered Card Data 
            for (field in response.data._cards) {
                $scope.templateData = response.data._cards[field]._templateId;
                for (name in response.data._cards[field].data) {
                    $scope.cardData[response.data._cards[field].data[name].name] = {};
                    switch (response.data._cards[field].data[name].format) {
                        case 'element':
                            $scope.cardData[response.data._cards[field].data[name].name]['element'] = response.data._cards[field].data[name].element;
                            $scope.cardData[response.data._cards[field].data[name].name]['class'] = response.data._cards[field].data[name].class;
                            $scope.cardData[response.data._cards[field].data[name].name]['style'] = response.data._cards[field].data[name].style;
                            $scope.cardData[response.data._cards[field].data[name].name]['format'] = response.data._cards[field].data[name].format;
                            $scope.cardData[response.data._cards[field].data[name].name]['displayName'] = response.data._cards[field].data[name].displayName;
                            $scope.cardData[response.data._cards[field].data[name].name]['name'] = response.data._cards[field].data[name].name;
                            break;
                        case 'imgUpload':
                            $scope.cardData[response.data._cards[field].data[name].name]['element'] = response.data._cards[field].data[name].element;
                            $scope.cardData[response.data._cards[field].data[name].name]['class'] = response.data._cards[field].data[name].class;
                            $scope.cardData[response.data._cards[field].data[name].name]['style'] = response.data._cards[field].data[name].style;
                            $scope.cardData[response.data._cards[field].data[name].name]['format'] = response.data._cards[field].data[name].format;
                            $scope.cardData[response.data._cards[field].data[name].name]['displayName'] = response.data._cards[field].data[name].displayName;
                            $scope.cardData[response.data._cards[field].data[name].name]['name'] = response.data._cards[field].data[name].name;
                            $scope.cardData[response.data._cards[field].data[name].name]['src'] = response.data._cards[field].data[name].src;
                            $scope.cardData[response.data._cards[field].data[name].name]['visible'] = response.data._cards[field].data[name].visible;
                            break;
                        case 'qrcode':
                            $scope.cardData[response.data._cards[field].data[name].name]['element'] = response.data._cards[field].data[name].element;
                            $scope.cardData[response.data._cards[field].data[name].name]['class'] = response.data._cards[field].data[name].class;
                            $scope.cardData[response.data._cards[field].data[name].name]['style'] = response.data._cards[field].data[name].style;
                            $scope.cardData[response.data._cards[field].data[name].name]['format'] = response.data._cards[field].data[name].format;
                            $scope.cardData[response.data._cards[field].data[name].name]['displayName'] = response.data._cards[field].data[name].displayName;
                            $scope.cardData[response.data._cards[field].data[name].name]['name'] = response.data._cards[field].data[name].name;
                            $scope.cardData[response.data._cards[field].data[name].name]['src'] = response.data._cards[field].data[name].src;
                            $scope.cardData[response.data._cards[field].data[name].name]['visible'] = response.data._cards[field].data[name].visible;
                            break;
                        case 'text':
                            $scope.cardData[response.data._cards[field].data[name].name]['class'] = response.data._cards[field].data[name].class;
                            $scope.cardData[response.data._cards[field].data[name].name]['style'] = response.data._cards[field].data[name].style;
                            $scope.cardData[response.data._cards[field].data[name].name]['format'] = response.data._cards[field].data[name].format;
                            $scope.cardData[response.data._cards[field].data[name].name]['displayName'] = response.data._cards[field].data[name].displayName;
                            $scope.cardData[response.data._cards[field].data[name].name]['name'] = response.data._cards[field].data[name].name;
                            $scope.cardData[response.data._cards[field].data[name].name]['visible'] = response.data._cards[field].data[name].visible;
                            $scope.cardData[response.data._cards[field].data[name].name]['value'] = response.data._cards[field].data[name].value;
                            if (response.data._cards[field].data[name].icon) {
                                $scope.cardData[response.data._cards[field].data[name].name]['icon'] = response.data._cards[field].data[name].icon;
                            }
                            if (response.data._cards[field].data[name].textFormatting) {
                                $scope.cardData[response.data._cards[field].data[name].name].textFormatting = {
                                    classes: response.data._cards[field].data[name].textFormatting.classes,
                                    bold: response.data._cards[field].data[name].textFormatting.bold,
                                    italic: response.data._cards[field].data[name].textFormatting.italic,
                                    underline: response.data._cards[field].data[name].textFormatting.underline,
                                    color: response.data._cards[field].data[name].textFormatting.color,
                                    bgColor: response.data._cards[field].data[name].textFormatting.bgColor,
                                    fontsize: response.data._cards[field].data[name].textFormatting.fontsize,
                                    fontStyle: response.data._cards[field].data[name].textFormatting.fontStyle
                                }
                            }
                            break;
                    }
                    $scope.data = $interpolate($scope.templateData.template)($scope);
                    $scope.template_data = $sce.trustAsHtml($scope.data);
                }
            }

        }, function (error) {
            console.log(error);
        })
    }

    $scope.deleteVisitingCard = function (visitingCardId) {
        $scope.cardHolderId = $routeParams.cardHolderId;
        var url = RESTURL + "/card-holder/card/" + $scope.cardHolderId + "/" + visitingCardId;
        HttpService.delete(url, function (response) {
            console.log(response.data);
            $route.reload();
        }, function (error) {
            console.log(error);
        })
    }
})