**环境工具要求**：node >=7，npm，git，pm2

#### 使用git clone rendertron的源代码，本地编译代码

#####1.克隆源代码，进入源代码根目录，下载相关依赖包

````
git clone https://github.com/GoogleChrome/rendertron.git

cd rendertron

npm install
````

依赖包比较多，npm install过程可能很长,需要的话，可以切换国内npm源（另行百度）。

需要注意的是，rendertron默认启动的端口的3000，如需修改，可以在 rendertron/ 目录下新建文件 config.json,添加相关配置(按需添加)，下面展示默认配置：

```json
{
    "datastoreCache": false,
    "timeout": 10000,
    "port": "3000",
    "width": 1000,
    "height": 1000
}
```

每次修改配置后，都需要再次编译。

##### 2.编译源代码

```
npm run build
```

编译成功后，可以测试运行一下：

```
npm run start
```

可看到输出内容

```
Listening on port 3000
```

Ctrl + c停掉程序，接下来使用npm下载pm2管理node程序。

##### 3.使用pm2管理node程序

```
npm install pm2 -g
```

##### 启动程序

```
pm2 start build/rendertron.js
```



#####4.部署完毕

这个时候，如果需要测试一下是否部署成功，可以访问

```
localhost:3000/render/[单页面应用的地址，例如https://www.hongwanyg.com]
```

查看返回执行JavaScript渲染后的页面内容

---

##### 附上pm2的几个命令

```
# 启动并把程序加入list中
pm2 start [xxx.js]
# 查看程序列表
pm2 list
# 查看单个程序详细信息
pm2 show [name]
# 停止程序
pm2 stop www
# pm2 restart [xxx]
再次运行list中的程序
# 删除列表中的程序
pm2 delete [xxx]
```

#### 5.添加nginx配置

由于使用rendertron是为了让爬虫蜘蛛能够获取到网页内容，所以需要nginx根据爬虫的user agent来进行重定向，

下面只给出相关的配置项：

假设

rendertron服务的地址为：http://192.168.0.109:3000

门户网站访问的地址为：https://www.hongwanyg.com

```nginx
location / {
            # ...
            if ( $http_user_agent ~* "(Baiduspider|360Spider|Bingbot|Googlebot)"){
                rewrite ^/(.*)$  http://192.168.0.109:3000/render/https://www.hongwanyg.com/$1 last;
            }
            # ...
        }
```



配置完毕后重启一下nginx，再使用crul测试访问一下：

```
curl -I -A "Baiduspider" https://www.hongwanyg.com
```

可看到输出的信息中有：

```
Location: http://192.168.0.109:3000/render/https://www.hongwanyg.com
```

