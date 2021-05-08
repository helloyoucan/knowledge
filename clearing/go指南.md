1. 如果一个名字以大写字母开头，那么它就是已导出的。（包的外部只能使用已导出的名字）

2. 当连续两个或多个函数的已命名形参类型相同时，除最后一个类型以外，其它都可以省略。

   ```go
   func add(x, y int) int {
   	return x + y
   }
   ```

   

3. 函数可以返回任意数量的返回值。

   ```go
   func swap(x, y string) (string, string) {
   	return y, x
   }
   ```

   

4. Go 的返回值可被命名，它们会被视作定义在函数顶部的变量。

   没有参数的 `return` 语句返回已命名的返回值。也就是 `直接` 返回。

   应当仅限于用在短函数中。

   ```go
   func split(sum int) (x, y int) {
   	x = sum * 4 / 9
   	y = sum - x
   	return
   }
   ```

   

5. `var` 语句用于声明一个变量列表，跟函数的参数列表一样，类型在最后。

   ```go
   var c, python, java bool
   ```

6. 变量声明时初始化值，可以省略变量类型

7. 在函数中，简洁赋值语句 `:=` 可在类型明确的地方代替 `var` 声明。

8. 函数外的每个语句都必须以关键字开始（`var`, `func` 等等），因此 `:=` 结构不能在函数外使用。

9. 同导入语句一样，变量声明也可以“分组”成一个语法块。

   ```go
   var (
   	ToBe   bool       = false
   	MaxInt uint64     = 1<<64 - 1
   	z      complex128 = cmplx.Sqrt(-5 + 12i)
   )
   ```

10. go的基本类型有

    ```go
    bool
    
    string
    
    int  int8  int16  int32  int64
    uint uint8 uint16 uint32 uint64 uintptr
    
    byte // uint8 的别名
    
    rune // int32 的别名
        // 表示一个 Unicode 码点
    
    float32 float64
    
    complex64 complex128
    ```

11. 没有明确初始值的变量声明会被赋予它们的 **零值**。

    零值是：

    - 数值类型为 `0`，
    - 布尔类型为 `false`，
    - 字符串为 `""`（空字符串）

12. Go 在不同类型的项之间赋值时需要显式转换。

    ```
    i := 42
    f := float64(i)
    u := uint(f)
    ```

13. 常量不能用 `:=` 语法声明，要使用const

14. 数值常量是高精度的 **值**。

15.  C 的 `while` 在 Go 中叫做 `for`

    ```go
    func main() {
    	sum := 1
    	for sum < 1000 {
    		sum += sum
    	}
    	fmt.Println(sum)
    }
    ```

16. 无限循环

    ```go
    func main() {
    	for {
    	}
    }
    ```

17. if表达式外无需小括号 `( )` ，而大括号 `{ }` 则是必须的

18. 同 `for` 一样， `if` 语句可以在条件表达式前执行一个简单的语句。

    该语句声明的变量作用域仅在 `if` 之内。

19. Go 自动提供了在这些语言中每个 case 后面所需的 `break` 语句。 除非以 `fallthrough` 语句结束，否则分支会自动终止。

20. switch 的 case 无需为常量，且取值不必为整数

21. switch 的 case 语句从上到下顺次执行，直到匹配成功时停止。

    ```go
    switch i {
    	case 0:
    	case f():
    }
    // 在 i==0 时 f 不会被调用。
    ```

22. 没有条件的 switch 同 `switch true` 一样

    ```go
    func main() {
    	t := time.Now()
    	switch {
    	case t.Hour() < 12:
    		fmt.Println("Good morning!")
    	case t.Hour() < 17:
    		fmt.Println("Good afternoon.")
    	default:
    		fmt.Println("Good evening.")
    	}
    }
    ```

23. defer 语句会将函数推迟到外层函数返回之后执行。

    推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用。

24. 推迟的函数调用会被压入一个栈(defer栈)中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

25. Go 没有指针运算。

26. 一个结构体（`struct`）就是一组字段（field）。

27. 数组的长度是其类型的一部分，因此数组不能改变大小。

28. 每个数组的大小都是固定的。而切片则为数组元素提供动态大小的、灵活的视角。

29. 切片通过两个下标来界定，即一个上界和一个下界，二者以冒号分隔：

    ```go
    a[low : high] //它会选择一个半开区间，包括第一个元素，但排除最后一个元素。
    b[1:4] //包含 b 中下标从 1 到 3 的元素
    ```

30. 切片文法类似于没有长度的数组文法。

    ```go
    //这是一个数组文法：
    [3]bool{true, true, false}
    ```

31. 切片下界的默认值为 `0`，上界则是该切片的长度。

32. 切片拥有 **长度** 和 **容量**。可通过表达式 `len(s)` 和 `cap(s)` 来获取。

33. 可以通过重新切片来扩展一个切片，给它提供足够的容。

34. 切片的零值是 `nil`。

35. 切片可以用内建函数 make 来创建，这也是你创建动态数组的方式，`make` 函数会分配一个元素为零值的数组并返回一个引用了它的切片。

36. 切片可包含任何类型，甚至包括其它的切片。

37. 为切片追加新的元素是种常用的操作，为此 Go 提供了内建的 `append` 函数。

38. 当 `s`底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。返回的切片会指向这个新分配的数组。

39. `for` 循环的 `range` 形式可遍历切片或映射。

    ```go
    var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
    
    func main() {
    	for i, v := range pow {
    		fmt.Printf("2**%d = %d\n", i, v)
    	}
    }
    ```

40. 映射的零值为 `nil` 。`nil` 映射既没有键，也不能添加键。

    ```go
    type Vertex struct {
    	Lat, Long float64
    }
    
    var m = map[string]Vertex{
    	"Bell Labs": Vertex{
    		40.68433, -74.39967,
    	},
    	"Google": Vertex{
    		37.42202, -122.08408,
    	},
    }
    ```

41. Go 函数可以是一个闭包。闭包是一个函数值，它引用了其函数体之外的变量。该函数可以访问并赋予其引用的变量的值，换句话说，该函数被这些变量“绑定”在一起。

42. Go 没有类。不过你可以为结构体类型定义方法。

43. 方法只是个带接收者参数的函数。

44. 也可以为非结构体类型声明方法。

    ```go
    // Abs 方法的数值类型 MyFloat
    func (f MyFloat) Abs() float64 {
    	if f < 0 {
    		return float64(-f)
    	}
    	return float64(f)
    }
    ```

    

https://tour.go-zh.org/methods/3

