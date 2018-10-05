#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const symbols = require('log-symbols');
const { spawn } = require('child_process');

program.parse(process.argv);
const cmdArgs = [
  'test/*.spec.js'
];

process.env.PATH = `${process.cwd()}/node_modules/mocha/bin:${process.env.PATH}`;

const test = spawn(/^win/.test(process.platform) ? 'mocha.cmd' : 'mocha', cmdArgs,  { cwd: process.cwd(), env: process.env });
test.stdout.on('data', (data) => {
  console.log(data.toString('utf8'));
});

test.stderr.on('data', (data) => {
  if (data.indexOf('no-unused-variable is deprecated') !== -1) {
    console.log(symbols.warning, chalk.yellow(data.toString('utf8')));
  } else {
    console.log(symbols.error, chalk.red(data.toString('utf8')));
  }
});

test.on('close', (code) => {
  // console.log(`lint `);
});