'use strict';

var assert  = require('power-assert');
var execSync = require('child_process').execSync;

var command = 'node lib/cli.js';

describe('CLI:', function() {
  it('should set value', function() {
    assert.doesNotThrow(function() { execSync(command + ' set bar 1') });
  });

  it('should cannot set no value', function() {
    assert.throws(function() { execSync(command + ' set bar') });
  });

  it('should get value', function() {
    var result = execSync(command + ' get bar').toString();

    assert(result === '1\n');
  });

  it('should delete value', function() {
    assert.doesNotThrow(function() { execSync(command + ' delete bar') });
  });

});