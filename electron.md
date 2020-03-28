##### 1.概念

- Electron 基于 Chromium 和 Node.js, 让你可以使用 HTML, CSS 和 JavaScript 构建应用。
-  跨平台，兼容 Mac、Windows 和 Linux，可以构建出三个平台的应用程序
- 一种集成了浏览器环境、NodeJS环境、提供了系统的桌面应用开发方式

#### 2.主进程 vs 渲染器进程

##### 启动：

在主进程中，当app.whenReady()后，可以通过new BrowserWindow(options)创建渲染进程，通过win.loadURL或win.loadFile加载网页。（win为BrowserWindow的实例）

##### 通讯

```javascript
// main
//1.
ipcMain.on('msg-name', (event, arg) => {
  console.log(arg) // 接收
  event.reply('msg-name-reply', 'pong') //接收后可发送msg-name-reply消息回复
})
//2.
win.webContents.send('msg-name2') //主动向某个渲染进程发送
```

```javascript
// renderer
//1.
ipcRenderer.on('msg-name-reply', (event, arg) => {
  console.log(arg) // 接收回复
})
ipcRenderer.send('msg-name', 'ping') //发送
//2.
ipcRenderer.on('msg-name2', (event, arg) => {
  console.log(arg) // 接收回复主线程主动发送的消息
})

```

##### 网页间共享数据

1. HTML5 API （localStorage 、sessionStorage、IndexedDB）

2. global.sharedObject

   ```javascript
   // 在主进程中
   global.sharedObject = {
     someProperty: 'default value'
   }
   ```

   ```javascript
   // 在第一个页面中
   require('electron')
       .remote
       .getGlobal('sharedObject')
       .someProperty = 'new value'
   ```

   ```javascript
   // 在第二个页面中
   require('electron')
       .remote
       .getGlobal('sharedObject')
       .someProperty
   ```

   

##### 3. 构建

使用electron-builder

在package.json新增

```javascript
"build": {  // 这里是electron-builder的配置
    "productName":"xxxx",//项目名 这也是生成的exe文件的前缀名,重复会导致不同程序会安装到统一目录
    "appId": "com.xxx.xxxxx",//包名  ,唯一id,id相同会导致覆盖安装
    "copyright":"xxxx",//版权  信息
    "directories": { // 输出文件夹
      "output": "build"
    }, 
    // windows相关的配置
    "win": {  
      "icon": "xxx/icon.ico",//图标路径 
       "target": [{
           "target": "nsis",// 我们要的目标安装包
           "arch": [ // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
        "x64", 
        "ia32"
      ]
       }] 
    }
     "nsis": {
      "oneClick": false, // 是否一键安装
      "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      "allowToChangeInstallationDirectory": true, // 允许修改安装目录
      "installerIcon": "./build/icons/aaa.ico",// 安装图标
      "uninstallerIcon": "./build/icons/bbb.ico",//卸载图标
      "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
      "createDesktopShortcut": true, // 创建桌面图标
      "createStartMenuShortcut": true,// 创建开始菜单图标
      "shortcutName": "xxxx", // 图标名称
      "include": "build/script/installer.nsh", // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
      "script" : "build/script/installer.nsh" // NSIS脚本的路径，用于自定义安装程序。 默认为build / installer.nsi  
},   
}
```



#### 4.自动更新

使用electron.updater

在package.json新增

```
build:{
 "publish": {
      "provider": "generic",//一般的更新
      "url": "http://q7bp10v65.bkt.clouddn.com/electron-update/" //存放更新资源的地方
    }
}
```

构建成功后，将会产生{productName}.exe和builder-effective-config.yaml等，使用自动更新需要将这两个文件放到build.publish.url的服务器上

1.更新逻辑

```javascript
const { autoUpdater } = require('electron-updater')
 autoUpdater.autoDownload = false // 关闭自动下载
autoUpdater.checkForUpdates()
autoUpdater.on('update-available', e => {
      autoUpdater.downloadUpdate() //  手动下载
})
```

2.若不使用这样存放更新资源的方式,可以使用"electron-updater": "^2.21.10"(v4.x中已经没有这个api):

```javascript
autoUpdater.setFeedURL('https://www.baidu.com/') // 同build.publish.url,这里一定要符合http协议的url
autoUpdater.doDownloadUpdate({
        updateInfo:{
        	version: info.version,
      		files: [{
          			sha512: info.file.sha512, // md5校验
          			size: info.file.size,
          			url: info.file.url
        		}],
      		path: info.file.url,
      		sha512: info.file.sha512,
      		releaseDate: new Date(info.releaseDate)//发布日期
        }
})
```

要注意的是,上面的代码是通过设置必需的更新信息,达到不需要调用autoUpdater.checkForUpdates()的方式去下载指定资源的行为

- sha512是在打包安装程序后,在latest.yml出现的md5,用于检验文件是否下载完整
- updateInfo的数据,均可在latest.yml找到,除了url