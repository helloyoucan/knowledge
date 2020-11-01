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

     

### Flutter与Native通信机制

- 通过`Channel`来完成通讯（传输二进制，故有编解码过程）

  ![](..\images\Dart\channel通讯.png)

  > 消息的传递是异步的

- Chainnel所支持的数据类型对照表

  ![](..\images\Dart\channel通讯所支持的数据类型对照表.png)



#### Flutter定义三种不同类型的Channel

- BasicMessageChannel : 用于传递字符串和半结构化的信息，持续通讯，收到消息后可以回复此次消息；如：Native 将遍历到的文件信息陆续传递到Dart，再比如：Flutter将从服务的陆续获取到信息交给Native，Native处理完返回等；
- MethodChannel ：用于传递方法调用（method invocation）一次通讯：如Flutter调用Native拍照
- EventChannel ：用于数据流（event steams）的通讯，持续通讯，收到消息后无法回复此消息，通过长用于Native向Dart的通讯：如：手机电量变化，网络连接变化，陀螺仪，传感器等；

##### BasicMessageChannel的用法
###### Dart端

> 构造方法原型

```dart
const BasicMessageChannel(this.name,this.codec);
```

- String name # Channel的名字，要和Native端保持一致
- MessageCodec<T> codec #消息的编解码器，要和Native端保持一致，有四种类型的实现，具体超快Native端的介绍



> setMessageHandler方法原型

```dart
void setMessageHandler(Future<T> handler(T message));
```

- Future<T> handler(T message) #消息处理器，配合BinarMessager完成消息的处理

在创建好BasicMessageChannel后，如果让其接收Native发来的消息，则需要调用它的setMessageHandler方法为其设置一个消息处理器



>send方法原型

```dart
Future<T> send(T message)
```

- T message #要传递给Native的具体消息
- Future<T> #消息发出去后，收到Native回复的回调函数

在创建好BasicMessageChannel后，如果要向Native发送消息，可以调用它的send方法向Native传递数据。

```dart
import 'package:flutter/services.dart';
  ...
  String showMessage = '';
  static const BasicMessageChannel _basicMessageChannel =
      const BasicMessageChannel('BasicMessageChannelPlugin',
          StringCodec()); //StringCodec()意思是发送String类型的消息

// 在构造函数里初始化BasicMessageChannel
  _MyHomePageState() {
    // 使用BasicMessageChannel接受来自Native的消息，并向Native回复
    _basicMessageChannel.setMessageHandler((message) => Future<String>(() {
          setState(() {
            showMessage = message;
          });
          return "收到Native的消息：" + message;
        }));
  }

 Future<void> sendMessageToNative() async {
    //使用BasicMessageChannel向Native发送消息，并接受Native的回复
    String response;
    try {
      response = await _basicMessageChannel.send("Flutter发出的1消息");
    } catch (e) {
      print(e);
    }
  }
```



###### Native端：

> 构造方法原型

```java
BasicMessageChannel(BinaryMessenger messenger, string name, MessageCodec<T> codec)
```

- BinaryMessenger messenger -消息信使，是消息的发送与接收的工具;
- String name - Channel的名字，也是其唯一标识符;
- MessageCodec<T> codec -消息的编解码器，它有几种不同类型的实现:
  - BinaryCodec -最为简单的种Codec, 因为其返回值类型和入参的类型相同，均为二进制格式(Android中为ByteBuffer, iOs中为NSData) 。实际上，BinaryCodec在编解码过程中什么都没做，只是原封不动将二进制数据消息返回而已。或许你会因此觉得BinaryCodec没有意义，但是在某些情况下它非常有用，比如使用BinaryCodec可以使传递内存数据块时在编解码阶段免于内存拷贝:
  - StringCodec -用于字符串与二进制数据之间的编解码，其编码格式为UTF-8;
  - JSONMessageCodec -用于基础数据与二进制数据之间的编解码，其支持基础数据类型以及列表、字典。其在iOS端使用了NSJSONSerialization作为序列化的工具，而在
  - StandardMessaneCordec -是BasiaMessaneChannel的默认编解码器其支持基础数据类型、二进制数据、列表、字典、其工作原理；

> setMessageHandler方法原型

```java
void setMessageHandLer(Bas icMessageChannel. MessageHandLer<T> handler)
```

- BasicMessageChannel.MessageHandler<T> handler -消息处理器，配合
  BinaryMes senger完成消息的处理;



在创建好BasicMessageChannel后，如果要让其接收Dart发来的消息，则需要调用它的
setMes sageHandler方法为其设置-个消息处理器。

