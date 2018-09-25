#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const glob = require('glob');
// const download = require('download-git-repo');
const symbols = require('log-symbols');
const { spawn } = require('child_process');
const { downloadSync } = require('../lib/utils');

program.parse(process.argv);

const list = glob.sync('*');
if(list.length){
    console.log(chalk.red('`robin init` must be executed in an empty folder.'));
    return;
}

try{
    (async ()=>{
        // download template from git
        console.log(symbols.info,chalk.blue('Download Contract Template...'));
        await downloadSync('ultrain-os/robin-template','.');

        // download lint
        // await downloadSync('ultrain-os/robin-lint','lint');

        console.log(symbols.success, chalk.green('Init project successfully.'));

        // install dependencies for project.
        console.log(symbols.info,chalk.blue('Install dependencies...'));
        const yarn = spawn('yarn',{cwd:process.cwd()});

        yarn.stdout.on('data',(data)=>{
            console.log(symbols.info,data.toString('utf8'));
        })

        yarn.stderr.on('data',(data)=>{
            console.log(symbols.warning,chalk.yellow(data.toString('utf8')));
        })

        yarn.on('error',(err)=>{
            console.log(symbols.error,chalk.red(err));
        })

        yarn.on('close',(code)=>{
            console.log(symbols.success, chalk.green('install dependencies successfully.'));
        })
    })();
}catch(e){
    console.log(symbols.error, chalk.red(e));
    return;
}