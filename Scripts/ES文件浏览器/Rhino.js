var packageName = runtime.packageName

function printStack() {
    throwable = new java.lang.Throwable();
    stackTraceElements = throwable.getStackTrace();
    if (stackTraceElements != null) {
        stackTraceElements.forEach(element => {
            console.log(gson.toJson(element));
        });
    }
}

// package 
if (packageName == 'com.estrongs.android.pop') {

    var class_account_info = 'com.estrongs.android.pop.app.account.model.AccountInfo';
    var nick_name = '👑终身会员👑';
    var head_image = 'https://pic.616pic.com/ys_b_img/00/03/79/autxAFXybE.jpg';
    var vip_time = java.lang.Long.valueOf(4070880000000);
    var is_vip = true;
    var user_id = java.lang.Long.valueOf(10000);

    var mod_vip_time = true;
    var mod_nick_name = true;
    var mod_head_image = true;
    var mod_user_id = false;


    // get classloader
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
            gsonClass = XposedHelpers.findClass('com.google.gson.Gson', classLoader);
            gson = gsonClass.newInstance();

            // hook method 
            // 打印堆栈
            // XposedBridge.hookAllMethods(XposedHelpers.findClass("com.google.gson.internal.LinkedTreeMap", classLoader), "get", XC_MethodHook({
            //     beforeHookedMethod: function (param) {
            //         if (param.args[0].getClass().toString() == 'class java.lang.String' && param.args[0] == '7129038755796618278') {
            //             printStack();
            //             count++;
            //             console.log(count)
            //         }
            //     }
            // }));



            // // USERINFO
            // XposedBridge.hookAllConstructors(XposedHelpers.findClass(class_account_info, classLoader), XC_MethodHook({
            //     beforeHookedMethod: function (param) {
            //         console.log(param.args.length)
            //     }
            // }));

            if (mod_vip_time) {
                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'getIsVip', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.setResult(true);
                    }
                }));

                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'setIsVip', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.args[0] = true;
                    }
                }));


                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'getVipFinishAt', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.setResult(vip_time);
                    }
                }));

                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'setVipFinishAt', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.args[0] = vip_time;
                    }
                }));
            }
            if (mod_nick_name) {
                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'getNickName', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.setResult(nick_name);
                    }
                }));

                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'setNickName', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.args[0] = nick_name;
                    }
                }));
            }

            if (mod_user_id) {
                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'getUserId', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.setResult(user_id);
                    }
                }));

                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'setUserId', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.args[0] = user_id;
                    }
                }));
            }

            if (mod_head_image) {
                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'getHeadImgUrl', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.setResult(head_image);
                    }
                }));

                // hookAllMethods
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_account_info, runtime.classLoader), 'setHeadImgUrl', XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        param.args[0] = head_image;
                    }
                }));
            }

        }

    }));
}
