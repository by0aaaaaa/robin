#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const commands = ['init','build','deploy','lint'];

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

program.parse(process.argv);

if(program.args.length === 0){
    program.help();
}

if(!commands.includes(program.args[0])){
    program.help();
}