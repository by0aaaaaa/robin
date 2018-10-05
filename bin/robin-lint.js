#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const symbols = require('log-symbols');
const { spawn } = require('child_process');

program.parse(process.argv);
const cmdArgs = [
  'contract/*',
  '--fix',
  '--project',
  '.'
];

process.env.PATH = `${process.cwd()}/node_modules/tslint/bin:${process.env.PATH}`;

const lint = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'tslint'], { cwd: process.cwd() });
//const lint = spawn(/^win/.test(process.platform) ? 'tslint' : 'tslint', cmdArgs,  { cwd: process.cwd(), env: process.env });
lint.stdout.on('data', (data) => {
  console.log(data.toString('utf8'));
});

lint.stderr.on('data', (data) => {
  if (data.indexOf('no-unused-variable is deprecated') !== -1) {
    console.log(symbols.warning, chalk.yellow(data.toString('utf8')));
  } else {
    console.log(symbols.error, chalk.red(data.toString('utf8')));
  }
});

lint.on('close', (code) => {
  // console.log(`lint `);
});