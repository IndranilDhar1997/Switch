### Setting Up

#> cordova create switchApp com.businesscards.www SwitchBusinessCards
#> cordova platform add android
#> cordova platform add ios //Not added right now
#> cordova clean
#> cordova build

### Add SQLITE Plugin

#> git clone https://github.com/litehelpers/Cordova-sqlite-storage.git
#> cordova -d plugin add .\cordova-sqlite-storage --save

### QR Code Plugin

#> cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner.git --save

### Social Logins    

More details on: http://ngcordova.com/docs/plugins/oauth/

#> cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser.git --save

### Multidex

Install this to make facebook plugin work!

#> cordova -d plugin add .\cordova-plugin-enable-multidex --save


#### Switch Business Cards API Keys ####

### Xwards Google Account ###

## GOOGLE Login API Key for Browser ##

cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.913996107260-b6b0f6cg1i0odm7ekhco5p7eqih1bi0b --variable WEB_APPLICATION_CLIENT_ID=913996107260-b6b0f6cg1i0odm7ekhco5p7eqih1bi0b.apps.googleusercontent.com


## GOOGLE Login API Key for Android ##

cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.913996107260-c64jpsno38a5kt5g7053tt27202g0miu --variable WEB_APPLICATION_CLIENT_ID=913996107260-c64jpsno38a5kt5g7053tt27202g0miu.apps.googleusercontent.com


## GOOGLE Login API Key for IOS ##

cordova plugin add cordova-plugin-googleplus@7.0.2 --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.913996107260-kvlh4jvn9jt4puv8k6u4kag3utrg1q3c --variable WEB_APPLICATION_CLIENT_ID=913996107260-kvlh4jvn9jt4puv8k6u4kag3utrg1q3c.apps.googleusercontent.com

## Remove Plugin of Google Login

cordova plugin remove cordova-plugin-googleplus