> BasicMessageChannel.MessageHandler原型

```java
public interface Mes sageHandler<T> {
	void onMessage(T var1, Bas icMessageChannel. Reply<T> var2);
}
```

- onMessage(T varl, BasicMessageChannel. Reply<T> var2) -用于接受消息，var1是消
  息内容，var2是回复此消息的回调函数;



> send方法原型

```java
void send(T message)
void send(T message, Bas icMessageChannel. Reply<T> callback)
```

- T  message -要传递给Dart的具体信息;
- Bas icMessageChannel. Reply<T> callback -消息发出去后，收到Dart的回复的回调函
  数;

在创建好BasicMessageChannel后，如果要向Dart发送消息，可以调用它的send方法向Dart传递
数据。

```java
public class BasicMessageChanneLPlugin implements BasicMessageChannel.MessageHandler<String>{
    private final Activity activity;
    private final Bas icMes sageChannel<string> messageChannel;
    
	static Bas icMessageChanne lPlugin registerWith(FlutterView flutterView) {
		return new BasicMessageChanneLPlugin(flutterView);
    }
	private BasicMessageChannelPlugin(F lutterView flutterView) {
		this.activity = (Activity) flutterView. getContext();
		this.messageChannel = new Bas icMessageCfannel<>(flutterView,"BasicMessageChannelP
		//设置消息处理器，处理来自Dart的消息
		messageChannel. setMes sageHandler (this);
   }
	@Override
	public void onMessage(String s, BasicMessageChannel.Reply<String> reply) {// 处理Dart发习
		reply. reply("Bas icMessageChannel收到:”+ s);// 可以通过reply进行回复
		if (activity instanceof IShowMessage) {
			((IShowMessage) act 1vity) . onShowMessage(s);
        }
		Toast.makeText(activity,s,Toast.LENGTH_ SHORT).show();
    }
                     
    /** *向Dart发送消息，并接受Dart的反馈水
    * @param message 要给Dart发送的消息内容寒
    * @param ca I
    **/
    void send(String message, BasicMessageChannel.Reply<String> callback) {
    	messageChannel. send (message, callback) ;
    }
    @override
    public void reply(String s) {

    }

```



##### MethodChannel的用法

###### Dart端

> 构造方法原型

```dart
const MethodChannel(this.name,[this,codec = const StandardMethodCodec()])
```

- String name # Channel的名字，要和Native端保持一致
- MessageCodec<T> codec #消息的编解码器，默认是StandardMethodCodec，要和Native端保持一致

> invokeMethod 方法原型

```dart
Future<T> invokeMethod<T>(String mtehod,[ dynamic argments ])
```

- String name # 要调用Native的方法名
- [ dynamic argments ] #调用Native方法传递的参数，可不传



```dart
import 'package:flutter/services.dart';

...
  static const MethodChannel _methodChannelPlugin = const MethodChannel('methodChannelPlugin');
  
Future<void> sendOnceMessageToNative() async {
 	String response;
 	try{
 		response = await _methodChannelPlugin.invokeMethod('send','test message');
	}on PlatformException catch(e){
 		print(e);
 	}
}
```



##### EventChannel



###### Dart端

> 构造方法原型

```dart
const EventChannel(this.name,[ this.codec = const StandardMethodCodec()]);
```

- String name # Channel的名字，要和Native端保持一致
- MessageCodec<T> codec #消息的编解码器，默认是StandardMethodCodec，要和Native端保持一致

> receiveBroadcastStream 方法原型

```dart
Stream<dynaimic> receiveBroadcastStream([dynamic arguments]);
```

- dynamic arguments #监听事件时向Native传递的数据；



初始化一个广播流用于从channel中接收数据，它返回一个Steam接下来需要调用Steam的listen方法来完成注册，另外需要在也买你销毁时调用Steam的cancel方法来取消监听：

```dart
import 'dart:async';

String showMessage = '';
static const EventChannel _eventChannelPlugin = EventChannel('EventChannelPlugin');

StreamSubscription _streamSubscription;
void initState() {
  _streamSubscription = _eventChannelPlugin
      .receiveBroadcastStream()
      .listen(_onToDart, onError: _onToDartError);
  super.initState();
}

void _onToDart(message) {
  setState(() {
    showMessage = message;
  });
}

  void _onToDartError(error) {
    print(error);
  }

@override
void dispose() {
    // widget销毁1时取消监听
  if (_streamSubscription != null) {
    _streamSubscription.cancel();
    _streamSubscription = null;
  }
  super.dispose();
}
```



