<img src="https://user-images.githubusercontent.com/1866848/46092758-33c63000-c1e8-11e8-8d70-655c7358df89.png" hegiht="50px" align="center" />

# 智能合约开发框架-ROBIN
    ROBIN是用Javascript实现的脚手架工具,以Node package的形式发布在NPM.方便开发者开发/编译/调试/部署智能合约.

## 安装
`npm install -g robin-cli`

or

`yarn add global robin-cli`

> 本地Node.js版本大于等于7.6

## 使用
Command Line

`robin <Commands>`

Options:
* -v,--version  output the version number
* -h, --help    output usage information
  
Commands:
* init
    
    根据robin-template生成合约模版工程
    
    > 在执行`robin init`之前需要创建一个空文件夹作为工程目录(`mkdir demo && cd demo`).  
    > 初始化工程需要花一点时间,请耐心等待.

    工程基本结构

    ```
    |--build        // 编译目录
    |--contract     // 合约目录
    |--lint         // 语法检测
    |--migrations   // 合约部署
    |--config.js    // u3.js配置
    ...
    ```
* build

    依赖Ultrascript,将TS格式的合约编译为WAST/WASM格式文件,最终编译文件保存在build目录中.
* deploy

    `robin deply`集成u3.js的deploy功能,将合约部署上链.
    合约部署文件在migrations目录下.

    migrate.js
    ```javascript
    const {U3} = require('u3.js');
    const config = require('../config');
    const u3 = U3.createU3(config);
    u3.deploy('build/MyContract','ultrainio');
    ```
    根据实际情况修改config.js(node节点相关信息).

* lint

    合约语法检测


