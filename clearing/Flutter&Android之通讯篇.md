### Flutter与Native通信机制

- 通过`Channel`来完成通讯（传输二进制，故有编解码过程）

  

  ![](../%5Cimages%5CDart%5Cchannel%E9%80%9A%E8%AE%AF.png)

  > 消息的传递是异步的

- Chainnel所支持的数据类型对照表

  ![](../images%5CDart%5Cchannel%E9%80%9A%E8%AE%AF%E6%89%80%E6%94%AF%E6%8C%81%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%AF%B9%E7%85%A7%E8%A1%A8.png)



#### Flutter定义三种不同类型的Channel

- BasicMessageChannel : 用于传递字符串和半结构化的信息，持续通讯，收到消息后可以回复此次消息；如：Native 将遍历到的文件信息陆续传递到Dart，再比如：Flutter将从服务的陆续获取到信息交给Native，Native处理完返回等；
- MethodChannel ：用于传递方法调用（method invocation）一次通讯：如Flutter调用Native拍照
- EventChannel ：用于数据流（event steams）的通讯，持续通讯，收到消息后无法回复此消息，通过长用于Native向Dart的通讯：如：手机电量变化，网络连接变化，陀螺仪，传感器等；

##### BasicMessageChannel的用法
###### Dart端：

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
    * @param callback
    **/
    void send(String message, BasicMessageChannel.Reply<String> callback) {
    	messageChannel. send (message, callback) ;
    }
    @override
    public void reply(String s) {

    }

```



##### MethodChannel的用法

###### Dart端：

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



###### Native端：

> 构造方法原型

```java
//会构造一个StandardMethodCodec . INSTANCE类型的MethodCodec
MethodChannel( Bina ryMessenger messenger, String name)
//或
MethodChannel( Bina ryMessenger messenger, String name, MethodCodec codec)
```

- BinaryMessenger messenger -消息信使，是消息的发送与接收的工具;
- String name - Channel的名字， 也是其唯- 标识符;
- MethodCodec codec -用作MethodChannel的编解码器;

> setMethodCallHandler方法原型

```java
setMethodCallHandler(@Nullable MethodChannel.MethodCallHandler handler)
```

- @Nullable MethodChannel. MethodCallHandlerhandler -消息处理器，配合
  BinaryMessenger完成消息的处理;

在创建好MethodChannel后，需要调用它的setMessageHandler方法为其设置-个消息处理器，以
便能加收来自Dart的消息。



> MethodChannel. MethodCallHandler原型

```java
public interface MethodCallHandler {
	void onMethodCall(MethodCall var1, MethodChannel.Result var2);
}
```

- onMethodCall(MethodCall call, MethodChannel. Result result) -用于接受消息，
  call是消息内容，它有两个成员变量String类型的call. method表示调用的方法名，Object 类
  型的call. arguments表示调用方法所传递的入参; MethodChannel. Result result是回
  复此消息的回调函数提供了result. success，result. error，result 。notImplemented
  方法调用;

```java
public class MethodChannelPlugin implements MethodCallHandler {
	private final Activity activity;
	/** * Plugin registration. */
	public static void registerWith(FlutterView flutterView) {
		MethodChannel channel = new MethodChannel(flutterView, "MethodChannelPlugin");
		MethodChannelPlugin instance = new MethodChanne LPlugin((Activity)flutterView.ge
		channel. JetMethodCallHandler ( instance);
	}
	private MethodChanneLPlugin(Activity activity) { 
		this.activity = activity;
    }
	@Override 
	public void onMethodCall (MethodCall call, Result result) {
		switch (call.method) {// 处理来自Dart的方法调用
			case "showMessage":
				showMessage(call. arguments());
				result.success("MethodChannelPlugin收到:“+ call. arguments) ;//返回结果给Dart
				break;
			default:
				result .notImplemented();//通知Dart端方法未实现
	}
    /** 
    *展示来自Dart的数据* 
    * @param arguments */
	private void showMessage(String arguments) {
		if (activity instanceof IShowMessage) {
			((IShowMessage)activity).onShowMessage(arguments);
        }
		Toast .makeText(activity, arguments, Toast .LENGTH SHORT).show();
    }
}

```



##### EventChannel

###### Dart端：

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



##### Native端：

> 构造方法原型

```
//会构造一个Standa rdMethodCodec . INSTANCE类型的MethodCodec
EventChanneL(BinaryMessenger messenger, String name )
//或
EventChanne (BinaryMessenger messenger, String name, MethodCodec codec)
```

- BinaryMessenger messenger -消息信使，是消息的发送与接收的工具;
- String name - Channel的名字，也是其唯一 标识符;
- MethodCodec codec -用作EventChannel的编解码器;

> setStreamHandler方法原型

```java
void setStreamHandLer(EventChannel.StreamHandler handler)
```

EventChannel. St reamHandler handler -消息处理器，配合BinaryMessenger完成消 息的处
理;在创建好EventChannel后， 如果要让其接收Dart发来的消息，则需要调用它的
setSt reamHandler方法为其设置一个消息处理。



> EventChannel. StreamHandler原型

```java
public interface StreamHandLer {
	void onListen(object args, EventChannel. EventSink eventSink) ;
    
	void onCancel(object o);
}
```

- void onListen(0bject args, EventChannel. EventSink eventSink) - Flutter Native监
  听事件时调用，object args 是传递的参数，EventChannel. EventSink eventSink 是
  Native回调Dart时的会回调函数，eventSink 提供success、error 与endofStream三个回
  调方法分别对应事件的不同状态：
- void onCancel(object o) - Flutter取消监听时调用;

```java
public class EventChannelPlugin implements EventChannel.StreamHandler {
	private List<EventChannel.EventSink> eventSinks = new ArrayList<>();
    
	static EventChannelPlugin registerWith(FlutterView flutterView) {
		EventChannelPlugin plugin = new EventChannelPlugin();
		new EventChannel(flutterView, "EventChannelPlugin" ) . setSt reamHandler(plugin);
		return plugin;
    }
	void sendEvent(Object params) {
		for(EventChannel.EventSink eventSink : eventSinks) {
			eventSink.success (params) ;
        }
	}
        
	@override
	public void onListen(0bject args, EventChannel.EventSink eventSink) {
		eventSinks.add(eventSink);
	@override
        
	public void onCancel(object 0) {

	}
}
```