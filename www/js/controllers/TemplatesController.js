//import { Key } from "selenium-webdriver";

myApp.controller("TemplatesController", function ($scope, $location, HttpService, RESTURL, $rootScope) {
	var login = {};
	$scope.template = [];
	$scope.fields = [];
	$scope.templatePhotos = [];

	$scope.init = function () {

		$rootScope.clearPageHistory();
		$rootScope.addPage('/ownCards');
		var url = RESTURL + "/visiting-card/getTemplatePhotos";
		HttpService.get(url, function (response) {
			console.log(response.data);
			$scope.templatePhotos = response.data;
		}, function (error) {
			$cordovaToast.showShortBottom('Some Error Happened while fetching!')
		})
	}

	$scope.viewTemplate = function (template_id) {
		console.log(template_id);
		$location.path('/viewTemplate/' + template_id);
	}

})