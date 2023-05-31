let store = {
    "author": "墨殇",
    "markdown": "https://cdn.jsdelivr.net/gh/bcmdy/JsHook-Script-Repo/com.iplay.assistant/README.md",
    "ctime": "2023年5月11日 19:46:14",
    "source": "https://github.com/bcmdy/JsHook-Script-Repo/tree/main/com.iplay.assistant",
    "id": "GG大玩家Patch",
    "title": "GG大玩家Patch",
    "type": "Frida",
    "version": "2.0",
    "url": "https://cdn.jsdelivr.net/gh/bcmdy/JsHook-Script-Repo/com.iplay.assistant/GG大玩家_Frida_V2.0.js_enc.js",
    "desc": "GG大玩家破解补丁"
};
store = {
    "author": "墨殇",
    "markdown": "https://raw.githubusercontent.com/bcmdy/JsHook-Script-Repo/main/GG大玩家Patch/README.md",
    "ctime": "2023年5月11日 19:46:14",
    "source": "https://github.com/bcmdy/JsHook-Script-Repo/tree/main/GG大玩家Patch",
    "id": "GG大玩家Patch",
    "title": "GG大玩家Patch",
    "type": "Frida",
    "version": "2.0",
    "url": "https://raw.githubusercontent.com/bcmdy/JsHook-Script-Repo/main/GG大玩家Patch/GG大玩家_Frida_V2.0.js_enc.js",
    "desc": "GG大玩家破解补丁"
}
const fs = require('fs');
const path = require('path');
var filePath = path.resolve('.');
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
    let ret;
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if (isFile) {
                            if (filedir.indexOf('README.md') >= 0) {
                                console.log(filedir);// 读取文件内容
                                var content = fs.readFileSync(filedir, 'utf-8');
                                // console.log(content);

                                let author = content.match(/# 作者\s+@(.+)[^.]/igm)
                                console.log(author);
                                let store = {
                                    "author": "墨殇",
                                    "markdown": "https://raw.githubusercontent.com/bcmdy/JsHook-Script-Repo/main/GG大玩家Patch/README.md",
                                    "ctime": "2023年5月11日 19:46:14",
                                    "source": "https://github.com/bcmdy/JsHook-Script-Repo/tree/main/GG大玩家Patch",
                                    "id": "GG大玩家Patch",
                                    "title": "GG大玩家Patch",
                                    "type": "Frida",
                                    "version": "2.0",
                                    "url": "https://raw.githubusercontent.com/bcmdy/JsHook-Script-Repo/main/GG大玩家Patch/GG大玩家_Frida_V2.0.js_enc.js",
                                    "desc": "GG大玩家破解补丁"
                                }

                                //ret.push(store);
                            }
                        }
                        if (isDir) {
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
    return ret;
}
// console.log(files);




// var url = 'Store.json';
// if (fs.existsSync(url)) {
//     console.log('start read file:', url);
//     let data = fs.readFileSync(url, 'utf-8');
//     data = data.replaceAll('https://raw.githubusercontent.com/bcmdy/JsHook-Script-Repo/main/', 'https://cdn.jsdelivr.net/gh/bcmdy/JsHook-Script-Repo/');
//     // data = data.replaceAll('/main/', '/');
//     // console.log(data);
//     fs.writeFileSync('Store-cdn.json', data);
//     console.log('Success!');

//     // let zz = data.match(/:\/\/raw.githubusercontent.com\/(.*?)\/(.*?)\/main\/(.*?)\/(.*?)\"/ig);
//     // zz.forEach(element => {
//     //     console.log(element);
//     //     let reg = /:\/\/raw.githubusercontent.com\/(.*?)\/(.*?)\/main\/(.*?)\/(.*?)\"/i;
//     //     let user = element.match(reg)[1];
//     //     let repo = element.match(reg)[2];
//     //     let name = element.match(reg)[3];
//     //     let file = element.match(reg)[4];
//     //     console.log(user, repo, name, file)
//     // });
// };


// console.log(store);