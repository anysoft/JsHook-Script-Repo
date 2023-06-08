var packageName = runtime.packageName

function hookAllMethods(className, funcName, type, value, num, paramVal) {
    XposedBridge.hookAllMethods(XposedHelpers.findClass(className, runtime.classLoader), funcName, XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            switch (type) {
                case 1:
                    param.setResult(value);
                    break;
                case 2:
                    param.setResult(java.lang.Integer.valueOf(value));
                    break;
                case 3:
                    param.setResult(java.lang.Long.valueOf(value));
                    break;
                case 4:
                    param.args[num] = value
                    break;
                case 5:
                    XposedHelpers.setObjectField(param.thisObject, num, value)
                    break;
                case 6:
                    if (param.args[num] == paramVal) {
                        param.setResult(value);
                    }
                    break;
                case 7:
                    if (param.args[num] == paramVal) {
                        param.setResult(java.lang.Integer.valueOf(value));
                    }
                    break;
                case 8:
                    if (param.args[num] == paramVal) {
                        param.setResult(java.lang.Long.valueOf(value));
                    }
                    break;
                case 9:
                    XposedHelpers.setStaticObjectField(param.thisObject, num, value)
                    break;
            }

        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
}

function hookMethod(className, funcName, params, type, value, num, paramVal) {
    XposedHelpers.findAndHookMethod(XposedHelpers.findClass(className, runtime.classLoader), funcName, param, XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            switch (type) {
                case 1:
                    param.setResult(value);
                    break;
                case 2:
                    param.setResult(java.lang.Integer.valueOf(value));
                    break;
                case 3:
                    param.setResult(java.lang.Long.valueOf(value));
                    break;
                case 4:
                    param.args[num] = value
                    break;
                case 5:
                    XposedHelpers.setObjectField(param.thisObject, num, value)
                    break;
                case 6:
                    if (param.args[num] == paramVal) {
                        param.setResult(value);
                    }
                    break;
                case 7:
                    if (param.args[num] == paramVal) {
                        param.setResult(java.lang.Integer.valueOf(value));
                    }
                    break;
                case 8:
                    if (param.args[num] == paramVal) {
                        param.setResult(java.lang.Long.valueOf(value));
                    }
                    break;
                case 9:
                    XposedHelpers.setStaticObjectField(param.thisObject, num, value)
                    break;
            }

        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
}

function hookTTAd() {
    XposedBridge.hookAllMethods(XposedHelpers.findClass('com.bytedance.sdk.openadsdk.TTAdConfig', runtime.classLoader), 'getAppId', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            param.setResult(null);
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
}

function classLoad($Object, classItem) {
    var mInitialApplication = XposedHelpers.getObjectField($Object, 'mInitialApplication');
    var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
    return XposedHelpers.findClass(classItem, classLoader);
}

if (packageName == 'com.meitu.meiyancamera') {
    //美颜相机本地VIP破解
    hookAllMethods('com.meitu.myxj.b.a$a', 'j', 1, true)
} else if (packageName == 'com.shineyie.aijianji') {
    //爱剪辑本地VIP破解
    hookAllMethods('com.shineyie.common.user.UserManager', 'isVip', 1, true)
    hookAllMethods('com.shineyie.common.user.UserManager', 'isForeverVip', 1, true)
} else if (packageName == 'com.piriform.ccleaner') {
    //CCleaner本地解锁高级版
    hookAllMethods('com.avast.android.cleaner.subscription.ﹳ', 'ۦ', 1, true)
} else if (packageName == 'com.moji.mjweather') {
    //墨迹天气本地VIP破解
    hookAllMethods('com.moji.account.data.UserInfo', 'isVip', 1, true)
    hookAllMethods('com.moji.preferences.ProcessPrefer', 'getIsVip', 1, true)
} else if (packageName == 'com.dou_pai.DouPai') {
    //逗拍本地VIP破解
    hookAllMethods('com.dou_pai.DouPai.model.Muser', 'isUserVip', 1, true)
    hookAllMethods('com.dou_pai.DouPai.model.Muser', 'isUserVipPassDateEmpty', 1, true)
} else if (packageName == 'cn.wps.moffice_eng') {
    //WPS本地VIP破解
    hookAllMethods('m79', 'w', 1, true)
    hookAllMethods('m79', 'x', 1, true)
    hookAllMethods('m79', 'z', 1, true)
    hookAllMethods('m79', 's', 1, true)
} else if (packageName == 'vStudio.Android.Camera360') {
    //相机360本地VIP破解
    hookAllMethods('com.pinguo.camera360.vip.VipManager', 'H', 1, true)
} else if (packageName == 'com.mt.mtxx.mtxx') {
    //美图秀秀本地VIP破解
    hookAllMethods('com.meitu.vip.util.XXVipUtil', 'd0', 1, true)
} else if (packageName == 'com.shoujiduoduo.ringtone') {
    //铃声多多本地VIP破解
    hookAllMethods('com.shoujiduoduo.base.bean.UserInfo', 'isVip', 1, true)
} else if (packageName == 'cn.kuwo.player') {
    //酷我音乐本地VIP以及换肤破解
    hookMethod('cn.kuwo.peculiar.specialinfo.c', 'c', null, 2, 1)
    hookAllMethods('cn.kuwo.base.bean.Music', 'isSpPrivilege', 1, true)
    hookMethod('cn.kuwo.mod.theme.detail.star.StarThemeDetailPresenter', 'checkStarThemeFree', ['cn.kuwo.mod.theme.bean.star.StarTheme'], 1, true)
} else if (packageName == 'com.xs.fm') {
    //番茄畅听本地VIP破解
    hookAllMethods('com.dragon.read.user.b', 'j', 1, true)
} else if (packageName == 'com.naiyoubz.main') {
    //奶由壁纸本地VIP破解
    hookAllMethods('com.naiyoubz.main.model.net.AccountModel', 'isVip', 1, true)
} else if (packageName == 'com.lcw.easydownload') {
    //便捷下载本地VIP破解
    hookAllMethods('Sa.e', 'Mt', 2, 2)
    hookAllMethods('Sa.e', 'isVip', 1, true)
} else if (packageName == 'com.gorgeous.lite') {
    //轻颜相机本地VIP破解
    hookMethod('com.lm.components.subscribe.config.UserVipInfo', 'getEndTime', null, 1, '2848431461')
    hookMethod('com.lm.components.subscribe.config.UserVipInfo', 'isVipUser', null, 1, true)
    hookMethod('com.lm.components.utils.u', 'EY', null, 1, true)
} else if (packageName == 'com.qihoo.magic') {
    //360分身大师本地VIP破解
    hookMethod('com.qihoo.magic.account.Membership', 'f', ['int'], 1, true)
    hookMethod('com.qihoo.magic.account.Membership', 'e', ['int'], 1, true)
    hookMethod('com.qihoo.magic.account.Membership', 'd', ['int'], 1, true)
    hookMethod('com.qihoo.magic.account.Membership', 'c', ['int'], 1, true)
    hookMethod('com.qihoo.magic.account.Membership', 'b', ['int'], 1, true)
    hookMethod('com.qihoo.magic.account.Membership', 'b', null, 2, 5)
} else if (packageName == 'com.badun.badunys') {
    //巴顿影视观看免广告破解
    hookMethod('com.tencent.mmkv.MMKV', 'decodeLong', ['java.lang.String'], 8, -1, 0, 'free_ad_second_timestamp')
} else if (packageName == 'com.xiachufang.lazycook') {
    //懒饭本地VIP破解
    hookAllMethods('com.xiachufang.lazycook.model.user.User', 'isPrime', 1, true)
} else if (packageName == 'com.xinmang.unzip') {
    //全能压缩VIP破解
    hookAllMethods('com.wm.common.user.UserManager', 'isVip', 1, true)
    hookAllMethods('com.wm.common.user.UserManager', 'isPermanentVip', 1, true)
} else if (packageName == 'com.xingxingsp.xxspfilms') {
    //行星视频免广告破解
    hookAllMethods('com.moqi.sdk.view.banner.MQBannerAdView', 'init', 1, null)
    hookAllMethods('com.moqi.sdk.MQSDK', 'initSdk', 1, null)
    hookAllMethods('b.k.a.l.p0', 'i', 2, 1)
    hookAllMethods('com.xiaocao.p2p.entity.MineUserInfo', 'getIs_vip', 2, 1)
    hookAllMethods('com.xiaocao.p2p.entity.MineUserInfo', 'getVip_validity', 3, 4102400000)
} else if (packageName == 'com.ddwallpaperang.wallpaper') {
    //图图乐会员
    hookAllMethods('com.ddwallpaperang.wallpaper.utils.AdConfigsManagerUtils', 'isVip', 1, true)
    hookTTAd()
} else if (packageName == 'com.sanmao.newstudypstwo.appunion') {
    //爱修图会员
    hookAllMethods('com.fenghuajueli.libbasecoreui.user.UserInfoUtils', 'isVip', 1, true)
    hookTTAd()
} else if (packageName == 'com.xinmang.photocut') {
    //抠图p图秀会员
    hookAllMethods('com.wm.common.user.UserManager', 'isVip', 1, true)
    hookAllMethods('com.wm.common.user.UserManager', 'isPermanentVip', 1, true)
    hookTTAd()
} else if (packageName == 'com.daxiaamu.op7mutools') {
    //一加全能盒子
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            var 高级列表框Impl = classLoad(param.thisObject, 'com.e4a.runtime.components.impl.android.n29.高级列表框Impl', classLoader);
            XposedBridge.hookAllMethods(高级列表框Impl, '添加项目', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    if (param.args[1].toString() == 'VIP到期时间')
                        param.args[2] = '永久会员';
                },
                afterHookedMethod: function (param) {
                    // console.log('hook after');
                }
            }));
            var 主窗口 = classLoad(param.thisObject, 'com.daxiaamu.op7mutools.主窗口', classLoader);

            XposedBridge.hookAllMethods(主窗口, '多线程_获取会员信息$发送网络数据完毕', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    var 公用模块 = classLoad(param.thisObject, 'com.daxiaamu.op7mutools.公用模块', classLoader);
                    var 会员 = 公用模块.getField('会员');
                    会员.setAccessible(true);
                    会员.setBoolean(公用模块, true);
                    var vip = 公用模块.getField('vip');
                    vip.setAccessible(true);
                    vip.set(公用模块, '999999999');
                },
                afterHookedMethod: function (param) {
                    // console.log('hook after');
                }
            }));
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));

} else if (packageName == 'com.example.administrator.searchpicturetool') {
    //搜图神器
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            var $class = classLoad(param.thisObject, 'ˉ.י.ʾ.ˈ.ــ.ᴵᴵ')
            hookAllMethods($class, 'ʽ', 1, true)
            hookAllMethods($class, 'ʼ', 1, true)
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
} else if (packageName == 'com.qihoo.qeditor') {
    //快剪辑
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            var $class = classLoad(param.thisObject, 'ˉ.י.ʾ.ˈ.ــ.ᴵᴵ')
            hookAllMethods($class, 'M', 1, true)
            hookAllMethods($class, 'N', 2, 2147483647)
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
} else if (packageName == 'com.vphonegaga.titan') {
    //光速虚拟机2.2.0解锁会员  
    hookAllMethods('com.vphonegaga.titan.personalcenter.userinfo.VPhoneGaGaUserInfo$User', 'isVip', 1, true)
} else if (packageName == 'com.geekapp.scanner') {
    //万能扫描王5.0.9解锁免登录会员
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            var $class1 = classLoad(param.thisObject, 'com.sanmai.libserver.uitls.cache.SanSPUtils')
            var $class2 = classLoad(param.thisObject, 'com.sanmai.libserver.uitls.MemberSanUtil')
            hookAllMethods($class1, 'isUserLogin', 1, true)
            hookAllMethods($class2, 'isMember', 1, true)
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
} else if (packageName == 'com.qihoo.qeditor') {
    //快剪辑
    XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
        beforeHookedMethod: function (param) {
            // console.log('hook before');
            var $class = classLoad(param.thisObject, 'com.media.editor.util.n')
            hookAllMethods($class, 'M', 1, true)
            hookAllMethods($class, 'N', 2, 2147483647)
        },
        afterHookedMethod: function (param) {
            // console.log('hook after');
        }
    }));
}
