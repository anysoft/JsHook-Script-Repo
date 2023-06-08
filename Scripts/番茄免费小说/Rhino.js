// by https://github.com/anysoft
var packageName = runtime.packageName

count = 0;
bookId = '';
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
if (packageName == 'com.dragon.read') {

    var class_userinfo = 'com.dragon.read.user.k'
    var class_download_book = 'com.dragon.read.reader.download.c'
    var class_user_downlaod_book_list = 'com.dragon.read.user.e'
    var class_app_toast_utils = 'com.dragon.read.util.ToastUtils'

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

            // 打印堆栈
            XposedBridge.hookAllMethods(XposedHelpers.findClass(class_app_toast_utils, classLoader), "showCommonToast", XC_MethodHook({
                beforeHookedMethod: function (param) {
                    if (param.args[0].getClass().toString() == 'class java.lang.String') {
                        printStack()
                    }
                }
            }));


            // 下载
            XposedBridge.hookAllMethods(XposedHelpers.findClass(class_user_downlaod_book_list, classLoader), "v", XC_MethodHook({
                beforeHookedMethod: function (param) {
                    if (param.args[0].getClass().toString() == 'class java.lang.String') {
                        kvCacheMgr = XposedHelpers.findClass('com.dragon.read.local.KvCacheMgr', classLoader).newInstance();
                        c = kvCacheMgr.getPrivate(XposedHelpers.findClass('com.dragon.read.app.App', classLoader).newInstance().context(), "kv_new_user_free_privilege");
                        e = param.thisObject;

                        // local_offline_reading 
                        // {"expire_time":1674887902403,"from":1,"id":"local_offline_reading","is_forever":0,"left_time":5400,"offline_read_books":{"7129038755796618278":{"book_id":"7129038755796618278","left_time":5400},"6959085138101668900":{"book_id":"6959085138101668900","left_time":5400}},"l":0}
                        privilegeInfoModel = e.s();
                        // expire_time
                        privilegeInfoModel.b = java.lang.System.currentTimeMillis() + 30 * 60 * 1000;
                        // left_time
                        privilegeInfoModel.h = java.lang.Long.valueOf(30 * 60 * 1000);
                        // offline_read_books
                        offlineReadBookClass = XposedHelpers.findClass('com.dragon.read.user.model.PrivilegeInfoModel.OfflineReadBook', classLoader);
                        str = '{"book_id":"' + bookId + '","left_time":' + privilegeInfoModel.h + '}';
                        offlineReadBook = gson.fromJson(str, offlineReadBookClass);
                        privilegeInfoModel.j.put(bookId, offlineReadBook);


                        // global.toast('12');
                        // console.log(gson.toJson(e.s()));


                        // global.toast(c.getBoolean("key_has_update_download_count", false));
                        // global.toast(c.getInt("key_free_download_count", 0));
                        // global.toast(e.getClass().toString());

                        // c.edit().putBoolean("key_has_update_download_count", true).apply();
                        // c.edit().putInt("key_free_download_count", 100).apply();

                        // printStack();
                        // console.log(param.getResult());
                        // console.log('111111');
                        // param.setResult(true);
                        // return true;
                    }
                }
            }));

            // 获取bookId
            XposedBridge.hookAllMethods(XposedHelpers.findClass(class_download_book, classLoader), 'a', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log('hook before');
                    // global.toast(param.args.length + '--' + param.args[0]);
                    if (param.args.length == 9) {
                        bookId = param.args[0];
                        // global.toast(bookId);
                    }
                },
                afterHookedMethod: function (param) {
                    // console.log('hook after');
                }
            }));



            // USERINFO
            XposedBridge.hookAllConstructors(XposedHelpers.findClass(class_userinfo, classLoader), XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log(param.args.length)
                    if (param.args.length == 2) {
                        // console.log(gson.toJson(param.args[0]));
                        // console.log(gson.toJson(param.args[1]));
                        var infoResponse = param.args[1];
                        // define var 
                        var currentTimeMillis = java.lang.System.currentTimeMillis();
                        var expireDay = 3650;
                        var leftTime = 1000 + 60 * 60 * 24 * expireDay;
                        var freeAdLeft = leftTime;
                        var expireTime = java.lang.Long.valueOf(currentTimeMillis / 1000 + leftTime);
                        // console.log('init expireTime = ' + expireTime);
                        var data = infoResponse.data;
                        data.freeAd = true;
                        data.freeAdDay = java.lang.Integer.valueOf(expireDay);
                        data.freeAdExpire = expireTime;
                        data.freeAdLeft = java.lang.Long.valueOf(freeAdLeft);
                        data.hasMedal = true;
                        data.vipLastExpiredTime = java.lang.Long.valueOf(1654752180).toString();

                        var vipInfo = data.vipInfo;
                        vipInfo.continueMonth = true;
                        vipInfo.continueMonthBuy = true;
                        vipInfo.expireTime = expireTime.toString();
                        vipInfo.isVip = '1';
                        vipInfo.leftTime = java.lang.Long.valueOf(leftTime).toString();
                        vipInfo.renewType = java.lang.Enum.valueOf(XposedHelpers.findClass('com.dragon.read.rpc.model.VipRenewType', classLoader), 'VipRenewYear');


                        data.vipInfo = vipInfo;

                        // privilege 
                        privilege = data.privilege;
                        userPrivilegeClass = XposedHelpers.findClass('com.dragon.read.rpc.model.UserPrivilege', classLoader);
                        function addPrivilege(id, name, extra, downloadBookIds) {
                            p = userPrivilegeClass.newInstance();
                            p.id = id;
                            p.name = name;
                            p.isForever = '1';
                            p.extra = extra;
                            p.startTime = '1586012290';
                            p.expireTime = expireTime.toString();
                            p.leftTime = '' + leftTime + '';
                            p.downloadBookIds = downloadBookIds;
                            return p;
                        }
                        if (privilege.size() > 0) {
                            // console.log('original privilege: ' + gson.toJson(privilege));
                            // console.log(privilege.get(0).downloadBookIds);
                            // console.log(privilege.get(0).downloadBookIds.getClass().toString());
                            // privilege.clear();
                        }
                        privilege.add(addPrivilege('6703327493505422087', 'TTS权益', '{\"from\":4}', null));
                        privilege.add(addPrivilege('7025948416286921516', 'TTS权益', '{\"from\":4}', null));
                        privilege.add(addPrivilege('6703327536606089992', '激励数据权益', '{\"from\":1}', null));
                        downloadBookIds = null;
                        // bookId = '7045925577483619000'
                        if (bookId != '') {
                            // global.toast(bookId)
                            downloadBookIds = XposedHelpers.findClass('com.google.gson.internal.LinkedTreeMap', classLoader).newInstance();
                            userPrivilegeDownloadBookItem = XposedHelpers.findClass('com.dragon.read.rpc.model.UserPrivilegeDownloadBookItem', classLoader).newInstance();
                            userPrivilegeDownloadBookItem.bookId = bookId;
                            userPrivilegeDownloadBookItem.expireTime = expireTime;
                            downloadBookIds.put(bookId, userPrivilegeDownloadBookItem);

                        }
                        privilege.add(addPrivilege('6766572795204735752', '批量下载', '{\"book_list\":{\"' + bookId + '\":\"' + expireTime + '\"},\"from\":1}', downloadBookIds));

                        privilege.add(addPrivilege('6703327401314620167', '免广告', '{\"from\":1}', null));
                        privilege.add(addPrivilege('7077535443348116268', '所有场景免广告', '{\"from\":1}', null));
                        privilege.add(addPrivilege('6703327578779816712', '离线阅读', '{\"from\":1}', null));
                        privilege.add(addPrivilege('6836977122288866051', '', '{\"from\":1}', null)); // 自动阅读
                        data.privilege = privilege
                        // console.log(gson.toJson(privilege));

                        infoResponse.data = data;
                        //set result into param.args
                        param.args[1] = infoResponse;

                        // console.log(data.getClass().toString())


                        // console.log(gson.toJson(param.args[0]));
                        console.log(gson.toJson(param.args[1]));
                        // console.log(gson.toJson(gson.fromJson(gson.toJson(param.args[1]),infoResponse.getClass())))
                    } else {
                        console.log('length not equal 2')
                    }
                }
            }));
        }
    }));
}
