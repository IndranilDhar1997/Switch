myApp.controller('SearchController', function ($scope, $location, $rootScope, HttpService, RESTURL,
    $routeParams, $interpolate, $sce) {

    $scope.init = function () {

        $rootScope.clearPageHistory();
        $rootScope.addPage('/dashboard');
    }

    $scope.search = function (element) {
        if (element.length >= 3) {
            var data = {
                element: element
            }
            var url = RESTURL + "/users/search";
            HttpService.post(url, data, function (response) {
                console.log(response.data);
                $scope.searchData = response.data;
                if ($scope.searchData.length == 0) {
                    $scope.message = 'No Results Found.'
                }
            }, function (error) {
                console.log(error);
                $cordovaToast.showShortBottom('Some Error Happened!')
            })
        }
    }

    $scope.searchProfile = function (searchId) {
        $location.path('/search_profile/' + searchId);
    }

    $scope.searched_profile = function () {
        $rootScope.clearPageHistory();
        $rootScope.addPage('/dashboard');
        HttpService.get(RESTURL + "/users/userBy/" + $routeParams.searchId, function (response) {
            console.log(response.data);
            $scope.cards = response.data.cards;
            $scope.cardHolderData = response.data.cardholders;
            $scope.userName = response.data.user.name;
            $scope.email = response.data.user.primaryEmail;
            $scope.profile_pic_url = response.data.user.profilePhoto;
            $scope.profileOrganization = response.data.user.profileOrganization;
            $scope.profileDesignation = response.data.user.profileDesignation;
            $scope.tagline = response.data.user.tagline;

            //Card Rendering Data
            $scope.cardData = {}; //Rendered Card Data 
            for (field in response.data.cards) {
                $scope.templateData = response.data.cards[field]._templateId;
                $scope.visibility = response.data.cards[field].visibility;
                $scope.uniqueId = response.data.cards[field].uniqueId;
                for (name in response.data.cards[field].data) {
                    $scope.cardData[response.data.cards[field].data[name].name] = {};
                    switch (response.data.cards[field].data[name].format) {
                        case 'element':
                            $scope.cardData[response.data.cards[field].data[name].name]['element'] = response.data.cards[field].data[name].element;
                            $scope.cardData[response.data.cards[field].data[name].name]['class'] = response.data.cards[field].data[name].class;
                            $scope.cardData[response.data.cards[field].data[name].name]['style'] = response.data.cards[field].data[name].style;
                            $scope.cardData[response.data.cards[field].data[name].name]['format'] = response.data.cards[field].data[name].format;
                            $scope.cardData[response.data.cards[field].data[name].name]['displayName'] = response.data.cards[field].data[name].displayName;
                            $scope.cardData[response.data.cards[field].data[name].name]['name'] = response.data.cards[field].data[name].name;
                            break;
                        case 'imgUpload':
                            $scope.cardData[response.data.cards[field].data[name].name]['element'] = response.data.cards[field].data[name].element;
                            $scope.cardData[response.data.cards[field].data[name].name]['class'] = response.data.cards[field].data[name].class;
                            $scope.cardData[response.data.cards[field].data[name].name]['style'] = response.data.cards[field].data[name].style;
                            $scope.cardData[response.data.cards[field].data[name].name]['format'] = response.data.cards[field].data[name].format;
                            $scope.cardData[response.data.cards[field].data[name].name]['displayName'] = response.data.cards[field].data[name].displayName;
                            $scope.cardData[response.data.cards[field].data[name].name]['name'] = response.data.cards[field].data[name].name;
                            $scope.cardData[response.data.cards[field].data[name].name]['src'] = response.data.cards[field].data[name].src;
                            $scope.cardData[response.data.cards[field].data[name].name]['visible'] = response.data.cards[field].data[name].visible;
                            break;
                        case 'qrcode':
                            $scope.cardData[response.data.cards[field].data[name].name]['element'] = response.data.cards[field].data[name].element;
                            $scope.cardData[response.data.cards[field].data[name].name]['class'] = response.data.cards[field].data[name].class;
                            $scope.cardData[response.data.cards[field].data[name].name]['style'] = response.data.cards[field].data[name].style;
                            $scope.cardData[response.data.cards[field].data[name].name]['displayName'] = response.data.cards[field].data[name].displayName;
                            $scope.cardData[response.data.cards[field].data[name].name]['src'] = response.data.cards[field].data[name].src;
                            $scope.cardData[response.data.cards[field].data[name].name]['visible'] = response.data.cards[field].data[name].visible;
                            $scope.cardData[response.data.cards[field].data[name].name]['format'] = response.data.cards[field].data[name].format;
                            $scope.cardData[response.data.cards[field].data[name].name]['name'] = response.data.cards[field].data[name].name;
                            break;
                        case 'text':
                            $scope.cardData[response.data.cards[field].data[name].name]['class'] = response.data.cards[field].data[name].class;
                            $scope.cardData[response.data.cards[field].data[name].name]['style'] = response.data.cards[field].data[name].style;
                            $scope.cardData[response.data.cards[field].data[name].name]['format'] = response.data.cards[field].data[name].format;
                            $scope.cardData[response.data.cards[field].data[name].name]['displayName'] = response.data.cards[field].data[name].displayName;
                            $scope.cardData[response.data.cards[field].data[name].name]['name'] = response.data.cards[field].data[name].name;
                            $scope.cardData[response.data.cards[field].data[name].name]['visible'] = response.data.cards[field].data[name].visible;
                            $scope.cardData[response.data.cards[field].data[name].name]['value'] = response.data.cards[field].data[name].value;
                            if (response.data.cards[field].data[name].icon) {
                                $scope.cardData[response.data.cards[field].data[name].name]['icon'] = response.data.cards[field].data[name].icon;
                            }
                            if (response.data.cards[field].data[name].textFormatting) {
                                $scope.cardData[response.data.cards[field].data[name].name].textFormatting = {
                                    classes: response.data.cards[field].data[name].textFormatting.classes,
                                    bold: response.data.cards[field].data[name].textFormatting.bold,
                                    italic: response.data.cards[field].data[name].textFormatting.italic,
                                    underline: response.data.cards[field].data[name].textFormatting.underline,
                                    color: response.data.cards[field].data[name].textFormatting.color,
                                    bgColor: response.data.cards[field].data[name].textFormatting.bgColor,
                                    fontsize: response.data.cards[field].data[name].textFormatting.fontsize,
                                    fontStyle: response.data.cards[field].data[name].textFormatting.fontStyle
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
})