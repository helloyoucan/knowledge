#### Image

- new Image #从ImageProvider获取图像（依赖第三方包provider_path）
- new Image.asset #使用key从AssetBundle获得的图像
- new Image.network #从网络中获取图片
- new Image.file #从本地文件中获取图片
- new Image.memory #用于从Uint8List获取图像

支持的图片格式：JPEG, PNG, GIF, ANIMATED GIF, WEBP, ANIMATED WEB, BMP, WBMP





- MediaQuery.removePadding 移除padding
- NotificationListener 监听滚动事件
- ListView 滚动列表
- Stack 类似absolute定位
- Opacity 设置子wedgit的透明度
- http 第三方请求库
- FutureBuilder用于需要异步请求api的widget
- shared_preferences 操作本地存储
- https://javiercbk.github.io/json_to_dart/ 根据json生成实体类
- ExpansionTile 可展开的列表
- FractionallySizeBox 撑满宽度（百分比布局）
- GridView .count 网格布局
- RenfreshIndicator 实现下拉刷新
- ScrollController监听列表滚动位置，实现加载更多（ListVIew的controller参数）





##### 混合开发

- 原生页面+Flutter页面
- 原生模块嵌套Flutter
- Flutter模块嵌入到原生页面

#### Flutter集成步骤

##### 1. 创建Flutter module

```shell
cd xxx/flutter_hybrid/ #切换到原生项目的上一级目录
flutter create -t module flutter_module #创建一个flutter模块
```

flutter_module目录结构

```shell
├── .android #flutter_module的Android宿主工程
├── .ios #flutter_module的iOS宿主工程
├── lib #flutter_module的Dart部分代码
├── .dart_tool
├── .gitignore
├── .idea
├── .metadata
├── .packages
├── flutter_module.iml
├── flutter_module_android.iml
├── pubspec.lock
├── pubspec.yaml #flutter_module的项目依赖配置文件
├── README.md
└── test
```

- 因为宿主工程的存在，flutter_module在不加额外配置的清空下是可以独立运行的
- 通过安装了Flutter和Dart的AndroidStudio 打开这个flutter_module项目，通过运行按钮是可以直接运行它的

##### 2.添加Flutter module依赖



#####  3.在Java/Object-c中调用Flutter module



#####  4.编写Dart代码



#####  5.运行项目



#####  6.热重启



#####  7.调试Dart代码



#####  8.发布应用

