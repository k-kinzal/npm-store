#!/usr/bin/env node
var packages = require('../package.json');
var program = require('commander');
var store = require('./index.js').default;
 
program.version(packages.version)
program
  .command('set <key> [<value>]')
  .description('store to value')
  .action(function set(key, value) {
    if (value === undefined) {
      var endListener = function() {
        process.exit(1);
      };
      process.stdin.resume();  
      process.stdin.setEncoding('utf8');  
      process.stdin.on('data', function(data) {
        process.stdin.removeListener('end', endListener);
        set(key, data);
      });
      process.stdin.on('end', endListener);
      return;
    }
    try {
      value = JSON.parse(value);
    } catch (e) {

    }
    store.set(key, value);
  });
program
  .command('get <key>')
  .description('get value from store')
  .action(function get(key) {
    console.log(JSON.stringify(store.get(key)));
  });

program
  .command('delete <key>')
  .description('delete value from store')
  .action(function (key) {
    store.delete(key);
  });

program.parse(process.argv);