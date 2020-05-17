myApp.controller('EditVisitingCardController', function ($scope, $routeParams, $location, HttpService,
    RESTURL, StorageService, $rootScope, $interpolate, $sce, $route, $cordovaToast) {

    $scope.component = {
        colorPicker: {
            method: {
                showModal: function (field, mode, callback) {
                    $scope.component.colorPicker.mode = mode || false;
                    $scope.component.colorPicker.callback = callback || null;
                    $scope.component.colorPicker.field = field;
                    activeModal = document.querySelector('ons-modal#color-picker');
                    activeModal.show();
                },
                selectBaseColor: function (color) {
                    $scope.component.colorPicker.selectedBaseColor = color;
                },
                selectColor: function (diff, number) {
                    var finalColor = $scope.component.colorPicker.selectedBaseColor;
                    if (number > 0) {
                        finalColor += " " + diff + "-" + number;
                    }
                    $scope.component.colorPicker.selectedColor = finalColor;
                    console.log(finalColor);
                },
                chooseThisColor: function () {
                    if (!$scope.component.colorPicker.mode) {
                        $scope.cardData[$scope.component.colorPicker.field]['class'] = $scope.component.colorPicker.selectedColor;
                    } else {
                        $scope.component.colorPicker.callback($scope.component.colorPicker.selectedColor);
                    }
                    $scope.component.colorPicker.selectedBaseColor = null;
                    $scope.component.colorPicker.selectedColor = null;
                    $scope.component.colorPicker.mode = null;
                    $scope.component.colorPicker.callback = null;
                    activeModal = document.querySelector('ons-modal#color-picker');
                    activeModal.hide();
                    $scope.dataChange();
                },
                backToBaseColors: function () {
                    $scope.component.colorPicker.selectedBaseColor = null;
                    $scope.component.colorPicker.selectedColor = null;
                },
                cancel: function () {
                    $scope.component.colorPicker.selectedBaseColor = null;
                    $scope.component.colorPicker.selectedColor = null;
                    activeModal = document.querySelector('ons-modal#color-picker');
                    activeModal.hide();
                    $scope.dataChange();
                }
            },
            baseColors: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal',
                'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey',
                'blue-grey', 'black', 'white', 'transparent'
            ],
            callback: null,
            mode: false,
            maxDarken: 4,
            maxLighten: 5,
            maxAccent: 4,
            selectedBaseColor: null,
            selectedColor: null
        },
        iconPicker: {
            method: {
                showModal: function (field) {
                    console.log(field);
                    $scope.component.iconPicker.field = field;
                    activeModal = document.querySelector('ons-modal#icon-picker');
                    activeModal.show();
                },
                selectedIcon: function (icon) {
                    console.log(icon);
                    $scope.component.iconPicker.selectedIcon = icon;
                },
                chooseThisIcon: function () {
                    $scope.cardData[$scope.component.iconPicker.field]['icon'] = $scope.component.iconPicker.selectedIcon;
                    $scope.component.iconPicker.selectedIcon = null;
                    console.log($scope.cardData[$scope.component.iconPicker.field]);
                    activeModal = document.querySelector('ons-modal#icon-picker');
                    activeModal.hide();
                    $scope.dataChange();
                },
                cancel: function () {
                    $scope.component.iconPicker.selectedIcon = null;
                    activeModal = document.querySelector('ons-modal#icon-picker');
                    activeModal.hide();
                    $scope.dataChange();
                }
            },
            selectedIcon: null,
            icons: ['fa-home', 'fa-list', 'fa-star', 'fa-user', 'fa-film', 'fa-align-justify', 'fa-stop', 'fa-glass', 'fa-music', 'fa-envelope-o', 'fa-star-o', 'fa-th', 'fa-th-large', 'fa-check', 'fa-times',
                'fa-search-plus', 'fa-search-minus', 'fa-power-off', 'fa-signal', 'fa-cog', 'fa-trash-o', 'fa-file-o', 'fa-clock-o', 'fa-download', 'fa-arrow-circle-o-down', 'fa-arrow-circle-o-up', 'fa-inbox',
                'fa-play-circle-o', 'fa-refresh', 'fa-list-alt', 'fa-lock', 'fa-flag', 'fa-headphones', 'fa-volume-off', 'fa-volume-down', 'fa-volume-up', 'fa-qrcode', 'fa-barcode', 'fa-tags', 'fa-book', 'fa-bookmark', 'fa-print', 'fa-camera', 'fa-map-marker', 'fa-pencil', 'fa-adjust', 'fa-tint', 'fa-arrows', 'fa-forward', 'fa-fast-forward', 'fa-step-forward',
                'fa-plus-circle', 'fa-minus-circle', 'fa-times-circle', 'fa-check-circle', 'fa-question-circle', 'fa-info-circle', 'fa-crosshairs', 'fa-times-circle-o', 'fa-check-circle-o', 'fa-ban', 'fa-asterisk', 'fa-exclamation-circle', 'fa-gift',
                'fa-leaf', 'fa-fire', 'fa-eye', 'fa-facebook', 'fa-twitter', 'fa-phone-square', 'fa-square-o', 'fa-github'
            ]
        },
        textFormatter: {
            //For building component Modal
            method: {
                toggleTexts: function (textFormattingKey) {
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting[textFormattingKey] = !$scope.cardData[$scope.component.textFormatter.field].textFormatting[textFormattingKey];
                },
                applyFormat: function (textFormattingKey, value) {
                    console.log(value);
                    console.log(textFormattingKey);
                    switch (textFormattingKey) { //bold, true
                        case 'fontSize':
                        case 'fontStyle':
                        case 'color':
                        case 'bgColor':
                            $scope.cardData[$scope.component.textFormatter.field].textFormatting[textFormattingKey] = value;
                            break;
                    }
                },
                apply: function () {
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes = "";
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes += $scope.cardData[$scope.component.textFormatter.field].textFormatting.bold ? ' strong' : '';
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes += $scope.cardData[$scope.component.textFormatter.field].textFormatting.italic ? ' text-italic' : '';
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes += $scope.cardData[$scope.component.textFormatter.field].textFormatting.underline ? ' text-underline' : '';
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                    console.log($scope.cardData);
                },
                textColor: function () {
                    //Close this modal. Open New Modal for Color Picker
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                    $scope.component.colorPicker.method.showModal($scope.component.textFormatter.field, true, function (color) {
                        var color = color.split(" "); //red accent-1
                        var baseColor = color[0] + "-text";
                        if (color.length > 1) {
                            var mainColor = baseColor + " text-" + color[1];
                        }
                        $scope.component.textFormatter.method.applyFormat('color', mainColor);
                        activeModal = document.querySelector('ons-modal#textFormatter');
                        activeModal.show();
                    });
                },
                bgColor: function () {
                    //Close this modal. Open New Modal for Color Picker
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                    $scope.component.colorPicker.method.showModal($scope.component.textFormatter.field, true, function (bgColor) {
                        var bgColor = bgColor.split(" "); //red accent-1
                        var baseColor = bgColor[0];
                        if (bgColor.length > 1) {
                            var bgMainColor = baseColor + " " + bgColor[1];
                        }
                        $scope.component.textFormatter.method.applyFormat('bgColor', bgMainColor);
                        activeModal = document.querySelector('ons-modal#textFormatter');
                        activeModal.show();
                    });
                },
                showModal: function (field) {
                    console.log(field);
                    $scope.component.textFormatter.field = field;
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.show();
                },
                cancel: function () {
                    $scope.component.textFormatter.selectedText = null;
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                }
            },
            selectedFontSize: null,
            selectedFontStyle: null,
            fontSize: ['x-small', 'small', 'medium', 'normal', 'large', 'x-large'],
            fontStyle: ['Georgia, serif', 'sans-serif', 'serif', 'cursive', 'monospace', 'fantasy'],
            bgColor: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal',
                'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey',
                'blue-grey', 'black', 'white', 'transparent'
            ],
            color: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal',
                'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey',
                'blue-grey', 'black', 'white', 'transparent'
            ],
            maxDarken: 4,
            maxLighten: 5,
            maxAccent: 4,
        }
    };

    $scope.init = function () {
        $rootScope.clearPageHistory();
        $rootScope.addPage('/ownCards');
        var url = RESTURL + "/visiting-card/" + $routeParams.vc_id;
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.visibilityStatus = response.data.visibility;
            $scope.cardData = {}; //Rendered Card Data
            $scope.templateData = response.data._templateId.template;
            $scope.cardField = response.data._templateId.fields;
            for (name in response.data.data) {
                $scope.cardData[response.data.data[name].name] = {};
                switch (response.data.data[name].format) {
                    case 'element':
                        $scope.cardData[response.data.data[name].name]['element'] = response.data.data[name].element;
                        $scope.cardData[response.data.data[name].name]['class'] = response.data.data[name].class;
                        $scope.cardData[response.data.data[name].name]['style'] = response.data.data[name].style;
                        $scope.cardData[response.data.data[name].name]['format'] = response.data.data[name].format;
                        $scope.cardData[response.data.data[name].name]['displayName'] = response.data.data[name].displayName;
                        $scope.cardData[response.data.data[name].name]['name'] = response.data.data[name].name;
                        break;
                    case 'imgUpload':
                        $scope.cardData[response.data.data[name].name]['element'] = response.data.data[name].element;
                        $scope.cardData[response.data.data[name].name]['class'] = response.data.data[name].class;
                        $scope.cardData[response.data.data[name].name]['style'] = response.data.data[name].style;
                        $scope.cardData[response.data.data[name].name]['format'] = response.data.data[name].format;
                        $scope.cardData[response.data.data[name].name]['displayName'] = response.data.data[name].displayName;
                        $scope.cardData[response.data.data[name].name]['name'] = response.data.data[name].name;
                        $scope.cardData[response.data.data[name].name]['src'] = response.data.data[name].src;
                        $scope.cardData[response.data.data[name].name]['visible'] = response.data.data[name].visible;
                        break;
                    case 'qrcode':
                        $scope.cardData[response.data.data[name].name]['element'] = response.data.data[name].element;
                        $scope.cardData[response.data.data[name].name]['class'] = response.data.data[name].class;
                        $scope.cardData[response.data.data[name].name]['style'] = response.data.data[name].style;
                        $scope.cardData[response.data.data[name].name]['displayName'] = response.data.data[name].displayName;
                        $scope.cardData[response.data.data[name].name]['src'] = response.data.data[name].src;
                        $scope.cardData[response.data.data[name].name]['visible'] = response.data.data[name].visible;
                        $scope.cardData[response.data.data[name].name]['format'] = response.data.data[name].format;
                        $scope.cardData[response.data.data[name].name]['name'] = response.data.data[name].name;
                        break;
                    case 'text':
                        $scope.cardData[response.data.data[name].name]['class'] = response.data.data[name].class;
                        $scope.cardData[response.data.data[name].name]['style'] = response.data.data[name].style;
                        $scope.cardData[response.data.data[name].name]['format'] = response.data.data[name].format;
                        $scope.cardData[response.data.data[name].name]['displayName'] = response.data.data[name].displayName;
                        $scope.cardData[response.data.data[name].name]['name'] = response.data.data[name].name;
                        $scope.cardData[response.data.data[name].name]['visible'] = response.data.data[name].visible;
                        $scope.cardData[response.data.data[name].name]['value'] = response.data.data[name].value;
                        if (response.data.data[name].icon) {
                            $scope.cardData[response.data.data[name].name]['icon'] = response.data.data[name].icon;
                        }
                        if (response.data.data[name].textFormatting) {
                            $scope.cardData[response.data.data[name].name].textFormatting = {
                                classes: response.data.data[name].textFormatting.classes,
                                bold: response.data.data[name].textFormatting.bold,
                                italic: response.data.data[name].textFormatting.italic,
                                underline: response.data.data[name].textFormatting.underline,
                                color: response.data.data[name].textFormatting.color,
                                bgColor: response.data.data[name].textFormatting.bgColor,
                                fontsize: response.data.data[name].textFormatting.fontsize,
                                fontStyle: response.data.data[name].textFormatting.fontStyle
                            }
                        }
                        break;
                }
                $scope.data = $interpolate($scope.templateData)($scope);
                $scope.template_data = $sce.trustAsHtml($scope.data);
            }
        }, function (error) {
            console.log(error);
        })
    }

    $scope.dataChange = function () {
        $scope.data = $interpolate($scope.templateData)($scope);
        $scope.template_data = $sce.trustAsHtml($scope.data);
    }

    $scope.imgUpload = function (field) {
        // $scope.cardData[field]['src'] = 'https://table19media.com/wp-content/uploads/2017/09/generic-logo.png';
        // $scope.dataChange();
        navigator.camera.getPicture(function (imageData) {
            $scope.cardData[field]['src'] = imageData.replace(/\?.*$/g, "");
            $scope.dataChange();
        }, function (err) {
            console.log(err);
            activeModal = document.querySelector('ons-modal#eventImageModal');
            activeModal.hide();
            //$cordovaToast.showShortBottom('Error Happened');
        }, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.FILE_URI,
                allowEdit: true,
                targetWidth: 800,
                targetHeight: 450
            });
    }

    $scope.toggleVisible = function (field) {
        $scope.cardData[field]['visible'] = !$scope.cardData[field]['visible'];
        $scope.cardData[field]['class'] = $scope.cardData[field]['visible'] ? "" : " opacity-hidden ";
        $scope.dataChange();
    }

    $scope.selectOrg = function (data) {
        $scope.cardData[field]['value'] = data;
        $scope.dataChange();
    }

    $scope.updateVisitingCard = function (data) {
        $rootScope.src = data.logo.src;
        var cardData = {
            data: data
        }
        console.log(cardData);
        var url = RESTURL + "/visiting-card/" + $routeParams.vc_id;
        HttpService.put(url, cardData, function (response) {
            var visitingCardId = response.data;
            var user_token = StorageService.get('switchXAuth');
            var options = new FileUploadOptions();
            options.chunkedMode = false;
            options.fileKey = "file";
            options.fileName = $rootScope.src;
            options.mimeType = "image/jpeg";
            options.params = {
                visitingCardId: visitingCardId
            };
            var ft = new FileTransfer();
            var IMGUPLOADURL = RESTURL + '/visiting-card/photoUpload/' + visitingCardId + '/' + user_token;
            ft.upload($rootScope.src, encodeURI(IMGUPLOADURL), function (res) {
                $route.reload();
                $cordovaToast.showShortBottom('Visiting Card Updated');
                delete $rootScope.src;
            }, function (err) {
                console.log(err);
                $route.reload();
                $cordovaToast.showShortBottom('Visiting Card Updated');
            }, options);
        }, function (error) {
            $cordovaToast.showShortBottom('Some Error Happened');
        })
    }
})