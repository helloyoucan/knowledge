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

#### 可选属性

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

#### 只读属性

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

`readonly` vs `const`

最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用`readonly`。

#### 额外的属性检查

除了已经确定的类型，还带有任意数量的其它属性:

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

#### 函数类型

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

#### 可索引的类型

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

#### 类类型

1. 实现接口

   ```typescript
   interface ClockInterface {
       currentTime: Date;
       setTime(d: Date);
   }
   
   class Clock implements ClockInterface {
       currentTime: Date;
       constructor(h: number, m: number) { }
       setTime(d: Date) {
           this.currentTime = d;
       }
   }
   ```

2. 类静态部分与实例部分的区别

   类是具有两个类型的：静态部分的类型和实例的类型。

   当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

   需要直接操作类的静态部分。 

   ```typescript
   interface ClockConstructor {
       new (hour: number, minute: number): ClockInterface;
   }
   interface ClockInterface {
       tick();
   }
   function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
       return new ctor(hour, minute);
   }
   class DigitalClock implements ClockInterface {
       constructor(h: number, m: number) { }
       tick() {
           console.log("beep beep");
       }
   }
   class AnalogClock implements ClockInterface {
       constructor(h: number, m: number) { }
       tick() {
           console.log("tick tock");
       }
   }
   
   let digital = createClock(DigitalClock, 12, 17);
   let analog = createClock(AnalogClock, 7, 32);
   // createClock的第一个参数是ClockConstructor类型，在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名
   ```

#### 继承接口

和类一样，接口也可以相互继承。

```typescript
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
//一个接口可以继承多个接口，创建出多个接口的合成接口。
interface Square extends Shape, PenStroke {
    sideLength: number;
}
```

#### 混合类型

一个对象可以同时具有上面提到的多种类型的情况：

```typescript
// 一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```



#### 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。

 接口同样会继承到类的private和protected成员。

当创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。



```typescript
//当有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {}
/*
在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl接口和拥有select方法的Control类是一样的。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。
*/
```



### 类

#### 继承

基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。



#### 修饰符

##### `public`

默认修饰符

##### `private`

不能再声明它的类的外部访问

##### `protected` 

不能再声明它的类的外部访问，但再派生类中仍然可以访问



####  `readonly `修饰符

只读属性必须在声明式或构造函数里被初始化

##### 参数属性

*参数属性*可以方便地让我们在一个地方定义并初始化一个成员。

```typescript
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {// 把声明和赋值合并至一处
    }
}
```

参数属性通过给构造函数参数前面添加一个访问限定符来声明。 使用 `private`限定一个参数属性会声明并初始化一个私有成员；对于 `public`和 `protected`来说也是一样。



#### 存取器

通过getters/setters来截取对对象成员的访问。

```typescript
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
```

注意：

- 编译器设置为输出`ECMAScript 5`或更高
- 带有 `get`不带有 `set`的存取器自动被推断为 `readonl`

#### 静态属性

静态属性存在于类本身上面而不是类的实例上。

#### 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 `abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```





#### 高级技巧

##### 构造函数

```typescript
class Greeter {
    static standardGreeting = "Hello, there0000000000000";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }else {
            return Greeter.standardGreeting;
        }
    }
}
let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;//使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。
greeterMaker.standardGreeting = "Hey there1111111111111!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```

##### 把类当做接口使用

```typescript
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```



### 函数

- 命名函数
- 匿名函数

#### 函数类型

##### 为函数定义类型

```typescript
function add(x: number, y: number): number {
    return x + y;
}
let myAdd = function(x: number, y: number): number { return x + y; };
```



##### 完整函数类型

包括两部分：

- 参数类型
- 返回值类型

```typescript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

注意：

- 只需要参数类型匹配，不在乎参数名
- 若无返回值，则返回值类型为void



##### 推断类型

在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：

```typescript
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

这叫做“按上下文归类”，是类型推论的一种。



#### 可选参数和默认参数

参数名+ “?”实现可选参数，**可选参数必须跟在必须参数后面。**

```typescript
function buildName(firstName: string, lastName?: string) {
    // ...
}
```

默认参数：

```typescript
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

注意：

- 可选参数与末尾的默认参数共享参数类型。
- 所有必须参数后面的带默认初始化的参数都是可选的
- 带默认值的参数不需要放在必须参数的后面

#### 剩余参数

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```



### `this`

#### this和箭头函数

箭头函数能保存函数创建时的 `this`值，而不是调用时的值。

