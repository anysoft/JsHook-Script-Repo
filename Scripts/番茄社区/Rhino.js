//感谢xlazl 提供的带壳hook

XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
    beforeHookedMethod: function (param) {
        // console.log('hook before');
        var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
        var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
        var PostList = XposedHelpers.findClass('com.one.tomato.entity.PostList', classLoader);
        var VideoPlayCountUtils = XposedHelpers.findClass('com.one.tomato.utils.post.VideoPlayCountUtils', classLoader);

        XposedBridge.hookAllMethods(PostList, 'isAlreadyPaid', XC_MethodHook({
            beforeHookedMethod: function (param) {
                // console.log('hook before');
                param.setResult(true);
            },
            afterHookedMethod: function (param) {
                console.log('hook after');
            }
        }));
        XposedBridge.hookAllMethods(PostList, 'isFreePlay', XC_MethodHook({
            beforeHookedMethod: function (param) {
                // console.log('hook before');
                param.setResult(true);
            },
            afterHookedMethod: function (param) {
                console.log('hook after');
            }
        }));
    },
    afterHookedMethod: function (param) {
        // console.log('hook after');
    }
}));

