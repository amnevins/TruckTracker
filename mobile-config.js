App.info({
    name: 'Truck Tracker',
    id: 'com.truck.tracker.austin',
    description: 'Find an Ice Cream truck and request a drive by!',
    author: 'Austin Nevins',
    email: 'amnevins@gmail.com',
    website: 'http://www.amnevins.com',
    version: '0.0.1'


});


App.icons({
//     //iOS
//    'iphone_2x': 'resources/icons/iphone_2x_120x120.png',
//    'iphone_3x': 'resources/icons/iphone_3x_180x180.png',
//    'ipad': 'resources/icons/.png',
//    'ipad_2x': 'resources/icons/ipad_2x_152x152.png',
//    'ipad_pro': 'resources/icons/ipad_pro_167x167.png',
//    'ios_settings': 'resources/icons/ios_settings_29x29.png',
//    'ios_settings_2x': 'resources/icons/ios_settings_2x_58x58.png',
//    'ios_settings_3x': 'resources/icons/ios_settings_3x_87x87.png',
//    'ios_spotlight': 'resources/icons/ios_spotlight_40x40.png',
//    'ios_spotlight_2x': 'resources/icons/ios_spotlight_2x_80x80.png',
    //Android
    'android_mdpi': 'resources/icons/tt48x48.png',
    'android_hdpi': 'resources/icons/tt72x72.png',
    'android_xhdpi': 'resources/icons/tt96x96.png',
    'android_xxhdpi': 'resources/icons/tt144x144.png',
    'android_xxxhdpi': 'resources/icons/tt192x192.png'
});

App.launchScreens({
//    //// iOS
//    'iphone_2x': 'resources/splash/iphone_2x_640x960.png',
//    'iphone5': 'resources/splash/iphone5_640x1136.png',
//    'iphone6': 'resources/splash/iphone6_750x1334.png',
//    'iphone6p_portrait': 'resources/splash/iphone6p_portrait_1242x2208.png',
//    'iphone6p_landscape': 'resources/splash/iphone6p_landscape_2208x1242.png',
//    'ipad_portrait': 'resources/splash/ipad_portrait_768x1024.png',
//    'ipad_portrait_2x': 'resources/splash/ipad_portrait_2x_1536x2048.png',
//    'ipad_landscape': 'resources/splash/ipad_landscape_1024x768.png',
//    'ipad_landscape_2x': 'resources/splash/ipad_landscape_2x_2048x1536.png',


    //Android
    'android_mdpi_portrait': 'resources/splash/android_mdpi_portrait_320x470.png',
    'android_mdpi_landscape': 'resources/splash/android_mdpi_landscape_470x320.png',
    'android_hdpi_portrait': 'resources/splash/android_hdpi_portrait_480x640.png',
    'android_hdpi_landscape': 'resources/splash/android_hdpi_landscape_640x480.png',
    'android_xhdpi_portrait': 'resources/splash/android_xhdpi_portrait_720x960.png',
    'android_xhdpi_landscape': 'resources/splash/android_xhdpi_landscape_960x720.png',
    'android_xxhdpi_portrait': 'resources/splash/android_xxhdpi_portrait_1080x1440.png',
    'android_xxhdpi_landscape': 'resources/splash/android_xxhdpi_landscape_1440x1080.png'
});

App.setPreference('AutoHideSplashScreen', 'true');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference("AndroidLaunchMode", "singleTask");