```typescript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    },
     createCardPicker2: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();//这里的this被设置为window(严格模式为undefined)
let cardPicker2 = deck.createCardPicker2();
let pickedCard2 = cardPicker2();//使用箭头函数，使得函数被返回时就绑好正确的this。
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```





#### this参数

```typescript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {//提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面：
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```



#### this参数在回调函数里

将一个函数传递到某个库函数当回调函数被调用的时候，它们会被当成一个普通函数调用， `this`将为`undefined`。

```typescript
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```

上面这个方法可行，但注意：

- 每个 `Handler`对象都会创建一个箭头函数
- 方法只会被创建一次，添加到 `Handler`的原型链上
- 们在不同 `Handler`对象间是共享的

#### 重载

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

- 重载的`pickCard`函数在调用的时候会进行正确的类型检查。
- 在定义重载的时候，一定要把最精确的定义放在最前面。
- `function pickCard(x): any`并不是重载列表的一部分，因此这里只有两个重载。





### 泛型

```typescript
function identity<T>(arg: T): T {
    return arg;
}
// 使用方式
// 1.传入所有的参数，包含类型参数：
let output = identity<string>("myString");
// 2.类型推论
let output = identity("myString"); 
```



#### 泛型类型

- 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样

  ```typescript
  function identity<T>(arg: T): T {
      return arg;
  }
  let myIdentity: <T>(arg: T) => T = identity;
  ```

- 也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以

  ```typescript
  function identity<T>(arg: T): T {
      return arg;
  }
  let myIdentity: <U>(arg: U) => U = identity;
  ```

- 还可以使用带有调用签名的对象字面量来定义泛型函数

  ```typescript
  function identity<T>(arg: T): T {
      return arg;
  }
  let myIdentity: {<T>(arg: T): T} = identity;
  ```

泛型接口：

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```



#### 泛型类

泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```



#### 泛型约束

使用接口和`extends`关键字来实现约束

```typescript
interface Lengthwise {
    length: number;
}
// 约束传入的类型必须包含.length属性的接口
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```





### 枚举

- 定义一些带名字的常量。
- 支持数据和基于字符串的枚举。
- 可以清晰低表达意图或创建一组有区别的用例。

#### 数字枚举

```typescript
enum Direction {
    Up = 1, // 初始化为1，其余成员会从1开始自增长
    Down, // 2
    Left, // 3
    Right // 4
}
```

不使用初始化器：

```typescript
enum Direction {
    // 从0开始自增长
    Up, // 0
    Down, // 1
    Left, // 2
    Right, // 3
}
```



#### 字符串枚举

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```



#### 异构枚举

```typescript
// 混合字符串和数字成员
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```



#### 计算和常量成员

- 枚举成员的值可以是常量或计算出来的

常量枚举：

- 枚举的首个成员没有初始化器，它被赋予值 `0`

- 不带有初始化器且它之前的枚举成员是一个 *数字*常量。 则从之前的枚举成员的值自增1；

- 枚举成员使用 *常量枚举表达式*初始化。

  常量枚举表达式：

  - 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
  - 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
  - 带括号的常量枚举表达式
  - 一元运算符 `+`, `-`, `~`其中之一应用在了常量枚举表达式
  - 常量枚举表达式做为二元运算符 `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^`的操作对象。 若常数枚举表达式求值后为 `NaN`或 `Infinity`，则会在编译阶段报错。



#### 联合枚举与枚举成员的类型

字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为:

- 任何字符串字面量（例如： `"foo"`， `"bar"`， `"baz"`）
- 任何数字字面量（例如： `1`, `100`）
- 应用了一元 `-`符号的数字字面量（例如： `-1`, `-100`

枚举成员成为了类型

```typescript
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    kind: ShapeKind.Square,
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100,
}
```

枚举类型本身变成了每个枚举成员的 *联合*

```typescript
enum E {
    Foo,
    Bar,
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
        //             ~~~~~~~~~~~
        // Error! 始终返回true,因为类型 "E.Foo" 和 "E.Bar" 没有重叠.
    }
}
```





#### 运行时的枚举

```typescript
enum E {
    X, Y, Z
}
```

传递给函数

```typescript
function f(obj: { X: number }) {
    return obj.X;
}

// 可以运行，因为“E”有一个名为“X”的属性，它是一个数字。
f(E);
```

##### 反向映射

```typescript
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"

