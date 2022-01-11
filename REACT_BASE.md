# React Base Study

## 基础储备

### JSX 语法

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。这便是 JSX 的出发点。

1. 在 JSX 中通过 `{}` 嵌入表达式
2. JSX 也是一个表达式，可以将其赋值给变量或在条件语句等中使用；
3. JSX 特定属性

可以通过使用引号，来将属性值指定为字符串字面量
```js
const element = <div tabIndex="0"></div>;
```
也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：
```js
const element = <img src={user.avatarUrl}></img>;
```
4. 使用 JSX 指定子元素

```js
// 没有子元素，可以直接闭合
const element = <img src={user.avatarUrl} />;
// 包含子元素
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
5. JSX 防止注入攻击
6. JSX 表示对象

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
```js
// 以下两种示例代码完全等效
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象，被称为 ”React 元素“
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

### 元素的渲染

元素是构成 React 应用的最小单元。与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致

1. 将一个元素渲染为 DOM

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()：

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

2. 更新已渲染的元素

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。

但是~~~~~~

3. React 只更新它需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

### 组件

>组件允许你将 UI 拆分为“独立可复用”的代码片段，并对每个片段进行独立构思

1. 函数组件与 class 组件

最简单的组件就是 js 函数，它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素

```js
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// class 组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

2. 渲染组件

组件可以作为一个 react 元素赋值给变量，当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 将组件作为一个 React 元素赋值给变量
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
让我们来回顾一下这个例子中发生了什么：

- 我们调用 ReactDOM.render() 函数，并传入 `<Welcome name="Sara" />` 作为参数。
- React 调用 Welcome 组件，并将 {name: 'Sara'} 作为 props 传入。
- Welcome 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。
- React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

>注意！！！组件名称必须以大写字母开头

3. 组合和抽取组件

有了组件，我们就可以有意地进行组合和抽离，封装细节，让我们应用变得更好维护。

4. Props 的只读性

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

当然，UI 都是动态的，并会伴随着时间的推移而变化，这就引出了我们 `state` 的概念。

### State & 生命周期

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

1. 声明一个有状态的组件也很简单

```js
// 声明一个类并继承 React.Component
class Clock extends React.Component {
  constructor(props) {
    // 将 props 传递到父类的构造函数中
    super(props);
    // 在该函数中为 this.state 赋初值
    this.state = { date: new Date() };
  }
  // 将生命周期方法添加到 Class 中
  // 1. 当 Clock 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”
  // 2. 同时，当 DOM 中 Clock 组件被删除的时候，应该清除计时器。这在 React 中被称为“卸载（unmount）”
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 实现一个叫 tick() 的方法
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

2. 正确地使用 State（关于这里的原因会后续详说）？？

- 不要直接修改 State，而是使用 setState
- State 的更新可能是异步的
- State 的更新会被合并

3. 数据是向下流动的

组件可以选择把它的 state 作为 props 向下传递到它的子组件中，但是组件本身无法知道它是来自于哪里，但数据只能向下传递。

这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

### 事件处理（合成事件）

React 对原生的事件做了包装，成为合成事件，会和原生事件有不同。

1. 语法上不同

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串

```js
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

2. 不能通过返回 false 的方式阻止默认行为

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault

```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

在这里，e 是一个[合成事件](https://zh-hans.reactjs.org/docs/events.html)。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。React 事件与原生事件不完全相同

3. 注意回调函数中的 this！！！

```js
class Toggle extends React.Component {
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

看上面的例子，`onClick={this.handleClick}`，我们把 `this.handleClick` 传给了 `onClick`，当你调用这个函数的时候 this 的值为 undefined。这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

有这么几种方式可以去解决：
```js
// 方式 1，通过 bind 去显式绑定 this
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <button onClick={this.handleClick}></button>
    );
  }
}
// 方式 2，箭头函数
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = (e) => {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}></button>
    );
  }
}

// 或者
class LoggingButton extends React.Component {
  // 此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题？？
  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}></button>
    );
  }
}
```

4. 向事件处理程序传递参数

以下两种方式都可以向事件处理函数传递参数
```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，React 的事件对象 e 会被作为第二个参数传递。果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。


### 条件渲染

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI

```js
// 1. 简单的使用 if 条件语句
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// 2. 可以使用变量保存 React 元素。可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变
class LoginControl extends React.Component {
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

// 3. 与运算符 &&
// 在 js 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false
// 如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它
// 但是！！！像 0 && expression 这种，0 会被渲染
class LoginControl extends React.Component {
  render() {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
}

// 4. 三目运算符
// 也很简单，不列代码了

// 5. 阻止渲染
// 在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染
```

### 列表 & key

在 React 中生成列表很简单，“循环 + React元素”就可以。我们可以使用数组的任意方法去实现，比如 map 等。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

