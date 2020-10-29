### Image

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





## 混合开发

- 原生页面+Flutter页面
- 原生模块嵌套Flutter
- Flutter模块嵌入到原生页面

### Flutter集成步骤

#### 1. 创建Flutter module

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

#### 2.添加Flutter module依赖

- 打开原生安卓工程

- 添加flutter依赖配置:

  - 打开Gradle Scripts/settings.gradle，添加代码

    ```java
    //...
    setBinding(new Binding([gradle:this]))
    evaluate(new File(
           settingsDir.parentFile,
           'flutter_module/.android/include_flutter.groovy'
    ))
    ```

  - 打开Gradle Scripts/build.gradle

    ```
    android {
    	// ...
    	defaultConfig {
    		//...
    		minSdkVersion 16
    	}
	compileOptions {
    		sourceCompatibility JavaVersion.VERSION_1_8
          targetCompatibility JavaVersion.VERSION_1_8
    	}
    }
    //...
    dependencies {
        // ...
        implementation project(':flutter')
    }
    ```
    
    
  
  

####  3.在Java/Object-c中调用Flutter module

##### Android

###### 1）使用FlutterFragment 的方式

```java
// Android
FragmentTransaction tx  = getSupportFragmentManager().beginTransaction();
FlutterFragment fragment = FlutterFragment.withNewEngine().initialRoute("{name:'devio',dataList:['aa','bb','cc']}").build(); // 可向Flutter传字符串
tx.replace(R.id.someContainer, fragment);
tx.commit();
```

```dart
// Flutter
import 'dart:ui';
String params = window.defaultRouteName;// 可传递json字符串，再解析
```

FlutterFragment可以做到:

- 初始化Flutter的路由；

- Dart的初始页面的飞入样式；

- 设置不透明和半透明背景；

- FlutterFragment是否可以控制Activity；

- FlutterEngine或者带有缓存的FlutterEngine是否能使用；

  

###### 2）通过FlutterActivity (参考https://zhuanlan.zhihu.com/p/216125535)
- 在AndroidManifest.xml注册activity

```xml
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize" />
```

- 打开FlutterActivity

```java
myButton.setOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    // startActivity(FlutterActivity.createDefaultIntent(MainActivity.this)); //可以在任何地方启动，但这里不会跳转到Flutter页面，因为没有提供跳转的地址
      
    // 打开页面并跳转
    startActivity(
      FlutterActivity
        .withNewEngine()
        .initialRoute("/") // 跳转到"/"路由
        .build(currentActivity)
      );
  }
});
```

- 使用FlutterEngineCache（提前实例化flutterEngine，优化打开速度）

  ```java
  // 创建MyApplication.java
  public class MyApplication extends Application {
      @Override
      public void onCreate() {
          super.onCreate();
          FlutterEngine flutterEngine = new FlutterEngine(this);
          flutterEngine.getNavigationChannel().setInitialRoute("/");
          flutterEngine.getDartExecutor().executeDartEntrypoint(DartExecutor.DartEntrypoint.createDefault());
          FlutterEngineCache.getInstance().put("my_engine_id", flutterEngine);
      }
  }
  ```

  ```xml
  <!-- 修改AndroidManifest.xml,指向创建的MyApplication.java -->
  <application android:name=".MyApplication">
      <!-- ... -->
  </application>
  ```

  ```javascript
  // MainActivity.java
  startActivity(FlutterActivity.withCachedEngine("my_engine_id").build(MainActivity.this));
  ```

##### IOS
// todo

####  4.编写Dart代码



####  5.运行项目



####  6.热重启



####  7.调试Dart代码



####  8.发布应用

