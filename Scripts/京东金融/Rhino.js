var packageName = runtime.packageName;

if (packageName == 'com.jd.jrapp') {
    // 
    console.log("init jrapp")
    XposedBridge.hookAllMethods(XposedHelpers.findClass('com.wangyin.platform.CryptoUtils', runtime.classLoader), 'encodeDataToServer', XC_MethodHook({
        beforeHookedMethod: function (param) {
            var args = param.args;
            if (args.length == 2) {
                console.log(args[0]);
                console.log(args[1]);
            }
        }
    }));
}