留意上面代码，我们有一个 key 值。当没有 key 时，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。接下来说说具体原因，也可以[参考这里](https://zh-hans.reactjs.org/docs/reconciliation.html)：

- 在进行 diff 算法时，会把 key 作为元素标识进行比较
- 在没有 key 时，会优先采用“原地复用”策略，在插入一项内容时，会导致一些问题：
  - 如果组件有状态（input 元素），那么新增的这一项可能会保留别人的状态
  - 性能会严重降低，其后面的元素会全部收到影响，进行重新渲染

>注意~~~ 
>1. 元素的 key 只有放在就近的数组上下文中才有意义。比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 ListItem 组件中的 `<li>` 元素上
>2. key 只是在兄弟节点之间必须唯一


在 JSX 中嵌入 map()，JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果

```js
// 当然，采用何种抽离方式取决于你！！
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()} value={number} />
      )}
    </ul>
  );
}
```

### 表单

**受控组件**

通常 HTML 表单元素自己维护 state，并根据用户输入进行更新。如果我们把状态和更新通过 React 的 state 和  setState() 来接管，那么其就变成了一个“受控组件”。

受控组件和原生在一些地方有些许不同，需要我们留意！！！

1. input && textarea

对于 input 或者 textarea 元素我们可以通过“监听 onInput/onChange”和“绑定 value 属性”进行控制，由于一些原因，[onInput/onChange 的表现是一致的](https://stackoverflow.com/questions/38256332/in-react-whats-the-difference-between-onchange-and-oninput)

不同类型的 input 有不同的方式，`checkbox` 使用 `checked` 属性

```html
<input
  name="isGoing"
  type="checkbox"
  checked={this.state.isGoing}
  onChange={this.handleInputChange} />
```

2. select 标签

原生标签使用 selected 属性来标记默认选中，React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它

```html
<!-- 下拉单选 -->
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
</select>

<!-- 下拉多选 -->
<select multiple={true} value={['B', 'C']}>
  <option value="A">葡萄柚</option>
  <option value="B">酸橙</option>
  <option value="C">椰子</option>
</select>
```

3. 处理多个输入

当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作

**非受控组件**

在大多数情况下，我们推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 使用 ref 来从 DOM 节点中获取表单数据。

### 状态提升

在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”

### 组合 VS 继承！！

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

1. 组合多个组件

我们通过 JSX 嵌套和一个特殊的 `children prop`来达到其他库中 `slot`（插槽）的效果
```JSX
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>{props.children}</div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

自定义命名，以 prop 形式传递

>React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递
```JSX
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}
function App() {
  return (
    <SplitPane
      left={ <Contacts /> }
      right={ <Chat /> } />
  );
}
```

2. 关于继承

我们并没有发现需要使用继承来构建组件层次的情况。Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式







## 高级指引

### 代码分割

代码分割对于大型应用是很有必要的
- 按需加载，避免加载用户永远不需要的代码
- 减少主包大小，加快首页渲染速度

在 React 中配合 webpcak 实现 code split 有这么几种方式：

1. import() 动态引入

此方式已经在 CRA 中开箱即用；
```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

2. React.lazy

React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件），然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）

如果模块加载失败（如网络问题），它会触发一个错误。你可以通过异常捕获边界（Error boundaries）技术来处理这些情况，以显示良好的用户体验并管理恢复事宜

>React.lazy 目前只支持默认导出（default exports）

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

3. 基于路由的代码分割

使用 React.lazy 和 React Router 这类的第三方库，来配置基于路由的代码分割

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

### Context？？

Context 与 vue 中的 provide/inject 类似，提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。但如果滥用这种方法将会使你的应用变的难以维护，[这里是 vue 的说明](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)。

Context 和 provide/inject 主要在开发高阶插件/组件库时使用，并不推荐用于普通应用程序代码中。一般如果几个组件是强关联的，我们就可以巧妙使用这种方式。

使用方式如下：
```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return <div><ThemedButton /></div>;
}
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

关于 context 还有很多值得多，等遇到具体的场景再来分析？？

### 错误边界！！

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。

错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

>注意，错误边界无法捕获以下场景中产生的错误：
>- 事件处理
>- 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
>- 服务端渲染
>- 它自身抛出来的错误（并非它的子组件）

定义一个错误边界组件很简单：
- 只有 class 组件才可以成为错误边界组件
- 定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()` 这两个生命周期方法中的任意一个（或两个）
- 当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}

// 使用很简单，可以将它作为一个常规组件去使用
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

>注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch {} 的工作机制

**错误边界应该放置在哪？？**

错误边界的粒度由你来决定，可以将其包装在最顶层的路由组件并为用户展示一个 “Something went wrong” 的错误信息，就像服务端框架经常处理崩溃一样。你也可以将单独的部件包装在错误边界以保护应用其他部分不崩溃

**关于事件处理器？？**

错误边界无法捕获事件处理器内部的错误。

React 不需要错误边界来捕获事件处理器中的错误。与 render 方法和生命周期方法不同，事件处理器不会在渲染期间触发。因此，如果它们抛出异常，React 仍然能够知道需要在屏幕上显示什么。

如果你需要在事件处理器内部捕获错误，使用普通的 JavaScript try / catch 语句

