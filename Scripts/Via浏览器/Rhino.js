var packageName = runtime.packageName

if (packageName == 'mark.via') {

    XposedBridge.hookAllMethods(XposedHelpers.findClass('i.a.p.c.a', runtime.classLoader), 's', XC_MethodHook({
        afterHookedMethod: function (param) {
            return;
        }
    }));
}
