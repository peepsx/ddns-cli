const dwebtrie = require('dwebtrie');
const fileCheck = require('../helpers/fileCheck');

export default class Domain {
  constructor (nd, domain) {
    this.nd = nd;
    this.domain = domain;
  };
  
  create() {
    let dblocation = `/root/DDrive/${this.nd}/`;
    let dbName = this.domain + ".db";
    let checkForDb = fileCheck(dblocation, dbName);
    if (checkForDb === false) {
      const db = dwebtrie(dblocation, {valueEncoding: 'json'});
      db.put('default', this.domain, () => {
        console.log(`Successfully added a new database for ${this.domain} within ${this.nd}`);
      });
    } else {
      console.log(`Database for ${this.domain} already exists in ${this.nd}`); 
    }
  }; // end create()

  remove() {
    let dblocation = `/root/DDrive/${this.nd}/`;
    let dbName = this.domain + ".db";
    let checkforDb = fileCheck(dblocation, dbName);
    if (checkForDb === true) {
      let backuplocation = "/root/DDNS/backups/";
      let backupFileName = `${this.domain}.db.backup`;
      var spawn = require('child_process').spawn,
        rmdb = spawn('rm', [dblocation + dbName]),
        mkdir = spawn('mkdir', [backupLocation]),
        backupdb = spawn('cp', [dblocation + dbName, backupFilename]);

      let checkBackupDirectory = checkDirectory(backupLocation);
      let checkForBackup = fileCheck(backupLocation, backupFilename);

      if (checkBackupDirectory === false) {
        mkdir.stdout.on('data', data => {
          console.log("Domain database backup directory did not exist, so it was created.");
        });
        mkdir.stderr.on('data', data => {
          console.error('Domain database backup directory did not exist and an error occurred while creating it: ' + data);
        });
      }

      if (checkForBackup === false) {
        backupdb.stdout.on('data', data => {
          console.log(`Successfully created a backup for ${this.domain}.`);
        });
        backupdb.stderr.on('data', data => {
          console.error(`There was an error when attempting to create a backup for ${this.domain}: ` + data);
        });
        rmdb.stdout.on('data', data => {
          console.log(`${dbName} was backed up and then removed from the NameDrive.`);
        });
        rmdb.stderr.on('data', data => {
          console.error(`Failed to remove ${dbName} due to the following error: ` + data);
        });
      }
    }
  }; // end remove()
  restore() {
    let ndLocation = `/root/DDrive/${this.nd}/`;
    let backupFileName = `${this.domain}.db.backup`;
    let checkForBackup = fileCheck(backupLocation, backupFilename);
 
    if (checkForBackup === true) {
      let restoreName = `${this.domain}.db`;
      const spawn = require('child_process').spawn,
        mvdb = spawn('mv', [backupLocation + backupFilename, ndLocation + restoreName]);
      
      mvdb.stdout.on('data', data => {
        console.log(`${this.domain} database has been restored at ${ndLocation} ${restoreName}!`);
      });
      mvdb.stderr.on('data', data => {
        console.error(`Was unable to restore backup for ${this.domain}, due to the following error: ` + data);
      });
        
    } else {
      console.error(`Backup for ${this.domain} does not exist at ${backupLocation}.`);
    }
  }; // end restore()
} // end Domain class