//
编译
```

- 引用枚举成员总会生成为对属性访问并且永远也不会内联代码
- *不会*为**字符串枚举成员**生成反向映射

##### `const`枚举

- 减少在额外生成的代码上的开销
- 避免额外的非直接的对枚举成员的访问

可以使用 `const`枚举

```
const enum Enum {
    A = 1,
    B = A * 2
}
```

- 常量枚举只能使用常量枚举表达式
- 在编译阶段会被删除
- 成员在使用的地方会被内联进来
- 不允许包含计算成员

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
//编译后
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]
```

 

#### 外部枚举

用来描述**已经存在**的枚举类型的形状

- 如果在运行时不存在`Enum` ，则不要添加`declare enum Enum`

```typescript
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```

外部枚举和非外部枚举的区别

>  **正常的枚举里：**没有初始化方法的成员被当成常数成员

> **非常数的外部枚举：**没有初始化方法时被当做需要经过计算的





### 类型推断

推断时机：

- 初始化变量和成员
- 设置默认参数
- 决定函数返回值

推断方式：

- 最佳同一类型（兼容所有候选类型的类型）
- 上下文类型（发生在表达式的类型与所处的位置相关时）



### 类型兼容性

- 只要目标类型的成员会被检查是否兼容
- 比较过程是递归进行，检查每个成员及子成员



#### 比较函数

##### 函数参数双向协变

当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。

##### 可选参数及剩余参数

比较函数兼容性的时候，可选参数与必须参数是可互换的。 

##### 函数重载

对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。 这确保了目标函数可以在所有源函数可调用的地方调用。



#### 枚举

枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。



#### 类

比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。

##### 类的私有成员和受保护成员

类的`private`成员和`protected`成员会影响兼容性。



#### 泛型

对于没指定泛型类型的泛型参数时，会把所有泛型参数当成`any`比较。





### 高级类型

#### 交叉类型

交叉类型是将多个类型合并为一个类型。

```typescript
type B={}
type C={}
type D={}
type A = B & C & D
```

#### 联合类型

```typescript
type A = string|number
```



#### 类型保护与区分类型

```typescript
let pet = getSmallPet();
// 为了声明pet为Fish，类型断言
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

##### 用户自定义的类型保护

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
// 'swim' 和 'fly' 调用都没有问题了
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
/**
注意:TypeScript不仅知道在 if分支里 pet是 Fish类型； 它还清楚在 else分支里，一定 不是 Fish类型，一定是 Bird类型
*/
```

#####typeof类型保护

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```



##### instanceof类型保护

- 是通过构造函数来细化类型的一种方式

```typescript
// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```

要求比较对象是一个构造函数，`TypeScript`将细化为：

1. 此构造函数的 `prototype`属性的类型，如果它的类型不为 `any`的话
2. 构造签名所返回的类型的联合



#### 可以为null的类型

- `null`与 `undefined`可以赋值给任何类型
- `null`与 `undefined`是所有其它类型的一个有效值

`--strictNullChecks`标记可以解决：当你声明一个变量时，它不会自动地包含 `null`或 `undefined`。 

##### 可选参数和可选类型

使用了 `--strictNullChecks`，可选参数会被自动地加上 `| undefined`，可选属性也会有同样的处理。



##### 类型保护和类型断言

由于可以为null的类型是通过联合类型实现，那么你需要使用类型保护来去除 `null`

```typescript
function f(sn: string | null): string {
    if (sn == null) {
        return "default";
    }
    else {
        return sn;
    }
}
```



#### 类型别名

- 类型别名会给一个类型起个新名字
-  类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型
- 起别名不会新建一个类型 - 它创建了一个新 *名字*来引用那个类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

类型别名也可以是泛型：

```typescript
type Container<T> = { value: T };
```

以使用类型别名来在属性里引用自己：

```typescript
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

类型别名不能出现在声明右侧的任何地方:

```typescript
type Yikes = Array<Yikes>; // error
```

##### 接口VS.类型别名

- 类型别名并不创建新名字
- 类型别名不能被 `extends`和 `implements`
- 无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

#### 字符串字面量类型

字符串字面量类型允许你指定字符串必须的固定值。

实现类似枚举类型的字符串：

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```

区分函数重载：

```typescript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}
```



#### 数字字面量类型

```typescript
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```

#### 枚举成员类型

当每个枚举成员都是用字面量初始化的时候枚举成员是具有类型的



#### 可辨识联合

合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 *可辨识联合*的高级模式，它也称做 *标签联合*或 *代数数据类型*。

```typescript
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```



##### 完整性检查

当没有涵盖所有可辨识联合的变化时，让编译器显示报错

