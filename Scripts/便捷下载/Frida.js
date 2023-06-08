Java.perform(function () {
    var targetClass = 'com.lcw.easydownload.bean.LoginEntity$DataBean$UserBean';
    var targetClass2 = 'com.lcw.easydownload.bean.LoginEntity$DataBean$ExtraBean';
    var targetClass3 = 'com.lcw.easydownload.bean.AuthorizeInfoEntity$DataBean';
    var gclass = Java.use(targetClass);
    var gclass2 = Java.use(targetClass2);
    var gclass3 = Java.use(targetClass3);
    var methodName = 'isVip';
    var methodName2 = 'getVipStartTime';
    var methodName3 = 'getVipEndTime';
    var methodName4 = 'getUserHeader';
    var methodName5 = 'getUserFlag';
    var methodName6 = 'getNickname';
    var methodName7 = 'getWechatVideoDownloadMethod';
    var methodName8 = 'getUpdateMd5Method';
    var methodName9 = 'getSnifferWebMethod';
    var methodName10 = 'getPdfOnWriteMethod';
    var methodName11 = 'getPdfOnLayoutMethod';
    var methodName12 = 'getM3u8Method';
    var methodName13 = 'getM3u8LabMethod';
    var methodName14 = 'getClipboardServiceName';
    var methodName15 = 'getBackUpMethod';
    var methodName16 = 'getAudioTaskName';

    gclass[methodName].implementation = function () {
            return true;
    }
    gclass[methodName2].implementation = function () {
            return 1661794954;
    }
    gclass[methodName3].implementation = function () {
            return 1977414154;
    }
    gclass[methodName4].implementation = function () {
            return "https://www.helloimg.com/images/2022/07/16/ZdBxo6.png";
    }
    gclass[methodName5].implementation = function () {
            return "圣洁的灵魂 | 鼻祖";
    }
    gclass[methodName6].implementation = function () {
            return "@昨天";
    }
    gclass2[methodName7].implementation = function () {
            return "com.lcw.easydownload.activity.WeChatVideoDownloadActivity";
    }
    gclass2[methodName8].implementation = function () {
            return "com.lcw.easydownload.activity.VideoUpdateMd5Activity";
    }
    gclass2[methodName9].implementation = function () {
            return "com.lcw.easydownload.activity.SnifferWebActivity";
    }
    gclass2[methodName10].implementation = function () {
            return "onWriteFinished";
    }
    gclass2[methodName11].implementation = function () {
            return "onLayoutFinished";
    }
    gclass2[methodName12].implementation = function () {
            return "com.lcw.easydownload.activity.M3U8Activity";
    }
    gclass2[methodName13].implementation = function () {
            return "com.lcw.easydownload.activity.M3U8LabActivity";
    }
    gclass2[methodName14].implementation = function () {
            return "com.lcw.easydownload.service.ClipBoardService";
    }
    gclass2[methodName15].implementation = function () {
            return "com.lcw.easydownload.activity.BackUpActivity";
    }
    gclass2[methodName16].implementation = function () {
            return "com.lcw.easydownload.task.GetAudioTask";
    }
    gclass3[methodName10].implementation = function () {
            return "onWriteFinished";
    }
    gclass3[methodName11].implementation = function () {
            return "onLayoutFinished";
    }
    gclass3[methodName14].implementation = function () {
            return "com.lcw.easydownload.service.ClipBoardService";
    }
    gclass3[methodName16].implementation = function () {
            return "com.lcw.easydownload.task.GetAudioTask";
    }
});