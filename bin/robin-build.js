#!/usr/bin/env node
const program = require('commander');
const glob = require('glob');
const chalk = require('chalk');
const symbols = require('log-symbols');
const fs = require('fs-extra');
const path = require('path');
const { spawnSync } = require('child_process');

program.parse(process.argv);

const contracts = glob.sync('contract/*.ts');
if(!contracts.length){
    console.log(symbols.error,chalk.red('can not found smart contract.'))
    return;
}

// clean build
const buildDir = path.join(process.cwd(),'build');
if(fs.existsSync(buildDir)){
    fs.emptyDirSync(buildDir);
    fs.rmdirSync(buildDir);
    console.log(symbols.success,'trash build');
}

// create build
if(!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
    console.log(symbols.success,'makedir build');
}

for(let i in contracts){
    const contractName = path.parse(contracts[i]).name;
    const cmdArgs = [
        contracts[i],
        '-b',
        `build/${contractName}.wasm`,
        '-g',
        `build/${contractName}.abi`,
        '-O',
        '-t',
        `build/${contractName}.wast`,
        '--validate',
        '--optimize',
        '--noDebug'
    ];
    
    const rs = spawnSync('usc',cmdArgs,{cwd:process.cwd()});
    if(rs.stderr && rs.stderr != ''){
        console.log(symbols.error,chalk.red(rs.stderr));
        return false;
    }

    if(rs.error){
        console.log(symbols.error,chalk.red(rs.error));
        return false;
    }
}

console.log(symbols.success,'build success');

