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

- 每个`SVG`元素上可使用多个滤镜
- filter标签定义SVG滤镜，必须使用id属性用于图形使用滤镜时调用的唯一id
- filter需要嵌套defs标签内，是对诸如滤镜等特殊元素进行定义
- filter:url() #通过#id把元素连接到滤镜
- 滤镜使用feGaussianBlur等标签描述
  - stdDeviation #模糊程度
  - in #效果范围，如in="SourceGraphic" 这个部分定义了由整个图像创建效果

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
<filter id="Gaussian_Blur">
<feGaussianBlur in="SourceGraphic" stdDeviation="3" />
</filter>
</defs>

<ellipse cx="200" cy="150" rx="70" ry="40"
style="fill:#ff0000;stroke:#000000;
stroke-width:2;filter:url(#Gaussian_Blur)"/>

</svg>
```



可用的滤镜有

- feBlend
- feColorMatrix
- feComponentTransfer
- feComposite
- feConvolveMatrix
- feDiffuseLighting
- feDisplacementMap
- feFlood
- feGaussianBlur
- feImage
- feMerge
- feMorphology
- feOffset
- feSpecularLighting
- feTile
- feTurbulence
- feDistantLight
- fePointLight
- feSpotLight





### `SVG`渐变

#### linearGradient线性渐变

- 需要写在defs内部
- 线性渐变可被定义为水平、垂直或角形的渐变：
  - 当 y1 和 y2 相等，而 x1 和 x2 不同时，可创建水平渐变
  - 当 x1 和 x2 相等，而 y1 和 y2 不同时，可创建垂直渐变
  - 当 x1 和 x2 不同，且 y1 和 y2 不同时，可创建角形渐变
- 渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 <stop> 标签来规定。offset 属性用来定义渐变的开始和结束位置。
- 需有唯一id
- 通过fill:url(#id)使用

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
<linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:rgb(255,255,0);
stop-opacity:1"/>
<stop offset="100%" style="stop-color:rgb(255,0,0);
stop-opacity:1"/>
</linearGradient>
</defs>

<ellipse cx="200" cy="190" rx="85" ry="55"
style="fill:url(#orange_red)"/>

</svg>
```



#### radialGradient放射性渐变

- cx, xy, r #定义外圈
- fx, fy #定义内圈
- 渐变的颜色范围可由两种或多种颜色组成
- 每种颜色通过一个 <stop> 标签来规定。offset 属性用来定义渐变的开始和结束位置

```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
<radialGradient id="grey_blue" cx="20%" cy="40%" r="50%"
fx="50%" fy="50%">
<stop offset="0%" style="stop-color:rgb(200,200,200);
stop-opacity:0"/>
<stop offset="100%" style="stop-color:rgb(0,0,255);
stop-opacity:1"/>
</radialGradient>
</defs>

<ellipse cx="230" cy="200" rx="110" ry="100"
style="fill:url(#grey_blue)"/>

</svg>
```



## SVG 元素

| 元素                | 描述                                                         |
| :------------------ | :----------------------------------------------------------- |
| a                   | 定义超链接                                                   |
| altGlyph            | 允许对象性文字进行控制，来呈现特殊的字符数据（例如，音乐符号或亚洲的文字） |
| altGlyphDef         | 定义一系列象性符号的替换（例如，音乐符号或者亚洲文字）       |
| altGlyphItem        | 定义一系列候选的象性符号的替换                               |
| animate             | 随时间动态改变属性                                           |
| animateColor        | 规定随时间进行的颜色转换                                     |
| animateMotion       | 使元素沿着动作路径移动                                       |
| animateTransform    | 对元素进行动态的属性转换                                     |
| circle              | 定义圆                                                       |
| clipPath            |                                                              |
| color-profile       | 规定颜色配置描述                                             |
| cursor              | 定义独立于平台的光标                                         |
| definition-src      | 定义单独的字体定义源                                         |
| defs                | 被引用元素的容器                                             |
| desc                | 对 SVG 中的元素的纯文本描述 - 并不作为图形的一部分来显示。用户代理会将其显示为工具提示。 |
| ellipse             | 定义椭圆                                                     |
| feBlend             | SVG 滤镜。使用不同的混合模式把两个对象合成在一起。           |
| feColorMatrix       | SVG 滤镜。应用matrix转换。                                   |
| feComponentTransfer | SVG 滤镜。执行数据的 component-wise 重映射。                 |
| feComposite         | SVG 滤镜。                                                   |
| feConvolveMatrix    | SVG 滤镜。                                                   |
| feDiffuseLighting   | SVG 滤镜。                                                   |
| feDisplacementMap   | SVG 滤镜。                                                   |
| feDistantLight      | SVG 滤镜。 Defines a light source                            |
| feFlood             | SVG 滤镜。                                                   |
| feFuncA             | SVG 滤镜。feComponentTransfer 的子元素。                     |
| feFuncB             | SVG 滤镜。feComponentTransfer 的子元素。                     |
| feFuncG             | SVG 滤镜。feComponentTransfer 的子元素。                     |
| feFuncR             | SVG 滤镜。feComponentTransfer 的子元素。                     |
| feGaussianBlur      | SVG 滤镜。对图像执行高斯模糊。                               |
| feImage             | SVG 滤镜。                                                   |
| feMerge             | SVG 滤镜。创建累积而上的图像。                               |
| feMergeNode         | SVG 滤镜。feMerge的子元素。                                  |
| feMorphology        | SVG 滤镜。 对源图形执行"fattening" 或者 "thinning"。         |
| feOffset            | SVG 滤镜。相对与图形的当前位置来移动图像。                   |
| fePointLight        | SVG 滤镜。                                                   |
| feSpecularLighting  | SVG 滤镜。                                                   |
| feSpotLight         | SVG 滤镜。                                                   |
| feTile              | SVG 滤镜。                                                   |
| feTurbulence        | SVG 滤镜。                                                   |
| filter              | 滤镜效果的容器。                                             |
| font                | 定义字体。                                                   |
| font-face           | 描述某字体的特点。                                           |
| font-face-format    |                                                              |
| font-face-name      |                                                              |
| font-face-src       |                                                              |
| font-face-uri       |                                                              |
| foreignObject       |                                                              |
| g                   | 用于把相关元素进行组合的容器元素。                           |
| glyph               | 为给定的象形符号定义图形。                                   |
| glyphRef            | 定义要使用的可能的象形符号。                                 |
| hkern               |                                                              |
| image               |                                                              |
| line                | 定义线条。                                                   |
| linearGradient      | 定义线性渐变。                                               |
| marker              |                                                              |
| mask                |                                                              |
| metadata            | 规定元数据。                                                 |
| missing-glyph       |                                                              |
| mpath               |                                                              |
| path                | 定义路径。                                                   |
| pattern             |                                                              |
| polygon             | 定义由一系列连接的直线组成的封闭形状。                       |
| polyline            | 定义一系列连接的直线。                                       |
| radialGradient      | 定义放射形的渐变。                                           |
| rect                | 定义矩形。                                                   |
| script              | 脚本容器。（例如ECMAScript）                                 |
| set                 | 为指定持续时间的属性设置值                                   |
| stop                |                                                              |
| style               | 可使样式表直接嵌入SVG内容内部。                              |
| svg                 | 定义SVG文档片断。                                            |
| switch              |                                                              |
| symbol              |                                                              |
| text                |                                                              |
| textPath            |                                                              |
| title               | 对 SVG 中的元素的纯文本描述 - 并不作为图形的一部分来显示。用户代理会将其显示为工具提示。 |
| tref                |                                                              |
| tspan               |                                                              |
| use                 |                                                              |
| view                |                                                              |
| vkern               |                                                              |