#### 安装vue脚手架：
Node.js>=8.9
没有vue-cli3的先安装一下：
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
安装完后查看版本：
```
vue --version
```
#### 创建项目：
```
vue create storybook-test
```
选择相对应的配置，
等待项目创建完毕。
#### 安装storybook，并初始化
```
cd storybook-test
npx -p @storybook/cli sb init
```
如果没检测到使用的是vue，可以尝试注明类型：
```
npx -p @storybook/cli sb init --type vue
```
或者自行添加：
教程链接<https://storybook.js.org/docs/guides/guide-vue/>
#### 添加storybook，书写stories
为了清除了解storybook对项目进行了哪些改造，这里用手动添加的方法。

1. 添加依赖

   ```
   npm install @storybook/vue --save-dev
   ```

2. 添加npm脚本

   ```
   {
     "scripts": {
       "storybook": "start-storybook"
     }
   }
   ```

3. 添加配置文件

   .storybook/config.js

   ```
   import { addParameters,configure } from '@storybook/vue';
   function loadStories() {
     /*根据特定的文件名加载stories，在这个例子，用xxx.stories.js命名文件*/
     const req = require.context('../src', true, /\.stories\.js$/);
     req.keys().forEach(filename => req(filename));
   }
   addParameters({
     options: {
       panelPosition: 'right' //操作面板在右边
     },
   })
   configure(loadStories, module);
   
   ```

4. 添加必须的webpack配置

   .storybook/webpack.config.js

   ```javascript
   const path = require('path');
   
   // Export a function. Accept the base config as the only param.
   module.exports = async ({ config, mode }) => {
     // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
     // You can change the configuration based on that.
     // 'PRODUCTION' is used when building the static version of storybook.
   
     // Make whatever fine-grained changes you need
     config.module.rules.push({
       test: /\.scss$/,
       use: ['style-loader', 'css-loader', 'sass-loader'],
       include: path.resolve(__dirname, '../'),
     });
     Object.assign(config.resolve.alias,{
       '@': path.resolve(__dirname, '../src'),
        '@assets': path.resolve(__dirname, '../src/assets/')
     })
     // Return the altered config
     return config;
   };
   ```
   
   因为我使用了Sass和alias，在提供给storybook的webpack配置文件上加上相应的内容

5. 添加我们的组件

   src/components/Button.vue

   ```vue
   <template>
     <button :class="type" class="btn">
       <slot></slot>
     </button>
   </template>
   
   <script>
   export default {
     name: "HelloWorld",
     props: {
       type: {
         type: String,
         default: "default" // default/primary/danger
       }
     }
   };
   </script>
   
   <style scoped lang="scss">
   .btn {
     border: 1px solid transparent;
     background: #fff;
     outline: none;
     color: #333;
     padding: 5px 10px;
   }
   .default {
     border: 1px solid #e3e3e3;
     color: #333;
     background-color: #fff;
   }
   .primary {
     border: 1px solid #007cff;
     color: #fff;
     background-color: #007cff;
   }
   .danger {
     border: 1px solid #cb191d;
     color: #fff;
     background-color: #cb191d;
   }
   </style>
   ```

6. 为组件添加story

   /src/components/Button.stories.js

   ```js
   import Vue from 'vue';
   import { storiesOf } from '@storybook/vue';
   import vButton from './Button.vue';
   
   storiesOf('GoodsCategory', module)
     .add('default', () => ({
       components: { vButton },
       template: '<v-button>default</v-button>',
     }))
     .add('primary', () => ({
       components: { vButton },
       template: '<v-button type="primary">primary</v-button>',
     }))
     .add('danger', () => ({
       components: { vButton },
       template: '<v-button type="danger">danger</v-button>',
     }));
     
   
   ```

7. 运行storybook

   ```shell
   npm run storybook
   ```

   等待项目启动，自动打开默认浏览器。

   即可看到Botton组件的story
