#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const { init } = require('./robin-init');
const confirm = require('inquirer-confirm');

const updateNotifier = require('update-notifier');
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
if (notifier.update) {
  notifier.notify();
}

program
  .version(pkg.version, '-v,--version');

program.on('--help', function() {
  console.log('');
  console.log('Usages:');
  console.log('  $ robin init --name MyContract');
  console.log('');
  console.log('See more at http://developer.ultrain.io/tutorial/robin_tutorial');
});

program
  .command('init')
  .description('Initialize a robin project. Specify contract\'s name with --name optionally.')
  .option('--name [contractName]', 'set contract name.')
  .action(option => {
    //no option input
    if (option.hasOwnProperty('commands')) {
      return init(option);
    }
    //option not start with '--name '
    else if (option.indexOf('--name ', 0) === -1) {
      var name = option.split(' ')[0];
      confirm('Do you mean the contract name is ' + name + '?')
        .then(function confirmed() {
          option.name = name;
          return init(option);
        }, function cancelled() {
          option.name = 'MyContract';
          return init(option);
        });
    } else {
      return init(option);
    }
  });

program
  .command('build', 'Build contract to WebAssembly target files.');

program
  .command('deploy', 'Deploy contract to a connected ultrain node');

program
  .command('lint', 'Check for syntax errors and fix them automatically.');

program
  .command('test', 'Run JavaScript test cases.');

program.parse(process.argv);

/*if (!commandList.includes(program.args[0])) {
    return program.help();
}*/

if (program.args.length === 0) {
  program.help();
}