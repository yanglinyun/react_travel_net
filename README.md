npx create-react-app demo --template typescript
npm i antd @ant-design/icons

ts文件需要开头大写

Grid栅格布局-列/行布局 可以互相嵌套


# 路由
## 安装
react-router-dom
会自动安装react-router核心框架
<Link/> 组件可以渲染出<a/> 标签
<BrowserRouter/> 组件利用H5 API实现路由切换
<HashRouter/> 组件利用原生JS的window.location.hash实现路由切换

npm i react-router-dom @5.2.0
npm i @types/react-router-dom --save-dev 获得TS版本 安装类型定义 开发依赖

## 页面堆叠问题与exact
<Route exact path="/" component={HomePage}/> exact短路处理 解决局部匹配导致页面堆叠

## switch页面切换
switch 组件 每次只会渲染一条路径 并且 优先级最高的路由进行渲染 故需要添加exact

404页面必须是位于switch最后一个 即最终都无法匹配才走缺省

## 页面路由导航总结
路由导航与原生浏览器操作行为一致
<BrowserRouter/>
路由路径解析原理与原生浏览器一致，可以自动识别url路径
<Route/>
路径的切换以页面为单位，不要页面堆叠
<Switch/>

## 路由参数传递
### 单组件路由参数传递
Route 会向组件内部传入 history location match
通过match的params字段可以读取url参数

在URL中添加参数
第一种使用?引导参数
第二种分段路由Segments RESTful 参数作为URL片段一部分 使用斜杠/
http://localhost:3000/products/111111
       域名         资源名称(复数)  资源id
天生带有语义

定义 import { RouteComponentProps } from "react-router-dom"; 路由组件props类型
<Route path="/detail/:touristRouteId" component={DetailPage} /> 路由传参 :冒号引导参数

### 跨组件路由信息传递
1. 上下文context实现

2. HOC高阶函数
* `interface PropsType extends RouteComponentProps` 类型定义继承 
* `export const ProductImage = withRouter(ProductImageComponent);`

3. 函数式组件，使用hooks钩子
useHistory\useLocation\useParams\useRouteMatch 

### 页面导航切换2方式
* push
* `<Link/> <Link to={`detail/${id}`}>`
#### Link原理
```
interface LinkProps {to: string;}
const Link:React.FC<LinkProps> = ({children, to}) => {
       const history = useHistory();
       return (
              <a href={to} onClick={()=>{history.push(to)}}>
                     {children}
              </a>
       )
}
```
# React设计模式
* 一个UI渲染库
* 没有模板、没有设计模式、没有路由、没有数据管理
* 大型网站数据管理(Redux)与设计模式(MVC\MVVM\MV*)必不可少

# Redux
* 带有推送功能数据库
* 剥离组件数据(state)
* 数据统一存放在store中
* 组件订阅store获得数据
* 统一保存数据,在隔离了数据与UI的同时,负责处理数据绑定
* 使用场景
** 组件需要共享数据
** 某个状态任何地方都可随时被访问
** 某个组件需要改变另一个组件状态时候
** 如 用户登录全局数据共享
* 事件驱动吗,数据流动不直观,debug困难
* 术语概念复杂

## 真实项目中Redux架构
* store内数据被组件订阅显示,组价通过Action,Action操作(dispatch action action以事件驱动方式被store截获)经历中间价最后调用reduce(处理数据的方法)修改数据,数据变化再通知订阅组件显示
* 任何UI级别的组件都没有权限修改store数据

## 使用Redux
npm i redux
src/redux
* store 是immutable 修改需要重新创建一个新的数据对象

# I18N
## 原理
* 语言包作为静态资源单独保存 xml json
* 每种语言对于相关文件
* 切换语言，语言文件也随之切换
* i18next 国际化语言框架
* react-i18next
## react-i18next配置
npm i react-i18next i18next --save 原生支持TS

## action拆分
使用工厂模式拆分action

## React-Redux
* npm i react-redux 
* npm i @types/react-redux --save-dev
* provider
* connect 连接store 一个HOC高阶函数但没用with
* 类组件中使用react-redux
* 函数式组件Hooks组件中使用react-redux

# Axios
* 简单易用，比原生fetch简单
* 浏览器兼容好 可以兼容IE7
* 通用性好，能在node和浏览器中使用，api一致
npm i axios 自带TS类型定义
* 数据悬空处理:再首次请求数据前数据为空，使用属性报错问题
* React项目不提倡使用MVC架构，缺点model直接暴露数据修改方式，视图可以监听数据变化，即双向数据绑定，双向数据绑定会造成数据流动无限死循环
* React使用 Redux、Flux、Mobx

## 异步获取封装到中间件
* reducer是纯函数 不允许有副作用
* action是返回对象 不是过程 不能使用异步网络请求
* 故需要封装到中间件，执行异步请求
* redux-thunk 官方中间件 让dispath可以分发函数类型
* npm i redux-thunk 自带TS声明
* thunk 可以返回一个函数，而不一定是js对象
* thunk action中可以完成一系列连续action操作
* 并且可以处理异步函数
* 业务逻辑可以从UI层面挪到这里，代码分成更清晰