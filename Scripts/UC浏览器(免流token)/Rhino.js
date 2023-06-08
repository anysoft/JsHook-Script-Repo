// by https://github.com/anysoft
var packageName = runtime.packageName
// package 
if (packageName == 'com.UCMobile') {
    console.log("111");
    // get classloader
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        afterHookedMethod: function (param) {
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
            // hook method 
            console.log("11");
            XposedBridge.hookAllMethods(XposedHelpers.findClass('com.uc.browser.business.freeflow.c.b.a.a', classLoader), 'parseFrom', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    console.log("parseFrom");
                    console.log('args:' + param.args[0].toString());
                    console.log('args:' + com.alibaba.fastjson.JSON.toJSONString(param.args[0]));
                    console.log('args:' + com.alibaba.fastjson.JSON.toJSONString(param.thisObject));
                }
            }));

            // hook method 
            // XposedBridge.hookAllMethods(XposedHelpers.findClass('com.uc.base.data.core.a.c.c',classLoader),'parseFrom',XC_MethodHook({
            //     beforeHookedMethod: function (param) {
            //         console.log('args:' + param.args[0]);
            //         console.log('args:' + com.alibaba.fastjson.JSON.toJSONString(param.args[0]));
            //     }
            // }));



            // hook method 
            XposedBridge.hookAllMethods(XposedHelpers.findClass('com.uc.browser.business.freeflow.c.b.a.c', classLoader), 'getOrderId', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    console.log("getorderid");
                    console.log(param.getResult());
                    // console.log('args:' + param.args[0]);
                    // console.log('args:' + com.alibaba.fastjson.JSON.toJSONString(param.args[0]));
                    // console.log(param.thisObject);
                    console.log('getOrderId:' + com.alibaba.fastjson.JSON.toJSONString(param.thisObject));
                }
            }));

            // hook method 
            XposedBridge.hookAllMethods(XposedHelpers.findClass('com.uc.base.secure.EncryptHelper', classLoader), 'decrypt', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log('args:' + param.args[0]);
                    // console.log('args:' + com.alibaba.fastjson.JSON.toJSONString(param.args[0]));
                    if (param.args.length > 1) return;
                    console.log("EncryptHelper")
                    // console.log(param.args[0]);
                    console.log(new java.lang.String(param.getResult()));

                    // console.log(param.thisObject);
                    console.log('args:' + com.alibaba.fastjson.JSON.toJSONString(param.thisObject));
                    console.log('args:' + new org.json.JSONObject('{"a":"b"}').toString());
                }
            }));
        }
    }));

}
