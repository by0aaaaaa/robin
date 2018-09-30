#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const symbols = require('log-symbols');
const { spawn } = require('child_process');

program.parse(process.argv);

// find migrate
const migrate = path.join(process.cwd(),'migrations/migrate.js');

if(!fs.existsSync(migrate)){
    console.log(symbols.error,chalk.red(`Can not found ${migrate}`));
    return;
}

const deploy = spawn('node',['migrations/migrate.js'],{cwd:process.cwd()});
deploy.stdout.on('data',(data)=>{
    console.log(data.toString('utf8'));
})

deploy.stderr.on('data', (data) => {
    console.log(symbols.error,chalk.red(data.toString('utf8')));
});

deploy.on('close', (code) => {
    // console.log(`子进程退出码：${code}`);
});