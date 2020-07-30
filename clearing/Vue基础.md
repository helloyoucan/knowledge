#### 1.生命周期

beforeCreate

created

beforeMount

mounted

beforeUpdate

updated

beforeDestroy

destroyed

### 2.语法

```
// 文本
<span>Message:{{msg}}</span>
// html
<span v-html="msg"></span>
// 表达式
<span>{{'Message:'+msg}}</span>
```

### 3.指令

v-once

v-bind

v-if

v-else

v-else-if

v-on

v-for

v-model

##### 自定义指令

```
// 全局
Vue.directive('focus',{
	bind(){},//指令第一次绑定元素时调用
	inserted(){},//被绑定元素插入父节点时调用（父节点不一定已插入到文档中）
	update(){},//所在组件的VNode更新时调用
	componentUpdated(){},//指令所在组件的VNode及其子VNode全部更新后调用
	unbind(){}//指令与元素解绑时调用
})
// 组件内
directives:{
	focus:{
		// 指令内容	
	}
}
```

###### 钩子函数参数（el、bind、vnode、oldVnode）

除了el，其它均为只读。

el #指令绑定的元素，可直接操作DOM

binding{

name #指令名

value #指令绑定值

oldValue #指令前一个绑定值，仅在update和componentUpdated中可用。

expression #字符串形式的指令表达式（指令绑定的内容）

arg #指令参数（指令’:‘后面的参数），可选

modifiers #包含所有指令修饰符的对象

}

vnode # vue编译生成的虚拟节点

oldVnode # 上一个虚拟节点，仅在update和componentUpdated中可用。



