#!/usr/bin/env node
const program = require('commander');
const glob = require('glob');
const chalk = require('chalk');
const symbols = require('log-symbols');
const fs = require('fs-extra');
const path = require('path');
const { spawnSync } = require('child_process');

program.parse(process.argv);

const contracts = glob.sync('contract/*.ts');
if (!contracts.length) {
  console.log(symbols.error, chalk.red('can not found contract source files.'));
  return;
}

// clean target
const buildDir = path.join(process.cwd(), 'build');
if (fs.existsSync(buildDir)) {
  fs.emptyDirSync(buildDir);
  fs.rmdirSync(buildDir);
  console.log(symbols.success, 'trash built target');
}

// create directory
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
  console.log(symbols.success, 'make build directory');
}

process.env.PATH = `${process.cwd()}/node_modules/ultrascript/bin:${process.env.PATH}`;

for (let i in contracts) {
  const contractName = path.parse(contracts[i]).name;
  const cmdArgs = [
    contracts[i],
    '-b',
    `build/${contractName}.wasm`,
    '-g',
    `build/${contractName}.abi`,
    '-O',
    '-t',
    `build/${contractName}.wast`,
    '--validate',
    '--optimize',
    '--noDebug',
    '-l'
  ];

  const rs = spawnSync('asc', cmdArgs, { cwd: process.cwd(), env: process.env });
  if (rs.stderr && rs.stderr.length > 0) {
    let isWarning = false;
    if (rs.stderr.indexOf('WARNING') !== -1)
      isWarning = true;

    if (!isWarning)
      return console.log(symbols.error, chalk.yellow(rs.stderr));

    console.log(symbols.warning, chalk.yellow(rs.stderr));
  }

  if (rs.error) {
    console.log(symbols.error, chalk.red(rs.error));
    return false;
  }
}

console.log(symbols.success, 'build assembly target successfully');

