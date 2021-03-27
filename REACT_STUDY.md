# React Study Book

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

1. 受控组件

通常 HTML 表单元素自己维护 state，并根据用户输入进行更新。如果我们把状态和更新通过 React 的 state 和  setState() 来接管，那么其就变成了一个“受控组件”。


## Q & A

### Vue 与 React 的对比

1. 在 React 实现 Vue 的功能（computed...）？