### Refs 转发？？

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧，对于大多数情况通常不必须，防止组件过度依赖其他组件的 DOM 结构。但对于某些可重用的组件是有用的。

一个简单的使用案例：
```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

以下是对上述示例发生情况的逐步解释：

- 我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
- 我们通过指定 ref 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`。
- React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
- 我们向下转发该 ref 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。
- 当 ref 挂载完成，ref.current 将指向 `<button>` DOM 节点。


>注意：
>1. 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref！！
>2. Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

**在 HOC 中的使用**

因为 HOC 会返回一个新组件，而且 ref 不是 props 属性，就像 key 一样，其被 React 进行了特殊处理。所以在 HOC 上添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。我们可以这样做：

```js
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      const {forwardedRef, ...rest} = this.props;
      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }
  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

### Fragments

Fragments 类似于 vue 中的 template。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点

一种常见模式是组件返回一个子元素列表，如下：`<Columns />` 需要返回多个 `<td>` 元素以使渲染的 HTML 有效。如果在 `<Columns />` 的 render() 中使用了父 div，则生成的 HTML 将无效，Fragments 可以解决次问题

```js
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr><Columns /></tr>
      </table>
    );
  }
}
// 通过 React.Fragment 包裹
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

>key 是唯一可以传递给 Fragment 的属性。你可以使用 Fragments 的短语法 `<> </>`，看起来就像个空标签，但它不支持 key 或属性

### 高阶函数（HOC）！！？？

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

HOC 有点类似于 Decorator，函数式编程方式的一种，但它不允许对传入的内容做修改。高阶组件是参数为组件，返回值为新组件的函数

HOC 在 React 的第三方库中很常见，例如 Redux 的 connect 和 Relay 的 createFragmentContainer

**为什么使用高阶组件？**

使用 HOC 解决横切关注点问题，即多个组件之间复用相同逻辑。以前我们使用 mixin 来解决，[但它的问题更多](https://zh-hans.reactjs.org/blog/2016/07/13/mixin-considered-harmful.html)，诸如：命名冲突，依赖不明确...而 HOC 是以组合的方式对原组件进行扩展，而且 HOC 是纯函数，没有副作用。

**HOC 的使用注意事项？**

1. HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能

您可能已经注意到 HOC 与容器组件模式之间有相似之处。容器组件担任将高级和低级关注点分离的责任，由容器管理订阅和状态，并将 prop 传递给处理 UI 的组件。HOC 使用容器作为其实现的一部分，你可以将 HOC 视为参数化容器组件。

2. 将不相关的 props 传递给被包裹的组件

HOC 为组件添加特性。自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的接口。HOC 应该透传与自身无关的 props。如下（伪代码）：

```js
render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;
  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;
  // 将 props 传递给被包装组件
  return (
    <WrappedComponent injectedProp={injectedProp} {...passThroughProps} />
  );
}
```

3. 包装显示名称以便轻松调试

HOC 创建的容器组件会与任何其他组件一样，会显示在 React Developer Tools 中。为了方便调试，请选择一个显示名称，以表明它是 HOC 的产物

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */};
  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithSubscription.displayName = `WithSubscription(${name})`;
  return WithSubscription;
}
```

4. 不要在 render 方法中使用 HOC

```js
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```
React 的 diff 算法（称为协调）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。

上面这种方式每次会生成一个全新组件，导致重新挂载。这不仅仅是性能问题 - 重新挂载组件会导致该组件及其所有子组件的状态丢失。

5. 务必复制静态方法

有时在 React 组件上定义静态方法很有用。但 HOC 返回的新组件中将没有了原始组件任何的静态方法。所以我们务必要把他们进行拷贝

```js
// 可以使用 hoist-non-react-statics 自动拷贝所有非 React 静态方法
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

6. Refs 不会被传递

这个在上面已经有提到过了，那是因为 ref 实际上并不是一个 prop - 就像 key 一样，它是由 React 专门处理的。使用 forwardRef 可以传递 ref

```js
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      const {forwardedRef, ...rest} = this.props;
      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

### 与第三方库协同！！

React 可以被用于任何 web 应用中。它可以被嵌入到其他应用，且需要注意，其他的应用也可以被嵌入到 React。React 是一个 UI 处理库，我们仅需要关注每个库需要做的事，维护好其各自的状态便好。

- 我们可以通过 ref 结合 JQuery 在适当的时机操作 dom；
- 得益于 ReactDOM.render() 和 ReactDOM.unmountComponentAtNode() 的灵活性 React 可以被嵌入到其他 UI 库中，比如 backbone；
- 结合 this.forceUpdate() 我们可以和其他数据管理库进行协同

### 深入 JSX

JSX 是 React 的特色，是 React 的 UI 模板，与 Vue 不同的是，JSX 是 xml in js，其可以做为一个普通变量与 js 集合，vue 的模板是通过指令来跟 js 绑定的。

**JSX 的本质？？**

实际上，JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖。

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
// 上面会被编译成：
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

**写 JSX 的注意事项？**

1. 组件声明必须在作用域内

JSX 标签的第一部分指定了 React 元素的类型。大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为对命名变量的直接引用，所以，当你使用 JSX `<Foo />` 表达式时，Foo 必须包含在作用域内。

2. React 必须在作用域内

由于 JSX 会编译为 React.createElement 调用形式，所以 React 库也必须包含在 JSX 代码作用域内，即使它没有被引用。

3. 在 JSX 类型中使用点语法

在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便。例如，如果 MyComponents.DatePicker 是一个组件，你可以在 JSX 中直接使用

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}
function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

4. 用户定义的组件必须以大写字母开头

我们建议使用大写字母开头命名自定义组件。如果你确实需要一个以小写字母开头的组件，则在 JSX 中使用它之前，必须将它赋值给一个大写字母开头的变量。

5. 在运行时选择类型

你不能将通用表达式作为 React 元素类型。如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量

```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！！JSX 类型不能是一个表达式。
  // return <components[props.storyType] story={props.story} />;
  // 正确！！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

