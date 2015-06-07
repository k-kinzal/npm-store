import _ from 'lodash';
import glob from 'glob';
import {execSync} from 'child_process';

var files = glob.sync(process.env.PWD + '/**/package.json');
if (files.length === 0) {
  throw new Error("Not found package.json");
}
var packages = require(files.pop());

var escape = function(str, chars) {
  return str.replace(new RegExp('[' + chars + ']', 'g'), '\\' + RegExp.$1);
};

export class Store {
  set(key, value) {
    if (_.isUndefined(value)) {
      throw new TypeError("unsupported type `undefined`");
    }
    value = JSON.stringify(value);
    execSync('npm config set \'' + key + '\' \'\\"' + escape(value, '\'') + '\\"\'');
  }
  get(key) {
    var value = execSync('npm config get \'' + key + '\'');
    try {
      return JSON.parse(value.toString().replace(/[\r\n]/g, '').replace(/^\\"|\\"$/g, ''));
    } catch (e) {
      return undefined;
    }
  }
  delete(key) {
    execSync('npm config delete \'' + key + '\'');
  }
}

export class ProjectStore extends Store {
  constructor() { super();
    var name = packages.name;
    var author =
      _.isObject(packages.author) ? packages.author.name : packages.author;
    this.identifier = author + '/' + name;
  }
  convertKey(key) {
    return (this.identifier + '-' + key).replace(/[\W]/g, '_');
  }
  set(key, value) {
    super.set(this.convertKey(key), value);
  }
  get(key) {
    return super.get(this.convertKey(key));
  }
  delete(key) {
    super.get(this.convertKey(key));
  }
}

export default new ProjectStore();