// by https://github.com/anysoft
var packageName = runtime.packageName


isDebug = true

function debug(message) {
    if (isDebug) {
        console.log(message)
    }
}
function printStack() {
    throwable = new java.lang.Throwable();
    stackTraceElements = throwable.getStackTrace();
    if (stackTraceElements != null) {
        stackTraceElements.forEach(element => {
            console.log(gson.toJson(element));
        });
    }
}

function hookBoolean(classLoader, className, methdName, result) {
    // debug(java.lang.String.format('start to hook %s %s %s ', methdName, result ? 'true' : 'false', className))
    XposedBridge.hookAllMethods(XposedHelpers.findClass(className, classLoader), methdName, XC_MethodHook({
        afterHookedMethod: function (param) {
            debug(java.lang.String.format('hook %s %s %s %s ', methdName, param.getResult() ? 'true' : 'false', result ? 'true' : 'false', className))
            param.setResult(result);
        }
    }));
}






//com.jrummyapps.android.shell.Shell; Shell.SU.available()



function classExist(classLoader, className) {
    // debug(java.lang.String().format('start to find class %s', className))
    try {
        classType = XposedHelpers.findClass(className, classLoader)
        // debug(java.lang.String().format('class found %s', className))
    } catch (e) {
        return false
        debug(java.lang.String().format('class not found %s', className))
    }
    return true
}
EMULATORCHECK_FILES = ["/data/.bluestacks.prop", "/data/app/com.bluestacks.appmart-1.apk", "/data/data/com.bluestacks.accelerometerui", "/data/data/com.bluestacks.appfinder", "/data/data/com.bluestacks.appmart", "/data/data/com.bluestacks.appsettings", "/data/data/com.bluestacks.BstCommandProcessor", "/data/data/com.bluestacks.bstfolder", "/data/data/com.bluestacks.help", "/data/data/com.bluestacks.home", "/data/data/com.bluestacks.s2p", "/data/data/com.bluestacks.searchapp", "/data/data/com.bluestacks.settings", "/data/data/com.bluestacks.setup", "/data/data/com.bluestacks.spotlight", "/mnt/prebundledapps/bluestacks.prop.orig", "/mnt/prebundledapps/propfiles/ics.bluestacks.prop.note", "/mnt/prebundledapps/propfiles/ics.bluestacks.prop.s2", "/mnt/prebundledapps/propfiles/ics.bluestacks.prop.s3", "/mnt/sdcard/bstfolder/InputMapper/com.bluestacks.appmart.cfg", "/mnt/sdcard/buildroid-gapps-ics-20120317-signed.tgz", "/mnt/sdcard/windows/InputMapper/com.bluestacks.appmart.cfg", "/proc/irq/9/vboxguest", "/sys/bus/pci/drivers/vboxguest", "/sys/bus/pci/drivers/vboxguest/0000:00:04.0", "/sys/bus/pci/drivers/vboxguest/bind", "/sys/bus/pci/drivers/vboxguest/module", "/sys/bus/pci/drivers/vboxguest/new_id", "/sys/bus/pci/drivers/vboxguest/remove_id", "/sys/bus/pci/drivers/vboxguest/uevent", "/sys/bus/pci/drivers/vboxguest/unbind", "/sys/class/bdi/vboxsf-c", "/sys/class/misc/vboxguest", "/sys/class/misc/vboxuser", "/sys/devices/virtual/bdi/vboxsf-c", "/sys/devices/virtual/misc/vboxguest", "/sys/devices/virtual/misc/vboxguest/dev", "/sys/devices/virtual/misc/vboxguest/power", "/sys/devices/virtual/misc/vboxguest/subsystem", "/sys/devices/virtual/misc/vboxguest/uevent", "/sys/devices/virtual/misc/vboxuser", "/sys/devices/virtual/misc/vboxuser/dev", "/sys/devices/virtual/misc/vboxuser/power", "/sys/devices/virtual/misc/vboxuser/subsystem", "/sys/devices/virtual/misc/vboxuser/uevent", "/sys/module/vboxguest", "/sys/module/vboxguest/coresize", "/sys/module/vboxguest/drivers", "/sys/module/vboxguest/drivers/pci:vboxguest", "/sys/module/vboxguest/holders", "/sys/module/vboxguest/holders/vboxsf", "/sys/module/vboxguest/initsize", "/sys/module/vboxguest/initstate", "/sys/module/vboxguest/notes", "/sys/module/vboxguest/notes/.note.gnu.build-id", "/sys/module/vboxguest/parameters", "/sys/module/vboxguest/parameters/log", "/sys/module/vboxguest/parameters/log_dest", "/sys/module/vboxguest/parameters/log_flags", "/sys/module/vboxguest/refcnt", "/sys/module/vboxguest/sections", "/sys/module/vboxguest/sections/.altinstructions", "/sys/module/vboxguest/sections/.altinstr_replacement", "/sys/module/vboxguest/sections/.bss", "/sys/module/vboxguest/sections/.data", "/sys/module/vboxguest/sections/.devinit.data", "/sys/module/vboxguest/sections/.exit.text", "/sys/module/vboxguest/sections/.fixup", "/sys/module/vboxguest/sections/.gnu.linkonce.this_module", "/sys/module/vboxguest/sections/.init.text", "/sys/module/vboxguest/sections/.note.gnu.build-id", "/sys/module/vboxguest/sections/.rodata", "/sys/module/vboxguest/sections/.rodata.str1.1", "/sys/module/vboxguest/sections/.smp_locks", "/sys/module/vboxguest/sections/.strtab", "/sys/module/vboxguest/sections/.symtab", "/sys/module/vboxguest/sections/.text", "/sys/module/vboxguest/sections/__ex_table", "/sys/module/vboxguest/sections/__ksymtab", "/sys/module/vboxguest/sections/__ksymtab_strings", "/sys/module/vboxguest/sections/__param", "/sys/module/vboxguest/srcversion", "/sys/module/vboxguest/taint", "/sys/module/vboxguest/uevent", "/sys/module/vboxguest/version", "/sys/module/vboxsf", "/sys/module/vboxsf/coresize", "/sys/module/vboxsf/holders", "/sys/module/vboxsf/initsize", "/sys/module/vboxsf/initstate", "/sys/module/vboxsf/notes", "/sys/module/vboxsf/notes/.note.gnu.build-id", "/sys/module/vboxsf/refcnt", "/sys/module/vboxsf/sections", "/sys/module/vboxsf/sections/.bss", "/sys/module/vboxsf/sections/.data", "/sys/module/vboxsf/sections/.exit.text", "/sys/module/vboxsf/sections/.gnu.linkonce.this_module", "/sys/module/vboxsf/sections/.init.text", "/sys/module/vboxsf/sections/.note.gnu.build-id", "/sys/module/vboxsf/sections/.rodata", "/sys/module/vboxsf/sections/.rodata.str1.1", "/sys/module/vboxsf/sections/.smp_locks", "/sys/module/vboxsf/sections/.strtab", "/sys/module/vboxsf/sections/.symtab", "/sys/module/vboxsf/sections/.text", "/sys/module/vboxsf/sections/__bug_table", "/sys/module/vboxsf/sections/__param", "/sys/module/vboxsf/srcversion", "/sys/module/vboxsf/taint", "/sys/module/vboxsf/uevent", "/sys/module/vboxsf/version", "/sys/module/vboxvideo", "/sys/module/vboxvideo/coresize", "/sys/module/vboxvideo/holders", "/sys/module/vboxvideo/initsize", "/sys/module/vboxvideo/initstate", "/sys/module/vboxvideo/notes", "/sys/module/vboxvideo/notes/.note.gnu.build-id", "/sys/module/vboxvideo/refcnt", "/sys/module/vboxvideo/sections", "/sys/module/vboxvideo/sections/.data", "/sys/module/vboxvideo/sections/.exit.text", "/sys/module/vboxvideo/sections/.gnu.linkonce.this_module", "/sys/module/vboxvideo/sections/.init.text", "/sys/module/vboxvideo/sections/.note.gnu.build-id", "/sys/module/vboxvideo/sections/.rodata.str1.1", "/sys/module/vboxvideo/sections/.strtab", "/sys/module/vboxvideo/sections/.symtab", "/sys/module/vboxvideo/sections/.text", "/sys/module/vboxvideo/srcversion", "/sys/module/vboxvideo/taint", "/sys/module/vboxvideo/uevent", "/sys/module/vboxvideo/version", "/system/app/bluestacksHome.apk", "/system/bin/androVM-prop", "/system/bin/androVM-vbox-sf", "/system/bin/androVM_setprop", "/system/bin/get_androVM_host", "/system/bin/mount.vboxsf", "/system/etc/init.androVM.sh", "/system/etc/init.buildroid.sh", "/system/lib/hw/audio.primary.vbox86.so", "/system/lib/hw/camera.vbox86.so", "/system/lib/hw/gps.vbox86.so", "/system/lib/hw/gralloc.vbox86.so", "/system/lib/hw/sensors.vbox86.so", "/system/lib/modules/3.0.8-Android-x86+/extra/vboxguest", "/system/lib/modules/3.0.8-android-x86+/extra/vboxguest/vboxguest.ko", "/system/lib/modules/3.0.8-android-x86+/extra/vboxsf", "/system/lib/modules/3.0.8-android-x86+/extra/vboxsf/vboxsf.ko", "/system/lib/vboxguest.ko", "/system/lib/vboxsf.ko", "/system/lib/vboxvideo.ko", "/system/usr/idc/androVM_Virtual_Input.idc", "/system/usr/keylayout/androVM_Virtual_Input.kl", "/system/xbin/mount.vboxsf", "/ueventd.android_x86.rc", "/ueventd.vbox86.rc", "ueventd.android_x86.rc", "x86.prop", "ueventd.ttVM_x86.rc", "init.ttVM_x86.rc", "fstab.ttVM_x86", "fstab.vbox86", "init.vbox86.rc", "ueventd.vbox86.rc", "/dev/socket/genyd", "/dev/socket/baseband_genyd", "fstab.andy", "ueventd.andy.rc", "/dev/socket/qemud", '/dev/qemu_pipe']
FILESFORCONTENT = ["/proc/tty/drivers", "/proc/cpuinfo"];
SU_PATHS = ["/data/local/", "/data/local/bin/", "/data/local/xbin/", "/sbin/", "/system/bin/", "/system/bin/.ext/", "/system/bin/failsafe/", "/system/sd/xbin/", "/system/usr/we-need-root/", "/system/xbin/"]
PATHS_THAT_SHOULD_NOT_BE_WRTIABLE = ["/system", "/system/bin", "/system/sbin", "/system/xbin", "/vendor/bin", "/sbin", "/etc"]

