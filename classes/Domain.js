const dwebtrie = require('dwebtrie');
const spawn = require('child_process');
const fileCheck = require('../helpers/fileCheck');
const startup = require('../init/startup');
const checkDirectory = require('../helpers/checkDirectory');
const createDirectory = require('../helpers/createDirectory');

export default class Domain {
  constructor (nd, domain) {
    this.nd = nd;
    this.domain = domain;
  };

  create() {
    let dDriveRoot = process.env.DDRIVE_ROOT;
    let dbLocation = dDriveRoot + this.nd + "/";
    let dbName = this.domain + ".db";
    let checkForDb = fileCheck(dbLocation, dbName); 
    if (checkForDb === false) {
      const db = dwebtrie(dbLocation + dbName, {valueEncoding: 'json'});
      db.put('default', this.domain, () => {
        console.log(`=> Database for ${this.domain} was successfully created!`);
      });
    } else {
      console.error(`DB for ${this.domain} already exists in the ND.`);
    }    
  };

  remove() {
    let dDriveRoot = process.env.DDRIVE_ROOT;
    let dbLocation = `${dDriveRoot}${this.nd}/`;
    let dbName = this.domain + ".db";
    let checkForDb = fileCheck(dbLocation, dbName);
    if (checkForDb === true) {
      let backupLocation = process.env.BACKUP_FOLDER;
      let backupFilename = `${this.domain}.db.backup`;
      let backupDb = spawn('cp', [dbLocation + dbName, backupFilename]);
      let checkBackupDirectory = checkDirectory(backupLocation);
      if (checkBackupDirectory === false) {
        startup();
      }
      let checkForBackup = fileCheck(backupLocation, backupFilename);
      if (checkForBackup === false) {
        backupDb.stdout.on('data', data => {
          console.log(`=> Successfully created a backup for ${this.domain}!`);
        });
        backupDb.stdout.on('data', data => {
          console.error('An error occurred while trying to create a backup for the domain: ' + data);
        });         
      }
      fs.unlink(dbLocation + dbName, () => {
        console.log("=> Domain has been removed successfully");
      });
    }
  } // end remove()
  restore() {
    let dDriveRoot = process.env.DDRIVE_ROOT;
    let ndLocation = dDriveRoot + this.nd + "/";
    let backupLocations = process.env.BACKUP_FOLDER;
    let backupFilename = `${this.domain}.db.backup`;
    let checkForBackup = fileCheck(backupLocation, backupFilename);
      if (checkForBackup === true) {
        let restoreName = `${this.domain}.db`;
        const mvdb = spawn('mv', [backupLocations + backupFilename, ndLocation + restoreName]);
        mvdb.stdout.on('data', data => {
          console.log(`=> ${this.domain}  has been restored!`);
        });
        mvdb.stderr.on('data', data => {
          console.error('Encountered the following error while trying to restore backup: ' + data);
        }); 
      } else {
        console.error(`Backup for ${this.domain} does not exist at ${backupLocation}`);
      }
  };
}