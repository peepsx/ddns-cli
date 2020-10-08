const fs = require('fs');
const level = require('level');
const chalk = require('chalk');
const setDb = require('../init/setDb');
const checkDirectory = require('../helpers/checkDirectory');
const fileCheck = require('../helpers/fileCheck');
const createSystemDb = require('../helpers/createSystemDb');
const createDefaultDir = require('../helpers/createDefaultDir');
const backupFolderInit = require('../helpers/backupFolderInit');
const defaultDir = require('./config/defaultDir');
const spawn = require('child_process').spawn;
const log = console.log();
const issue = console.error();

export default function startup() {
  const startddrive = spawn('ddrive', ['start']);
  startddrive.stdout.on('data', () => {
    log(chalk.rgb(71,116,182).bold('Starting The dDNS Engines'));
    log(" => dDrive Daemon Started");
  });
  
  startddrive.stderr.on('data', () => {
    log(chalk.rgb(71,116,182).bold('Starting The dDNS Engines'));
    issue('The following issue occurred while attempting to start dDrive Daemon' + data);
  });

  if (checkDirectory(defaultDir) === true) {
    createDefaultDir();
    log(" => Created default DDNS directory at ~/DDNS");
  };
  
  if (fileCheck("/root/DDNS/", "ddnsdb") === true) {
    log(" => Creating SystemDB locally.");
    createSystemDb();
    log(" => Initializing DB");
    setDb();
  };
  
  if (checkDirectory("/root/DDNS/backup/") === true && checkDirectory("/root/DDNS/backups/nd/") === true) {
    backupFolderInit();
    log(" => Creating backup folders at ~/DDNS/backups");
  };
  
  // Set init status to true in the SystemDB
  let db = level('/root/DDNS/ddnsdb');
  db.put('init', 'true', (err, value) => {
    if (err) return issue("Initialization has already been set in SystemDB.");
    log("=> Init set to true in DB and dDNS CLI initialization has been finalized.");
  });
}