EMULATORCHECK_PACKAGENAMES = ["com.zhou.gege","com.txy.anywhere","com.deniu.multi","com.lerist.fakelocation","com.shyl.artifact","com.felix.dingmock","com.dobe.igrimace","com.kr101.checkin","net.anylocation","com.wuxiaosu.rimethelper","com.mhook.dingdingattendance","top.a1024bytes.mockloc.ca.pro","com.zczm.lee","com.qyqd","com.google.android.launcher.layouts.genymotion","com.bluestacks","com.bignox.app","com.microvirt.market","com.microvirt.download","com.microvirt.launcher","com.microvirt.memuime","com.droi.adocker.mxr","com.bly.dkplat","com.lerist.fakelocation","com.vbooster.vbooster_privace_z_space","projekt.substratum"]
KNOWN_DANGEROUS_APPS_PACKAGES = ["com.koushikdutta.rommanager", "com.dimonvideo.luckypatcher", "com.chelpus.lackypatch", "com.ramdroid.appquarantine"]
KNOWN_ROOT_CLOAKING_PACKAGES = ["com.devadvance.rootcloak", "de.robv.android.xposed.installer", "com.saurik.substrate", "com.devadvance.rootcloakplus", "com.zachspong.temprootremovejb", "com.amphoras.hidemyroot", "com.formyhm.hideroot"]
KNOWN_ROOT_APPS_PACKAGES = ["com.noshufou.android.su", "com.noshufou.android.su.elite", "eu.chainfire.supersu", "com.koushikdutta.superuser", "com.thirdparty.superuser", "com.yellowes.su"]
PACKAGES = EMULATORCHECK_PACKAGENAMES.concat(KNOWN_DANGEROUS_APPS_PACKAGES, KNOWN_ROOT_CLOAKING_PACKAGES,KNOWN_ROOT_APPS_PACKAGES);

