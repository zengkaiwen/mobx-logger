# taro-mobx-logger
让使用Taro+Mobx开发微信小程序获得更友好的状态调试

> 在使用Taro+Mobx开发小程序的时候，对于Mobx中状态的调试特别的不方便，所以借鉴redux-logger和mobx-logger，在了解了Mobx的基本用法之后，写了这么一个工具，方便使用Taro+Mobx的小伙伴能够愉快的在小程序的控制台里调试Mobx状态

Example 如图：


# Install 安装

NPM: `npm i taro-mobx-logger`

# Usage 用法

Taro默认生成的Mobx模板src目录如下：

```html
- src
    |- store
    |   |- counter.js
    |- pages
    |   |- index.jsx
    app.jsx
```

需要修改app.jsx文件内容：

```js
import { enableLoadding } from 'taro-mobx-logger';
// ...
const store = {
  counterStore
}

if (process.env.NODE_ENV !== 'production') {
  enableLogging(store)
}

// ...
```

> 注意：enableLogging传入的参数必须是包含多个store实例的对象，也就是如上代码所示

# License 许可
MIT