**JSX 中的 Props？**

1. JavaScript 表达式作为 Props

你可以把包裹在 {} 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素，if 语句以及 for 循环不是 JavaScript 表达式，所以不能在 JSX 中直接使用。但是，你可以用在 JSX 以外的代码中。

```HTML
<MyComponent foo={1 + 2 + 3 + 4} />
```

2. 字符串字面量

你可以将字符串字面量赋值给 prop. 如下两个 JSX 表达式是等价de：

```html
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

当你将字符串字面量赋值给 prop 时，它的值是未转义的。所以，以下两个 JSX 表达式是等价的:

```HTML
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

3. Props 默认值为 “True”

如果你没给 prop 赋值，它的默认值是 true。以下两个 JSX 表达式是等价的

```HTML
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

4. 属性展开

如果你已经有了一个 props 对象，你可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象。你还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去.

```js
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};
```
在上述例子中，kind 的 prop 会被安全的保留，所有其他的 props 会通过 ...other 对象传递。


**JSX 中的子元素？**

包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 props.children 传递给外层组件

1. 字符串字面量

你可以将字符串放在开始和结束标签之间，此时 props.children 就只是该字符串，因此你可以采用编写 HTML 的方式来编写 JSX。

JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下的几种方式都是等价的。

```js
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

2. JSX 子元素

子元素允许由多个 JSX 元素组成。这对于嵌套组件非常有用。React 组件也能够返回存储在数组中的一组元素：

```js
render() {
  // 不需要用额外的元素包裹列表元素！
  return [
    // 不要忘记设置 key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

3. 函数作为子元素

这个有点类似于 vue 中的作用域插槽。我们可以把回调函数作为 props.children 进行传递：

```js
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

你可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象

4. 布尔类型、Null 以及 Undefined 将会忽略

false, null, undefined, and true 是合法的子元素。但它们并不会被渲染，如果要展示，把它们转换成字符串。以下的 JSX 表达式渲染结果相同:

```HTML
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```

这有助于依据特定条件来渲染其他的 React 元素

```js
<div>
  {showHeader && <Header />}
  <Content />
</div>
// 但是！！有一些 “falsy” 值，如数字 0，仍然会被 React 渲染
// 要解决这个问题，确保 && 之前的表达式总是布尔值
<div>
  {props.messages.length > 0 && <MessageList messages={props.messages} />}
</div>
```

### 性能优化

性能优化是一个永恒的话题，优化是永无止境的。这里主要总结一下 React 的常规优化：

1. UI 更新优化

无论是 React 还是 Vue，他们在 UI 的更新上已经做的很多了，Vnode + diff 已经解决了大部分渲染性能问题

2. 确保使用生产版本

React 默认包含了许多有用的警告信息。这些警告信息在开发过程中非常有帮助。然而这使得 React 变得更大且更慢，所以你需要确保部署时使用了生产版本。

