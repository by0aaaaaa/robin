<img src="https://user-images.githubusercontent.com/1866848/53067086-a0322a80-350d-11e9-8bd9-ca1ecf12b090.png" width="200" hegiht="300" align=center />


## 总览

这是一款基于超脑链，能够快速进行智能合约开发、命令行式的开发测试集成框架。

Robin框架提供以下服务：
1.	一键式合约初始化、编译与部署；
2.	自动化合约测试与开发；
3.	友好的代码审查与错误提示；
4.	大量的合约模板与示例参考；
5.	脚本式与可配置化部署流程；
6.	交互式合约日志控制台输出；


## 安装

```
sudo npm install -g robin-framework
```

### 要求

NodeJS 8.0+.

Linux、MacOSX、Windows

### 创建工程

执行 `robin` or `robin -h` 来查看所有的robin子命令

要启动项目，首先需要创建一个新的空目录，然后进入目录：

```
mkdir testing
cd testing
```
然后初始化一个项目。 使用 `-c` or `--contract` 来指定名称。此时，你有多个模板可以选择，默认的是纯合约项目，其余的是带界面的DAPP框架。

```
robin init
```

<img src="https://user-images.githubusercontent.com/1866848/53067481-492d5500-350f-11e9-8ffc-5276715e4192.png"/>


合约项目目录结构:

    ```
    |--build        // built WebAssembly targets
    |--contract     // contract source files
    |--migrations   // assign built files location and account who will deploy the contract
    |--templates    // some contract templates that will guide you
    |--test         // test files 
    |--config.js    // configuration
    ...
    ```

## 语法检查

在`robin-lint`的帮助下，借助定制的`tslint`项目，您将找到错误和警告，然后快速修复它们。
只需进入项目的根目录并执行：

```
robin lint
```

## 编译合约

依赖于 `ultrascript`，合约源文件将会被编译为WebAsssembly目标文件: *.abi, *.wast, *.wasm.
只需进入项目的根目录并执行：

```
robin build
```

## 部署合约

更新配置文件 `config.js` 和 `migrate.js`, 确保你已正确连接上一个超脑节点. 如果你正在使用 **`longclaw`** 初始化的本地环境，那么使用默认配置即可。也可以是你定制的节点。
只需进入项目的根目录并执行：
 
```
robin deploy
```

## 测试合约

参考测试目录下 `*.spec.js` 文件, 编写测试用例来覆盖你的合约中的所有用例场景. Robin提供给你一些测试工具类，比如 `mocha`, `chai`, `u3.js` and `u3-utils` , 尤其是用在处理异步测试.
只需进入项目的根目录并执行：

```
robin test
```

## 集成UI

如果你想将一个合约项目升级为带界面的DAPP项目, 使用UI子命令。你有多个框架可以选择，它们分别是 `vue-boilerplate`、`react-boilerplate` 和 `react-native-boilerplate`.
只需进入项目的根目录并执行： 

```
robin ui
```

