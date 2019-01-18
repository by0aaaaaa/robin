#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const { init } = require('./robin-init');
// const confirm = require('inquirer-confirm');
const inquirer = require('inquirer');

const updateNotifier = require('update-notifier');
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
if (notifier.update) {
  notifier.notify();
}

program.version(pkg.version, '-v,--version');

program.on('--help', function() {
  console.log('');
  console.log('Usages:');
  console.log('  $ robin init -c MyContract');
  console.log('  $ robin init --contract MyContract');
  console.log('');
  console.log(
    'See more at http://developer.ultrain.io/tutorial/robin_tutorial'
  );
});

program
  .command('init')
  .description(
    "Initialize a robin project. Specify contract's name with -c or --contract optionally.\n                Install dependecies from github with --dev optionally."
  )
  .option('-c, --contract [contractName]', 'set contract name.')
  .option('--dev', 'set github dependencies')
  .action(option => {
    //no option input
    if (!option.contract) {
      return init(option);
    } else {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'contractName',
            message:
              'Do you mean the contract name is ' + option.contract + '?',
            default: true
          }
        ])
        .then(rs => {
          if (!rs.contractName) {
            option.contract = 'MyContract';
          }
          return init(option);
        });
      // confirm().then(
      //   function confirmed() {
      //     return init(option);
      //   },
      //   function cancelled() {
      //     option.contract = 'MyContract';
      //     return init(option);
      //   }
      // );
    }
  });

program.command('build', 'Build contract to WebAssembly target files.');

program.command('deploy', 'Deploy contract to a connected ultrain node');

program.command('lint', 'Check for syntax errors and fix them automatically.');

program.command('test', 'Run JavaScript test cases.');

program.command('ui', 'Build webapp with selected template.');

program.parse(process.argv);

/*if (!commandList.includes(program.args[0])) {
    return program.help();
}*/

if (program.args.length === 0) {
  program.help();
}
