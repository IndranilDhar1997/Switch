myApp.controller("VisitingCardController", function($scope, $location, HttpService, RESTURL,
    $routeParams, $interpolate, $sce, $rootScope, $route, StorageService, $cordovaToast) {

    $scope.component = {
        colorPicker: {
            method: {
                showModal: function(field, mode, callback) {
                    $scope.component.colorPicker.mode = mode || false;
                    $scope.component.colorPicker.callback = callback || null;
                    $scope.component.colorPicker.field = field;
                    activeModal = document.querySelector('ons-modal#color-picker');
                    activeModal.show();
                },
                selectBaseColor: function(color) {
                    $scope.component.colorPicker.selectedBaseColor = color;
                },
                selectColor: function(diff, number) {
                    var finalColor = $scope.component.colorPicker.selectedBaseColor;
                    if (number > 0) {
                        finalColor += " " + diff + "-" + number;
                    }
                    $scope.component.colorPicker.selectedColor = finalColor;
                    console.log(finalColor);
                },
                chooseThisColor: function() {
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
                backToBaseColors: function() {
                    $scope.component.colorPicker.selectedBaseColor = null;
                    $scope.component.colorPicker.selectedColor = null;
                },
                cancel: function() {
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
                showModal: function(field) {
                    console.log(field);
                    $scope.component.iconPicker.field = field;
                    activeModal = document.querySelector('ons-modal#icon-picker');
                    activeModal.show();
                },
                selectedIcon: function(icon) {
                    console.log(icon);
                    $scope.component.iconPicker.selectedIcon = icon;
                },
                chooseThisIcon: function() {
                    $scope.cardData[$scope.component.iconPicker.field]['icon'] = $scope.component.iconPicker.selectedIcon;
                    $scope.component.iconPicker.selectedIcon = null;
                    console.log($scope.cardData[$scope.component.iconPicker.field]);
                    activeModal = document.querySelector('ons-modal#icon-picker');
                    activeModal.hide();
                    $scope.dataChange();
                },
                cancel: function() {
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
                toggleTexts: function(textFormattingKey) {
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting[textFormattingKey] = !$scope.cardData[$scope.component.textFormatter.field].textFormatting[textFormattingKey];
                },
                applyFormat: function(textFormattingKey, value) {
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
                apply: function() {
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes = "";
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes += $scope.cardData[$scope.component.textFormatter.field].textFormatting.bold ? ' strong' : '';
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes += $scope.cardData[$scope.component.textFormatter.field].textFormatting.italic ? ' text-italic' : '';
                    $scope.cardData[$scope.component.textFormatter.field].textFormatting.classes += $scope.cardData[$scope.component.textFormatter.field].textFormatting.underline ? ' text-underline' : '';
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                    console.log($scope.cardData);
                },
                textColor: function() {
                    //Close this modal. Open New Modal for Color Picker
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                    $scope.component.colorPicker.method.showModal($scope.component.textFormatter.field, true, function(color) {
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
                bgColor: function() {
                    //Close this modal. Open New Modal for Color Picker
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.hide();
                    $scope.dataChange();
                    $scope.component.colorPicker.method.showModal($scope.component.textFormatter.field, true, function(bgColor) {
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
                showModal: function(field) {
                    console.log(field);
                    $scope.component.textFormatter.field = field;
                    activeModal = document.querySelector('ons-modal#textFormatter');
                    activeModal.show();
                },
                cancel: function() {
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

    $scope.init = function() {

        $rootScope.clearPageHistory();
        $rootScope.addPage('/templateList');
        $scope.template = [];
        $scope.visibility = {};
        HttpService.get(RESTURL + '/visiting-card/getTemplateByPhoto/' + $routeParams.template_id, function(response) {
            //HttpService.get('html.json', function (response) {
            console.log(response.data);
            $scope.cardData = {}; //Rendered Card Data 
            $scope.template = response.data.template; //Template
            $scope.cardField = response.data.fields;
            console.log(response.data);
            $scope.template_id = response.data._id;
            for (field in response.data.fields) {
                $scope.cardData[response.data.fields[field].name] = {};
                switch (response.data.fields[field].format) {

                    case 'element':
                        $scope.cardData[response.data.fields[field].name]['element'] = response.data.fields[field].element;
                        $scope.cardData[response.data.fields[field].name]['class'] = response.data.fields[field].class;
                        $scope.cardData[response.data.fields[field].name]['style'] = response.data.fields[field].style;
                        $scope.cardData[response.data.fields[field].name]['format'] = response.data.fields[field].format;
                        $scope.cardData[response.data.fields[field].name]['displayName'] = response.data.fields[field].displayName;
                        $scope.cardData[response.data.fields[field].name]['name'] = response.data.fields[field].name;
                        break;

                    case 'imgUpload':
                        $scope.cardData[response.data.fields[field].name]['element'] = response.data.fields[field].element;
                        $scope.cardData[response.data.fields[field].name]['class'] = response.data.fields[field].class;
                        $scope.cardData[response.data.fields[field].name]['style'] = response.data.fields[field].style;
                        $scope.cardData[response.data.fields[field].name]['displayName'] = response.data.fields[field].displayName;
                        $scope.cardData[response.data.fields[field].name]['src'] = response.data.fields[field].src;
                        $scope.cardData[response.data.fields[field].name]['visible'] = response.data.fields[field].visible;
                        $scope.cardData[response.data.fields[field].name]['format'] = response.data.fields[field].format;
                        $scope.cardData[response.data.fields[field].name]['name'] = response.data.fields[field].name;
                        break;
                    case 'qrcode':
                        $scope.cardData[response.data.fields[field].name]['element'] = response.data.fields[field].element;
                        $scope.cardData[response.data.fields[field].name]['class'] = response.data.fields[field].class;
                        $scope.cardData[response.data.fields[field].name]['style'] = response.data.fields[field].style;
                        $scope.cardData[response.data.fields[field].name]['displayName'] = response.data.fields[field].displayName;
                        $scope.cardData[response.data.fields[field].name]['src'] = response.data.fields[field].src;
                        $scope.cardData[response.data.fields[field].name]['visible'] = response.data.fields[field].visible;
                        $scope.cardData[response.data.fields[field].name]['format'] = response.data.fields[field].format;
                        $scope.cardData[response.data.fields[field].name]['name'] = response.data.fields[field].name;
                        break;
                    case 'text':
                        $scope.cardData[response.data.fields[field].name]['class'] = response.data.fields[field].class;
                        $scope.cardData[response.data.fields[field].name]['style'] = response.data.fields[field].style;
                        $scope.cardData[response.data.fields[field].name]['displayName'] = response.data.fields[field].displayName;
                        $scope.cardData[response.data.fields[field].name]['value'] = response.data.fields[field].value;
                        $scope.cardData[response.data.fields[field].name]['visible'] = response.data.fields[field].visible;
                        $scope.cardData[response.data.fields[field].name]['format'] = response.data.fields[field].format;
                        $scope.cardData[response.data.fields[field].name]['name'] = response.data.fields[field].name;
                        if (response.data.fields[field].icon) {
                            $scope.cardData[response.data.fields[field].name]['icon'] = response.data.fields[field].icon;
                        }
                        if (response.data.fields[field].textFormatting) {
                            $scope.cardData[response.data.fields[field].name].textFormatting = {
                                classes: response.data.fields[field].textFormatting.classes,
                                bold: response.data.fields[field].textFormatting.bold,
                                italic: response.data.fields[field].textFormatting.italic,
                                underline: response.data.fields[field].textFormatting.underline,
                                color: response.data.fields[field].textFormatting.color,
                                bgColor: response.data.fields[field].textFormatting.bgColor,
                                fontsize: response.data.fields[field].textFormatting.fontsize,
                                fontStyle: response.data.fields[field].textFormatting.fontStyle
                            };
                        }
                        break;
                }
            }
            console.log($scope.cardData);
            $scope.data = $interpolate(response.data.template)($scope);
            $scope.template_data = $sce.trustAsHtml($scope.data);
        }, function(error) {
            console.log(error);
        })
    }

    $scope.dataChange = function(element) {

        $scope.data = $interpolate($scope.template)($scope);
        $scope.template_data = $sce.trustAsHtml($scope.data);
    }


    $scope.saveCardData = function(data) {
        console.log(data);
        $rootScope.src = data.logo.src;
        var templateData = {
            data: data,
            templateId: $scope.template_id
        }
        var url = RESTURL + "/visiting-card/";
        HttpService.post(url, templateData, function(response) {
            console.log(response.data);
            var visitingCardId = response.data;
            var uniqueId = response.data.uniqueId;
            var cardId = response.data._id;
            var user_token = StorageService.get('switchXAuth');
            //options for qrcode
            let qrcodeOptions = {
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
            };
            cordova.plugins.qrcodejs.encode(cardId, uniqueId, (base64EncodedQRImage) => {
                console.log(base64EncodedQRImage)
                var url = RESTURL + '/visiting-card/qrcodeUpload/' + cardId + '/' + user_token;
                var qrcodeBase64 = {
                    qrcode: base64EncodedQRImage
                }
                HttpService.post(url, qrcodeBase64, function() {
                    console.log(response.data);
                }, function(error) {
                    console.log(error);
                })
            }, (err) => {
                console.log('Am outside ft error');
                console.log(err);
            }, qrcodeOptions);

            var options = new FileUploadOptions();
            options.chunkedMode = false;
            options.fileKey = "file";
            options.fileName = $rootScope.src;
            options.mimeType = "image/jpeg";
            options.params = {
                visitingCardId: visitingCardId
            };

            var IMGUPLOADURL = RESTURL + '/visiting-card/photoUpload/' + visitingCardId + '/' + user_token;
            var ft = new FileTransfer();
            ft.upload($rootScope.src, encodeURI(IMGUPLOADURL), function(res) {
                console.log(res);
                $route.reload();
                $cordovaToast.showShortBottom('Visiting Card Created');
                delete $rootScope.src;
            }, function(err) {
                console.log(err);
                $route.reload();;
                $cordovaToast.showShortBottom('Visiting Card Created');
            }, options);
        }, function(error) {
            alert(JSON.stringify(error));
            $cordovaToast.showShortBottom('Some Error Occured');
        })
    }

    $scope.imgUpload = function(field) {
        navigator.camera.getPicture(function(imageData) {
            $scope.cardData[field]['src'] = imageData.replace(/\?.*$/g, "");
            $scope.dataChange();
        }, function(err) {
            activeModal = document.querySelector('ons-modal#eventImageModal');
            activeModal.hide();
            $cordovaToast.showShortBottom('Error Happened');
        }, {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit: true,
            targetWidth: 800,
            targetHeight: 450
        });

    }

    $scope.toggleVisible = function(field) {
        $scope.cardData[field]['visible'] = !$scope.cardData[field]['visible'];
        $scope.cardData[field]['class'] = $scope.cardData[field]['visible'] ? "" : " opacity-hidden ";
        $scope.dataChange();
    }

    $scope.selectOrg = function(data) {
        $scope.cardData[field]['value'] = data;
        $scope.dataChange();
    }
})