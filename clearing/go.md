https://www.runoob.com/go/go-tutorial.html

## 语言基础组成

- 包声明
- 引入包
- 函数
- 变量
- 语句&表达式
- 注释



## 数据类型

- 布尔型   `bool`
- 数字类型 `int` & `float`
- 字符串类型 Go的字符串的字节使用`UTF-8`编码标识`Unicode`文本
- 派生类型
  - 指针 （Pointer）
  - 数组
  - 结构化 （`struct`）
  - 联合体（`union`）
  - 函数
  - 切片
  - 接口 （`interface`）
  - Map
  - Channel

### 数字类型

###### go有基于架构的类型,如：`int`、`uint`和`uintptr`

整型

| 类型       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| `uint8`    | 无符号 8 位整型 (0 到 255)                                   |
| `uint16` | 无符号 16 位整型 (0 到 65535)                                |
| `uint32` | 无符号 32 位整型 (0 到 4294967295)                           |
| `uint64` | 无符号 64 位整型 (0 到 18446744073709551615)                 |
| `int8`   | 有符号 8 位整型 (-128 到 127)                                |
| `int16`  | 有符号 16 位整型 (-32768 到 32767)                           |
| `int32`  | 有符号 32 位整型 (-2147483648 到 2147483647)                 |
| `int64`  | 有符号 64 位整型 (-9223372036854775808 到 9223372036854775807) |

###### 浮点型

| 类型           | 描述                  |
| -------------- | --------------------- |
| `float32`    | IEEE-754 32位浮点型数 |
| `float64`    | IEEE-754 64位浮点型数 |
| `complex64`  | 32 位实数和虚数       |
| `complex128` | 64 位实数和虚数       |

###### 其他数字类型

| 类型      | 描述                         |
| --------- | ---------------------------- |
| `byte`    | 类似 `uint8`                 |
| `rune`    | 类似`int32`                  |
| `uint`    | 32 或 64 位                  |
| `int`     | 与 `uint` 一样大小           |
| `uintptr` | 无符号整型，用于存放一个指针 |





## 变量

### 变量声明

1. 指定变量类型，声明后若不声明赋值，则使用默认值

   ```go
   var a int = 10
   ```

2. 根据值自行判定变量类型

   ```go
   var b int = 10 
   ```

3. 省略var，注意 := 左侧的变量不能是已经声明过的，否则会编译报错

   ```go
   c : = 10
   ```

##### 默认值

- 整型如`int8`、`byte`、`int16`、`uint`、`uintprt`等，默认值为0。
- 浮点类型如`float32`、`float64`，默认值为0。
- 布尔类型`bool`的默认值为false。
- 复数类型如`complex64`、`complex128`，默认值为`0+0i`。
- 字符串string的默认值为”“。
- 错误类型error的默认值为nil。
- 对于一些复合类型，如指针、切片、字典、通道、接口，默认值为nil。而数组的默认值要根据其数据类型来确定。例如：var a [4]int，其默认值为[0 0 0 0]。

### 多变量声明

```go
// 1 类型相同的多个变量，非全局变量
var a, b, c int
a, b, c = 1, 2, 3
// 2 不需要显示声明类型，自动推断
var a, b, c = 1, 2, 3
// 3 出现在:=左侧的变量不应该是已经被声明过的
a, b, c :=1, 2, 3
```



### 值类型和引用类型

