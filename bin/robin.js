#!/usr/bin/env node
const chalk = require('chalk');
const glob = require('glob');
const symbols = require('log-symbols');
const { spawn } = require('child_process');
const { downloadSync } = require('../lib/utils');
const program = require('commander');
const pkg = require('../package.json');
const fs = require('fs');
const commandList = ['init', 'build', 'deploy', 'lint'];

program
    .version(pkg.version, '-v,--version');

program
    .command('init')
    .description('init your robin project.')
    .option('--name [contractName]', 'set contract name.')
    .action(option => {
        let contractName;
        if (typeof option.name === 'string') {
            contractName = option.name;
        }

        const list = glob.sync('*');
        if (list.length) {
            console.log(chalk.red('`robin init` must be executed in an empty folder.'));
            return;
        }

        // download template from git
        console.log(symbols.info, chalk.blue('Download Contract Template...'));
        downloadSync('ultrain-os/robin-template', '.').then(() => {
            if (contractName) {
                // 修改合约名
                fs.renameSync('contract/MyContract.ts', `contract/${contractName}.ts`);

                // migrations/migrate.js
                let migrate = fs.readFileSync('migrations/migrate.js').toString();
                fs.writeFileSync('migrations/migrate.js', migrate.replace('MyContract', contractName));
            }
            console.log(symbols.success, chalk.green('Init project successfully.'));

            // install dependencies for project.
            console.log(symbols.info, chalk.blue('Install dependencies...'));
            const yarn = spawn('yarn', { cwd: process.cwd() });

            yarn.stdout.on('data', (data) => {
                console.log(symbols.info, data.toString('utf8'));
            })

            yarn.stderr.on('data', (data) => {
                console.log(symbols.warning, chalk.yellow(data.toString('utf8')));
            })

            yarn.on('error', (err) => {
                console.log(symbols.error, chalk.red(err));
            })

            yarn.on('close', (code) => {
                console.log(symbols.success, chalk.green('install dependencies successfully.'));
            })
        })
    });

program
    .command('build', 'token project.');

program
    .command('deploy', 'deploy smart contract.');

program
    .command('lint', 'lint project.');

program
    .command('test', 'test project.');

program.parse(process.argv);

if (!commandList.includes(program.args[0])) {
    // return program.help();
}

if (program.args.length === 0) {
    program.help();
}