const fs = require('fs');
const level = require('level');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const setDb = require('./setDb');
const checkDirectory = require('../helpers/checkDirectory');
const fileCheck = require('../helpers/fileCheck');
const createSystemDb = require('../helpers/createSystemDb');
const createDefaultDir = require('../helpers/createDefaultDir');
const backupFolderInit = require('../helpers/backupFolderInit');
const log = console.log(), issue = console.error();
const startDDrive = spawn('ddrive', ['start']);

export default function startup () {
  log(chalk.rgb(71,116,182).bold('Starting The dDNS Engines.'));
  startDDrive.stdout.on('data', data => {
    log("=> dDrive Daemon Started");
  });

  startDDrive.stderr.on('data', data => {
    issue('The following error occurred while attempting to start dDrive Daemon: ' + data);
  });
  
  // create default DDNS Directory
  if (checkDirectory(process.env.DEFAULT_DIR) === true) {
    createDefaultDir();
    log("=> Created default DDNS directory at ~/DDNS");
  }

  if (fileCheck(process.env.DDRIVE_ROOT, "ddnsdb") === true) {
    log("=> Creating System DB locally.");
    createSystemDb();
    log("=> Initializing DB");
    setDb();
  }

  // Create backup directories
  if (checkDirectory(process.env.BACKUP_FOLDER) === false &&
       checkDirectory(process.env.ND_BACKUP_FOLDER) === false) {
    backupFolderInit();
  }

  // Set init status to "true" in systemDB
  let db = level(process.env.SYSTEM_DB_LOCATION);
  db.put('init', 'true', (err, value) => {
    if (err) return log("Init already set to true in DB");
    log("=> dDNS CLI has been initialized!");
  });
}