```typescript
type Shape = Square | Rectangle | Circle | Triangle; //新增了 Triangle
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // 没有更新case
    // should error here - we didn't handle case "triangle"
}
```

解决方式：

1. 启用 `--strictNullChecks`并且指定一个返回值类型

   ```typescript
   function area(s: Shape): number { // error: returns number | undefined
       switch (s.kind) {
           case "square": return s.size * s.size;
           case "rectangle": return s.height * s.width;
           case "circle": return Math.PI * s.radius ** 2;
       }
   }
   ```

2. 使用 `never`类型，编译器用它来进行完整性检查

   ```typescript
   function assertNever(x: never): never {
       throw new Error("Unexpected object: " + x);
   }
   function area(s: Shape) {
       switch (s.kind) {
           case "square": return s.size * s.size;
           case "rectangle": return s.height * s.width;
           case "circle": return Math.PI * s.radius ** 2;
           default: return assertNever(s); // error here if there are missing cases
       }
   }
   ```



#### 多态的this类型

多态的 `this`类型表示的是某个包含类或接口的 *子类型*。

#### 类型索引

使用索引类型，编译器就能够检查使用了动态属性名的代码。



#### 映射类型

`TypeScript`提供了从旧类型中创建新类型的一种方式 — **映射类型**。 在映射类型里，新类型以相同的形式去转换旧类型里每个属性

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

最简单的映射类型和它的组成部分：

```typescript
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

它的语法与索引签名的语法类型，内部使用了 `for .. in`。 具有三个部分：

1. 类型变量 `K`，它会依次绑定到每个属性。
2. 字符串字面量联合的 `Keys`，它包含了要迭代的属性名的集合。
3. 属性的结果类型。

##### 由映射类型进行推断

```typescript
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
```





### 模块

#### `export =` 和 `import = require()`

- CommonJS和AMD的环境里都有一个`exports`变量，这个变量包含了一个模块的所有导出内容。

- `export default` 语法并不能兼容CommonJS和AMD的`exports`。

- 为了支持CommonJS和AMD的`exports`, TypeScript提供了`export =`语法。

- `export =`语法定义一个模块的导出`对象`。 这里的`对象`一词指的是类，接口，命名空间，函数或枚举。
- 若使用`export =`导出一个模块，则必须使用TypeScript的特定语法`import module = require("module")`来导入此模块

```typescript
class ZipCodeValidator {
}
export = ZipCodeValidator;
```

```typescript
import zip = require("./ZipCodeValidator");
```



#### 外部模块

使用顶级的 `export`声明来为每个模块都定义一个`.d.ts`文件

```typescript
// node.d.ts 
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}
```

使用三斜线指令`/// <reference>` `node.d.ts`并且使用`import url = require("url");`或`import * as URL from "url"`加载模块

```typescript
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
```

#### 外部模块简写

采用声明的简写形式以便能够快速使用它

```typescript
// declarations.d.ts
declare module "hot-new-module";
```

```typescript
import x, {y} from "hot-new-module";
x(y);
```



#### 模块声明通配符（加载非JavaScript内容）

```typescript
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
```

#### UMD模块

