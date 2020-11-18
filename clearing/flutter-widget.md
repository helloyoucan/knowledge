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
- FractionallySizedBox #内容撑满整个高度（垂直方向）
- Expanded #水平方向撑满父布局
- FractionallySizedBox #内容撑满整个高度
- PhysicalModel #实现圆角（裁切），并且子元素的超出隐藏
- MediaQuery.of(context).size.width 获取屏幕宽度
- LimitedBox #设置最大高度和最大宽度，可用于文字超出显示省略号
- flutter_staggered_grid_view #第三方库，实现瀑布流



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

- 打开模拟器，或连接一个设备到电脑上

- 关闭APP，然后运行`flutter attach`

  ```shell
  cd flutter_hybrid/flutter_module
  flutter attach
  ```

  然后通过提示来进行热加载/热重启，在终端输入：

  - r 热加载
  - R 热重启
  - h 获取帮助
  - d 断开连接

####  7.调试Dart代码

- 关闭APP
- 点击AndroidStudio的Flutter Attach 按钮（需要安装过Flutter和Dart插件）
- 启动APP
- 然后可以调试普通项目那样来调试混合开发下的Dart代码

####  8.发布应用

- 生成Android签名证书

  签名证书需要一个证书用于为APP签名，生成签名证书可以Android Studio以可视化的方式生成，也可使用终端命令行的方式生成

- 设置Gradle变量

  1. 将签名证书copy到android/app目录下

  2. 编辑~/.gridle/gridle.properties或../android/gridle.properties（一个是全局gradle.properties，一个是项目中的gridle.properties），根据需要选择，然后加入如下代码

     ```properties
     MYAPP_RELEASE_STORE_FILE=andrid_keystore.jks   #你的keystore文件路径,放到/app文件夹下
     MYAPP_RELEASE_KEY_ALIAS=andrid_keystore    #keystore文件存放alias
     MYAPP_RELEASE_STORE_PASSWORD=密码
     MYAPP_RELEASE_KEY_PASSWORD=密码
     ```

  3. 在gradle配置中添加签名配置

     编辑android/app/build.gradle文件添加如下代码：

     ```
     ...
     android {
     	...
     	defauleConfig { ... }
     	signingConfigs {
     		release {
     			storeFile file(MYAPP_RELEASE_STORE_FILE)
     			storePassword MYAPP_RELEASE_STORE_PASSWORD
     			keyAlias MYAPP_RELEASE_KEY_ALIAS
     			keyPassword MYAPP_RELEASE_KEY_PASSWORD
     		}
     	}
     	buildTypes {
     		release {
     			...
     			signingConfig signingCOnfigs.release
     		}
     	}
     
     }
     ```

  4. 签名打包APK

     terminal 进入项目下的android目录，运行如下代码：

     ```shell
     ./gradlew assembleRelease
     ```

     





## Package类型

- Dart包
- 插件包（包括安卓，ios，dart的代码）



##全面屏适配

#### Ios:

###### 1.使用Scaffold的appBar和bottomNavigationBar不需要额外适配，Scaffold框架内部已处理适配

###### 2.手动适配

- 采用SafeArea来包裹页面，SafeArea是用于适配全免面屏的widget。（相对简单，但不够灵活）
- 使用MediaQuery.of(context).padding获取屏幕周围的padding，然后根据padding自己实现对安全区域的控制。（相对复杂吗，但灵活性高，MediaQuery.of(context).padding需要在MaterialApp内此才能使用）

#### Android:

> 除了和ios一样的两种方式，还需要做一些处理

当显示导航栏时此区间是整个屏幕区间减去导航栏的区间，当隐藏导航栏时就是整个屏幕的区间。按Google的要求如果应用未做相应适配此区间长宽比必
须是在1.3333和1.86之间。

当设备屏幕足够大时，如三星S8(18.5:9),此时除去导航栏应用显示尺寸的长宽比还是大于1.86的,
为了满足Google CDD的要求，应用就无法按之前的全屏进行显示，就会出现黑边。



应用通过如”下两种方法修改AndroidManifest . xml均可以默认全屏显示:

1. 针对Activity添加android:resizeableActivity = "true",此设置只针对Activity生效，且增加了此
   属性该activity也会支持分屏显示;
2. 设置targetSdkVersion>= =26，也就是O版本; 



**应用通过如”下两种方式均可以设置应用支持的最大显示比例。如果应用设置的支持最大比例是2，而
设备实际比例是2.5，则还是无法全屏显示，会出现黑边:**

1. 添加android:MaxAspectRatio，此设置项可以针对Application和Activity生效，对应的是应用
   支持的最大比例，此属性需要基于O版本开发环境才可以编译通过;
2. 添加android. max_ aspect :

```xml
 <!--适配全面屏-->
<meta-data
	android:name="android.max_ aspect"
	android:value="2.1" />
```

应用适配建议采用meta-data的方式，具体可以参考Android Developers Blog相对原有16:9设备,
当前更大屏的设备无论是FHD还是2K设备,短边的像素、density的取值都是一 样的，只是长边变长
了，所以对于应用适配的资源和原有16:9的设备基本- 致。

对于列表形式的应用，如:微信、网易新闻等，只是显示的内容变多，基本无影响;对于整屏的应
用，应用为了保证多种屏幕的适配，需遵循Google的适配建议，可以参考Google官网页面中的最佳
做法章节进行修改适配;对于使用整幅图片作为背景时需注意图片的填充方式，否则可能会无法填
充整个屏幕。如:使用背景是用ImageView建议将其scaleType设置为CENTER_ .CROP, 其意义是:
按比例扩大图片的size居中显示，使得图片长(宽)等于或大于View的长(宽)。







#### Flutter项目优化

- 代码优化
  - 冗余代码
  - 封装
- 包大小
- 流畅性优化
- 内存优化



#### Android打包发布指南（可参考官网）

- 添加APP名称和快照
  - AndroidManifest.xml
  - main.dart
- 检查和配置build.gradle文件
  - applicationId
  - versionCode&versionName
  - minSdkVersion&targetSdkVersion
- 添加APP启动图标
- 签名APP
  - 在Android studio 创建证书
  - 使用证书
- 配置APK混淆
- 构建一个release包
- 发布到Android市场



#### IOS打包发布指南

- 申请IOS企业级或个人开发者账号
- 在APP Store Connect注册你的APP
- 为App注册Bundle ID
- 添加APP名字
- 设置Bundle ID
- 添加APP启动图标
- 设置签名账号
- 创建存档
  - flutter build ios
  - 这一步将创建一个构建存档，并上传到App Store Connect



#### Flutter升级与适配指南

- 更新FlutterSDK和packages
- 切换Flutter channels(只更新FlutterSDK)
- 只更新包
- 适配