<img src="https://user-images.githubusercontent.com/1866848/53067086-a0322a80-350d-11e9-8bd9-ca1ecf12b090.png" width="200" hegiht="300" align=center />


## OVERVIEW

A world class development environment, testing framework and asset pipeline for blockchains using the ULTRAIN Chain, aiming to make life as a developer easier. With Robin, you get:

* One-click contract compilation and development.
* Automated contract testing for rapid development.
* Friendly code Review and automated error fixing.
* Lots of contract templates for reference.
* Scriptable, extensible deployment & migrations framework.
* Network management for deploying to any number of public & private networks.
* Interactive console for direct contract communication.

## INSTALLATION

```
sudo npm install -g robin-framework
```

### Requirements

NodeJS 8.0+.

Linux、MacOSX、Windows

### CREATING A PROJECT

To view all Robin commands, you need to run `robin` or `robin -h`.

To start a contract, you need create a new empty directory first, and then entry the directory:

```
mkdir testing
cd testing
```

And then initialize a project. Using `-c` or `--contract` to specify a name. Now you have some templates to choose, the first one is contract only, and the others are DAPP framework with ui.

```
robin init
```

<img src="https://user-images.githubusercontent.com/1866848/53067754-9a8a1400-3510-11e9-9f4b-3d0c2c9791d1.png"/>

Contract Project structure:

    ```
    |--build        // built WebAssembly targets
    |--contract     // contract source files
    |--migrations   // assign built files location and account who will deploy the contract
    |--templates    // some contract templates that will guide you
    |--test         // test files 
    |--config.js    // configuration
    ...
    ```

## LINT CONTRACTS

With the help of `robin-lint`, a customized `tslint` project, you will be find errors and warnings and then fix them quickly.
Just entry into the root directory of your contract project and execute: 

```
robin lint
```

## COMPILE CONTRACTS

Depend on the compiling tool `ultrascript`，smart contract will be compiled to WebAsssembly target files: *.abi, *.wast, *.wasm.
Just entry into the root directory of your contract project and execute: 

```
robin build
```

## DEPLOY CONTRACTS

Updating and configuring the `config.js` and `migrate.js` files, make sure you have make a successful connection with the ULTRAIN chain node. The nodultrain can be a integrated envirnment if you use **`longclaw`** in docker or maybe an customized node by yourself.
Just entry into the root directory of your contract project and execute: 
```
robin deploy
```

## TEST CONTRACTS

Referring to `*.spec.js` files in the test directory, write your own test file and try to cover all the case about the contract. Robin provides you lots of tool classes such as `mocha`, `chai`, `u3.js` and `u3-utils` for writing test case, especially handling async test.

Just entry into the root directory of your contract project and execute: 
```
robin test
```

## INTEGRATED WITH UI

If you want to easily convert a contract project into a DAPP project, you only need to use the ui subcommand, and you have three main front-end templates to choose from  `vue-boilerplate`、`react-boilerplate` and `react-native-boilerplate`.

Just entry into the root directory of your contract project and execute: 

```
robin ui
```

