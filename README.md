<img src="https://user-images.githubusercontent.com/1866848/46092758-33c63000-c1e8-11e8-8d70-655c7358df89.png" width="200" hegiht="300" align=center />


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

Linux or Mac OS X.

### CREATING A PROJECT

To view all Robin commands, you need to run `robin` or `robin -h`.

To start a contract, you need create a new empty directory first, and then entry the directory:

```
mkdir testing
cd testing
```
And then initialize a smart contract project.

```
robin init
```

Project structure:

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

