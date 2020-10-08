#!/usr/bin/env node
const pkg = require('package.json');
const subcommand = require('subcommand');
const usage = require('./src/usage');
const debug = require('debug')('ddns');

if (debug.enabled) {
  debug('dDNS CLI DEBUG mode engaged, enabling quiet mode');
};

var config = {
  default: [],
  root: { 
    options: [
      {
      name: 'version',
      boolean: true,
      default: false,
      abbr: 'v'
      }
   ], 
  command: usage
  },
  none: usage,
  commands: [
    require('./src/commands/init'),
    require('./src/commands/creatend'),
    require('./src/commands/removend'),
    require('./src/commands/restorend'),
    require('./src/commands/adddomain'),
    require('./src/commands/removedomain'),
    require('./src/commands/restoredomain'),
    require('./src/commands/addrecord'),
    require('./src/commands/removerecord')
  ],
  usage: {
    command: usage,
    option: {
      name: 'help',
      abbr: 'h'
    }
  },  
}; // End CLI Config

if (debug.enabled) {
 debug('ddns', pkg.version);
 debug('node', process.version);
};

// Match Args + Run Commands
let match = subcommand(config);
match(alias(process.argv.slice(2)));

function alias(argv) {
  var cmd = argv[0];
  if(!config.aliases[cmd]) return argv;
  argv[0] = config.aliases[cmd];
  return argv;
};