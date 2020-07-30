
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

这里，用洪湾渔港门户某个版本的代码做示例

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
        // 项目通用组件
        '@common': path.resolve(__dirname, '../src/components/common'),
        // 业务逻辑组件
        '@service': path.resolve(__dirname, '../src/components/service'),
        // 整体布局组件
        '@layout': path.resolve(__dirname, '../src/components/layout'),
        // 项目所需工具组件
        '@utils': path.resolve(__dirname, '../src/components/utils'),
        // 静态资源
        '@assets': path.resolve(__dirname, '../src/assets/')
     })
     // Return the altered config
     return config;
   };
   ```

   

5. 添加你的 stories

   为GoodsCategory添加stories。

   /src/index/components/GoodsCategory/index.vue需要关注的代码

   ```javascript
   ...
   props: {
       label: {
         type: String,
         default: ''
       },
       labelWidth: {
         type: Number,
         default: 80
       },
       categoryList: {
         type: Array,
         require: true
       },
       isShowMore: {
         type: Boolean,
         default: true
       }
   }
   ...
   ```

   书写stories

   在该组件目录下新建index.stories.js

   ```javascript
   import Vue from 'vue'
   import { storiesOf } from '@storybook/vue';
   import vGoodsCategory from './index.vue'
   import BaseIcon from '@common/BaseIcon/index.vue' // svg icon组件
   import '@assets/iconfont/index'
   import '@/styles/reset.css'
   Vue.component('v-icon', BaseIcon)
   
   export const categoryList = new Array(20).fill(1).map((_,index)=>({id:index,name:`鲨鱼${index}`}))
   storiesOf('GoodsCategory', module)
   .add('default',()=>{
       return {
         components: { vGoodsCategory },
         template: `<v-goods-category :categoryList="listData"/>`,
         data: () => ({ listData:categoryList })
       }
   })
   .add('Label',()=>{
       return {
         components: { vGoodsCategory },
         template: `<v-goods-category :categoryList="listData" label="我是label"/>`,
         data: () => ({ listData:categoryList })
       }
   })
   .add('Many',()=>{
       return {
         components: { vGoodsCategory },
         template: `<div><v-goods-category :categoryList="listData" label="我是label"/>
         <v-goods-category :categoryList="listData" label="我是label"/></div>`,
         data: () => ({ listData:categoryList })
       }
   })
   .add('isShowMore',()=>{
       return {
         components: { vGoodsCategory },
         template: `<div><v-goods-category :isShowMore="false" :categoryList="listData" label="我是label"/></div>`,
         data: () => ({ listData:categoryList })
       }
   })
   ```

6. 运行

   ```shell
   npm run storybook
   ```



#### 为需要向组件内注入数据的组件注入数据

用GoodsCategoryPanel组件做示例：

1. 修改GoodsCategoryPanel组件，添加props

   ```
   ...
    props: {
       //+++++++
       initialData: {
         type: Object,
         default() {
           return {}
         }
       }
     },
   ...
   ...
   data() {
       return {
         currentFilters: [],
         filterList: {
           products: [],
           storage: [],
           fish: []
         },
         ...this.initialData //+++++++
       };
     },
   ...
   ```

   2. 书写stories

      在组件目录下新建文件index.stories.js

      ```javascript
      import Vue from 'vue'
      import { storiesOf } from '@storybook/vue'
      import vGoodsCategoryPanel from './index.vue'
      import Router from 'vue-router'
      import {categoryList} from '../GoodsCategory/index.stories.js'
      Vue.use(Router)
      const router = new Router({
          routes:[]
      })
      const products =categoryList.map((item,index,arr)=>({...item,children:arr.map((item)=>({...item,name:'2-'+index+'-'+item.name}))}))
      products.unshift({ id: "", name: "全部", isAll: true })
      const storage = ['常温','低温','冷藏','绝对零度'].map((item,index)=>({id:index,name:item}))
      const fish = ['野生','圈养','深海','浅海'].map((item,index)=>({id:index,name:item}))
      
      
      storiesOf('GoodsCategoryPanle', module)
      .add('default',()=>{
          return {
            router,
            components: { vGoodsCategoryPanel },
            data(){
              return {
               filterList: {
                   products: [products], // {Array<Array<Object>>}
                   storage, // {Array<Object>}
                   fish//  {Array<Object>}
                 }
              }
          },
            template: `
                <div>
                 		<vGoodsCategoryPanel :initialData="{filterList}"/>
                </div>
             `
          }
      })
      ```

      其实就是利用props像组件传入数据。

#### 使用一些插件，扩展StoryBook的功能

例如添加 @storybook/addon-knobs插件，在Storybook上直接修改UI

1. 添加插件依赖

   ```shell
   npm install @storybook/addon-knobs --save-dev
   ```

2. 调用文件

   新建文件.storybook/addons.js，并写入内容

   ```javascript
   import '@storybook/addon-knobs/register';
   ```

3. 修改GoodsCategoryPanel/index.stories.js

   ```javascript
   import Vue from 'vue'
   import { storiesOf } from '@storybook/vue'
   import { withKnobs, number, object, boolean, text, select, date, array, color } from '@storybook/addon-knobs';
   import vGoodsCategoryPanel from './index.vue'
   import Router from 'vue-router'
   import {categoryList} from '../GoodsCategory/index.stories.js'
   Vue.use(Router)
   const router = new Router({
       routes:[]
   })
   const products =categoryList.map((item,index,arr)=>({...item,children:arr.map((item)=>({...item,name:'2-'+index+'-'+item.name}))}))
   products.unshift({ id: "", name: "全部", isAll: true })
   const storage = ['常温','低温','冷藏','绝对零度'].map((item,index)=>({id:index,name:item}))
   const fish = ['野生','圈养','深海','浅海'].map((item,index)=>({id:index,name:item}))
   
   
   storiesOf('GoodsCategoryPanle', module)
   .addDecorator(withKnobs)
   .add('default',()=>{
       const name = text('Name', 'hello story book');
       const bold = boolean('Bold', false);
       const selectedBgColor = color('bgColor', '#fff');
       const selectedColor = color('Color', 'black');
       const fontSize = number('fontSize', 20);
       const customStyle = object('Style', {
           fontFamily: 'Arial',
           padding: "20px",
         });
       const style = {
           ...customStyle,
           fontWeight: bold ? 800 : 400,
           fontSize:fontSize+'px',
           color:selectedColor,
           backgroundColor: selectedBgColor
         };
       return {
         router,
         components: { vGoodsCategoryPanel },
         props:{
           style:{
               default:style
           },
           name: {
               default: name
             }
         },
         data(){
           return {
            filterList: {
                products: [products], // {Array<Array<Object>>}
                storage, // {Array<Object>} 
                fish //  {Array<Object>} 
              }
           }
       },
         template: `<div>
         <div :style="style">{{name}}</div>
         <vGoodsCategoryPanel :initialData="{filterList}"/>
         </div>`
       }
   })
   ```

4. 运行并打开对应的story即可看到操作面板





还有非常多有意思的`addons`，比如Info的提升版本`readme`.以及一键换背景的`backgrounds`。还有现成的`Material-UI`。还有直接显示Jsx源码的`Storybook-addon-jsx`.以及控制版本显示的`storybook-addon-versions`，让你直接对比多个版本的区别。一键生成所有截图的`Storybook Chrome Screenshot Addon`。这些社区的`addons`都非常实用。感兴趣可以自己增加。





#### 总结内容

###### 1. 首先说一下使用StoryBook的特点：

> - 组件驱动开发，由下至上，从底层组件开始一步步构建界面
>
> - 隔离开发环境展示组件，无需运行项目
> - 无需关心组件的依赖和要求

###### 2. 再对比一下在新增需求和需求更改的情况下使用StoryBook的区别：

对于**新需求**，我大概需要进行下面的步骤

| 旧的方式                                                     | 使用StoryBook                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **运行项目**                                                 | **运行StoryBook**                                            |
| 在特定位置，添加新的内容                                     | 在特定位置，添加新的内容                                     |
| **等待后端接口完成，接入接口**                               | **协定接口相关内容，并接入接口**                             |
| **在系统中添加该功能的测试数据：在原型限制的条件内容，添加各种的奇怪的数据** | **编写测试数据，根据不同的组件状态添加不同的story**          |
| **在对应的页面，手动改变组件不同的状态，或是根据业务生成不同状态的数据，确认功能正常，删除测试数据** | **在StoryBook中直接查看组件的stories，确认不同状态的组件功能都正常** |

对于**需求更改**，则大概需要以下步骤

| 旧的方式                                                     | 使用StoryBook                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **运行项目**                                                 | **运行StoryBook**                                            |
| 找到指定的文件，修改功能                                     | 找到指定的文件，修改功能                                     |
| **根据情况，可能需要创建一些测试数据，或是根据业务生成不同状态的数据，查看修改后的功能** | **根据情况，可能需要修改一些测试数据，或是添加新的story**    |
| **在对应的页面，手动改变组件不同的状态，确认功能正常，删除测试数据** | **在StoryBook搜索该组件，查看组件的stories，确认不同状态的组件功能都正常** |



###### 3. 在上面的例子，引入StoryBook，我做了下面这几件事：

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



###### 5. 结语

虽然为使用StoryBook添加和修改了不不少的内容，但是，最终我们的组件脱离项目，能单独运行展示，并添加不同的story，去展示不同状态的组件，观测组件的UI和功能。

对于一些严重依赖业务数据、业务状态的组件，我们则可以创造不同的story，去测试组件的完成情况，及时发现组件的BUG，而不是让其他人发现组件的BUG；一定程度上减少了在测试环境、线上环境中出现BUG的情况。