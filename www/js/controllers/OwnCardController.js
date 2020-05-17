myApp.controller('OwnCardController', function ($scope, $rootScope, $location, HttpService, RESTURL,
    $interpolate, $sce, $routeParams, $route, $cordovaToast) {

    $scope.init = function () {
        $rootScope.clearPageHistory(); //Clear Page History
        $rootScope.addPage('/dashboard'); //Go to dashboard on click of back
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
            $cordovaToast.showShortBottom('Some Error While Fetching Data');
        })
    }

    $scope.deleteVisitingCard = function (data) {
        var url = RESTURL + "/visiting-card/" + data;
        if (confirm("Press Ok to delete the Visiting Card!")) {
            HttpService.delete(url, function (response) {
                $route.reload();
                $cordovaToast.showShortBottom('Deleted Successfully');
            }, function (error) {
                $cordovaToast.showShortBottom('Some Error While Deleting Card');
            })
        }

    }

    $scope.editVisitingCard = function (vc_id) {
        $location.path('/editVisitingCard/' + vc_id);
    }

    $scope.openQrcode = function (qrcode) {
        $scope.qrcode = qrcode;
        var qrCodeContainer = new QRCode(document.getElementById('qrCodeContainer'), {
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        qrCodeContainer.makeCode($scope.qrcode);
    }

    $scope.closeQrcode = function () {
        $scope.qrcode = null;
    }


    $scope.getQrcode = function () {
        var qrCodeContainer = new QRCode(document.getElementById('qrCodeContainer'), {
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        qrCodeContainer.makeCode($routeParams.qrcode);
    }

    //goto templates page
    $scope.gotoTemplatePage = function () {
        $location.path("/templateList");
    }
})