#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');

program
    .version(pkg.version,'-v,--version')
    .usage('<command>')
    .command('init','init your robin project.');

program
    .command('clean','clean build file.');

program
    .command('build','build project.');

program.parse(process.argv);

if(program.args.length==0){
    program.help();
}