关于各个打包器的打包优化，可以参考[官方文档](https://zh-hans.reactjs.org/docs/optimizing-performance.html#create-react-app)

3. 使用 Performance 标签分析组件

关于这里可以参考[这篇文章](https://calibreapp.com/blog/react-performance-profiling-optimization)

需要注意的是在生产环境中组件会相对渲染得更快些。当然了，这能帮助你查看是否有不相关的组件被错误地更新，以及 UI 更新的深度和频率。

4. 使用开发者工具中的分析器对组件进行分析

关于这个工具和 React 的配合，请参考[官方指导](https://zh-hans.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

5. 虚拟化长列表

如果你的应用渲染了长列表（上百甚至上千的数据），我们推荐使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般地降低重新渲染组件消耗的时间，以及创建 DOM 节点的数量。

[react-window](https://react-window.now.sh/#/examples/list/fixed-size) 和 [react-virtualized](https://bvaughn.github.io/react-virtualized/) 是热门的虚拟滚动库。 它们提供了多种可复用的组件，用于展示列表、网格和表格数据。 如果你想要一些针对你的应用做定制优化，你也可以创建你自己的虚拟滚动组件，就像 Twitter 所做的。

6. 避免调停

React 构建并维护了一套内部的 UI 渲染描述，即“虚拟dom”，该描述使得 React 避免创建 DOM 节点以及没有必要的节点访问。

当一个组件的 props 或 state 变更，React 会将最新返回的元素与之前渲染的元素进行对比，以此决定是否有必要更新真实的 DOM。当它们不相同时，React 会更新该 DOM。

虽然 react 只更新改变了的 dom 节点，但还是需要花费一点时间，在大部分情况下没有啥问题，除非慢到引人注意或者要做更细致的优化，那么你可以通过覆盖生命周期 shouldComponentUpdate 来进行提速，该方法会在**重新渲染**前被触发，其默认实现总是返回 true，让 React 执行更新，如果返回 false 则会跳过整个渲染过程（包括该组件的 render 调用以及之后的操作）。

```js
// 接受两个参数：nextProps, nextState
shouldComponentUpdate(nextProps, nextState) {
  if (this.props.color !== nextProps.color) {
    return true;
  }
  return false;
}
```
在大部分情况下，你可以继承 React.PureComponent 以代替手写 shouldComponentUpdate()。它用当前与之前 props 和 state 的浅比较覆写了 shouldComponentUpdate() 的实现。

React.PureComponent 只进行浅比较，当数据结构很复杂时，浅比较可能会有遗漏，这种时候我们要借助**不可变数据的力量**。比如：
```js
// 数组：不要直接修改原数组，而是返回新数组，使用 concat 或者展开符
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar']) // 或者 [...state.words, 'marklar']
  }));
}
// 对象：同样不要直接修改原对象
function updateColorMap(colormap) {
  // 错误：colormap.right = 'blue';
  // 正确：使用 Object.assign 或者展开符 {...colormap, right: 'blue'};
  return Object.assign({}, colormap, {right: 'blue'});
}
```
最后，当处理深层嵌套对象时，以 immutable （不可变）的方式更新它们令人费解。如遇到此类问题，请参阅 [Immer](https://github.com/immerjs/immer) 或 [immutability-helper](https://github.com/kolodny/immutability-helper)。这些库会帮助你编写高可读性的代码，且不会失去 immutability （不可变性）带来的好处。

### Portals

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案：`ReactDOM.createPortal(child, container)`。第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。

1. 用法

通常，从组件的 render 方法返回的元素，将被挂载到 DOM 节点中离其最近的父节点；然而，有时候将子元素插入到 DOM 节点中的不同位置也是有好处的。一个典型的场景就是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：
```js
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

>注意：当在使用 portal 时, 记住管理键盘焦点就变得尤为重要。
>我们的 React 应用在运行时会持续更改 HTML DOM，有时这将会导致键盘焦点的丢失或者是被设置到了意料之外的元素上。为了修复这类问题，我们需要以编程的方式让键盘聚焦到正确的方向上。比方说，在一个弹窗被关闭的时候，重新设置键盘焦点到弹窗的打开按钮上。

2. 通过 Portal 进行事件冒泡

尽管 portal 可以被放置在 DOM 树中的任何地方，但在语法上，它仍然存在于 React 树中，其行为和普通的 React 子节点行为一致，像 context 这样的功能特性都是不变的。

这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先


>思考题：ReactDom.render 和 ReactDOM.createPortal 的区别？？

### Profiler


[children - 还没学到这里](https://github.com/ybning/blog/issues/19)

Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”，他能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销，这个目前不多做介绍，属于极限性能优化的一部分，[参考文档](https://zh-hans.reactjs.org/docs/profiler.html)

```JS
class Test extend Component {
  onRenderCB = (
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ) => {
    console.log('render callback')
  }

  render(
    <App>
      <Profiler id="Navigation" onRender={this.onRenderCB}>
        <Navigation {...props} />
      </Profiler>
      <Profiler id="Main" onRender={this.onRenderCB}>
        <Main {...props} />
      </Profiler>
    </App>
  );
}
```

### 不使用 ES6

我们通常可以使用 class 来定义组件，但在不熟悉 ES6 的情况下我们也可以使用非 class 的方式，而且提供来一些新功能，比如 mixin。

使用 `create-react-class` 模块我们也能定义组件，和 class 的方式很相似：

```JS
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```
但有一些区别，如下：

1. 声明默认属性

无论是函数组件还是 class 组件，都拥有 defaultProps 属性；如果使用 createReactClass() 方法创建组件，那就需要在组件中定义 `getDefaultProps()` 函数：
```JS
// 类式定义
class Greeting extends React.Component { }
Greeting.defaultProps = {
  name: 'Mary'
};
// createReactClass 定义
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  }
});
```

2. 初始化 State

使用 createReactClass() 方法创建组件，需要提供一个单独的 getInitialState 方法，让其返回初始 state
```JS
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  }
});
```
3. 自动绑定

我们知道使用 class 组件时，事件回调要留意 this 的问题，但使用 createReactClass() 方法创建组件，组件中的方法会自动绑定至实例，无需多写代码。

4. mixin

ES6 本身是不包含任何 mixin 支持。因此，当你在 React 中使用 ES6 class 时，将不支持 mixin。使用 createReactClass 可以支持 mixin

```JS
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixin: [SetIntervalMixin], // 使用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 上的方法
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

