#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const commandList = ['init','build','deploy','lint'];

program
    .version(pkg.version,'-v,--version')
    .usage('<command>')
    .command('init','init your robin project.');

program
    .command('build','token project.');

program
    .command('deploy','deploy smart contract.');

program
    .command('lint','lint project.');

program
    .command('test','test project.');

program.parse(process.argv);

if(!commandList.includes(program.args[0])){
    return program.help();
}

if(program.args.length===0){
    program.help();
}