有些模块被设计成兼容多个模块加载器，或者不使用模块加载器（全局变量）。 它们以 [UMD](https://github.com/umdjs/umd)模块为代表。 这些库可以通过导入的形式或全局变量的形式访问。

```typescript
// math-lib.d.ts
export function isPrime(x: number): boolean;
export as namespace mathLib;
```

```typescript
import { isPrime } from "math-lib";
isPrime(2);
mathLib.isPrime(2); // 错误: 不能在模块内使用全局定义。
```



#### 创建模块结构指导

1. 尽可能地再顶层导出
2. 如要导出多个对象，把它们放在顶层导出
3. 明确累出导入的名字
4. 当你要导出大量内容时，使用命名空间导入模式
5. 使用重新导出进行扩展
6. 模块里不要使用命名空间 





### 命名空间

- 避免验证器的命名冲突
- 若接口和类在命名空间外也要访问，则使用export

##### 使用命名空间的验证器

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```



#### 分离到多文件

应用变得越来越大时，我们需要将代码分离到不同的文件中以便于维护。

##### 多文件中的命名空间

- 若不同文件间存在依赖，则使用引用标签来声明文件之间的关联

`Validation.ts`

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

`LettersOnlyValidator.ts`

```typescript
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
```

`ZipCodeValidator.ts`

```typescript
/// <reference path="Validation.ts" />
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

`Test.ts`

```typescript
// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```



涉及多文件时，需要确保所以编译后的额代码都被加载，有两种方式：

1. 使用`--outFile`标记，把所以的输入文件做作为一个输出文件
2. 编译每一个文件（默认），每个源文件生成对应的JavaScript文件，然后在页面按照正确的顺序引进





#### 别名

> import q = x.y.z

```typescript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
```



### 模块解析

#### 模块解析策略

##### Classic

以前是`TypeScript`默认的解析策略,现在是为了向后兼容而存在。

###### 相对导入

在`/root/src/folder/A.ts`文件里的`import { b } from "./moduleB"`,使用下面的查找流程：

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`

###### 非相对导入

在`/root/src/folder/A.ts`文件里，`mport { b } from "moduleB"`：

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`
3. `/root/src/moduleB.ts`
4. `/root/src/moduleB.d.ts`
5. `/root/moduleB.ts`
6. `/root/moduleB.d.ts`
7. `/moduleB.ts`
8. `/moduleB.d.ts`



##### Node

这个解析策略试图在运行时模仿`Node.js`模块解析机制。

###### `Node.js`解析模块

**相对路径**

在`/root/src/moduleA.js`的`var x = require("./moduleB");`

1. 检查`/root/src/moduleB.js`文件是否存在。
2. 检查`/root/src/moduleB`目录是否包含一个`package.json`文件，且`package.json`文件指定了一个`"main"`模块。 在我们的例子里，如果Node.js发现文件 `/root/src/moduleB/package.json`包含了`{ "main": "lib/mainModule.js" }`，那么Node.js会引用`/root/src/moduleB/lib/mainModule.js`。
3. 检查`/root/src/moduleB`目录是否包含一个`index.js`文件。 这个文件会被隐式地当作那个文件夹下的"main"模块。

**非相对路径**

在`/root/src/moduleA.js`里使用的是非相对路径导入`var x = require("moduleB");`。

Node则会以下面的顺序去解析 `moduleB`，直到有一个匹配上：

1. `/root/src/node_modules/moduleB.js`

2. `/root/src/node_modules/moduleB/package.json` (如果指定了`"main"`属性)

3. `/root/src/node_modules/moduleB/index.js`

   ----------------

4. `/root/node_modules/moduleB.js`

5. `/root/node_modules/moduleB/package.json` (如果指定了`"main"`属性)

6. `/root/node_modules/moduleB/index.js`

   -------------------

7. `/node_modules/moduleB.js`

8. `/node_modules/moduleB/package.json` (如果指定了`"main"`属性)

9. `/node_modules/moduleB/index.js`

> 注意`Node.js`在步骤（4）和（7）会向上跳一级目录。





##### Typescript解析模块

- `TypeScrip`t在Node解析逻辑基础上增加了`TypeScript`源文件的扩展名（ `.ts`，`.tsx`和`.d.ts`）
- `TypeScript`在 `package.json`里使用字段`"types"`来表示类似`"main"`的意义 - 编译器会使用它来找到要使用的"main"定义文件。

###### 相对路径

`import { b } from "./moduleB"`在`/root/src/moduleA.ts`里：

1. `/root/src/moduleB.ts`
2. `/root/src/moduleB.tsx`
3. `/root/src/moduleB.d.ts`
4. `/root/src/moduleB/package.json` (如果指定了`"types"`属性)
5. `/root/src/moduleB/index.ts`
6. `/root/src/moduleB/index.tsx`
7. `/root/src/moduleB/index.d.ts`



###### 非相对路径

在`/root/src/moduleA.ts`文件里的`import { b } from "moduleB"`：

1. `/root/src/node_modules/moduleB.ts`

2. `/root/src/node_modules/moduleB.tsx`

3. `/root/src/node_modules/moduleB.d.ts`

4. `/root/src/node_modules/moduleB/package.json` (如果指定了`"types"`属性)

5. `/root/src/node_modules/moduleB/index.ts`

6. `/root/src/node_modules/moduleB/index.tsx`

7. `/root/src/node_modules/moduleB/index.d.ts`

   ---

8. `/root/node_modules/moduleB.ts`

9. `/root/node_modules/moduleB.tsx`

10. `/root/node_modules/moduleB.d.ts`

11. `/root/node_modules/moduleB/package.json` (如果指定了`"types"`属性)

12. `/root/node_modules/moduleB/index.ts`

13. `/root/node_modules/moduleB/index.tsx`

14. `/root/node_modules/moduleB/index.d.ts`

    ---

15. `/node_modules/moduleB.ts`

16. `/node_modules/moduleB.tsx`

17. `/node_modules/moduleB.d.ts`

18. `/node_modules/moduleB/package.json` (如果指定了`"types"`属性)

19. `/node_modules/moduleB/index.ts`

20. `/node_modules/moduleB/index.tsx`

21. `/node_modules/moduleB/index.d.ts`

> 注意：在步骤（8）和（15）向上跳了两次目录





#### 附加的模块解析标记

- 将`.ts`编译成`.js`，将不同位置的依赖拷贝至一个输出位置
- 运行时的模块名与包含声明的源文件里的模块名不同
- 输出文件里模块路径与编译时的源文件路径不同



##### Base URL

value由两者之一决定：

- 命令行中的`baseUrl`的值（若是相对路径则相当于当前路径进行计算）
- `tsconfig.json`的`baseUrl`属性（若是相对路径，则相对于`tsconfig.json`路径进行计算）

##### 路径映射

过使用`tsconfig.json`文件里的`"paths"`来支持这样的声明映射

```json
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // 此处映射是相对于"baseUrl"
    }
  }
}
```

>  注意`"paths"`是相对于`"baseUrl"`进行解析



##### 利用`rootDirs`指定虚拟目录

编译器可以在“虚拟”目录下解析相对模块导入

```json
{
  "compilerOptions": {
    "rootDirs": [
      "src/views",
      "generated/templates/views"
    ]
  }
}
```



#### 跟踪模块解析

通过 `--traceResolution`启用编译器的模块解析跟踪，它会告诉我们在模块解析过程中发生了什么。



#### 使用`--noResolve`

`--noResolve`编译选项告诉编译器不要添加任何不是在命令行上传入的文件到编译列表。



### 声明合并

TS中的声明会创建三种实体之一：

- 命名空间（包含了用（.）符号来访问时使用的名字）
- 类型（用声明的模型创建一个类型并绑定到给定的名字上）
- 值（会创建在JavaScript输出中看到的值）

| Declaration Type | Namespace | Type | Value |
| :--------------- | :-------: | :--: | :---: |
| Namespace        |     X     |      |   X   |
| Class            |           |  X   |   X   |
| Enum             |           |  X   |   X   |
| Interface        |           |  X   |       |
| Type Alias       |           |  X   |       |
| Function         |           |      |   X   |
| Variable         |           |      |   X   |



#### 合并接口

```typescript
interface Box {
    height: number;
    width: number;
}
interface Box {
    scale: number;
}
let box: Box = {height: 5, width: 6, scale: 10};
```

- 接口的非函数的成员应该是唯一的。
- 如果它们不是唯一的，那么它们必须是相同的类型。
- 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。 
- 后面的接口具有更高的优先级。



#### 合并命名空间

- 同名的命名空间也会合并其成员。
- 对于命名空间的合并，模块导出的同名接口进行合并，构成单一命名空间内含合并后的接口。
- 对于命名空间里值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。

```typescript
namespace Animals {
    export class Zebra { }
}
namespace Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}
// 等同于
namespace Animals {
    export interface Legged { numberOfLegs: number; }
    export class Zebra { }
    export class Dog { }
}
```



#### 命名空间与类和函数和枚举类型合并

- 只要命名空间的定义符合将要合并类型的定义，命名空间就可以与其它类型的声明进行合并。
- 合并结果包含两者的声明类型。

##### 合并命名空间和类

- 需要导出命名空间的class，才能让合并的类能访问
- 合并的结果是一个类带有一个内部类
- 也可以使用命名空间为类型增加一些静态属性

```typescript
class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel { }
}
```



使用声明合并也可以扩展函数的属性

```typescript
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}
console.log(buildLabel("Sam Smith"));
```

也可以扩展枚举类型：

```typescript
enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}
```



#### 非法的合并

- 类布不能与其它类和变量合并



#### 模块扩展

```typescript
import { Observable } from "./observable";
declare module "./observable" {
    interface Observable<T> {
        map<U>(f: (x: T) => U): Observable<U>;
    }
}
// 扩展了方法，需要使用declare声明
Observable.prototype.map = function (f) {
    // ... another exercise for the reader
}
```



##### 全局扩展

```typescript
// observable.ts
export class Observable<T> {
    // ... still no implementation ...
}
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}
Array.prototype.toObservable = function () {
    // ...
}
```





### 装饰器

- 一种特殊类型的声明
- 能附加到类声明、方法、访问符、属性、或参数上
- 使用 `@expression`的形式，`expression`求值后必须为一个函数
- 运行时被调用，被装饰的声明信息作为参数传入

```typescript
function sealed(target) {
    // do something with "target" ...
}
```



#### 装饰器工厂

可以通过传入参数返回不同的装饰器函数

```typescript
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
```

#### 装饰器组合

- 在同一行使用

  ```typescript
  @f @g x
  ```

- 在多行上使用

  ```typescript
  @f
  @g
  x
  ```



多个装饰器用在一个声明上时，求值方式与复合函数相似：

- 由上至下依次对装饰器表达式求值。
- 求值的结果会被当作函数，由下至上依次调用。

```typescript
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}
class C {
    @f()
    @g()
    method() {}
}
```

#### 装饰器求值

类中不同声明上的装饰器按照一定顺序应用：

1. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个**实例成员**。
2. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个**静态成员**。
3. *参数装饰器*应用到构造函数。
4. *类装饰器*应用到类。



####类装饰器

- 在类声明之前声明
- 应用于类构造函数，可以用于监视、修改、替换类定义
- 不能在`.d.ts文件`（声明文件）中使用
- 不能在任何外部上下文中使用（例如declare的类）
- 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
- 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明（必须注意处理好原来的原型链。）

```typescript
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
```

重载构造函数：

```typescript
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```



#### 方法装饰器

- 声明在一个方法的声明之前，被应用到方法上
- 可以用于监视、修改、或替换方法定义
- 不能用在声明文件、重载喝果汁任何外部上下文（例如declare的类中）

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

> 注意  如果代码输出目标版本小于`ES5`，*属性描述符*将会是`undefined`。

[
模块](https://www.tslang.cn/docs/handbook/modules.html)[命名空间](https://www.tslang.cn/docs/handbook/namespaces.html)[命名空间和模块](https://www.tslang.cn/docs/handbook/namespaces-and-modules.html)[模块解析](https://www.tslang.cn/docs/handbook/module-resolution.html)[声明合并](https://www.tslang.cn/docs/handbook/declaration-merging.html)[JSX](https://www.tslang.cn/docs/handbook/jsx.html)[装饰器](https://www.tslang.cn/docs/handbook/decorators.html)[Mixins](https://www.tslang.cn/docs/handbook/mixins.html)[三斜线指令](https://www.tslang.cn/docs/handbook/triple-slash-directives.html)[JavaScript文件类型检查](https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html)[声明文件](https://www.tslang.cn/docs/handbook/decorators.html#toc-declaration-files)[项目配置](https://www.tslang.cn/docs/handbook/decorators.html#toc-project-config)

# 装饰器

# 介绍

随着TypeScript和ES6里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及其成员。 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式。 Javascript里的装饰器目前处在 [建议征集的第二阶段](https://github.com/tc39/proposal-decorators)，但在TypeScript里已做为一项实验性特性予以支持。

> 注意  装饰器是一项实验性特性，在未来的版本中可能会发生改变。

若要启用实验性的装饰器特性，你必须在命令行或`tsconfig.json`里启用`experimentalDecorators`编译器选项：

**命令行**:

```shell
tsc --target ES5 --experimentalDecorators
```

**tsconfig.json**:

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

# 装饰器

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。 装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

例如，有一个`@sealed`装饰器，我们会这样定义`sealed`函数：

```ts
function sealed(target) {
    // do something with "target" ...
}
```

> 注意  后面[类装饰器](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)小节里有一个更加详细的例子。

## 装饰器工厂

如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 *装饰器工厂*就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

我们可以通过下面的方式来写一个装饰器工厂函数：

```ts
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
```

> 注意  下面[方法装饰器](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)小节里有一个更加详细的例子。

## 装饰器组合

多个装饰器可以同时应用到一个声明上，就像下面的示例：

- 书写在同一行上：

```ts
@f @g x
```

- 书写在多行上：

```ts
@f
@g
x
```

当多个装饰器应用于一个声明上，它们求值方式与[复合函数](http://en.wikipedia.org/wiki/Function_composition)相似。在这个模型下，当复合*f*和*g*时，复合的结果(*f* ∘ *g*)(*x*)等同于*f*(*g*(*x*))。

同样的，在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：

1. 由上至下依次对装饰器表达式求值。
2. 求值的结果会被当作函数，由下至上依次调用。

如果我们使用[装饰器工厂](https://www.tslang.cn/docs/handbook/decorators.html#decorator-factories)的话，可以通过下面的例子来观察它们求值的顺序：

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

在控制台里会打印出如下结果：

```shell
f(): evaluated
g(): evaluated
g(): called
f(): called
```

## 装饰器求值

类中不同声明上的装饰器将按以下规定的顺序应用：

1. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个实例成员。
2. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个静态成员。
3. *参数装饰器*应用到构造函数。
4. *类装饰器*应用到类。

## 类装饰器

*类装饰器*在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中( `.d.ts`)，也不能用在任何外部上下文中（比如`declare`的类）。

类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。

如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

> 注意 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 *不会*为你做这些。

下面是使用类装饰器(`@sealed`)的例子，应用在`Greeter`类：

```ts
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

我们可以这样定义`@sealed`装饰器：

```ts
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
```

当`@sealed`被执行的时候，它将密封此类的构造函数和原型。(注：参见[Object.seal](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal))

下面是一个重载构造函数的例子。

```ts
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

## 方法装饰器

*方法装饰器*声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 *属性描述符*上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( `.d.ts`)，重载或者任何外部上下文（比如`declare`的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

> 注意  如果代码输出目标版本小于`ES5`，*属性描述符*将会是`undefined`。

如果方法装饰器返回一个值，它会被用作方法的*属性描述符*。

> 注意  如果代码输出目标版本小于`ES5`返回值会被忽略。

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
```





#### 访问器装饰器

- 应用于访问器的 *属性描述符*并且可以用来监视，修改或替换一个访问器的定义
- 不能用在声明文件中（`.d.ts`）
- 不能用在任何外部上下文（比如 `declare`的类）里

访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

> 注意  如果代码输出目标版本小于`ES5`，*Property Descriptor*将会是`undefined`。

如果访问器装饰器返回一个值，它会被用作方法的*属性描述符*。

> 注意  如果代码输出目标版本小于`ES5`返回值会被忽略。

```typescript
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}
```

#### 属性装饰器

- 不能用在声明文件中（.d.ts），
- 不能用在任何外部上下文（比如 `declare`的类）里

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。



-  *属性描述符*不会做为参数传入属性装饰器
- 属性描述符只能用来监视类中是否声明了某个名字的属性
- 没有办法在定义一个原型对象的成员时描述一个实例属性
- 没办法监视或修改一个属性的初始化方法

```typescript
class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```



#### 参数装饰器

*参数装饰器*声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 `declare`的类）里。

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

> 注意  参数装饰器只能用来监视一个方法的参数是否被传入。

参数装饰器的返回值会被忽略。

```typescript
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}

import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}
```

#### 元素据

需要第三坊库支持支[实验性的`metadata API`

```shell
npm i reflect-metadata --save
```

```typescript
import "reflect-metadata";

class Point {
    x: number;
    y: number;
}

class Line {
    private _p0: Point;
    private _p1: Point;

    @validate
    set p0(value: Point) { this._p0 = value; }
    get p0() { return this._p0; }

    @validate
    set p1(value: Point) { this._p1 = value; }
    get p1() { return this._p1; }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set;
    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.");
        }
        set(value);
    }
}
```





### Mixins

```typescript
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}
class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

