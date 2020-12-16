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
    // 输出
    // {Go 语言 www.runoob.com Go 语言教程 6495407}
    // {Go 语言 www.runoob.com Go 语言教程 6495407}
    // {Go 语言 www.runoob.com  0}
}
```



###### 访问结构体成员

> 结构体.成员名

结构体类型变量使用 `struct` 关键字定义

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
   var Book1 Books        /* 声明 Book1 为 Books 类型 */
   var Book2 Books        /* 声明 Book2 为 Books 类型 */
   /* book 1 描述 */
   Book1.title = "Go 语言"
   Book1.author = "www.runoob.com"
   Book1.subject = "Go 语言教程"
   Book1.book_id = 6495407
   /* book 2 描述 */
   Book2.title = "Python 教程"
   Book2.author = "www.runoob.com"
   Book2.subject = "Python 语言教程"
   Book2.book_id = 6495700
   /* 打印 Book1 信息 */
   fmt.Printf( "Book 1 title : %s\n", Book1.title)
   fmt.Printf( "Book 1 author : %s\n", Book1.author)
   fmt.Printf( "Book 1 subject : %s\n", Book1.subject)
   fmt.Printf( "Book 1 book_id : %d\n", Book1.book_id)
   /* 打印 Book2 信息 */
   fmt.Printf( "Book 2 title : %s\n", Book2.title)
   fmt.Printf( "Book 2 author : %s\n", Book2.author)
   fmt.Printf( "Book 2 subject : %s\n", Book2.subject)
   fmt.Printf( "Book 2 book_id : %d\n", Book2.book_id)
}
```



