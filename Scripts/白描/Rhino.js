
// by https://github.com/anysoft
var packageName = runtime.packageName

// in key-value update or insert
function alwaysPut(object, key, value) {
    object.put(key, value);
}

// in key-value just update
function justUpdateIfHas(object, key, value) {
    if (object.has(key)) {
        object.put(key, value);
    }
}

// in key-value just insert not update
function justInsertIfNotHas(object, key, value) {
    if (!object.has(key)) {
        object.put(key, value);
    }
}

// switch for control
debugSwitch = false

// package 
if (packageName == 'com.uzero.baimiao') {
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
                        if (debugSwitch) {
                            console.log(type)
                        }
                        if (type == 'class java.lang.String') {
                            if (param.args[0].startsWith('{')) {
                                if (debugSwitch) {
                                    console.log(param.args[0])
                                }
                                result = new org.json.JSONObject(param.args[0]);
                                if (result.has('value') && result.get('value').getClass().toString() == 'class org.json.JSONObject') {
                                    value = result.getJSONObject('value');

                                    // approvalStatus
                                    if (value.has('approvalTime')) {
                                        if (value.has('approvalStatus')) {
                                            value.remove('approvalStatus');
                                        }
                                        id = value.getLong('id');
                                        if (!value.has('vip')) {
                                            vip = new org.json.JSONObject();
                                            alwaysPut(vip, 'boughtAmount', 30);
                                            alwaysPut(vip, 'boughtDuration', 10);
                                            alwaysPut(vip, 'boughtTime', 1674805897);
                                            alwaysPut(vip, 'boughtType', "new");
                                            alwaysPut(vip, 'boughtUnit', "year");
                                            alwaysPut(vip, 'createdTime', 1674805897);
                                            alwaysPut(vip, 'deadline', 1990425097);
                                            alwaysPut(vip, 'deadlineNotified', 0);
                                            alwaysPut(vip, 'id', 298899);
                                            alwaysPut(vip, 'levelId', 2);
                                            alwaysPut(vip, 'operatorId', 0);
                                            alwaysPut(vip, 'orderId', 298899);
                                            alwaysPut(vip, 'userId', id);
                                            level = new org.json.JSONObject();
                                            alwaysPut(level, 'afterCouponAmount', 0);
                                            alwaysPut(level, 'canUpgrade', 0);
                                            alwaysPut(level, 'createdTime', 1429260383);
                                            alwaysPut(level, 'description', "");
                                            alwaysPut(level, 'enabled', 1);
                                            alwaysPut(level, 'icon', "");
                                            alwaysPut(level, 'id', 2);
                                            alwaysPut(level, 'maxRate', 100);
                                            alwaysPut(level, 'monthPrice', 0.02);
                                            alwaysPut(level, 'name', "黄金会员");
                                            alwaysPut(level, 'picture', "");
                                            alwaysPut(level, 'recognizeBatch', -100);
                                            alwaysPut(level, 'recognizeNormal', -100);
                                            alwaysPut(level, 'recognizeTranslate', -100);
                                            alwaysPut(level, 'recognizeTranslateAll', 1);
                                            alwaysPut(level, 'seq', 2);
                                            alwaysPut(level, 'yearPrice', 40);
                                            alwaysPut(vip, 'level', level);
                                        }
                                    }

                                    // defaultRecognize  levels
                                    if (value.has('defaultRecognize') && value.has('levels')) {
                                        defaultRecognize = value.getJSONObject('defaultRecognize');
                                        justUpdateIfHas(defaultRecognize, 'defaultNormal', 99999);
                                        justUpdateIfHas(defaultRecognize, 'defaultBatch', 99999);
                                        justUpdateIfHas(defaultRecognize, 'defaultTranslate', 99999);
                                        justUpdateIfHas(defaultRecognize, 'recognizeTranslateAll', -100);
                                        justUpdateIfHas(defaultRecognize, 'defaultShare', 99999);
                                        justUpdateIfHas(defaultRecognize, 'defaultPdfTransCount', 99999);
                                        justUpdateIfHas(defaultRecognize, 'defaultPdfTranslateCount', 99999);
                                        value.put('defaultRecognize', defaultRecognize);

                                        // for loop update levels
                                        levels = value.getJSONArray('levels');
                                        for (index = 0; index < levels.length(); index++) {
                                            level = levels.getJSONObject(0);
                                            justUpdateIfHas(level, 'recognizeNormal', -100);
                                            justUpdateIfHas(level, 'recognizeBatch', -100);
                                            justUpdateIfHas(level, 'recognizeTranslate', -100);
                                            justUpdateIfHas(level, 'recognizeTranslateAll', -100);
                                            justUpdateIfHas(level, 'enabled', 1);
                                            justUpdateIfHas(level, 'gived', 0);
                                            justUpdateIfHas(level, 'maxRate', 99999);
                                            justUpdateIfHas(level, 'pdfTransCount', 0);
                                            justUpdateIfHas(level, 'pdfTranslateCount', 0);
                                            levels.put(index, level);
                                        }
                                        value.put('levels', levels);
                                        result.put('value', value);
                                    }
                                    // ID VIP
                                    if (value.has('vip') && value.has('vips')) {
                                        id = value.getLong('id');
                                        justUpdateIfHas(value, 'point', 1000);
                                        justUpdateIfHas(value, 'promoted', 0);
                                        justUpdateIfHas(value, 'loginTime', 0);
                                        justUpdateIfHas(value, 'promotedTime', 0);
                                        justUpdateIfHas(value, 'locked', 0);
                                        justUpdateIfHas(value, 'approvalTime', 0);
                                        justUpdateIfHas(value, 'emailVerified', 0);
                                        justUpdateIfHas(value, 'coin', 99999);
                                        justUpdateIfHas(value, 'mediumAvatar', '');
                                        justUpdateIfHas(value, 'smallAvatar', '');
                                        justUpdateIfHas(value, 'avatar', '');
                                        justUpdateIfHas(value, 'largeAvatar', '');

                                        recognize = value.getJSONObject('recognize');
                                        justUpdateIfHas(recognize, 'normalCount', -100);
                                        justUpdateIfHas(recognize, 'batchCount', -100);
                                        justUpdateIfHas(recognize, 'translateCount', -100);
                                        justUpdateIfHas(recognize, 'shareCount', -100);
                                        justUpdateIfHas(recognize, 'balanceCount', -100);
                                        justUpdateIfHas(recognize, 'pdfCount', -100);
                                        justUpdateIfHas(recognize, 'pdfTranslateCount', -100);

                                        justUpdateIfHas(recognize, 'remainNormal', -100);
                                        justUpdateIfHas(recognize, 'remainBatch', -100);
                                        justUpdateIfHas(recognize, 'remainTranslate', -100);
                                        justUpdateIfHas(recognize, 'remainShare', -100);
                                        justUpdateIfHas(recognize, 'recognizeTranslateAll', -100);
                                        justUpdateIfHas(recognize, 'remainPdfTransCount', -100);
                                        justUpdateIfHas(recognize, 'remainPdfTranslateCount', -100);
                                        value.put('recognize', recognize);

                                        // vip
                                        vip = null;
                                        vips = null;

                                        if (value.isNull('vip')) {
                                            vips = new org.json.JSONArray();
                                            vip = new org.json.JSONObject();
                                        } else {
                                            vips = value.getJSONArray('vips');
                                            vip = value.getJSONObject('vip');
                                        }

                                        level = new org.json.JSONObject();
                                        justInsertIfNotHas(level, 'id', 2);
                                        justInsertIfNotHas(level, 'seq', 2);

                                        alwaysPut(level, 'name', "黄金会员");
                                        justInsertIfNotHas(level, 'icon', "");
                                        justInsertIfNotHas(level, 'picture', "");
                                        justInsertIfNotHas(level, 'monthPrice', 0.02);
                                        justInsertIfNotHas(level, 'yearPrice', 40);
                                        justInsertIfNotHas(level, 'description', "");
                                        justInsertIfNotHas(level, 'recognizeNormal', -100);
                                        justInsertIfNotHas(level, 'recognizeBatch', -100);
                                        justInsertIfNotHas(level, 'recognizeTranslate', -100);
                                        justInsertIfNotHas(level, 'recognizeTranslateAll', -100);
                                        justInsertIfNotHas(level, 'enabled', 1);
                                        justInsertIfNotHas(level, 'gived', 0);
                                        justInsertIfNotHas(level, 'createdTime', 1429260383);
                                        justInsertIfNotHas(level, 'maxRate', 100);
                                        justInsertIfNotHas(level, 'isSubscribe', 0);
                                        justInsertIfNotHas(level, 'upgradeSubscribePrice', 0);
                                        justInsertIfNotHas(level, 'pdfTransCount', -100);
                                        justInsertIfNotHas(level, 'pdfTranslateCount', -100);
                                        vip.put('level', level);

                                        justInsertIfNotHas(vip, 'id', 518888);
                                        justInsertIfNotHas(vip, 'userId', id);
                                        justInsertIfNotHas(vip, 'levelId', 2);
                                        justInsertIfNotHas(vip, 'deadline', 1990425097);
                                        justInsertIfNotHas(vip, 'boughtType', 'new');
                                        justInsertIfNotHas(vip, 'boughtTime', 1674805897);
                                        justInsertIfNotHas(vip, 'boughtDuration', 10);
                                        justInsertIfNotHas(vip, 'boughtUnit', 'year');
                                        justInsertIfNotHas(vip, 'boughtAmount', 30);
                                        justInsertIfNotHas(vip, 'orderId', 303232);
                                        justInsertIfNotHas(vip, 'deadlineNotified', 0);
                                        justInsertIfNotHas(vip, 'operatorId', 0);
                                        justInsertIfNotHas(vip, 'createdTime', 1674805897);
                                        justInsertIfNotHas(vip, 'levelSeq', 2);
                                        vips.put(vip);
                                        value.put('vip', vip);
                                        value.put('vips', vips);
                                        result.put('value', value);


                                    }
                                    if (value.has('normalCount') && value.has('remainNormal')) {
                                        justUpdateIfHas(value, 'normalCount', 0);
                                        justUpdateIfHas(value, 'batchCount', 0);
                                        justUpdateIfHas(value, 'translateCount', 0);
                                        justUpdateIfHas(value, 'shareCount', 0);
                                        justUpdateIfHas(value, 'balanceCount', 0);
                                        justUpdateIfHas(value, 'pdfCount', 0);
                                        justUpdateIfHas(value, 'pdfTranslateCount', 0);
                                        justUpdateIfHas(value, 'remainNormal', -100);
                                        justUpdateIfHas(value, 'remainBatch', -100);
                                        justUpdateIfHas(value, 'remainTranslate', -100);
                                        justUpdateIfHas(value, 'remainShare', -100);
                                        justUpdateIfHas(value, 'recognizeTranslateAll', -100);
                                        justUpdateIfHas(value, 'remainPdfTransCount', -100);
                                        justUpdateIfHas(value, 'remainPdfTranslateCount', -100);
                                        result.put('value', value);
                                    }
                                } else {
                                    // global.toast('11');
                                }
                                param.args[0] = result.toString();
                                if (debugSwitch) {
                                    console.log(param.args[0])
                                }
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



