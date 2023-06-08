Java.perform(function () {
    let URL = Java.use('java.net.URL');
    URL.$init.overload('java.lang.String').implementation = function (a) {
        global.toast(a);
        console.log('java.net.URL: ' + a);
        return this.$init(a);
    };
});

Java.perform(function x() {
    var CryptoUtils = Java.use("com.wangyin.platform.CryptoUtils"); encodeDataToServer
    CryptoUtils.encodeDataToServer.overload("java.lang.String", "java.lang.Long").implementation = function (args1, args2) {
        //overload 后接的参数都是这个a函数的参数
        console.log(args1)
        console.log(args2)
        return this.encodeDataToServer(args1, args2) //调用原方法
    }
});
