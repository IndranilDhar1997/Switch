myApp.controller('SendDropboxCardController', function ($scope, $rootScope, $location, HttpService, RESTURL,
    $interpolate, $sce, $routeParams, $route, $cordovaToast) {

    $scope.init = function () {
        $rootScope.clearPageHistory(); //Clear Page History
        $rootScope.addPage('/dashboard'); //Go to dashboard on click of back
        $scope.qrcode = $routeParams.qrcode;
        var visiting_card = RESTURL + "/visiting-card";
        HttpService.get(visiting_card, function (response) {
            $scope.visitingCardDetails = response.data;
            $scope.cardData = {}; //Rendered Card Data 
            for (field in response.data) {
                $scope.templateData = response.data[field]._templateId;
                for (name in response.data[field].data) {
                    $scope.cardData[response.data[field].data[name].name] = {};
                    switch (response.data[field].data[name].format) {
                        case 'element':
                            $scope.cardData[response.data[field].data[name].name]['element'] = response.data[field].data[name].element;
                            $scope.cardData[response.data[field].data[name].name]['class'] = response.data[field].data[name].class;
                            $scope.cardData[response.data[field].data[name].name]['style'] = response.data[field].data[name].style;
                            $scope.cardData[response.data[field].data[name].name]['format'] = response.data[field].data[name].format;
                            $scope.cardData[response.data[field].data[name].name]['displayName'] = response.data[field].data[name].displayName;
                            $scope.cardData[response.data[field].data[name].name]['name'] = response.data[field].data[name].name;
                            break;
                        case 'imgUpload':
                            $scope.cardData[response.data[field].data[name].name]['element'] = response.data[field].data[name].element;
                            $scope.cardData[response.data[field].data[name].name]['class'] = response.data[field].data[name].class;
                            $scope.cardData[response.data[field].data[name].name]['style'] = response.data[field].data[name].style;
                            $scope.cardData[response.data[field].data[name].name]['format'] = response.data[field].data[name].format;
                            $scope.cardData[response.data[field].data[name].name]['displayName'] = response.data[field].data[name].displayName;
                            $scope.cardData[response.data[field].data[name].name]['name'] = response.data[field].data[name].name;
                            $scope.cardData[response.data[field].data[name].name]['src'] = response.data[field].data[name].src;
                            $scope.cardData[response.data[field].data[name].name]['visible'] = response.data[field].data[name].visible;
                            break;
                        case 'qrcode':
                            $scope.cardData[response.data[field].data[name].name]['element'] = response.data[field].data[name].element;
                            $scope.cardData[response.data[field].data[name].name]['class'] = response.data[field].data[name].class;
                            $scope.cardData[response.data[field].data[name].name]['style'] = response.data[field].data[name].style;
                            $scope.cardData[response.data[field].data[name].name]['displayName'] = response.data[field].data[name].displayName;
                            $scope.cardData[response.data[field].data[name].name]['src'] = response.data[field].data[name].src;
                            $scope.cardData[response.data[field].data[name].name]['visible'] = response.data[field].data[name].visible;
                            $scope.cardData[response.data[field].data[name].name]['format'] = response.data[field].data[name].format;
                            $scope.cardData[response.data[field].data[name].name]['name'] = response.data[field].data[name].name;
                            break;
                        case 'text':
                            $scope.cardData[response.data[field].data[name].name]['class'] = response.data[field].data[name].class;
                            $scope.cardData[response.data[field].data[name].name]['style'] = response.data[field].data[name].style;
                            $scope.cardData[response.data[field].data[name].name]['format'] = response.data[field].data[name].format;
                            $scope.cardData[response.data[field].data[name].name]['displayName'] = response.data[field].data[name].displayName;
                            $scope.cardData[response.data[field].data[name].name]['name'] = response.data[field].data[name].name;
                            $scope.cardData[response.data[field].data[name].name]['visible'] = response.data[field].data[name].visible;
                            $scope.cardData[response.data[field].data[name].name]['value'] = response.data[field].data[name].value;
                            if (response.data[field].data[name].icon) {
                                $scope.cardData[response.data[field].data[name].name]['icon'] = response.data[field].data[name].icon;
                            }
                            if (response.data[field].data[name].textFormatting) {
                                $scope.cardData[response.data[field].data[name].name].textFormatting = {
                                    classes: response.data[field].data[name].textFormatting.classes,
                                    bold: response.data[field].data[name].textFormatting.bold,
                                    italic: response.data[field].data[name].textFormatting.italic,
                                    underline: response.data[field].data[name].textFormatting.underline,
                                    color: response.data[field].data[name].textFormatting.color,
                                    bgColor: response.data[field].data[name].textFormatting.bgColor,
                                    fontsize: response.data[field].data[name].textFormatting.fontsize,
                                    fontStyle: response.data[field].data[name].textFormatting.fontStyle
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

    $scope.addCardToDropBox = function(data) {
        if (confirm("Press OK to send your card to the event organizer!")) {
            var dataToSend = {
                cardId: data,
                uniqueCode: $scope.qrcode
            }
            var url = RESTURL + "/event/card-dropbox";
            HttpService.post(url, dataToSend, function(response) {
                console.log(response.data);
                $cordovaToast.showShortBottom('Sent Successfully');
                $location.path('/dashboard');
            }, function(error) {
                console.log(error);
                $cordovaToast.showShortBottom('Error in Adding in Dropbox. Please Try Again');
            })
        }
    }
})