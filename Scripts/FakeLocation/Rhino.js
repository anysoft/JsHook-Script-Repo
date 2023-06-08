var packageName = runtime.packageName
if (packageName == 'com.lerist.fakelocation') {
    //1.3.1.1(1148)版本
    var activityThreadClass = XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader);
    XposedBridge.hookAllMethods(activityThreadClass, 'performLaunchActivity', XC_MethodHook({
        afterHookedMethod: function (param) {
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
            var a = XposedHelpers.findClass('ށ.ރ.ؠ.ރ.ރ.ވ', classLoader);
            var b = XposedHelpers.findClass('ށ.ރ.ؠ.ؠ.֏', classLoader);

            XposedHelpers.findAndHookConstructor(a, 'android.os.Parcel', XC_MethodHook({
                afterHookedMethod: function (param) {
                    XposedHelpers.setObjectField(param.thisObject, 'proindate', java.lang.Long.valueOf('4787107805000'));
                    XposedHelpers.setObjectField(param.thisObject, 'type', java.lang.Integer.valueOf('1'));
                }
            }));

            XposedHelpers.findAndHookMethods(b, 'ރ', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    param.setResult(java.lang.Boolean.valueOf('true'));
                }
            }));

            XposedHelpers.findAndHookMethods(a, 'getProindate', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    param.setResult(java.lang.Long.valueOf('4787107805000'));
                }
            }));
            XposedHelpers.findAndHookMethods(a, 'getType', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    param.setResult(java.lang.Integer.valueOf('1'));
                }
            }));
        }
    }));

}