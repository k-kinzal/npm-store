'use strict';

var assert  = require('power-assert');
var Store = require('../lib/index').Store;
var ProjectStore = require('../lib/index').ProjectStore;

describe('Store:', function() {
  var store;
  beforeEach(function() {
    store = new Store();
  });

  it('should set number', function() {
    store.set('foo', 1);

    assert(store.get('foo') === 1);
  });

  it('should set string', function() {
    store.set('foo', "bar");

    assert(store.get('foo') === "bar");
  });

  it('should set float', function() {
    store.set('foo', 1.2);
    
    assert(store.get('foo') === 1.2);
  });

  it('should set true', function() {
    store.set('foo', true);
    
    assert(store.get('foo') === true);
  });

  it('should set false', function() {
    store.set('foo', false);
    
    assert(store.get('foo') === false);
  });

  it('should set null', function() {
    store.set('foo', null);
    
    assert(store.get('foo') === null);
  });

  it('should set array', function() {
    var arr = [1, 2, 3];
    store.set('foo', arr);
    
    assert.deepEqual(store.get('foo'), arr);
  });

  it('should set object', function() {
    var obj = {"hoge": 1, "fuga": 1.2, "piyo": "aaa"};
    store.set('foo', obj);
    
    assert.deepEqual(store.get('foo'), obj);
  });

  it('should not set undefined', function() {
    assert.throws(function() { store.set('foo') }, TypeError);
  });

  it('should delete key', function() {
    store.delete('foo');

    assert(store.get('foo') === undefined);
  });

});

describe('ProjectStore:', function() {
  var store, projectStore;
  beforeEach(function() {
    store = new Store();
    projectStore = new ProjectStore();
  });

  it('should set assigned to the prefix of key for project identifier', function() {
    projectStore.set('foo', 1);

    assert(store.get('k_kinzal__k_kinzal_store_foo') === 1);
  });

});