如果组件拥有多个 mixin，且这些 mixin 中定义了相同的生命周期方法（例如，当组件被销毁时，几个 mixin 都想要进行一些清理工作），那么这些生命周期方法都会被调用的。使用 mixin 时，mixin 会先按照定义时的顺序执行，最后调用组件上对应的方法。

但是并不建议使用 mixin，它会在项目庞大后带来不可避免的维护成本。[关于 mixin 的问题以及替代方案看这里](https://github.com/tcatche/tcatche.github.io/issues/53)。

如果完全不同的组件有相似的功能，这就会产生[“横切关注点（cross-cutting concerns）“](https://zh.wikipedia.org/wiki/%E6%A8%AA%E5%88%87%E5%85%B3%E6%B3%A8%E7%82%B9)问题，也可[参考这里](https://juejin.cn/post/6844904017340940296)，简单来说某些模块在多个模块中重复出现。mixin 是解决横切关注点问题的一个典型方案，但也慢慢出现来一些问题：
- Mixins 引入了隐式的依赖关系
- Mixins 引起名称冲突
- Mixins 导致滚雪球式的复杂性

### 不使用 JSX

每个 JSX 元素只是调用 React.createElement(component, props, ...children) 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。比如：

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```
可以编写为不使用 JSX 的代码：
```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```
可以在[这里尝试](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.14.4&externalPlugins=)

### 协调！！

### Refs and the DOM

>Refs 提供了一种方式，允许我们访问 **DOM 节点**或在 render 方法中创建的 **React 元素**。

在 MVVM 框架中，我们通常使用声明式的方式去更新 & 操作 DOM，无需显式获取 DOM，但在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。React 提供了 Refs 接口去实现此类需求。

1. 何时使用 Refs（下面是几个适合适用 refs 的情况）？

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

>避免使用 refs 来做任何可以通过声明式实现来完成的事情。举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性

2. 创建 Refs

可以使用 React.createRef() 创建，并通过 ref 属性附加到 React 元素。通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
3. 访问 Refs

当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。

```js
const node = this.myRef.current;
```
ref 的值根据节点的类型而有所不同：
- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
- 你不能在函数组件上使用 ref 属性，因为他们没有实例（可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件）。

React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。**ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。**

4. 将 DOM Refs 暴露给父组件

在极少数情况下，你可能希望在父组件中引用子节点的 DOM 节点。通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的大小或位置。

虽然你可以向子组件添加 ref，但这不是一个理想的解决方案，因为你只能获取组件实例而不是 DOM 节点。并且，它还在函数组件上无效。

这个时候我们就可以使用 Ref 转发（forwardRef），Ref 转发使组件可以像暴露自己的 ref 一样暴露子组件的 ref。这个我们在[上面已经提到过](#refs-转发)

>github markdown 定位到文档内部某个锚点的语法请[参考这里](https://www.jianshu.com/p/baa5aaab4018)


5. 回调 Refs

回调 refs 能帮你更精细地控制何时 refs 被设置和解除。

可以给 ref 属性传递一个函数，这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

**更重要的是，你可以在组件间传递回调形式的 refs**，但在组件上我们不能直接使用 ref 属性传递，因为 ref 不是一个 props。

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}
class Parent extends React.Component {
  render() {
    return (
      // 通过 inputRef prop 进行传递
      <CustomTextInput inputRef={el => this.inputElement = el} />
    );
  }
}
```

>关于回调 refs 的说明
>如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。
>事件回调也有内联函数的问题，具体可以看[这里](#事件处理合成事件)

### Render Props

>术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。其类似于 Vue 中的 scope slot，对组件内部 UI 进行个性化渲染。

```js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

1. 解决横切关注点（Cross-Cutting Concerns）

和 HOC 类似，两者都是一种共享代码的技术，解决横切关注点的问题，但两者有相似且有不同：
- HOC 是在组件间**共享逻辑**的一种开发模式，其是一个纯函数，接受组件，返回新组件，是在组件上层新增逻辑且不修改原组件；
- render prop 是**共享UI和逻辑**的一种开发方式，其是一个组件，接受一个函数 prop。

在一些场景中，两个技术完全可以替补，但我们要合理且灵活使用，[了解更多参考这里](https://www.zhihu.com/question/269915942/answer/351688035)和[这里](https://zhuanlan.zhihu.com/p/111873208)

2. 使用 Props 而非 render

render prop 是因为模式才被称为 render prop ，你不一定要用名为 render 的 prop 来使用这种模式。

你还可以使用 children prop。当然，children prop 并不真正需要添加到 JSX 元素的 “attributes” 列表中。

```js
// 下面两种都是一样的效果
<Mouse children={mouse => <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>}/>

<Mouse>
  {mouse => <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>}
</Mouse>
```

3. 注意事项

**将 Render Props 与 React.PureComponent 一起使用时要小心**

如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势。因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。使用内联的事件函数也有同样的问题。我们都可以通过实例方法来避免这一类问题：

```js
class Mouse extends React.PureComponent {
  // 与上面相同的代码......
}

class MouseTracker extends React.Component {
  // 定义为实例方法，`this.renderTheCat`始终
  // 当我们在渲染中使用它时，它指的是相同的函数
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```
### 静态类型检查？？

>建议在大型代码库中使用 Flow 或 TypeScript 来代替 PropTypes

这篇主要是讲如何把 Flow 后者 TS 集成到你的项目中，关于工具使用不做过多介绍，可以[参照官网](https://zh-hans.reactjs.org/docs/static-type-checking.html)

### 严格模式

>StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。

这个作为对应用进行诊断的开发调试工具，暂不多做介绍，后续在实战中总结，[官方看这里](https://zh-hans.reactjs.org/docs/strict-mode.html)

使用方式：
```js
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
上述示例中，ComponentOne 和 ComponentTwo 以及它们的所有后代元素都将进行检查。StrictMode 目前有助于：
- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

### 使用 PropTypes 类型检查

>注意：自 React v15.5 起，React.PropTypes 已移入另一个包中。请使用 [prop-types 库](https://www.npmjs.com/package/prop-types)代替

除了使用 Flow 和 typescript 外，React 还内置了检查类型的功能。这和 Vue 类似，但 Vue 是在 props config 中编写，React 是写在类式或者函数式组件的静态属性上。

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

上面示例了类式组件，同样适用于 函数组件，或者是由 React.memo/React.forwardRef 创建的组件。

```js
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return <div>Hello, {name}</div>;
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}
```

1. PropTypes

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的必需数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

2. 限制单个元素

可以通过 PropTypes.element 来确保传递给组件的 children 中只包含一个元素。

```js
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children;
    return (
      <div>{children}</div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

3. 默认 Prop 值

可以通过配置特定的 defaultProps 属性来定义 props 的默认值：

```js
class Greeting extends React.Component {
  // 方式1：如果你正在使用像 transform-class-properties 的 Babel 转换工具，你也可以在 React 组件类中声明 defaultProps 作为静态属性
  // 此语法提案还没有最终确定，需要进行编译后才能在浏览器中运行
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
// 方式2：defaultProps
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染出 "Hello, Stranger"：
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

propTypes 类型检查发生在 defaultProps 赋值后，所以类型检查也适用于 defaultProps。

### 非受控组件

>大多数情况下，我们推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

非受控组件和传统的 html form 元素很相似，我们只要在需要时通过 ref 来获取它的 value 值：

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name: <input type="text" ref={this.input} /></label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

关于使用非受控组件还是受控组件，我们首先需要了解它们的特点：

**非受控组件**
- 编写更简单，无需通过 state 和 change callback 去更新 UI 和状态；
- 数据储存在 DOM 节点中，我们无需插手，但有时候更容易同时集成 React 和非 React 代码；
- 只需在使用时从 form 元素中 pull 出对应的 value 值；

**受控组件**
- 编写相对麻烦，需要使用 state 和 change callback 去更新 UI 和状态；
- 因为受控组件是通过 state “push” UI进行更新的，所有我们可以“从中作梗”：
  - in-place feedback, like validations（就地反馈，实时校验）
  - disabling the button unless all fields have valid data（禁用按钮直到表单输入有效值）
  - enforcing a specific input format, like credit card numbers（强制格式化输入，比如银行卡）

1. 不通 form element 的受控组件

Element |	Value property | Change callback | New value in the callback
--- | --- | --- | ---
`<input type="text" />` |	value="string" | onChange | event.target.value
`<input type="checkbox" />` | checked={boolean} | onChange | event.target.checked
`<input type="radio" />` | checked={boolean} | onChange | event.target.checked
`<textarea />` | value="string" | onChange | event.target.value
`<select />` | value="option value" | onChange | event.target.value

`<input type="file">` 可以让用户选择一个或多个文件上传到服务器，或者通过使用 File API 进行操作，在 React 中，`<input type="file" />` 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制，

2. 默认值

在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新，此时可以使用 defaultValue 属性，而不是 value。在一个组件已经挂载之后去更新 defaultValue 属性的值，不会造成 DOM 上值的任何更新。

```js
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>Name: <input defaultValue="Bob" type="text" ref={this.input} /></label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```
同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 defaultChecked，`<select>` 和 `<textarea>` 支持 defaultValue。

## API Reference

### 顶层 API

1. 组件

定义 React 组件的方式：
- class A extends React.Component { render(){} };
- class A extends React.PureComponent { render(){} };
- createReactClass({ render(){} })；
- function A(props) { }
- const A = React.memo(function A(props) { }, areEqual);

React.Component VS React.PureComponent
- React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了 `shouldComponentUpdate(nextProps, nextState)`；
- React.PureComponent 中的 `shouldComponentUpdate()` 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。

>注意：React.PureComponent 仅作对象的浅层比较，修改深层数据可能无法对比差别，所以：
>- 在你的 props 和 state 较为简单时，才使用 React.PureComponent
>- 对性能没有极致要求时，可尽量避免使用
>- 可在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。


React.memo vs VS React.PureComponent
- React.memo 为高阶组件（参数为一个组件，返回新组件），使用方式：`const MyComponent = React.memo(function MyComponent(props) { });`
- React.memo 的功用和 React.PureComponent 类似，但 React.memo 是作用于函数组件的，因为函数组件没有类似于 shouldComponentUpdate 的钩子函数。
- React.memo 仅检查 props 变更，但 PureComponent 检查 props 和 state 更新，因为函数组件是没有 state 的（在不使用 Hooks 的情况下）；
- 两个都只会对复杂对象做浅层对比，但都可以通过自定义比较函数。React.memo 第二个参数可以是一个函数：`function areEqual(prevProps, nextProps) { }`；PureComponent 也可以通过自定义 shouldComponentUpdate 来实现。
- areEqual 和 shouldComponentUpdate 的返回值的相反的，areEqual 返回 true 代表相等，不更新；shouldComponentUpdate 返回 true 代表需要更新。


2. 创建 React 元素

**createElement()**

语法：
```js
React.createElement(
  type,
  [props],
  [...children]
)
```
创建并返回指定类型的新 React 元素，其中 type 参数可以是标签名字符串、可以是 React 组件类型（class 组件或函数组件）、或是 React fragment 类型。

使用 JSX 编写的代码将会被转换成使用 React.createElement() 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 React.createElement()。

**createFactory()**

```js
React.createFactory(type)
```
只有一个参数，与 React.createElement() 相似，此辅助函数已废弃。

3. 转换元素

**cloneElement()**

```js
React.cloneElement(
  element,
  [config],
  [...children]
)
```

关于 cloneElement 的应用场景，可参考这里 https://juejin.cn/post/6844903983975235592


**isValidElement()**

```js
React.isValidElement(object)
```
验证对象是否为 React 元素，返回值为 true 或 false


**React.Children**

需要注意，props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined；如果有一个子节点，数据类型是 object；如果有多个子节点，数据类型就是 array。而 React.Children 提供了用于处理 props.children 不透明数据结构的实用方法，比如要遍历子节点、限制子节点的种类和数量（细化到组件类型）、强制使用某一种子节点（比如 ​Col​ 组件必须做为 ​Row​ 组件的第一层子节点出现）。

- `React.Children.map(children, function[(thisArg)])` 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。
  - 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数；
  - 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组；
  - 如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历；
- `React.Children.forEach(children, function[(thisArg)])`，与 map 类似，但它不会返回一个数组；
- `React.Children.count(children)`，返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数；
- `React.Children.only(children)`，验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。
  - `React.Children.only()` 不接受 `React.Children.map()` 的返回值，因为它是一个数组而并不是 React 元素
- `React.Children.toArray(children)`，将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时。

>注意：`React.Children.toArray()` 在拉平展开子节点列表时，更改 key 值以保留嵌套数组的语义。也就是说，toArray 会为返回数组中的每个 key 添加前缀，以使得每个元素 key 的范围都限定在此函数入参数组的对象内。

关于 React.Chilldren 的使用场景后期可以多总结一下？？，可参考[这片文章](https://zhuanlan.zhihu.com/p/115344190)和[这片](https://zhuanlan.zhihu.com/p/115344190)

4. Fragments 组件

React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素，简写为 `<></>`。

5. Refs

1) React.createRef

创建一个能够通过 ref 属性附加到 React 元素的 ref。通过 `.current` 访问。

2) React.forwardRef

会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中，常用一下两种场景（在上面都有实际场景）：
- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs















## React Hook？？

https://juejin.cn/post/6944863057000529933?utm_source=gold_browser_extension

https://juejin.cn/post/7009946969099468831?utm_source=gold_browser_extension#comment



## Q & A

### Vue 与 React 的对比

1. 在 React 实现 Vue 的功能（computed...）？


### 在 class 组件中定义方法的方式和区别？

```js
class Button extends React.Component {
  constructor(props) {
    super(props);
    // 实例方法
    this.sayHello = () => {
      console.log('hello~~');
    }
  }
  // 原型方法（公有方法）
  sayHi() {
    console.log('Hi~~')
  }
}
```

### 关于使用 mixin 的问题

- [在 React 中使用 mixin](https://zh-hans.reactjs.org/docs/react-without-es6.html#mixin)
- [使用 mixin 的问题](https://zh-hans.reactjs.org/blog/2016/07/13/mixin-considered-harmful.html)
- [使用 mixin 的问题-中文](https://github.com/tcatche/tcatche.github.io/issues/53)
- [横切关注点](https://zh-hans.reactjs.org/docs/higher-order-components.html#use-hocs-for-crossing-cutting-concerns)

