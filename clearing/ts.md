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