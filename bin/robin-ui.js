#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');
const spawn = require('cross-spawn');
// const pkg = require('../package.json');
const { ui } = require('../config.json');
const fs = require('fs');
const path = require('path');
const { downloadSync, copyDir, rmDir } = require('../lib/utils');
const merge = require('lodash.merge');
const mainPkg = require(path.join(process.cwd(), 'package.json'));

program.parse(process.argv);

if (mainPkg.template) {
  return console.log(
    symbols.error,
    chalk.red('Cannot set UI template repeatedly.')
  );
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Please choose a template you want.',
      choices: [
        'vue-boilerplate',
        'react-boilerplate',
        'react-native-boilerplate'
      ]
    }
  ])
  .then(async rs => {
    // mkdir ui
    fs.mkdirSync(path.join(process.cwd(), 'ui'));

    console.log(symbols.info, chalk.blue(`Download ${rs.template}...`));
    await downloadSync(ui[rs.template], 'ui');
    console.log(
      symbols.success,
      chalk.green(`Download ${rs.template} success.`)
    );

    // cp file and dir to rootdir
    copyDir(path.join(process.cwd(), 'ui'), process.cwd());

    const uiPkg = require(path.join(process.cwd(), 'ui', 'package.json'));

    let customPkg = merge(uiPkg, mainPkg);
    customPkg.template = rs.template;
    fs.writeFileSync(
      path.join(process.cwd(), 'package.json'),
      JSON.stringify(customPkg, null, 2)
    );

    rmDir(path.join(process.cwd(), 'ui'));

    console.log(
      symbols.info,
      chalk.blue(`Install ${rs.template} dependencies...`)
    );
    const npm = spawn('npm', ['install'], {
      cwd: process.cwd()
    });

    npm.stdout.on('data', data => {
      console.log(symbols.info, data.toString('utf8'));
    });

    npm.stderr.on('data', data => {
      console.log(symbols.warning, chalk.yellow(data.toString('utf8')));
    });

    npm.on('error', err => {
      console.log(symbols.error, chalk.red(err.toString('utf8')));
    });

    npm.on('close', code => {
      if (code === 0) {
        console.log(
          symbols.success,
          chalk.green(`Install ${rs.template} dependencies successfully.`)
        );
      } else {
        console.log(
          symbols.error,
          chalk.green(`Install ${rs.template} dependencies fail.`)
        );
      }
    });
  });