###### 机构体作为函数参数

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
   var Book1 Books        /* 声明 Book1 为 Books 类型 */
   var Book2 Books        /* 声明 Book2 为 Books 类型 */
   /* book 1 描述 */
   Book1.title = "Go 语言"
   Book1.author = "www.runoob.com"
   Book1.subject = "Go 语言教程"
   Book1.book_id = 6495407
   /* book 2 描述 */
   Book2.title = "Python 教程"
   Book2.author = "www.runoob.com"
   Book2.subject = "Python 语言教程"
   Book2.book_id = 6495700
   /* 打印 Book1 信息 */
   printBook(Book1)
   /* 打印 Book2 信息 */
   printBook(Book2)
}
func printBook( book Books ) {
   fmt.Printf( "Book title : %s\n", book.title)
   fmt.Printf( "Book author : %s\n", book.author)
   fmt.Printf( "Book subject : %s\n", book.subject)
   fmt.Printf( "Book book_id : %d\n", book.book_id)
}
```



###### 结构体指针

定义指向结构体的指针类似于其他指针变量

```go
var struct_pointer *Books
```

查看结构体变量地址，可以将 & 符号放置于结构体变量前

```go
struct_pointer = &Book1
```

使用结构体指针访问结构体成员，使用 "." 操作符：

```go
struct_pointer.title
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
   var Book1 Books        /* 声明 Book1 为 Books 类型 */
   var Book2 Books        /* 声明 Book2 为 Books 类型 */

   /* book 1 描述 */
   Book1.title = "Go 语言"
   Book1.author = "www.runoob.com"
   Book1.subject = "Go 语言教程"
   Book1.book_id = 6495407

   /* book 2 描述 */
   Book2.title = "Python 教程"
   Book2.author = "www.runoob.com"
   Book2.subject = "Python 语言教程"
   Book2.book_id = 6495700
   /* 打印 Book1 信息 */
   printBook(&Book1)
   /* 打印 Book2 信息 */
   printBook(&Book2)
}
func printBook( book *Books ) {
   fmt.Printf( "Book title : %s\n", book.title)
   fmt.Printf( "Book author : %s\n", book.author)
   fmt.Printf( "Book subject : %s\n", book.subject)
   fmt.Printf( "Book book_id : %d\n", book.book_id)
}
```



## 切片

go语言的切片是对数组的抽象。

Go数组的长度不可改变，Go提高了一种灵活，功能强悍的内置类型切片（“动态数组”），与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大。

###### 定义

```go
var identifier []type
```

切片不需要说明长度。

或使用make函数创建：

```go
var slice1 []type = make([]type,len)
// 简写为
slice := make([]type,len)
```

也可以指定容量，其中第三个参数capacity为可选参数：

```go
make([]T,len,capacity)
```

这里的`len`是数组的长度并且也是切片的初始长度。

###### 切片初始化

```go
s :=[] int {1,2,3}
```

直接初始化切片，[]表示是切片类型，{1,2,3}初始化值依次是1,2,3.其cap=len=3

```gaso
s := arr[:] 
```

初始化切片s,是数组arr的引用

```go
s := arr[startIndex:endIndex] 
```

将arr中从下标startIndex到endIndex-1 下的元素创建为一个新的切片

```
s := arr[startIndex:] 
```

默认 endIndex 时将表示一直到arr的最后一个元素

```go
s := arr[:endIndex] 
```

默认 startIndex 时将表示从arr的第一个元素开始

```go
s1 := s[startIndex:endIndex] 
```

通过切片s初始化切片s1

```go
s :=make([]int,len,cap) 
```

通过内置函数make()初始化切片s,[]int 标识为其元素类型为int的切片

###### len() 和 cap() 函数

切片是可索引的，并且可以由 len() 方法获取长度。

切片提供了计算容量的方法 cap() 可以测量切片最长可以达到多少。

```go
package main
import "fmt"
func main() {
   var numbers = make([]int,3,5)
   printSlice(numbers)
}
func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x) //len=3 cap=5 slice=[0 0 0]
}
```



###### 空(nil)切片

一个切片在未初始化之前默认为 nil，长度为 0



###### 切片截取

可以通过设置下限及上限来设置截取切片 *[lower-bound:upper-bound]*，实例如下：

```go
package main
import "fmt"
func main() {
   /* 创建切片 */
   numbers := []int{0,1,2,3,4,5,6,7,8}  
   printSlice(numbers)
   /* 打印原始切片 */
   fmt.Println("numbers ==", numbers)
   /* 打印子切片从索引1(包含) 到索引4(不包含)*/
   fmt.Println("numbers[1:4] ==", numbers[1:4])
   /* 默认下限为 0*/
   fmt.Println("numbers[:3] ==", numbers[:3])
   /* 默认上限为 len(s)*/
   fmt.Println("numbers[4:] ==", numbers[4:])
   numbers1 := make([]int,0,5)
   printSlice(numbers1)
   /* 打印子切片从索引  0(包含) 到索引 2(不包含) */
   number2 := numbers[:2]
   printSlice(number2)
   /* 打印子切片从索引 2(包含) 到索引 5(不包含) */
   number3 := numbers[2:5]
   printSlice(number3)
    /*
    输出：
    n=9 cap=9 slice=[0 1 2 3 4 5 6 7 8]
    numbers == [0 1 2 3 4 5 6 7 8]
    numbers[1:4] == [1 2 3]
    numbers[:3] == [0 1 2]
    numbers[4:] == [4 5 6 7 8]
    len=0 cap=5 slice=[]
    len=2 cap=9 slice=[0 1]
    len=3 cap=7 slice=[2 3 4]
    */
}
func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```



###### append()和copy函数

如果想增加切片的容量，我们必须创建一个新的更大的切片并把原分片的内容都拷贝过来。

下面的代码描述了从拷贝切片的 copy 方法和向切片追加新元素的 append 方法。

```go
package main
import "fmt"
func main() {
   var numbers []int
   printSlice(numbers)
   /* 允许追加空切片 */
   numbers = append(numbers, 0)
   printSlice(numbers)
   /* 向切片添加一个元素 */
   numbers = append(numbers, 1)
   printSlice(numbers)
   /* 同时添加多个元素 */
   numbers = append(numbers, 2,3,4)
   printSlice(numbers)
   /* 创建切片 numbers1 是之前切片的两倍容量*/
   numbers1 := make([]int, len(numbers), (cap(numbers))*2)
   /* 拷贝 numbers 的内容到 numbers1 */
   copy(numbers1,numbers)
   printSlice(numbers1)  
    /*
    输出：
    len=0 cap=0 slice=[]
    len=1 cap=1 slice=[0]
    len=2 cap=2 slice=[0 1]
    len=5 cap=6 slice=[0 1 2 3 4]
    len=5 cap=12 slice=[0 1 2 3 4]
    */
}
func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```



## 语言范围（Range）

- rang关键字用于for循环中迭代数组（array）、切片（slice）、通道（channel）或集合（map）的元素。

- 在数组和切片中它返回元素的索引和索引对应的值

- 在集合中返回key-value对。

```go
package main
import "fmt"
func main() {
    //这是我们使用range去求一个slice的和。使用数组跟这个很类似
    nums := []int{2, 3, 4}
    sum := 0
    for _, num := range nums {
        sum += num
    }
    fmt.Println("sum:", sum)
    //在数组上使用range将传入index和值两个变量。上面那个例子我们不需要使用该元素的序号，所以我们使用空白符"_"省略了。有时侯我们确实需要知道它的索引。
    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }
    //range也可以用在map的键值对上。
    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }
    //range也可以用来枚举Unicode字符串。第一个参数是字符的索引，第二个是字符（Unicode的值）本身。
    for i, c := range "go" {
        fmt.Println(i, c)
    }
    /*
    输出：
    sum: 9
    index: 1
    a -> apple
    b -> banana
    0 103
    1 111
    */
}
```



## Map（集合）

- 无序的键值对的集合
- 通过key来快速检索数据，key类似于索引，指向数据的值
- 一种集合，可被迭代，是无序的，无法决定返回的顺序，因为Map是通过hash表来实现的

可使用内建函数make或map关键字来定义

```go
/* 声明变量，默认 map 是 nil */
var map_variable map[key_data_type]value_data_type

