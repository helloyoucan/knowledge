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

