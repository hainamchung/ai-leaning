const fs = require('fs');
const path = require('path');

// Returns a static version number when server is skipped
function parseVersion() {
  return '0.0.1-SNAPSHOT';
}

const _root = path.resolve(__dirname, '..');

const environmentConfigs = fs.readFileSync(_root + '/.env', 'utf8');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function isExternalLib(module, check = /node_modules/) {
  const req = module.userRequest;
  if (typeof req !== 'string') {
    return false;
  }
  return req.search(check) >= 0;
}

function parseConfigKey(env, key) {
  let configs;
  configs = JSON.parse(environmentConfigs);
  return configs[env] !== undefined ? configs[env][key] : configs[key];
}

module.exports = {
  parseVersion,
  root,
  isExternalLib,
  parseConfigKey
};
