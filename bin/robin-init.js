#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const glob = require('glob');
const download = require('download-git-repo');
const symbols = require('log-symbols');

program.parse(process.argv);

const list = glob.sync('*');
if(list.length){
    console.log(chalk.red('`robin init` must be executed in an empty folder.'));
    return;
}

// download template from git
console.log(symbols.info,chalk.blue('Download...'));

download('ultrain-os/robin-template','.',{clone: true}, (err) => {
    if(err){
        console.log(symbols.error,chalk.red(err));
        return;
    }
    console.log(symbols.success, chalk.green('init project success.'));
})