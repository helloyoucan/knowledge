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

