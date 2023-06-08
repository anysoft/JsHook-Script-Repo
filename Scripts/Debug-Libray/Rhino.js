

// by https://github.com/anysoft
var packageName = runtime.packageName

// settings 
testJson = true

testOkHttp = true
requestSwitch = true
responseSwitch = true
realcallSwitch = false
realcall1Switch = false



function findClassByName(className) {
    try {
        classType = XposedHelpers.findClass(className, classLoader);
        if (null != classType) {
            console.log('find ' + classType);
        }
    } catch (error) {
        console.log(error)
    }
}

// package 
if (packageName != 'com.uzero.cn.zhengjianzhao') {
    var activityThreadClass = XposedHelpers.findClass('android.app.ActivityThread', runtime.classLoader);
    XposedBridge.hookAllMethods(activityThreadClass, 'performLaunchActivity', XC_MethodHook({
        afterHookedMethod: function (param) {
            var mInitialApplication = XposedHelpers.getObjectField(param.thisObject, 'mInitialApplication');
            var classLoader = XposedHelpers.callMethod(mInitialApplication, 'getClassLoader');
            // test json 
            if (testJson) {
                console.log('starting to test json libs......');
                findClassByName('com.google.gson.Gson');
                findClassByName('org.json.JSONObject');
                // findClassByName('com.alibaba.fastjson.JSONObject');
            }

            if (testOkHttp) {
                console.log('starting to test okhttp libs......');
                findClassByName('okhttp3.OkHttpClient');
                findClassByName('okhttp3.Request');
                findClassByName('okhttp3.ResponseBody');
                // findClassByName('okhttp3.RealCall');
                // findClassByName('okhttp3.internal.connection.RealCall');

                if (requestSwitch) {
                    XposedBridge.hookAllMethods(XposedHelpers.findClass('okhttp3.Request', classLoader), 'build', XC_MethodHook({
                        beforeHookedMethod: function (param) {
                            // console.log(param);
                            // args = param.args;
                            request = param.getResult();
                            // console.log(request);

                            // request
                            url = XposedHelpers.getObjectField(request, 'url'); // HttpUrl
                            method = XposedHelpers.getObjectField(request, 'method'); // method
                            host = XposedHelpers.getObjectField(url, 'host'); // host
                            headers = XposedHelpers.getObjectField(request, 'headers'); // Headers
                            requestBody = XposedHelpers.getObjectField(request, 'body'); // body

                            // diy for data
                            console.log('method:' + method + 'url:' + url + 'requestBody:' + requestBody)
                        }
                    }));


                }

                if (responseSwitch) {
                    XposedBridge.hookAllMethods(XposedHelpers.findClass('okhttp3.ResponseBody', classLoader), 'string', XC_MethodHook({
                        afterHookedMethod: function (param) {
                            // console.log(param);
                            bodyString = param.getResult();
                            console.log('bodyString: ' + bodyString);

                            // diy for data
                        }
                    }));
                }

                if (realcallSwitch) {
                    XposedBridge.hookAllMethods(XposedHelpers.findClass('okhttp3.internal.connection.RealCall', classLoader), 'execute', XC_MethodHook({
                        afterHookedMethod: function (param) {
                            // console.log(param);
                            // args = param.args;
                            request = XposedHelpers.getObjectField(param.thisObject, 'originalRequest');
                            response = param.getResult();
                            // console.log('request:' + request);
                            // console.log('response:' + response);

                            // request
                            url = XposedHelpers.getObjectField(request, 'url'); // HttpUrl
                            method = XposedHelpers.getObjectField(request, 'method'); // method
                            host = XposedHelpers.getObjectField(url, 'host'); // host
                            headers = XposedHelpers.getObjectField(request, 'headers'); // Headers
                            requestBody = XposedHelpers.getObjectField(request, 'body'); // body


                            // response
                            if (null != response) {
                                responseBody = XposedHelpers.getObjectField(response, 'body'); // body
                                // console.log(responseBody.getClass().toString());
                                bodyString = responseBody.string();
                                // console.log(bodyString);


                                // diy for data
                            }
                            // gson = new com.google.gson.Gson();
                            // json = gson.toJson(request);//str
                            // json = new com.google.gson.Gson.toJson(request);//str
                            // console.log(json)
                            // console.log(new org.json.JSONObject(request).toString());

                            // console.log(result.body().string())
                        }
                    }));


                }
            }

            if (realcall1Switch) {
                XposedBridge.hookAllMethods(XposedHelpers.findClass('okhttp3.RealCall$AsyncCall', classLoader), 'execute', XC_MethodHook({
                    afterHookedMethod: function (param) {
                        // console.log(param);
                        // args = param.args;
                        request = XposedHelpers.getObjectField(param.thisObject, 'originalRequest');
                        response = param.getResult();
                        // console.log('request:' + request);
                        // console.log('response:' + response);

                        // request
                        url = XposedHelpers.getObjectField(request, 'url'); // HttpUrl
                        method = XposedHelpers.getObjectField(request, 'method'); // method
                        host = XposedHelpers.getObjectField(url, 'host'); // host
                        headers = XposedHelpers.getObjectField(request, 'headers'); // Headers
                        requestBody = XposedHelpers.getObjectField(request, 'body'); // body


                        // response
                        if (null != response) {
                            responseBody = XposedHelpers.getObjectField(response, 'body'); // body
                            // console.log(responseBody.getClass().toString());
                            bodyString = responseBody.string();
                            // console.log(bodyString);


                            // diy for data
                        }
                        // gson = new com.google.gson.Gson();
                        // json = gson.toJson(request);//str
                        // json = new com.google.gson.Gson.toJson(request);//str
                        // console.log(json)
                        // console.log(new org.json.JSONObject(request).toString());

                        // console.log(result.body().string())
                    }
                }));


            }
        }
    }));
}
