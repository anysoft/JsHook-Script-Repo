// 不要直接运行该脚本

// 针对加壳 app 获取真实 classloader
var activityThreadClass = XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader);
XposedBridge.hookAllMethods(activityThreadClass, 'performLaunchActivity', XC_MethodHook({
    afterHookedMethod: function (param) {
        console.log('hook after');
    }
}));


// hookAllMethods
XposedBridge.hookAllMethods(XposedHelpers.findClass('com.test.test', runtime.classLoader), 'method', XC_MethodHook({
    beforeHookedMethod: function (param) {
        console.log('hook before');
    },
    afterHookedMethod: function (param) {
        console.log('hook after');
    }
}));

// hookAllConstructors
XposedBridge.hookAllConstructors(XposedHelpers.findClass('com.test.test', runtime.classLoader), XC_MethodHook({
    beforeHookedMethod: function (param) {
        console.log('hook before');
    },
    afterHookedMethod: function (param) {
        console.log('hook after');
    }
}));

// findAndHookConstructor
XposedHelpers.findAndHookConstructor(XposedHelpers.findClass('com.test.test', runtime.classLoader), 'java.lang.String', 'java.lang.String', XC_MethodHook({
    beforeHookedMethod: function (param) {
        console.log('hook before');
    },
    afterHookedMethod: function (param) {
        console.log('hook after');
    }
}));

// findAndHookMethods 
XposedHelpers.findAndHookMethods(XposedHelpers.findClass('com.test.test', runtime.classLoader), 'method', 'java.lang.String', 'java.lang.String', XC_MethodHook({
    beforeHookedMethod: function (param) {
        console.log('hook before');
    },
    afterHookedMethod: function (param) {
        console.log('hook after');
    }
}));

// findAndHookMethods replaceHookedMethod
XposedHelpers.findAndHookMethods(XposedHelpers.findClass('com.test.test', runtime.classLoader), 'method', 'java.lang.String', 'java.lang.String', XC_MethodReplacement({
    replaceHookedMethod: function (param) {
        console.log('hook');
        return XposedBridge.invokeOriginalMethod(param.method, param.thisObject, param.args);
    }
}));




// demo
XposedBridge.hookConstructor(XposedHelpers.findClass('java.net.URL', runtime.classLoader), ['java.lang.String'], XC_MethodHook({
    beforeHookedMethod: function (param) {
        var url = param.args[0];
        global.toast(url);
        console.log('java.net.URL: ' + url);
    }
}));