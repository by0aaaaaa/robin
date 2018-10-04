const chalk = require('chalk');
const glob = require('glob');
const symbols = require('log-symbols');
const { spawn } = require('child_process');
const { downloadSync } = require('../lib/utils');
const fs = require('fs');

exports.init = async function(option){
  let contractName;

  if (typeof option === 'string') {
    contractName = option;
  }

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
      // rename contract's name
      let clazz = fs.readFileSync('contract/MyContract.ts').toString();
      fs.writeFileSync('contract/MyContract.ts', clazz.replace('MyContract', contractName));

      // rename migrate.js
      let migrate = fs.readFileSync('migrations/migrate.js').toString();
      fs.writeFileSync('migrations/migrate.js', migrate.replace('MyContract', contractName));

      // rename contract file's name
      fs.renameSync('contract/MyContract.ts', `contract/${contractName}.ts`);
      fs.renameSync('test/MyContract.spec.js', `test/${contractName}.spec.js`);
    }
    console.log(symbols.success, chalk.green('Initialize project successfully.'));

    // install dependencies for project.
    console.log(symbols.info, chalk.blue('Install dependencies...'));
    const yarn = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run',  { cwd: process.cwd() }]);
    //const yarn = spawn('npm', ['install'], { cwd: process.cwd() });

    yarn.stdout.on('data', (data) => {
      console.log(symbols.info, data.toString('utf8'));
    });

    yarn.stderr.on('data', (data) => {
      console.log(symbols.warning, chalk.yellow(data.toString('utf8')));
    });

    yarn.on('error', (err) => {
      console.log(symbols.error, chalk.red(err));
    });

    yarn.on('close', (code) => {
      console.log(symbols.success, chalk.green('Install dependencies successfully.'));
    });
  });
}