![](https://upload-images.jianshu.io/upload_images/3345526-93c59e50ec36b162.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 除了添加组件的story外，Storybook官方或社区提供了不少有趣的插件
例如这个能够利用控件更改story的插件@storybook/addon-knobs

1. install 插件

   ```shell
   npm install @storybook/addon-knobs --save-dev
   ```

2. 添加注册文件

新建文件.storybook/addons.js，并写入内容

```javascript
import '@storybook/addon-knobs/register';
```

3. 修改Button.stories.js

   ```javascript
   import Vue from 'vue';
   import { storiesOf } from '@storybook/vue';
   import vButton from './Button.vue';
   import { withKnobs, number, object, boolean, text, select, date, array, color } from '@storybook/addon-knobs';
   storiesOf('vButton', module)
     .addDecorator(withKnobs)
     .add('default', () => ({
       components: { vButton },
       template: '<v-button>default</v-button>',
     }))
     .add('primary', () => ({
       components: { vButton },
       template: '<v-button type="primary">primary</v-button>',
     }))
     .add('danger', () => ({
       components: { vButton },
       template: '<v-button type="danger">danger</v-button>',
     }))
     .add('diy', () => {
       const btnText = text('btnText', 'DIY Button'); //文字控件
       const bold = boolean('Bold', false) //启用控件
       const selectedBgColor = color('bgColor', '#fff');//颜色选择器
       const selectedColor = color('Color', 'black');
       const fontSize = number('fontSize', 20)//数字
       const customStyle = object('Style', {
         fontFamily: 'Arial',
         padding: "20px",
       });
       const style = {
         ...customStyle,
         fontWeight: bold ? 800 : 400,
         fontSize: fontSize + 'px',
         color: selectedColor,
         backgroundColor: selectedBgColor
       };
       return {
         components: { vButton },
         props: {
           btnText: {
             default: btnText
           },
           style: {
             default: style
           }
         },
         template: '<v-button :style="style">{{btnText}}</v-button>'
       }
     })
   ```
   
   要注意的是，在调用add函数添加story前，调用了addDecorator添加我们的插件面板。
   
4. 运行并打开对应的story即可看到操作面板
![](https://upload-images.jianshu.io/upload_images/3345526-dcccab54b7488c85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
   除了addon-knobs，还有非常多有意思的`addons`，比如Info的提升版本`readme`.以及一键换背景的`backgrounds`。还有现成的`Material-UI`。还有直接显示Jsx源码的`Storybook-addon-jsx`.以及控制版本显示的`storybook-addon-versions`，让你直接对比多个版本的区别。一键生成所有截图的`Storybook Chrome Screenshot Addon`。这些社区的`addons`都非常实用。感兴趣可以自己增加。

#### 总结内容

###### 1. 首先说一下使用StoryBook的特点：

> - 组件驱动开发，由下至上，从底层组件开始一步步构建界面
> - 隔离开发环境展示组件，无需运行项目
> - 无需关心组件的依赖和要求

###### 2. 在上面的例子，引入StoryBook，我做了下面这几件事：

1. install storybook 依赖
2. 新建storybook配置文件./storybook/config.js，添加相关配置，加载组件的stories
3. 为storybook的组件运行添加对应的webpack配置（./storybook/webpack.config.js）
4. 为组件添加story(即xxx.stories.js)
5. 运行storybook

若要使用官方或社区的stroybook插件，则还需要：

1. install 插件
2. 新建.storybook/addons.js，在里面通过import的方式，注册插件
3. 根据插件文档的描述，编写使用的代码
  

###### 4. 对于新页面的开发方式，我所做的改变可能有

旧的：**由上至下**，即是：页面结构 -> 组件容器 -> ... ->组件容器 -> 组件

新的：**组件驱动开发**，**由下至上**进行页面的开发：组件- -> 组件容器 -> ... ->组件容器 -> 页面结构