- int、float、bool、和string等基本类型都属于值类型，值类型的变量直接指向存在内存中的值

  ![](https://raw.githubusercontent.com/helloyoucan/cloudImg/master/imgs/1.png)
  
- 当使用等号`=`将一个变量的值复制给另外一个变量，如：`j=i`，实际上是在内存中将`i`的值进行了拷贝：

  ![](https://raw.githubusercontent.com/helloyoucan/cloudImg/master/imgs/2.png)

  可以通过 `&i`来获取变量`i`的内存地址。

  值类型的变量的值存储子栈中。

- 更复杂的数据通常会需要使用多个**字**，这些数据一般使用引用类型保存

- 一个引用类型的变量`r1`存储的是`r1`的值所在的内存地址（数字），或内存地址中第一个字所在的位置。

  ![](https://raw.githubusercontent.com/helloyoucan/cloudImg/master/imgs/3.png)

  这个内存地址称之为**指针**，这个指针实际上也被存在另外的某一个**字**中。

  同一个引用类型的指针指向的多个**字**可以是在连续的内存地址中（内存布局是连续的），
  
  当使用复制语句`r1 = r2`时，只有引用（地址）被复制。



### 使用`：=`赋值操作符

- 使用变量的首选形式
- 只能被用在函数体内，不可用于全局变量的声明和赋值。
- 使用操作符`:=`可以高兴地创建一个新的变量，称之为初始化声明。

**注意：**

- 不能对变量重复初始化声明
- 不能在定义变量a之前使用它
- 声明了局部变量必须在相同的代码块中使用（声明后赋值不是使用），否则会编译错误
- 全局变量允许声明但不使用
- 交换两个变量的值，则可以简单地使用 a, b = b, a
- 空白标识符 _ 也被用于抛弃值，如值 5 在：_, b = 5, 7 中被抛弃
- _ 实际上是一个只写变量，你不能得到它的值（用于接收函数返回的某个变量，而不是全部接收）



## 常量

- 一个简单的标识符，运行时不会被修改的量

- 数据类型可以是布尔型，数字型（整数型，浮点型和复数），和字符串型

- 定义格式

  ```go
  const identifier [type] = value
  ```

- 常量可以用`len()`, `cap()`,`unsafe.Sizeof()`常量计算表达式的值（常量表达式中，函数必须是内置函数）

  ```go
  const (
      a = "abc"
      b = len(a)
      c = unsafe.Sizeof(a)
  )
  ```



#### `iota`

> 特殊常量，可以认为是一个可被编译器修改的常量

在每一个`const`关键字出现时，被重置为0，然后再下一个`const`出现之前，每出现一次iota，其所代表的数字会自动增加1。

**用法**

```go
//1
const (
    a = iota //0
    b //1
    c //2
)
//2
package main
import "fmt"
func main() {
    const (
            a = iota   //0
            b          //1
            c          //2
            d = "ha"   //独立值，iota += 1
            e          //"ha"   iota += 1
            f = 100    //iota +=1
            g          //100  iota +=1
            h = iota   //7,恢复计数
            i          //8
    )
    fmt.Println(a,b,c,d,e,f,g,h,i) //0 1 2 ha ha 100 100 7 8
}
```



## 运算符

###### 算数运算符

```go
+, -, *, /, %, ++ ,--
```

###### 关系运算符

```go
==, !=, >, <, >=, <=
```

逻辑运算符

```go
&&, ||, !
```

位运算符

```go
&, |, ^, >>, <<
```

赋值运算符

```go
=, +=, -=, *=, /=, %=, <<=, >>=, &=, ^=, |=
```

###### 其它运算符

```go
& 返回变量存储地址，例如 &a 将给出变量的实际地址
* 指针变量，例如*a 是一个指针变量
```



##### 运算符优先级

| 优先级 | 运算符           |
| :----- | :--------------- |
| 5      | * / % << >> & &^ |
| 4      | + - \| ^         |
| 3      | == != < <= > >=  |
| 2      | &&               |
| 1      | \|\|             |



## 条件语句

- if
- if...else
- if嵌套
- switch
- **select** #类似switch，但是select会随机执行一个可运行的case。如果没有case可允许，它将阻塞，直到有case可运行

> GO 没有三目运算符，所以不支持`?:`形式的条件判断。



## 循环



循环控制：

- break #中断for或跳出switch
- continue #跳过当前循环剩余语句，进入下一轮循环
- goto 跳转到标记语句

无限循环

```go
package main
import "fmt"
func main() {
    for true  {
        fmt.Printf("这是无限循环。\n");
    }
}
```



## 函数

- 基本的代码块

```go
func function_name( [parameter list] ) [return_types] {
   // 函数体
}
```

### 函数返回多个值

```go
package main
import "fmt"
func swap(x, y string) (string, string) {
   return y, x
}
func main() {
   a, b := swap("Google", "Runoob")
   fmt.Println(a, b)
}
```

### 函数参数

- 默认下Go使用值传递，调用过程中不会影响到实际参数

### 函数的用法

| 函数用法                                                     | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [函数作为另外一个函数的实参](https://www.runoob.com/go/go-function-as-values.html) | 函数定义后可作为另外一个函数的实参数传入 |
| [闭包](https://www.runoob.com/go/go-function-closures.html)  | 闭包是匿名函数，可在动态编程中使用       |
| [方法](https://www.runoob.com/go/go-method.html)             | 方法就是一个包含了接受者的函数           |



### 变量作用域

> 作用域为已声明标识符所表示的常量，类型，变量，函数或包在源代码中的作用域范围。

Go语言中的变量可以在三个地方声明：

- 函数内定义的变量称为**局部变量**
- 函数外定义的变量称之为**全局变量**
- 函数定义中的变量称之为**形式参数**

###### 初始化局部和全局变量

| 数据类型  | 初始化默认值 |
| :-------- | :----------- |
| `int`     | 0            |
| `float32` | 0            |
| `pointer` | nil          |



## 数组

```go
var variable_name [SIZE] variable_type
//例如
var balance [10] float32
```

###### 初始化数组

```go
var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

初始化数组中 {} 中的元素个数不能大于 [] 中的数字。

如果忽略 [] 中的数字不设置数组大小，Go 语言会根据元素的个数来设置数组的大小

```go
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```



## 指针

一个**指针变量**指向了一个**值**的**内存地址**

```go
var var_name *var-type
```

###### 使用指针

- 定义指针变量
- 为指针变量赋值
- 访问指针变量中指向地址的值

```GO
package main
import "fmt"
func main() {
   var a int= 20   /* 声明实际变量 */
   var ip *int        /* 声明指针变量 */
   ip = &a  /* 指针变量的存储地址 */
   fmt.Printf("a 变量的地址是: %x\n", &a  )
   /* 指针变量的存储地址 */
   fmt.Printf("ip 变量储存的指针地址: %x\n", ip )
   /* 使用指针访问值 */
   fmt.Printf("*ip 变量的值: %d\n", *ip )
}
```

###### 空指针

- 当一个指针被定义后没有分配到任何变量时，它的值为nil
- nil指针也被称为空指针
- nil在概念上和它语言的null, None, nil, NULL一样，都指代为零值或空值
- 一个指针变量通常缩写为`ptr`

```go
package main
import "fmt"
func main() {
   var  ptr *int
   fmt.Printf("ptr 的值为 : %x\n", ptr  ) //ptr 的值为 : 0
}
```

空指针判断

```go
if(ptr != nil)     /* ptr 不是空指针 */
if(ptr == nil)    /* ptr 是空指针 */
```



## 结构体

结构体定义需要使用`type`和`struct`语句。`struct`语句定义一个新的数据类型，结构体中有一个或多个成员。type语句设定了机构体的名称。

```go
type struct_variable_type struct {
   member definition
   member definition
   ...
   member definition
}
```

一旦定义了结构体类型，它就能用于变量的声明：

```go
variable_name := structure_variable_type {value1, value2...valuen}
或
variable_name := structure_variable_type { key1: value1, key2: value2..., keyn: valuen}
```

使用方式：

```go
package main
import "fmt"
type Books struct {
   title string
   author string
   subject string
   book_id int
}
func main() {
    // 创建一个新的结构体
    fmt.Println(Books{"Go 语言", "www.runoob.com", "Go 语言教程", 6495407})
    // 也可以使用 key => value 格式
    fmt.Println(Books{title: "Go 语言", author: "www.runoob.com", subject: "Go 语言教程", book_id: 6495407})
    // 忽略的字段为 0 或 空
   fmt.Println(Books{title: "Go 语言", author: "www.runoob.com"})
}
```