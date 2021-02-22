## `SVG`

- 可伸缩矢量图形
- 定于用于网络的基于矢量的图形
- 使用XML定义图形
- 缩放不会影响图片质量
- `W3C`的标准
- 与DOM和`XSL`之类的`W3C`是一个整体



代码特点：

```svg
<?xml version="1.0" standalone="no"?>

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<circle cx="100" cy="50" r="40" stroke="black"
stroke-width="2" fill="red"/>

</svg>
```

- 首行包括XML声明
- 二行引用外部的`SVG  DTD`
- 然后是`svg`标签(version定义使用的`svg`版本，`xmlns`定义`svg`的命名空间)
- `svg`包裹描述的矢量图



### 在HTML种使用`SVG`

#### embed标签

```html
<embed src="rect.svg" width="300" height="100" 
type="image/svg+xml"
pluginspage="http://www.adobe.com/svg/viewer/install/" />
```

#### object标签

```html
<object data="rect.svg" width="300" height="100" 
type="image/svg+xml"
codebase="http://www.adobe.com/svg/viewer/install/" />
```

#### `iframe`标签

```html
<iframe src="rect.svg" width="300" height="100">
</iframe>
```



### `SVG`预定义的形状元素

- `<rect>`矩形
- `<cricle>`圆形
- `<ellipse>`椭圆
- `<line>`线
- `<polyline>`折线
- `<polygon>`多边形
- `<path>`路径



#### `rect`

- width, height
- style #定义css属性
  - fill #填充颜色（rgb，颜色名，十六进制值）
  - stroke-width #边框宽度
  - stroke #边框颜色
  - fill-opacity #填充颜色透明度（0-1）
  - stroke-opacity #边框颜色透明度（0-1）
  - opacity #整个元素的透明度
- x, y
- `rx, ry` #圆角

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect width="300" height="100"
style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)"/>

</svg>
```



#### `circle`

- cx, cy #圆点坐标，默认为（0,0）
- r #圆的半径

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<circle cx="100" cy="50" r="40" stroke="black"
stroke-width="2" fill="red"/>

</svg>
```



#### `ellipse`

- cx, cy #圆点坐标
- rx #水平半径
- ry #垂直半径

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/>

</svg>
```



#### `line`

- x1,y1
- x2,y2

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<line x1="0" y1="0" x2="300" y2="300"
style="stroke:rgb(99,99,99);stroke-width:2"/>

</svg>
```



#### `polygon`

- points #定义多边形的每个角的x和y，空格分开每个点

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<polygon points="220,100 300,210 170,250"
style="fill:#cccccc;
stroke:#000000;stroke-width:1"/>

</svg>
```



#### `polyline`

- points

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"
style="fill:white;stroke:red;stroke-width:2"/>

</svg>
```



#### path

- d #描述路径 （可使用命令描述路径数据，可大小写，大写表示绝对定位，小写表示相对定位）
  - M = moveto
  - L = lineto
  - H = horizontal lineto
  - V = vertical lineto
  - C = curveto
  - S = smooth curveto
  - Q = quadratic Belzier curve
  - T = smooth quadratic Belzier curveto
  - A = elliptical Arc
  - Z = closepath

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<path d="M250 150 L150 350 L350 350 Z" />

</svg>
// 开始于位置 250 150，到达位置 150 350，然后从那里开始到 350 350，最后在 250 150 关闭路径
```

`ps`:建议使用`SVG`编辑器





### `SVG`滤镜