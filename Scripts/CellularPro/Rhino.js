var packageName = runtime.packageName
if (packageName == 'make.more.r2d2.cellular_pro') {
    //谷歌商店1.5.2版本
    var activityThreadClass = XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader);
    XposedBridge.hookAllMethods(activityThreadClass, 'performLaunchActivity', XC_MethodHook({
        afterHookedMethod: function (param) {
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
            var a = XposedHelpers.findClass('make.more.r2d2.cellular_pro.vip.VipUtil', classLoader);
            var b = XposedHelpers.findClass('make.more.r2d2.cellular_pro.activity.MonitorActivity', classLoader);

            XposedBridge.hookAllMethods(a, 'K', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    param.setResult(java.lang.Boolean.valueOf('true'));
                }
            }));

            XposedBridge.hookAllConstructors(b, XC_MethodHook({

                afterHookedMethod: function (param) {
                    XposedHelpers.setStaticObjectField(a, 'M', java.lang.Integer.valueOf('4'));
                }
            }));

        }
    }));


}
