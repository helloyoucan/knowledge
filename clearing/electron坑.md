1. 主线程main.js更新的内容需要重新运行才生效

2. 需要使用electron-builder或者electron-packager 打包

3. alert后，点击窗口内的input输入框，无法focus,无法通过点击输入框进行输入，需要再任务栏选中该窗口才恢复正常。

4. electron-builder打包时，windows下favicon.ico像素不能小于256*256，但是在网站在线将png转换成ico文件，体积达300+k,导致打包后窗口左上角的图标显示不了，需要用IconWorkshop软件转换，经过处理，变成了40+k，可以显示了。

5. electron下载慢，可以修改源

   ```shell
   # 永久
   npm config set registry https://registry.npm.taobao.org
   #临时
   npm --registry https://registry.npm.taobao.org install express
   ```

6. npm install时，electron下载不了

   ```shell
   # 下载的路径为
   https://npm.taobao.org/mirrors/electron/v8.1.1/
   # 文件实际存在的路径为
   https://npm.taobao.org/mirrors/electron/8.1.1/
   
   #解决方式
   #electron 官方提供了修改目录名称的环境变量electron_custom_dir
   npm config set electron_custom_dir "8.1.1"
   ```

7. 在OSX系统下，使用compressing解压文件，重复解压同一个文件，获得的路径是错误的，路径中的最后一个文件夹会被替换为.DS_Store

8. electron@5.0.8在mac下打开文件窗口，有时候回导致软件强退（mac 系统v10.15+）

9. electron@8.2.0 拦截窗口关闭事件，若在网页上没进行过交互，会拦截不了该事件

   https://github.com/cypress-io/cypress/issues/2118
