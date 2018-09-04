#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const symbols = require('log-symbols');
const { spawn } = require('child_process');

program.parse(process.argv);

const lint = spawn('npm',['run','tslint --fix --project .'],{cwd:process.cwd()});
lint.stdout.on('data',(data)=>{
    console.log(data.toString('utf8'));
})

lint.stderr.on('data', (data) => {
    if(data.indexOf('no-unused-variable is deprecated') !== -1){
        console.log(symbols.warning,chalk.yellow(data.toString('utf8')));
    }else{
        console.log(symbols.error,chalk.red(data.toString('utf8')));
    }
});

lint.on('close', (code) => {
    // console.log(`lint `);
});