/* 使用 make 函数 */
map_variable := make(map[key_data_type]value_data_type)
```

不初始化map，会创建一个nil ma，nil map不能用了存放键值对

```go
package main

import "fmt"

func main() {
    var countryCapitalMap map[string]string /*创建集合 */
    countryCapitalMap = make(map[string]string)

    /* map插入key - value对,各个国家对应的首都 */
    countryCapitalMap [ "France" ] = "巴黎"
    countryCapitalMap [ "Italy" ] = "罗马"
    countryCapitalMap [ "Japan" ] = "东京"
    countryCapitalMap [ "India " ] = "新德里"

    /*使用键输出地图值 */
    for country := range countryCapitalMap {
        fmt.Println(country, "首都是", countryCapitalMap [country])
    }

    /*查看元素在集合中是否存在 */
    capital, ok := countryCapitalMap [ "American" ] /*如果确定是真实的,则存在,否则不存在 */
    /*fmt.Println(capital) */
    /*fmt.Println(ok) */
    if (ok) {
        fmt.Println("American 的首都是", capital)
    } else {
        fmt.Println("American 的首都不存在")
    }
}
```

###### delete() 

用于删除集合的元素，参数为key



## 类型转换

用于将一种数据类型的变量转换为另外一种类型的变量。**go不支持隐式转换类型**

```go
type_name(expression)
```

type_name 为类型，expression 为表达式。

```go
package main

import "fmt"

func main() {
   var sum int = 17
   var count int = 5
   var mean float32
   
   mean = float32(sum)/float32(count)
   fmt.Printf("mean 的值为: %f\n",mean)
}
```



## 接口

go 提供了另外一种数据类型，即接口，它把所有的具有共性的方法定义在一起，任何其它类型只需要实现了这些方法就是实现了这个接口。

```go
/* 定义接口 */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}

/* 定义结构体 */
type struct_name struct {
   /* variables */
}

/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* 方法实现 */
}
...
func (struct_name_variable struct_name) method_namen() [return_type] {
   /* 方法实现*/
}
```

例子：

```go
package main

import ("fmt")

type Phone interface {
    call()
}

type NokiaPhone struct {}

func (nokiaPhone NokiaPhone) call() {
    fmt.Println("I am Nokia, I can call you!")
}

type IPhone struct {}

func (iPhone IPhone) call() {
    fmt.Println("I am iPhone, I can call you!")
}

func main() {
    var phone Phone
    phone = new(NokiaPhone) //使用new函数创建一个NokiaPhone类型的匿名变量
    phone.call()
    phone = new(IPhone)
    phone.call()

}
```



## 错误处理

通过内置的错误接口提供了非常简单的错误处理机制。

error类型是一个接口类型。

```go
type error interface {
    Error() string
}
```

在编码中通过实现error接口类型来生成错误信息。

函数通常在最后的返回值中返回错误信息。

使用`errors.New`可返回一个错误信息。

```go
func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return 0, errors.New("math: square root of negative number")
    }
    // 实现
}
```

例子：

```go
package main

import (
    "fmt"
)

// 定义一个 DivideError 结构
type DivideError struct {
    dividee int
    divider int
}

// 实现 `error` 接口
func (de *DivideError) Error() string {
    strFormat := `
    Cannot proceed, the divider is zero.
    dividee: %d
    divider: 0
`
    return fmt.Sprintf(strFormat, de.dividee)
}

// 定义 `int` 类型除法运算的函数
func Divide(varDividee int, varDivider int) (result int, errorMsg string) {
    if varDivider == 0 {
            dData := DivideError{
                    dividee: varDividee,
                    divider: varDivider,
            }
            errorMsg = dData.Error()
            return
    } else {
            return varDividee / varDivider, ""
    }

}

