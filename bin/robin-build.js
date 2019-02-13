#!/usr/bin/env node
const program = require('commander');
// const glob = require('glob');
const chalk = require('chalk');
const symbols = require('log-symbols');
const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');

program.parse(process.argv);

let pkg = JSON.parse(fs.readFileSync('package.json').toString());

if (!pkg.contract_name && !fs.existsSync('contract/MyContract.ts')) {
  console.log(symbols.error, chalk.red('Can not found contract source file.'));
  return;
}

const contractName = pkg.contract_name || 'MyContract';

// clean target
const buildDir = path.join(process.cwd(), 'build');
if (fs.existsSync(buildDir)) {
  fs.emptyDirSync(buildDir);
  fs.rmdirSync(buildDir);
  console.log(symbols.success, 'Trash built target files');
}

// create directory
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
  console.log(symbols.success, 'Make build directory');
}

process.env.PATH = `${process.env.PATH}${
  process.platform === 'win32' ? ';' : ':'
}${process.cwd()}/node_modules/ultrascript/bin`;

// for (let i in contracts) {
// const contractName = path.parse(contracts[i]).name;
const cmdArgs = [
  `contract/${contractName}.ts`,
  '-b',
  `build/${contractName}.wasm`,
  '-g',
  `build/${contractName}.abi`,
  '-t',
  `build/${contractName}.wast`,
  '--validate',
  '-l'
];

const rs = spawn.sync('asc', cmdArgs, {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env
});
if (rs.stderr && rs.stderr.length > 0) {
  let isWarning = false;
  if (rs.stderr.indexOf('WARNING') !== -1) isWarning = true;

  if (!isWarning) return console.log(symbols.error, chalk.yellow(rs.stderr));

  console.log(symbols.warning, chalk.yellow(rs.stderr));
}

if (rs.error) {
  console.log(symbols.error, chalk.red(rs.error));
  return false;
}
// }

console.log(symbols.success, 'Build assembly target successfully');
