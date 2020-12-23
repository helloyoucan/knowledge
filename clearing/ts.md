## 变量声明

#### var声明

##### 作用域规则

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

##### 多次声明同一个变量并不会报错

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

##### 捕获变量怪异之处

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



#### let声明

##### 块级作用域

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



##### 重定义及屏蔽

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



##### 块级作用域变量的获取

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



#### 结构数组

```typescript
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```

https://www.tslang.cn/docs/handbook/variable-declarations.html