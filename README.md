# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

- [Document - english](https://create-react-app.dev/)
- [Document - chinese](http://www.html.cn/create-react-app/docs/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## `create-react-app` 中的问题

### `npm run eject`命令是做什么的？

- [还在run eject 修改create-react-app中的配置](https://juejin.cn/post/6844904034780839949)

create-react-app（称为CRA）脚手架其主要思想是让我们可以快速和专注项目的开发而不用过多的去关心工具和服务的配置，因此其配置是隐藏的，使得工作环境尽可能简洁，但我们可以通过执行 `npm run eject` 来暴露出配置文件来进行修改，但是这种方式是不可逆的，同时会有一些隐藏的问题。

### 浏览器支持

**对于 js**，其默认支持各种新语法（如下）

- Exponentiation Operator (ES2016).
- Async/await (ES2017).
- Object Rest/Spread Properties (ES2018).
- Dynamic import() (stage 4 proposal)
- Class Fields and Static Properties (part of stage 3 proposal).
- JSX, Flow and TypeScript.

但是项目不包含任何 polyfill，即如果要在低版本中支持各种方法（such as `Array.from()` or `Symbol`），则需要手动引入 [`react-app-polyfill`](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)。

CRA 通过 `package.json` 中的 `browserslist` 的配置来打包你的项目，开发环境默认支持最新版本浏览器以增强开发体验

**对于 css**，CRA 会通过 Postcss 压缩你的 CSS 并通过 Autoprefixer 自动添加浏览器前缀，支持全新CSS 特性，all 属性, break 属性, 自定义属性, and 媒体查询范围 会自动进行 polyfill，以添加对旧版浏览器的支持。

你可以根据 Browserslist 规范 调整 package.json 中的 browserslist 来自定义目标支持浏览器


### `react-scripts` 这个库的作用

通过 CRA 生成的项目有一个 `react-scripts` 的库，项目的编译开发都由其负责，webpack 相关的配置，默认模板，相关脚本命令都封装在这个库中。

### 开发工具的相关配置

这里主要是指 vscode 相关：

1. 语法高亮插件：vscode-language-babel
2. eslint 配置
关于 eslint，CRA 中是比较特别的，我们知道 CRA 的目标是提供一个简洁的开发环境，其 eslint 依赖和服务都配置在 `react-scripts` 中，而且 eslint 配置隐藏在 `package.json` 中，[关于这个问题请参考](https://stackoverflow.com/questions/59633005/how-is-eslint-integrated-into-create-react-app)

我们如何配置我们的 IDE 在开发阶段自动进行 fix，这里[请参考这篇文章](https://readwriteexercise.com/posts/setting-up-create-react-app-vs-code-eslint-prettier/)。其中也提到了使用 husky 和 lint-staged 在本地提交阶段进行 lint，也可以[参考这里](https://segmentfault.com/a/1190000009546913)

这里还有一个老生常谈的问题，[eslint 和 Prettier 的区别和搭配使用](https://zhuanlan.zhihu.com/p/80574300)

### 其他开发工具

- 结合 storybook 生成可视化测试用例；
- 也可以结合 Styleguidist，与 storybook 类似
- 使用 `source-map-explorer` 来分析 CRA 项目打包资源过大问题
- 可启动 HTTPS 服务

### 如何进行样式隔离

在 CRA 项目中进行样式隔离也很简单：
- 首先文件名要按约定：`[name].module.css`
- 引入和使用方式也有不同，需引入改 css，并在 jsx 中绑定类名
```js
import React, { Component } from 'react';
import styles from './Button.module.css'; // 将 css modules 文件导入为 styles
import './another-stylesheet.css'; // 导入常规 CSS 文件

class Button extends Component {
  render() {
    // 作为 js 对象引用
    return <button className={styles.error}>Error Button</button>;
  }
}
```
- 类名最终编译结果 `[filename]\_[classname]\_\_[hash]`，即 `<button class="Button_error_ax7yz"></div>`

### 代码分割！！

- 支持通过 动态import() 进行代码拆分
- React.lazy 函数允许您渲染动态导入为常规组件
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
- 异步组件可结合 Suspense 内置组件显示一些后备内容（placeholder），或者在加载失败是显示“错误组件”

### `web-vitals` 性能测试工具

关于网站性能的[关键指标说明看这里](https://github.com/berwin/Blog/issues/46)

### 添加自定义环境变量

注意，你必须以 `REACT_APP_` 开头创建自定义环境变量。除了 NODE_ENV 之外的任何其他变量都将被忽略。

- 可以在启动命令里添加自定义环境变量
- 可以本地创建 `.env.development`，`.env.test`，`.env.production`... 文件来设置环境变量

### 支持 PWA

可以通过 `npx create-react-app my-app --template cra-template-pwa` 来创建 PWA 应用，从 Create React App 2 开始，service workers 被设置成了可以选择加入，所以我们还要去自己开启：

为了选择加入离线优先行为，开发人员应在其 src/index.js 文件中查找以下内容
```js
// 如果你希望应用程序能脱机工作并加载更快，
// 那么可以将下面的 unregister() 改为 register()。 请注意，这带来了一些陷阱。
// 了解有关 service workers 的更多信息：http://bit.ly/CRA-PWA
serviceWorker.unregister();
```

### 关于单元测试

Create React App 使用 Jest 作为其测试运行器。Jest 将使用以下任何流行的命名约定来查找测试文件：

- __tests__ 文件夹中带有 .js 后缀的文件。
- 带有 .test.js 后缀的文件。
- 带有 .spec.js 后缀的文件。

我们建议将测试文件（或 __tests__ 文件夹）放在他们正在测试的代码旁边，以便相对路径导入时路径更短。

关于编写测试用例，请参考 [React test](https://create-react-app.dev/docs/running-tests)和[Jest 文档](https://jestjs.io/docs/getting-started)

### 代理服务

**默认支持**

CRA 也支持代理服务，在 `package.json` 中添加 `proxy` 字段：
```json
{
  "proxy": "http://localhost:4000"
}
```
请记住，proxy 只在开发环境中有效（使用 npm start），没有 text/html accept 标头的任何无法识别的请求都将被重定向到指定的 proxy（代理服务器）

**自定义代理**

如果 proxy 选项对你来说 不够 灵活，你可以直接访问 Express 应用程序实例，并连接你自己的代理中间件。

你可以将此功能与 package.json 中的 proxy 属性结合使用，但建议你将所有逻辑合并到 src/setupProxy.js 中，你无需在任何位置导入此文件。 它在启动开发服务器时会自动注册

```js
// 以 http-proxy-middleware 示例
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};
```
### 预渲染静态 HTML 文件！？？

