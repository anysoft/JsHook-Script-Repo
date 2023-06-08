

// by https://github.com/anysoft
var packageName = runtime.packageName

function updateOrInsert(object, key, value) {
    object.put(key, value);
}

// package 
if (packageName == 'com.uzero.cn.zhengjianzhao') {
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
            XposedBridge.hookAllMethods(XposedHelpers.findClass('com.google.gson.Gson', classLoader), 'fromJson', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log('hook before');
                    if (param.args.length == 2) {
                        type = param.args[0].getClass().toString();
                        if (type == 'class java.lang.String') {
                            if (param.args[0].startsWith('{')) {
                                console.log(param.args[0])
                                result = new org.json.JSONObject(param.args[0]);
                                if (result.has('value') && result.get('value').getClass().toString() == 'class org.json.JSONObject') {
                                    value = result.getJSONObject('value');
                                    // defaultRecognize  levels
                                    if (value.has('defaultRecognize') && value.has('levels')) {
                                        defaultRecognize = value.getJSONObject('defaultRecognize');
                                        defaultRecognize.put('defaultNormal', 99999);
                                        defaultRecognize.put('defaultBatch', 99999);
                                        defaultRecognize.put('defaultTranslate', 99999);
                                        defaultRecognize.put('defaultShare', 99999);
                                        value.put('defaultRecognize', defaultRecognize);

                                        levels = value.getJSONArray('levels');
                                        level = levels.getJSONObject(0);
                                        level.put('name', '会员');
                                        levels.put(0, level);
                                        value.put('levels', levels);

                                        result.put('value', value);
                                        // ID VIP
                                    } else if (value.has('id') && value.has('vip')) {
                                        id = value.getLong('id');
                                        updateOrInsert(value, 'point', 1000);
                                        updateOrInsert(value, 'boardNum', 0);
                                        updateOrInsert(value, 'promoted', 0);
                                        updateOrInsert(value, 'loginTime', 0);
                                        updateOrInsert(value, 'promotedTime', 0);
                                        updateOrInsert(value, 'locked', 0);
                                        updateOrInsert(value, 'approvalTime', 0);
                                        updateOrInsert(value, 'emailVerified', 0);
                                        updateOrInsert(value, 'followerNum', 0);
                                        updateOrInsert(value, 'coin', 99999);
                                        updateOrInsert(value, 'mediumAvatar', '');
                                        updateOrInsert(value, 'smallAvatar', '');
                                        updateOrInsert(value, 'avatar', '');
                                        updateOrInsert(value, 'largeAvatar', '');

                                        recognize = value.getJSONObject('recognize');
                                        updateOrInsert(recognize, 'remainShare', 9999);
                                        updateOrInsert(recognize, 'remainNormal', -100);
                                        updateOrInsert(recognize, 'remainTranslate', 9999);
                                        value.put('recognize', recognize);

                                        if (!value.has('vip') || value.isNull('vip')) {
                                            vip = new org.json.JSONObject();

                                            level = new org.json.JSONObject();
                                            level.put('recognizeTranslateAll', 0);
                                            level.put('afterCouponAmount', 0.0);
                                            level.put('icon', '');
                                            level.put('description', '');
                                            level.put('recognizeNormal', -100);
                                            level.put('canUpgrade', 0);
                                            level.put('maxRate', 1000);
                                            level.put('enabled', 1);
                                            level.put('picture', '');
                                            level.put('recognizeBatch', 1);
                                            level.put('monthPrice', 0.01);
                                            level.put('recognizeTranslate', 9999);
                                            level.put('name', '会员');
                                            level.put('createdTime', 1617709836);
                                            level.put('id', 3);
                                            level.put('yearPrice', 6.0);
                                            level.put('seq', 1);
                                            vip.put('level', level);

                                            vip.put('orderId', 518888);
                                            vip.put('userId', id);
                                            vip.put('boughtTime', 1644182139);
                                            vip.put('boughtType', "new");
                                            vip.put('boughtAmount', 6.0);
                                            vip.put('levelId', 3);
                                            vip.put('boughtUnit', "year");
                                            vip.put('createdTime', 1644182139);
                                            vip.put('deadlineNotified', 0);
                                            vip.put('id', 331111);
                                            vip.put('deadline', 3960015438);
                                            vip.put('boughtDuration', 10);
                                            vip.put('operatorId', 0);
                                            value.put('vip', vip);
                                        }
                                        result.put('value', value);
                                    } else if (value.has('normalCount') && value.has('remainNormal')) {
                                        value.put('normalCount', 0);
                                        value.put('batchCount', 0);
                                        value.put('translateCount', 0);
                                        value.put('shareCount', 0);
                                        value.put('balanceCount', 0);
                                        value.put('remainNormal', -100);
                                        value.put('remainBatch', -100);
                                        value.put('remainTranslate', -100);
                                        value.put('remainShare', -100);
                                        value.put('recognizeTranslateAll', 0);
                                        result.put('value', value);
                                    }


                                } else {
                                    // global.toast('11');
                                }
                                param.args[0] = result.toString();
                                console.log(param.args[0])
                            } else if (param.args[0].startsWith('[')) {

                            }
                        }
                    }

                },
                afterHookedMethod: function (param) {
                    // console.log('hook after');
                }
            }));
        }
    }));
}
