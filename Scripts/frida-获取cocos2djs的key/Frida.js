Interceptor.attach(Module.findExportByName("libcocos2djs.so", "xxtea_decrypt"), {

    onEnter: function (args) {

        console.log('KEY:' + Memory.readUtf8String(args[2]));

        console.log(args[2]);

    },

    onLeave: function (retval) {

    }

});
