/**
 * This is local storage service used to store data to local storage
 */
myApp.service("StorageService", function() {
    var storage = null;
    //Load local storage on first initialization
    (function() {
        storage = window.localStorage;
    })();
    
    var get = function (key) {
        return storage.getItem(key);
    };

    var save = function (key, value) {
        storage.setItem(key, value);
    };

    var unset = function (key) {
        storage.removeItem(key);
    }

	return {
        get: get,
        save: save,
        unset: unset
	};
});
