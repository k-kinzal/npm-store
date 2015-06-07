#!/usr/bin/env node
var packages = require('../package.json');
var program = require('commander');
var store = require('./index.js').default;
 
program
  .version(packages.version)
  .command('set <key> <value>', 'store to value')
  .command('get <key>', 'get value from store')
  .command('delete <key>', 'delete value from store')
  .action(function (command, key, value) {
    if (store[command] === undefined) {
      console.error("is not support command `" + command + "`.");
      process.exit(1);
    }
    if (command === 'set') {
      if (value == program) {
        console.error("please set a key and value.");
        process.exit(1);
      }
      try {
        value = JSON.parse(value);
      } catch (e) {}
    }
    var result = store[command](key, value);

    if (command === 'get') {
      console.log(JSON.stringify(result));
    }

    process.exit(0);
  });

program.parse(process.argv);