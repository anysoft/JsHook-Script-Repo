XposedBridge.hookAllMethods(XposedHelpers.findClass('com.miui.permcenter.privacymanager.g', runtime.classLoader), 'n', XC_MethodHook({
    beforeHookedMethod: function (param) {
        // console.log('hook before');
    },
    afterHookedMethod: function (param) {
        XposedHelpers.callMethod(params.thisObject, 'd', [true,]);
        return XposedBridge.invokeOriginalMethod(param.method, param.thisObject, param.args);
    }
}));


