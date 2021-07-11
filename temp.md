#### `JSON.stringify`

1. 处理基本类型时，与使用`toString`基本相同，结果都是字符串，除了 undefined

```javascript
console.log(JSON.stringify(null)) // "null"
console.log(JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
console.log(JSON.stringify(true)) // "true"
console.log(JSON.stringify(42)) // "42"
console.log(JSON.stringify("42")) // "\"42\""
```

2. 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

```javascript
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); // "[1,"false",false]"
```

3. `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。

```javascript
JSON.stringify({x: undefined, y: Object, z: Symbol("")}); // "{}"
JSON.stringify([undefined, Object, Symbol("")]);// "[null,null,null]" 
```

4. `JSON.stringify` 有第二个参数 replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除

```javascript
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);

console.log(jsonString)
// {"week":45,"month":7}
```

5.如果一个被序列化的对象拥有 `toJSON`方法，那么该 `toJSON` 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用` toJSON `方法后的返回值会被序列化。

```javascript
var obj = {
  foo: 'foo',
  toJSON: function () { return 'bar';}
};
JSON.stringify(obj);      // '"bar"'
JSON.stringify({x: obj}); // '{"x":"bar"}'
```





#### 类型转换

##### 1.原始值转Boolean

- 只有7种值（false、undefined、null、+0和-0、`NaN`、""、+0n和-0n）被转换成false，其他都会被转换成 true。

  ```javascript
  console.log(Boolean()) // false //不传任何参数时，会返回 false。
  
  console.log(Boolean(false)) // false
  console.log(Boolean(undefined)) // false
  console.log(Boolean(null)) // false
  console.log(Boolean(+0),Boolean(-0)) // false,false
  console.log(Boolean(NaN)) // false
  console.log(Boolean("")) // false
  console.log(Boolean(Bigint(+0)),Boolean(Bigint(-0))) // false,false
  ```

##### 2.原始值转数字

如果 Number 函数不传参数，返回 +0，如果有参数，调用 `ToNumber(value)`。

注意这个 `ToNumber` 表示的是一个底层规范实现上的方法，并没有直接暴露出来。

而 `ToNumber` 则直接给了一个[对应的结果表](http://es5.github.io/#x9.3)。

| 参数类型  | 结果                                                         |
| --------- | ------------------------------------------------------------ |
| Undefined | `NaN`                                                        |
| Null      | +0                                                           |
| Boolean   | 如果参数是 true，返回 1。参数为 false，返回 +0               |
| Number    | 返回与之相等的值                                             |
| String    | 会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 `NaN` |

- `parseInt` 只解析整数
- `parseFloat` 则可以解析整数和浮点数
- 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 `NaN`

```javascript
console.log(parseInt("3 abc")) // 3
console.log(parseFloat("3.14 abc")) // 3.14
```



##### 3.原始值转字符串

`String` 函数不传参数，返回空字符串，如果有参数，调用 `ToString(value)`，而 `ToString` 也给了一个对应的结果表。

| 参数类型  | 结果                                                         |
| --------- | ------------------------------------------------------------ |
| Undefined | "undefined"                                                  |
| Null      | "null"                                                       |
| Boolean   | 如果参数是 true，返回 "true"。参数为 false，返回 "false"     |
| Number    | 0=>"0",-0=>"0",`NaN`=>`"NaN",Infinity`=>"Infinity",<br />-Infinity=>"Infinity",`10n`=>"0" |
| String    | 返回与之相等的值                                             |

##### 4.原始值转对象

- 原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象
- null 和 undefined 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (`TypeError`) 异常，而不会执行正常的转换。

```javascript
var a = 1;
console.log(typeof a); // number
var b = new Number(a);
console.log(typeof b); // object
```

##### 5.对象转布尔值

- 所有对象(包括数组和函数)都转换为 true

##### 6.对象转字符串和数字

- JavaScript 对象转换有两个不同的方法来执行，一个是 `toString`，一个是 `valueOf`

###### ` toString`

- null 和 undefined 之外的任何值都具有 `toString` 方法

- `toString` 方法的作用在于返回一个反映这个对象的字符串

   JavaScript 下的很多类根据各自的特点，定义了更多版本的 `toString` 方法。

  1. 数组的 `toString` 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。
  2. 函数的` toString` 方法返回源代码字符串。
  3. 日期的` toString` 方法返回一个可读的日期和时间字符串。
  4. `RegExp` 的 `toString` 方法返回一个表示正则表达式直接量的字符串。

###### `valueOf`

- 表示对象的原始值
- 默认的` valueOf` 方法返回这个对象本身
- 数组、函数、正则简单的继承了这个默认方法，也会返回对象本身
- 日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。

###### 对象转字符串

1. 如果对象具有 `toString `方法，则调用这个方法。如果他返回一个原始值，JavaScript 将这个值转换为字符串，并返回这个字符串结果。
2. 如果对象没有 `toString` 方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 `valueOf` 方法。如果存在这个方法，则 JavaScript 调用它。如果返回值是原始值，JavaScript 将这个值转换为字符串，并返回这个字符串的结果。
3. 否则，JavaScript 无法从 `toString` 或者 `valueOf` 获得一个原始值，这时它将抛出一个类型错误异常。

###### 对象转数字

1. 如果对象具有 `valueOf `方法，且返回一个原始值，则 JavaScript 将这个原始值转换为数字并返回这个数字
2. 否则，如果对象具有 `toString `方法，且返回一个原始值，则 JavaScript 将其转换并返回。
3. 否则，JavaScript 抛出一个类型错误异常。



#### 一元操作符 +

- 将其操作数转换为 Number 类型



#### 二元操作符 +

首先需要了解

1. `ToPrimitive `

   ```javascript
   ToPrimitive(input[, PreferredType])
   ```

   第一个参数是 input，表示要处理的输入值。

   第二个参数是 `PreferredType`，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。

   当不传入` PreferredType` 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。

   如果传入的 input 是 Undefined、Null、Boolean、Number、String 类型，直接返回该值。

   如果是` ToPrimitive(obj, Number)`，处理步骤如下：

   1. 如果 obj 为 基本类型，直接返回
   2. 否则，调用 `valueOf `方法，如果返回一个原始值，则 JavaScript 将其返回。
   3. 否则，调用` toString` 方法，如果返回一个原始值，则 JavaScript 将其返回。
   4. 否则，JavaScript 抛出一个类型错误异常。

   如果是 `ToPrimitive(obj, String)`，处理步骤如下：

   1. 如果 obj为 基本类型，直接返回
   2. 否则，调用 `toString `方法，如果返回一个原始值，则 JavaScript 将其返回。
   3. 否则，调用 `valueOf` 方法，如果返回一个原始值，则 JavaScript 将其返回。
   4. 否则，JavaScript 抛出一个类型错误异常。

到底当执行 `+` 运算的时候，会执行怎样的步骤呢？让我们根据规范`11.6.1` 来捋一捋：

当计算 `value1 + value2`时：

1. `lprim = ToPrimitive(value1)`
2. `rprim = ToPrimitive(value2)`
3. 如果 `lprim` 是字符串或者 `rprim `是字符串，那么返回 `ToString(lprim) 和 ToString(rprim)`的拼接结果
4. 返回 `ToNumber(lprim)` 和 `ToNumber(rprim)`的运算结果

#### == 相等

`"=="` 用于比较两个值是否相等，当要比较的两个值类型不一样的时候，就会发生类型的转换。

[规范11.9.5](http://es5.github.io/#x11.9.3)

当执行x == y 时：

1. 如果x与y是同一类型：
   1. x是Undefined，返回true
   2. x是Null，返回true
   3. x是数字：
      1. x是`NaN`，返回false
      2. y是`NaN`，返回false
      3. x与y相等，返回true
      4. x是+0，y是-0，返回true
      5. x是-0，y是+0，返回true
      6. 返回false
   4. x是字符串，完全相等返回true,否则返回false
   5. x是布尔值，x和y都是true或者false，返回true，否则返回false
   6. x和y指向同一个对象，返回true，否则返回false
2. x是null并且y是undefined，返回true
3. x是undefined并且y是null，返回true
4. x是数字，y是字符串，判断x == `ToNumber(y)`
5. x是字符串，y是数字，判断`ToNumber(x)` == y
6. x是布尔值，判断`ToNumber(x)` == y
7. y是布尔值，判断x ==`ToNumber(y)`
8. x不是字符串或者数字，y是对象，判断x ==` ToPrimitive(y)`
9. x是对象，y不是字符串或者数字，判断`ToPrimitive(x)` == y
10. 返回false