/**
历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码。
*/
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```



### 三斜线指令

- 三斜线指令是包含单个XML标签的单行注释
- 注释的内容会做为编译器指令使用
- *仅*可放在包含它的文件的最顶端
- 三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令
- 若出现在一个语句或声明之后，那么它们会被当做普通的单行注释



#### `/// <reference path="..." />`

- 用于声明文件间的 *依赖*
- 告诉编译器在编译过程中要引入的额外的文件



#### `/// <reference types="..." />`

- 用来声明 *依赖*的
- 声明对某个包的依赖
- 与在 `import`语句里对模块名的解析类似，可以简单地把三斜线类型引用指令当做 `import`声明的包。



#### `/// <reference no-default-lib="true"/>`

- 把一个文件标记成*默认库*，在 `lib.d.ts`文件和它不同的变体的顶端看到这个注释
- 告诉编译器在编译过程中*不要*包含这个默认库



#### `/// <amd-module />`

默认情况下生成的AMD模块都是匿名的。 但是，当一些工具需要处理生成的模块时会产生问题，比如 `r.js`。

`amd-module`指令允许给编译器传入一个可选的模块名：

```typescript
///<amd-module name='NamedModule'/>
export class C {
}
```

这会将`NamedModule`传入到AMD `define`函数里：

```typescript
define("NamedModule", ["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
});
```

