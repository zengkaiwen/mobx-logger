> 该项目目前在Mobx 5.x上使用会有问题！！！正在寻找解决方案！

# taro-mobx-logger
让使用Taro+Mobx开发微信小程序获得更友好的状态调试

> 在使用Taro+Mobx开发小程序的时候，对于Mobx中状态的调试特别的不方便，所以借鉴redux-logger和mobx-logger，在了解了Mobx的基本用法之后，写了这么一个工具，方便使用Taro+Mobx的小伙伴能够愉快的在小程序的控制台里调试Mobx状态

Example 如图：
![Example](https://s1.ax1x.com/2020/06/18/NmLzjI.png)

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

第一步、你需要把mobx的store改成class的形式，并且使用mobx提供的action装饰操作状态的方法。例如，针对counter.js

Taro默认的Mobx store代码如下：

```js
import { observable, action } from 'mobx'
const counterStore = observable({
  counter: 0,
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default counterStore
```

改成class形式：

```js
import { observable, action } from 'mobx'

class CounterStore {
  @observable counter = 0;

  @action.bound
  counterStore() {
    this.counter++
  }

  @action.bound
  increment() {
    this.counter++
  }

  @action.bound
  decrement() {
    this.counter--
  }

  @action.bound
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
}
const counterStore = new CounterStore();
export default counterStore;
```

第二步、修改app.jsx文件内容：

```js
import { enableLogging } from 'taro-mobx-logger';
import counterStore from './store/counter'
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