// get classloader
XposedBridge.hookAllMethods(XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader), 'performLaunchActivity', XC_MethodHook({
    beforeHookedMethod: function (param) {
        // console.log('hook before');
        var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
        var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');

        // common
        className = 'android.app.ApplicationPackageManager'
        methodName = 'getPackageInfo'
        if (classExist(classLoader, className)) {
            try {
                XposedBridge.hookAllMethods(XposedHelpers.findClass(className, classLoader), methodName, XC_MethodHook({
                    beforeHookedMethod: function (param) {
                        if(PACKAGES.indexOf(param.args[0]) !== -1){
                            // debug(java.lang.String().format('deny check getPackageInfo %s', param.args[0]))
                            param.setResult(null)
                        }
                        // debug(java.lang.String().format('beforeHookedMethod getPackageInfo %s', param.args[0]))
                    },
                    afterHookedMethod: function (param) {
                        if (param.getResult() != null) {
                            // class android.content.pm.PackageInfo
                            // debug(java.lang.String().format('afterHookedMethod getPackageInfo %s', param.getResult()))
                            // debug(param.getResult().getClass())
                        }
                    }
                }));
            } catch (e) {
                debug(e)
            }
        }

        // common
        className = 'java.io.File'
        methodName = 'exists'
        if (classExist(classLoader, className)) {
            XposedBridge.hookAllMethods(XposedHelpers.findClass(className, classLoader), methodName, XC_MethodHook({
                beforeHookedMethod: function (param) {
                    filePath = param.thisObject.getPath()
                    fileName = param.thisObject.getName()
                    if (fileName == 'su') {
                        // debug(java.lang.String().format('beforeHookedMethod exists %s %s', param.thisObject.getPath(), param.thisObject.getName()))
                        param.setResult(false)
                    }
                },
                afterHookedMethod: function (param) {
                    if (fileName == 'su') {
                        // debug(java.lang.String().format('afterHookedMethod exists %s', param.getResult()))
                        // param.setResult(false)
                    }
                }
            }));
        }

        className = 'com.tencent.wxop.stat.common.p'
        methodName = 'a'
        if (classExist(classLoader, className)) {
            XposedBridge.hookAllMethods(XposedHelpers.findClass(className, classLoader), methodName, XC_MethodHook({
                afterHookedMethod: function (param) {
                    debug(param.getResult() + ' ' + className + ' ')
                    param.setResult(false)
                }
            }));
        }

        className = 'com.gieseckedevrient.android.hceclient.HceEngineJNIBridge'
        methodName = 'isDeviceRoot'
        if (classExist(classLoader, className)) {
            XposedBridge.hookAllMethods(XposedHelpers.findClass(className, classLoader), methodName, XC_MethodHook({
                afterHookedMethod: function (param) {
                    debug(param.getResult() + ' ' + className + ' ')
                    param.setResult('00')
                }
            }));
        }

        // ml.w568w.checkxposed
        if (packageName == 'ml.w568w.checkxposed') {
            // hookAllMethods
            var class_RootCheckerUtils = 'b.b.a.a.a.a';
            XposedBridge.hookAllMethods(XposedHelpers.findClass(class_RootCheckerUtils, classLoader), 'a', XC_MethodHook({
                beforeHookedMethod: function (param) {
                    param.setResult(false);
                }
            }));
        }

        // com.unionpay
        if (packageName == 'com.unionpay') {
            methods_rootcheckutils = ['checkForBusyBoxBinary', 'checkForSuBinary', 'checkSuExists', 'detectPotentiallyDangerousApps',
                'detectRootCloakingApps', 'detectRootManagementApps', 'isExecutable', 'isRoot', 'isRooted', 'detectTestKeys',
                'checkForBinary', 'isAnyPackageFromListInstalled', 'checkForDangerousProps', 'checkForRWPaths', 'detect'
            ]
            result_rootcheckutils = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

            class_RootCheckerUtils1 = 'com.unionpay.deviceinfocollection.collection.RootCheckUtils'
            class_RootCheckerUtils2 = 'com.unionpay.tinkerpatch.lib.uputils.RootCheckUtils'
            if (classExist(classLoader, class_RootCheckerUtils1)) {
                for (var i = 0; i < methods_rootcheckutils.length; i++) {
                    hookBoolean(classLoader, class_RootCheckerUtils1, methods_rootcheckutils[i], result_rootcheckutils[i])
                }
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_RootCheckerUtils1, classLoader), 'rootCheck', XC_MethodHook({
                    afterHookedMethod: function (param) {
                        object = param.getResult();
                        console.log(object)
                    }
                }));
            }

            if (classExist(classLoader, class_RootCheckerUtils2)) {
                for (var i = 0; i < methods_rootcheckutils.length; i++) {
                    hookBoolean(classLoader, class_RootCheckerUtils2, methods_rootcheckutils[i], result_rootcheckutils[i])
                }
                XposedBridge.hookAllMethods(XposedHelpers.findClass(class_RootCheckerUtils1, classLoader), 'rootCheck', XC_MethodHook({
                    afterHookedMethod: function (param) {
                        object = param.getResult();
                        console.log(object)
                    }
                }));
            }

            // public static JSONObject rootCheck() {
            //     String[] strArr;
            //     JSONObject jSONObject = new JSONObject();
            //     try {
            //         JSONArray jSONArray = new JSONArray();
            //         for (String str : suPaths) {
            //             JSONObject jSONObject2 = new JSONObject();
            //             String str2 = str + "su";
            //             jSONObject2.put("file", str2);
            //             jSONObject2.put("exists", Utils.fileExists(str2));
            //             jSONObject2.put("exec", Utils.isFileExecutable(str2));
            //             jSONArray.put(jSONObject2);
            //         }
            //         jSONObject.put("files", jSONArray);
            //         JSONObject jSONObject3 = new JSONObject();
            //         jSONObject3.put("roDebuggable", DeviceInfoUtils.getRoDebuggable());
            //         jSONObject3.put("roSecure", DeviceInfoUtils.getRoSecure());
            //         jSONObject.put("sysprops", jSONObject3);
            //     } catch (Exception e) {
            //         e.printStackTrace();
            //         CollectionErrorUtils.appendError(e);
            //     }
            //     return jSONObject;
            // }


        }
    }

}));
