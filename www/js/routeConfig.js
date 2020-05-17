myApp.config(["$routeProvider", function ($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "views/NotLoggedIn/login.html",
            controller: "AuthenticateController",
            middleware: ['routeAuth']
        }).when("/login", {
            templateUrl: "views/NotLoggedIn/login.html",
            controller: "AuthenticateController",
            middleware: ['routeAuth']
        }).when("/signup", {
            templateUrl: "views/NotLoggedIn/register.html",
            controller: "AuthenticateController"
        }).when("/forgotPassword", {
            templateUrl: "views/NotLoggedIn/forgotPassword.html",
            controller: "AuthenticateController"
        }).when("/sendEmail", {
            templateUrl: "views/NotLoggedIn/sendEmail.html",
            controller: "AuthenticateController"
        }).when("/submitOTP", {
            templateUrl: "views/NotLoggedIn/newPassword.html",
            controller: "AuthenticateController"
        })


        .when("/t&c", {
            templateUrl: "views/NotLoggedIn/terms-and-condition.html",
        }).when("/p&p", {
            templateUrl: "views/NotLoggedIn/p&p.html",
        })
        
        .when("/new-user/first-slider", {
            templateUrl: "views/NotLoggedIn/intro-slider/first-slider.html",
            controller: "SliderController"
        }).when("/new-user/second-slider", {
            templateUrl: "views/NotLoggedIn/intro-slider/second-slider.html",
            controller: "SliderController"
        }).when("/new-user/third-slider", {
            templateUrl: "views/NotLoggedIn/intro-slider/third-slider.html",
            controller: "SliderController"
        })

        .when("/dashboard", {
            templateUrl: "views/LoggedIn/Dashboard/dashboard.html",
            controller: "DashboardController"
        }).when("/contactus", {
            templateUrl: "views/LoggedIn/ContactUs/contactus.html",
            controller: "DashboardController"
        }).when("/aboutus", {
            templateUrl: "views/LoggedIn/AboutUs/aboutus.html",
            controller: "DashboardController"
        }).when("/profile", {
            templateUrl: "views/LoggedIn/Profile/profile.html",
            controller: "ProfileController"
        }).when("/qrcodeGenerator/:qrcode", {
            templateUrl: "views/LoggedIn/Owncard/qrcodeGenerator.html",
            controller: "DashboardController"
        }).when("/view-scanned-card/:qrcode", {
            templateUrl: "views/LoggedIn/ScannedCard/get-scanned-card.html",
            controller: "ScanCardController"
        }).when('/ownCards', {
            templateUrl: "views/LoggedIn/OwnCard/ownCard.html",
            controller: "OwnCardController"
        }).when("/view-my-cards/:dropboxCode", {
            templateUrl: "views/LoggedIn/DropboxCard/SendDropboxCard.html",
            controller: "SendDropboxCardController"
        }) 

        .when("/search", {
            templateUrl: "views/LoggedIn/Search/search.html",
            controller: "SearchController"
        }).when("/search_profile/:searchId", {
            templateUrl: "views/LoggedIn/Search/searchedProfile.html"
        })

        .when("/templateList", {
            templateUrl: "views/LoggedIn/VisitingCard/templateList.html",
            controller: "TemplatesController"
        }).when("/viewTemplate/:template_id", {
            templateUrl: "views/LoggedIn/VisitingCard/createVisitingCard.html",
            controller: "VisitingCardController"
        }).when("/editVisitingCard/:vc_id", {
            templateUrl: "views/LoggedIn/VisitingCard/editVisitingCard.html",
            controller: "EditVisitingCardController"
        })

        .when("/notifications", {
            templateUrl: "views/LoggedIn/Notification/notifications.html",
            controller: "NotificationController"
        }).when("/upcomingEvents", {
            templateUrl: "views/LoggedIn/UpcomingEvents/upcomingEvents.html",
            controller: "UpcomingEventsController"
        })

        .when("/premium", {
            templateUrl: "views/LoggedIn/Premium/premium.html",
            controller: "PremiumController"
        }).when("/payment/:payment_amount", {
            templateUrl: "views/LoggedIn/Premium/payment.html",
            controller: "PremiumController"
        })

        .when("/events", {
            templateUrl: "views/LoggedIn/Events/events.html",
            controller: "ViewEventController"
        }).when("/addEvent", {
            templateUrl: "views/LoggedIn/Events/createEvent.html",
            controller: "AddEventController"
        }).when("/edit_event/:event_id", {
            templateUrl: "views/LoggedIn/Events/edit-event.html",
            controller: "EditEventController"
        })

        .when("/organizations", {
            templateUrl: "views/LoggedIn/Organizations/viewOrganizations.html",
            controller: "ViewOrganizationController"
        }).when("/addOrganization", {
            templateUrl: "views/LoggedIn/Organizations/addOrganization.html",
            controller: "AddOrganizationController"
        }).when("/edit-organization/:organization_id", {
            templateUrl: "views/LoggedIn/Organizations/editOrganizations.html",
            controller: "EditOrganizationController"
        })

        .when("/cardHolderPage", {
            templateUrl: "views/LoggedIn/CardHolders/cardHolder.html",
            controller: "CardHolderController"
        }).when('/acceptedCards/:cardHolderId', {
            templateUrl: "views/LoggedIn/CardHolders/acceptedCards.html",
            controller: "AcceptedCardController"
        }).when('/displayQRCode/:qrCode', {
            templateUrl: "views/LoggedIn/CardHolders/displayQRCode.html",
            controller: "CardHolderController"
        })
}])