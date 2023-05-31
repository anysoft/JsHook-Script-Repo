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
var path = 'Store.json';
if (fs.existsSync(path)) {
    console.log('start read file:', path);
    let data = fs.readFileSync(path, 'utf-8');
    data = data.replaceAll('https://raw.githubusercontent.com/bcmdy/JsHook-Script-Repo/main/', 'https://cdn.jsdelivr.net/gh/bcmdy/JsHook-Script-Repo/');
    // data = data.replaceAll('/main/', '/');
    // console.log(data);
    fs.writeFileSync('Store-cdn.json', data);
    console.log('Success!');

    // let zz = data.match(/:\/\/raw.githubusercontent.com\/(.*?)\/(.*?)\/main\/(.*?)\/(.*?)\"/ig);
    // zz.forEach(element => {
    //     console.log(element);
    //     let reg = /:\/\/raw.githubusercontent.com\/(.*?)\/(.*?)\/main\/(.*?)\/(.*?)\"/i;
    //     let user = element.match(reg)[1];
    //     let repo = element.match(reg)[2];
    //     let name = element.match(reg)[3];
    //     let file = element.match(reg)[4];
    //     console.log(user, repo, name, file)
    // });
};


// console.log(store);