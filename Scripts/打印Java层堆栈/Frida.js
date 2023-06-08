Java.perform(
    function () {
        // com.dragon.read app 专用，其他app可以根据实际情况找需打印堆栈切入点
        var ToastCls = Java.use('com.dragon.read.util.ToastUtils');
        var ThrowableCls = Java.use('java.lang.Throwable');
        ToastCls.showCommonToast.overload('java.lang.String').implementation = function (arg0) {
            console.log("Java Stacktrace: " + arg0);
            var StackTrace = ThrowableCls.$new().getStackTrace()
            for (var stack in StackTrace) {
                console.log(StackTrace[stack]);
            }
            return this.showCommonToast(arg0);
        }
        console.log("hooked");
    }
);
