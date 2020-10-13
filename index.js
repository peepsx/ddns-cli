#!/usr/bin/env node
const pkg = require('./package.json');
const subcommand = require('subcommand');
const usage = require('./src/usage');
const debug = require('debug')('ddns');

if (debug.enabled) {
  debug('dDNS DEBUG mode engaged, enabling quiet mode');
}

require('dotenv').config();

const config = {
  default: [
    { name: 'dir', abbr: 'd', help: 'set the directory for creating and accessing NameDrives.'},
    { name: 'debug', abbr: 'x', help: 'Enable debug mode.' }
  ],
  root: {
    options: [
      {
        name: 'version',
        boolean: true,
        default: false,
        abbr: 'v'
      }
    ],
    command: showUsage
  },
  none: syncShorthand,
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
    command: showUsage,
    option: {
      name: 'help',
      abbr: 'h'
    }
  }
};

if (debug.enabled) {
  debug('ddns', pkg.version);
  debug('node', process.version);
}

// Match Args + Run commands
var match = subcommand(config);
match(alias(process.argv.slice(2)));

function alias (argv) {
  var cmd = argv[0];
  if (!config.aliases[cmd]) return argv;
  argv[0] = config.aliases[cmd];
  return argv;
};

function syncShorthand (opts) {
  if (!opts._.length) return usage();
  //TODO: Add defaults
  // All else fails, show usage
  return usage();
};

function showUsage () {
  usage();
};