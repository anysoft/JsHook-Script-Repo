// by https://github.com/anysoft
var packageName = runtime.packageName

// package 
if (packageName == 'com.intsig.camscanner') {

    // define var 
    var currentTimeMillis = java.lang.System.currentTimeMillis();
    var expireDay = 365 * 500;
    var leftTime = 1000 + 60 * 60 * 24 * expireDay;
    var freeAdLeft = leftTime;
    var expireTime = java.lang.Long.valueOf(currentTimeMillis / 1000 + leftTime);
    var boolTrue = java.lang.Boolean.TRUE
    var balanceCount = java.lang.Integer.valueOf(999);
    var pointCount = java.lang.Integer.valueOf(10000);
    var zeroInt = java.lang.Integer.valueOf(0);
    var oneInt = java.lang.Integer.valueOf(1);
    var twoInt = java.lang.Integer.valueOf(2);



    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        afterHookedMethod: function (param) {
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');

            XposedBridge.hookAllMethods(XposedHelpers.findClass('android.content.Intent', classLoader), 'putExtra', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log(param)
                    if (param.args.length == 2 && param.args[0] == 'tagetkfkalabel') {
                        if (param.args[1] == '团队版') {
                            param.args[1] = '幸运大转盘';
                        }
                    }

                    if (param.args.length == 2 && param.args[0] == 'tagetkfkalabel') {
                        if (param.args[1].contains('高级账户')) {
                            param.args[1] = '积分福利';
                        }
                    }

                    if (param.args.length == 2 && param.args[0] == 'targeturl') {
                        var url = param.args[1];
                        console.log(url)
                        premiumFeature = 'https://mo.camscanner.com/app/premiumFeature';
                        premiumFeature = 'https://mo-premium.camscanner.com/app/premiumFeature';
                        teamUrl = 'http://www.camscanner.com/team/intro';

                        intergralTurntable = 'https://mo.camscanner.com/integral/intergralTurntable';
                        intergralManageNew = 'https://mo.camscanner.com/integral/integralManageNew';

                        if (url.contains(premiumFeature) || url.contains(teamUrl)) {
                            url = url.replace(premiumFeature, intergralManageNew);
                            url = url.replace(teamUrl, intergralTurntable);
                            param.args[1] = url;
                        }
                    }
                }
            }));


            XposedBridge.hookAllMethods(XposedHelpers.findClass('com.intsig.tianshu.base.BaseJsonObj', classLoader), 'parse', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log('args:' + param);
                    // console.log('args:' + param.args.length);
                    // console.log('args:' + param.args[0]);
                    var data = param.args[0];

                    if (data.has('right_top_point_enter_switch')) {
                        data.put('right_top_point_enter_switch', oneInt);
                    }
                    var data = param.args[0];

                    if (data.has('price_full_screen')) {
                        data.put('price_full_screen', oneInt);
                    }

                    if (data.has('point_lottery_view_switch')) {
                        data.put('point_lottery_view_switch', oneInt);
                    }

                    if (data.has('read_experience')) {
                        data.put('read_experience', twoInt);
                    }
                }
            }));

            XposedBridge.hookAllConstructors(XposedHelpers.findClass('com.intsig.camscanner.https.entity.CSQueryProperty', classLoader), XC_MethodHook({
                beforeHookedMethod: function (param) {
                    // console.log('args:' + param.args.length);

                    // console.log('init expireTime = ' + expireTime);

                    var result = param.args[0];
                    var data = result.getJSONObject('data');
                    // if(data.has('psnl_vip_property')){}
                    // data.put('cs_license', 0);

                    if (data.has('ai_imagefilter_balance')) {
                        data.put('ai_imagefilter_balance', pointCount);
                    }

                    if (data.has('cs_license')) {
                        data.put('cs_license', oneInt);
                    }

                    // data.put('cs_license', 0);
                    if (data.has('cert_mode_balance')) {
                        data.put('cert_mode_balance', balanceCount);
                    }
                    if (data.has('excel_balance')) {
                        data.put('excel_balance', balanceCount);
                    }
                    if (data.has('fax_balance')) {
                        data.put('fax_balance', balanceCount);
                    }
                    if (data.has('patting_balance')) {
                        data.put('patting_balance', balanceCount);
                    }
                    if (data.has('pdf2excel_balance')) {
                        data.put('pdf2excel_balance', balanceCount);
                    }
                    if (data.has('pdf2ppt_balance')) {
                        data.put('pdf2ppt_balance', balanceCount);
                    }
                    if (data.has('pdfword_balance')) {
                        data.put('pdfword_balance', balanceCount);
                    }
                    if (data.has('profile_card_balance')) {
                        data.put('profile_card_balance', balanceCount);
                    }
                    if (data.has('immt_expy_points')) {
                        data.put('immt_expy_points', pointCount);
                    }
                    if (data.has('points')) {
                        data.put('points', pointCount);
                    }
                    if (data.has('upload_pdf_balance')) {
                        data.put('upload_pdf_balance', balanceCount);
                    }
                    if (data.has('used_points')) {
                        data.put('used_points', oneInt);
                    }
                    if (data.has('removead')) {
                        data.put('removead', oneInt);
                    }
                    if (data.has('watermarks_balance')) {
                        data.put('watermarks_balance', balanceCount);
                    }
                    // data.put('payway', 0);
                    // data.put('svip', 0);
                    // data.put('wxpay_flag', 0);
                    if (data.has('psnl_vip_property')) {
                        var psnl_vip_property = data.getJSONObject('psnl_vip_property');
                        psnl_vip_property.put('auto_renewal', boolTrue);
                        psnl_vip_property.put('expiry', expireTime);
                        psnl_vip_property.put('vip_type', 'vip');//'' vip premium gold
                        psnl_vip_property.put('pc_vip', oneInt);
                        psnl_vip_property.put('svip', oneInt);
                        // psnl_vip_property.put('group1_paid', oneInt);
                        // psnl_vip_property.put('group2_paid', oneInt);
                        psnl_vip_property.put('nxt_renew_tm', expireTime);
                        psnl_vip_property.put('last_payment_method', 'wxpay');
                        psnl_vip_property.put('show_expired', oneInt);

                        if (psnl_vip_property.has('level_info')) {
                            var level_info = psnl_vip_property.getJSONObject('level_info');
                            level_info.put('days', java.lang.Long.valueOf(387));
                            level_info.put('end_days', java.lang.Long.valueOf(390));
                            level_info.put('level', java.lang.Integer.valueOf(13));
                            // set back to json
                            psnl_vip_property.put('level_info', level_info);
                        }
                        // set back to json
                        data.put('psnl_vip_property', psnl_vip_property);

                        // team 
                        var team_vip_property = new org.json.JSONObject();
                        showTeam = false
                        if (data.has('team_vip_property') && showTeam) {
                            team_vip_property = data.getJSONObject('team_vip_property');
                            team_vip_property.put('expiry', expireTime);
                            team_vip_property.put('initial_tm', java.lang.Long.valueOf(1599668629));
                            data.put('team_vip_property', team_vip_property);
                        }


                    }

                    result.put('data', data);
                    console.log('after result:' + result.toString());
                }
            }));

        }
    }));



}