func main() {

    // 正常情况
    if result, errorMsg := Divide(100, 10); errorMsg == "" {
            fmt.Println("100/10 = ", result)
    }
    // 当除数为零的时候会返回错误信息
    if _, errorMsg := Divide(100, 0); errorMsg != "" {
            fmt.Println("errorMsg is: ", errorMsg)
    }

}
/*
输出：
    100/10 =  10
    errorMsg is:  
    Cannot proceed, the divider is zero.
    dividee: 100
    divider: 0
*/
```





## 并发

go语言支持并发，只需要通过go关键字开启`goroutine`。

`goroutine`是轻量级线程，`goroutine`的调度是由`Golang`运行时进行管理的。

```go
go 函数名（参数列表）

//例子
go f(z,y,x)
```

Go 允许使用go语句开启一个新的运行期线程，即`goroutine`,以一个不同的、新创建的`goroutine`来执行一个函数。同一个程序中的所有`goroutine`共享同一个地址空间。

```go
package main
import (
        "fmt"
        "time"
)
func say(s string) {
        for i := 0; i < 5; i++ {
                time.Sleep(100 * time.Millisecond)
                fmt.Println(s)
        }
}
func main() {
        go say("world")
        say("hello")
}
```



### 通道（channel）

- 通道（channel）是用来传递数据的一个数据结构
- 通道可用于两个 `goroutine` 之间通过传递一个指定类型的值来同步运行和通讯
- 操作符 `<-` 用于指定通道的方向，发送或接收。如果未指定方向，则为双向通道

```go
ch <- v    // 把 v 发送到通道 ch
v := <-ch  // 从 ch 接收数据,并把值赋给 v
```



声明一个通道很简单，我们使用`chan`关键字即可，通道在使用前必须先创建：

```go
ch := make(chan int)
```

**注意**：默认情况下，通道是不带缓冲区的。发送端发送数据，同时必须有接收端相应的接收数据。

以下实例通过两个 `goroutine` 来计算数字之和，在`goroutine` 完成计算后，它会计算两个结果的和：

```go
package main

import "fmt"

func sum(s []int, c chan int) {
        sum := 0
        for _, v := range s {
                sum += v
        }
        c <- sum // 把 sum 发送到通道 c
}

func main() {
        s := []int{7, 2, 8, -9, 4, 0}
        c := make(chan int)
        go sum(s[:len(s)/2], c)
        go sum(s[len(s)/2:], c)
        x, y := <-c, <-c // 从通道 c 中接收

        fmt.Println(x, y, x+y)
}

/*
输出：
-5 17 12
*/
```

### 通道缓冲区

通道可以设置缓冲区，通过 make 的第二个参数指定缓冲区大小：

```go
ch := make(chan int, 100)
```

- 带缓冲区的通道允许发送端的数据发送和接收端的数据获取处于异步状态，就是说发送端发送的数据可以放在缓冲区里面，可以等待接收端去获取数据，而不是立刻需要接收端去获取数据。
- 不过由于缓冲区的大小是有限的，所以还是必须有接收端来接收数据的，否则缓冲区一满，数据发送端就无法再发送数据了。

**注意**：如果通道不带缓冲，发送方会阻塞直到接收方从通道中接收了值。如果通道带缓冲，发送方则会阻塞直到发送的值被拷贝到缓冲区内；如果缓冲区已满，则意味着需要等待直到某个接收方获取到一个值。接收方在有值可以接收之前会一直阻塞。

```go
package main
import "fmt"
func main() {
    // 这里我们定义了一个可以存储整数类型的带缓冲通道
        // 缓冲区大小为2
        ch := make(chan int, 2)
        // 因为 ch 是带缓冲的通道，我们可以同时发送两个数据
        // 而不用立刻需要去同步读取数据
        ch <- 1
        ch <- 2
        // 获取这两个数据
        fmt.Println(<-ch)
        fmt.Println(<-ch)
}
/*
输出：
1
2
*/
```

### Go 遍历通道与关闭通道

Go 通过 range 关键字来实现遍历读取到的数据，类似于与数组或切片

```go
v, ok := <-ch
```

如果通道接收不到数据后 ok 就为 false，这时通道就可以使用 **close()** 函数来关闭。

```go
package main

import (
        "fmt"
)

func fibonacci(n int, c chan int) {
        x, y := 0, 1
        for i := 0; i < n; i++ {
                c <- x
                x, y = y, x+y
        }
        close(c)
}

func main() {
        c := make(chan int, 10)
        go fibonacci(cap(c), c)
        // range 函数遍历每个从通道接收到的数据，因为 c 在发送完 10 个
        // 数据之后就关闭了通道，所以这里我们 range 函数在接收到 10 个数据
        // 之后就结束了。如果上面的 c 通道不关闭，那么 range 函数就不
        // 会结束，从而在接收第 11 个数据的时候就阻塞了。
        for i := range c {
                fmt.Println(i)
        }
}
/*
输出：
0
1
1
2
3
5
8
13
21
34
*/
```