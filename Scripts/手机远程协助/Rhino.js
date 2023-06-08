
//这里的代码不确定有效，先删掉，仅供参考，实际是下面的加壳hook方式有效果
// XposedBridge.hookAllMethods(XposedHelpers.findClass('com.cjtec.remoteassis.bean.UserTime',runtime.classLoader),'getRemaining_time',XC_MethodHook({
//     beforeHookedMethod: function (param) {
//         param.setResult('9999999');
//     }
// }));

// XposedBridge.hookAllMethods(XposedHelpers.findClass('com.cjtec.remoteassis.App',runtime.classLoader),'p',XC_MethodHook({
//     beforeHookedMethod: function (param) {
//         param.setResult(true);
//     }
// }));

// XposedBridge.hookAllMethods(XposedHelpers.findClass('com.cjtec.remoteassis.bean.UserInfo',runtime.classLoader),'getVipendtime',XC_MethodHook({
//     beforeHookedMethod: function (param) {
//         param.setResult('永不过期啦');
//     }
// }));

// XposedBridge.hookAllMethods(XposedHelpers.findClass('com.cjtec.remoteassis.App',runtime.classLoader),'q',XC_MethodHook({
//     beforeHookedMethod: function (param) {
//         param.setResult(true);
//     }
// }));



//下面是加壳的hook方式
XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
    afterHookedMethod: function (param) {
        var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
        var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
        var UserTime = XposedHelpers.findClass('com.cjtec.remoteassis.bean.UserTime', classLoader);
        XposedBridge.hookAllMethods(XposedHelpers.findClass('com.test.test', runtime.classLoader), 'method', XC_MethodHook({
            beforeHookedMethod: function (param) {
                param.setResult(java.lang.Integer.valueOf('9999999'));
            }
        }));

    }
}));

