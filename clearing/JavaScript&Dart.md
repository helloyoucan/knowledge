### Symbol

 ***JavaScript*** : Symbol是将基础数据转换为**唯一标识符**，可以将负责引用数据类型转换为对象数据类型的键名。

 ***Dart*** : Symbol是不透明的动态字符串名称，用于反映库中的元数据（**反射的概念**）。用Symbol可以获得或引用类的一个镜像，用法和JS中的基本一致。(语法"#+字符串标识")

 ```dart
 void main() {
   Map test = new Map();
   test[#t] = 'symbol test';
   print(test); // {Symbol("t"): symbol test}
   print(test[#t]); //symbol test
   print(test[Symbol('t')]); //symbol test
   print(#t); //Symbol("t")
   print(#t == Symbol('t')); //true
 }
 ```

### Undefined和Null

***JavaScript*** ： JavaScript是动态脚本，存在脚本在运行期间undefined的情况

***Dart*** : 静态脚本

### Map和List

***JavaScript*** ： 

***Dart*** : 

###弱类型(var,object,dynamic)

***JavaScript*** ： 

***Dart*** : 

### 基础运算符

***JavaScript*** ： 

***Dart*** : 

### 函数

***JavaScript*** ： 

***Dart*** : 

### 类

***JavaScript*** ： 

***Dart*** : 

### 命名构造函数

***JavaScript*** ： 

***Dart*** : 

### 访问控制

***JavaScript*** ： 

***Dart*** : 

### 抽象类和泛型类

***JavaScript*** ： 

***Dart*** : 

### 库与调用

***JavaScript*** ： 

***Dart*** : 

### 开发Dart库

***JavaScript*** ： 

***Dart*** : 

### Dart调用库

***JavaScript*** ： 

***Dart*** : 