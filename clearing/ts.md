### 变量声明

#### 变量声明

##### var声明

作用域规则

`var`声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问

```typescript
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```

###### 多次声明同一个变量并不会报错

```typescript
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}
```

###### 捕获变量怪异之处

```typescript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
/*
输出：
10
10
10
10
10
10
10
10
10
10
*/
```



##### let声明

###### 块级作用域

> 当用let声明一个变量，它使用的是词法作用域或块作用域。
>
> 块作用域变量在包含它们的块或`for`循环之外是不能访问的。

```typescript
function f(input: boolean) {
    let a = 100;
    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    return b;
}
```

```typescript
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}

// Error: 'e' doesn't exist here
console.log(e);
```



暂时性死区

> 拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。

```typescript
a++; // illegal to use 'a' before it's declared;
let a;
```



###### 重定义及屏蔽

```typescript
let x = 10;
let x = 20; // 错误，不能在1个作用域里多次声明`x`
```

```typescript
function f(x) {
    let x = 100; // error: interferes with parameter declaration
}
function g() {
    let x = 100;
    var x = 100; // error: can't have both declarations of 'x'
}
```

块级作用域变量需要在明显不同的块里声明

```typescript
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }
    return x;
}

f(false, 0); // returns 0
f(true, 0);  // returns 100
```

在一个嵌套作用域里引入一个新名字的行为称做*屏蔽*

```typescript
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```



###### 块级作用域变量的获取

每次进入一个作用域时，它创建了一个变量的 *环境*。 就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

```typescript
function theCityThatAlwaysSleeps() {
    let getCity;
    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}
```

当`let`声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，而是针对 *每次迭代*都会创建这样一个新作用域。

```typescript
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}
/*
输出：
0
1
2
3
4
5
6
7
8
9
*/
```



##### `const` 声明

赋值后不能再改变,实际上`const`变量的内部状态是可修改的。

#### 解构

##### 解构数组

解构赋值

```typescript
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```

交互变量的值

```typescript
[first, second] = [second, first];
```

函数参数

```typescript
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f(input);
```

剩余变量

```typescript
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

```typescript
let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1
```

```typescript
let [, second, , fourth] = [1, 2, 3, 4];
```

##### 对象解构

```typescript
let o = { a: "foo", b: 12,c: "bar"};
let { a, b } = o;
```

```typescript
({ a, b } = { a: "baz", b: 101 });
```

剩余变量

```typescript
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```

##### 属性重命名

```typescript
let { a: newName1, b: newName2 } = o;
```

##### 默认值

```typescript
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```

##### 函数声明

```typescript
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```

解构属性上给予一个默认或可选的属性用来替换主初始化列表

```typescript
function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
/* 解构表达式要尽量保持小而简单。*/
```

##### 展开

展开操作符正与解构相反。 它允许你将一个**数组**展开为另一个数组，或将一个**对象**展开为另一个对象

```typescript
let first = [1, 2];
let second = [3, 4];
// 展开操作创建了 first和second的一份浅拷贝。 它们不会被展开操作所改变。
let bothPlus = [0, ...first, ...second, 5];
```

- 展开对象后面的属性会覆盖前面的属性
- 仅包含对象 自身的可枚举属性（展开一个对象实例时，会丢失其方法）
- `TypeScript`编译器不允许展开泛型函数上的类型参数

### Interface

```typescript
interface LabelledValue {
  label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以

###### 可选属性

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

###### 只读属性

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

`readonly` vs `const`

最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用`readonly`。

###### 额外的属性检查

除了已经确定的类型，还带有任意数量的其它属性:

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

###### 函数类型

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。

```typescript
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

###### 可索引的类型

```typescript
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

`TypeScript`支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 `number`来索引时，JavaScript会将它转换成`string`然后再去索引对象。

```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```

###### 类类型

1. 实现接口

   ```typescript
   interface ClockInterface {
       currentTime: Date;
   }
   
   class Clock implements ClockInterface {
       currentTime: Date;
       constructor(h: number, m: number) { }
   }
   ```

   

https://www.tslang.cn/docs/handbook/interfaces.html



























