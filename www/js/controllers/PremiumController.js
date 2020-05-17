myApp.controller("PremiumController", function ($scope, $location, StorageService, RESTURL,
    $routeParams, $rootScope, HttpService) {

    var login = {};

    $scope.init = function () {
        $rootScope.clearPageHistory();
        //Dashboard
        $rootScope.addPage('/dashboard');
        login.user = JSON.parse(StorageService.get('switchLoginUser'));
        $scope.userName = login.user.name;
        var url = RESTURL + "/payment/premium-model";
        HttpService.get(url, function (response) {
            console.log(response.data);
            $scope.oneYear = response.data.oneYear;
            $scope.sixMonth = response.data.sixMonth;
            $scope.threeMonth = response.data.threeMonth;
            $scope.oneMonth = response.data.oneMonth;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.openPremiumModal = function () {
        activeModal = document.querySelector('ons-modal#premium');
        activeModal.show();
    }

    $scope.closePremiumModal = function () {
        activeModal = document.querySelector('ons-modal#premium');
        activeModal.hide();
    }

    $scope.payment = function (payment_amount) {
        console.log(payment_amount);
        $rootScope.clearPageHistory();
        $rootScope.addPage('/premium');
        $location.path('/payment/' + payment_amount);
        activeModal = document.querySelector('ons-modal#premium');
        activeModal.hide();
    }

    $scope.gotoPremium = function () {
        $location.path("/premium");
    }

    $scope.braintreePayment = function () {
        var key = null;
        $.ajax({
            method: "GET",
            url: RESTURL + "/payment/checkouts/new",
            headers: {
                "x-auth": StorageService.get('switchXAuth')
            }
        }).done(function (result) {
            // Tear down the Drop-in UI
            //key = result;
            console.log(result);
            braintree.dropin.create({
                // Insert your tokenization key here
                authorization: result.clientToken,
                container: '#dropin-container'
            }, function (createErr, instance) {
                console.log(instance);
                var button = document.querySelector('#submit-button');
                button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                        // When the user clicks on the 'Submit payment' button this code will send the
                        // encrypted payment information in a variable called a payment method nonce
                        var nonce = null;
                        nonce = payload;
                        console.log(nonce);
                        $.ajax({
                            type: 'POST',
                            url: RESTURL + '/payment/checkouts',
                            headers: {
                                "x-auth": StorageService.get('switchXAuth')
                            },
                            data: {
                                'amount': $routeParams.payment_amount,
                                'payment_method_nonce': payload.nonce
                            }
                        }).done(function (result) {
                            // Tear down the Drop-in UI
                            console.log(result);
                            instance.teardown(function (teardownErr) {
                                if (teardownErr) {
                                    console.error('Could not tear down Drop-in UI!');
                                } else {
                                    console.info('Drop-in UI has been torn down!');
                                    // Remove the 'Submit payment' button
                                    $('#submit-button').remove();
                                }
                            });

                            if (result.status = "authorized") {
                                $('#checkout-message').html(
                                    '<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>'
                                );
                            } else {
                                console.log(result);
                                $('#checkout-message').html(
                                    '<h1>Error</h1><p>Check your console.</p>');
                            }
                        });
                    });
                });
            });
        });
    }
})