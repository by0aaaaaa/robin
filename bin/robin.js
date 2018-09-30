#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
var confirm = require('inquirer-confirm');
const init = require('./robin-init');
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
    confirm('are you ok?')
      .then(function confirmed() {
        console.log('you are ok');
      }, function cancelled() {
        console.log('sorry to hear that');
      });
    init(option);
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