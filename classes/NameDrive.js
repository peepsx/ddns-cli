const fs = require('fs');
const spawn = require('child_process').spawn;
const checkDirectory = require('../helpers/checkDirectory');
const fileCheck = require('../helpers/fileCheck');
const backupFolderInit = require('../init/backupFolderInit');
const createDirectory = require('../helpers/createDirectory');

export default class NameDrive {
  constructor (nd) {
    this.nd = nd;
  }

  create() {
    let ndLocations = process.env.DDRIVE_ROOT;
    let ndLocation = `${ndLocations}${this.nd}`;
    let checkForND = checkDirectory(ndLocations);
    if (checkForND === false) {
      creatend = spawn('ddrive', ['create', ndLocation]);
      creatend.stdout.on('data', data => {
        console.log(`NameDrive created for ${this.nd}.`);
      });
      creatend.stderr.on('data', data => {
        console.error(`NameDrive named ${this.nd} already exists at ${ndLocations}.`);
      });
    } else {
      console.error(`NameDrive named ${this.nd} already exists at ${ndLocations}.`);
    }
  }; // end create()

  remove() {
    let backupLocation = process.env.BACKUP_FOLDER;
    let ndBackupLocation = process.env.ND_BACKUP_FOLDER;
    let ndLocations = process.env.DDRIVE_ROOT;
    let ndLocation = `${ndLocations}${this.nd}`;
    if (checkDirectory (ndLocation) === true) {
      let tarName = `${this.nd}.tar.gz`;
      let tarLocation = ndBackupLocation + tarName;
      const backupNameDrive = spawn('tar', ['cf', 'tarLocation', 'ndLocation']);
      if (checkDirectory(backupLocation) === false ||
           checkDirectory(ndBackupLocation) === false) {
        backupFolderInit();
      }
      if (fileCheck(ndBackupLocation, tarName) === false) {
        backupNameDrive.stdout.on('data', data => {
          console.log(`=> ND was backed up to ${tarLocation}`);
        });
        backupNameDrive.stderr.on('data', data => {
          console.error('An error occurred while backup up the ND: ' + data);
        });
        fs.rmdir(ndLocation, () => {
          console.log(`=> Removed the NameDrive ${this.nd}`);
        });
      }
    } else {
      console.error(`Backup already exists for ${this.nd} or it was already removed.`);
    }
  } // end remove()
  restore() {
    let ndBackupLocation = process.env.ND_BACKUP_FOLDER;
    let ndBackup = `${this.nd}.tar.gz`;
    let untarLocation = `/root/DDrive/${ndBackup}`;
    if (fileCheck(ndBackupLocation, ndBackup) === true) {
      const mvtar = spawn('mv', [backupLocation + ndBackup, process.env.DDRIVE_ROOT]);
      const untar = spawn('tar', ['-xvf', untarLocation]);
      mvtar.stdout.on('data', data => {
        console.log(`=>${this.nd} backup file moved to default dDrive.`);
      });
      mvtar.stderr.on('data', data => {
        console.error('While moving the backup, an error was encountered: ' + data);
      });
      untar.stdout.on('data', data => {
        console.log(`=> ${this.nd} has been restored!`);
      });
      untar.stderr.on('data', data => {
        console.error('An error occurred while compressing the backup file: ' + data);
      });
      fs.unlink(backupLocation + ndBackup, () => {
        console.log("=> ND restoration process completed successfully!");
      });
    } else {
      console.error(`A backup for ${this.nd} does NOT exist!`);
    }
  };
}