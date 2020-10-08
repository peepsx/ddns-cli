const fs = require('fs');
const checkDirectory = require('../helpers/checkDirectory');
const fileCheck = require('../helpers/fileCheck');
const backupFolderInit = require('../init/backupFolderInit');

export default class NameDrive {
  constructor (ndName) {
    this.ndName = ndName
  }

  create() {
    let ndLocations = "/root/DDrive/";
    let ndLocation = `/root/DDrive/${this.ndName}`;
    let checkForND = checkDirectory(ndLocation);
    if (checkForND === false) {
      const spawn = require('child_process').spawn,
        creatend = spawn('ddrive', ['create', ndLocation]),
        start = spawn('ddrive', ['start']),
        status = spawn('ddrive', ['status']);

      // Create NameDrive
      creatend.stdout.on('data', () => {
        console.log(`NameDrive created for ${this.ndName}.`);
      });
      creatend.stderr.on('data', () => {
        console.error('During creation of the NameDrive, the following error was received from dDrive Daemon: ' + data);
      });      
    }  else {
      console.error(`NameDrive named ${this.ndName} already exists at ${ndLocations}.`);
    }
  } // End create()

  remove() {
    let backupLocation = "/root/DDNS/backups";
    let ndBackupLocation = "/root/DDNS/backups/nd";
    let ndLocation = `/root/DDrive/${this.ndName}`;
    
    if (checkDirectory(ndLocation) === true) {
      let tarName = ndBackupLocation + "tar.gz";
      const spawn = require('child_process').spawn,
        rmnd = spawn('rm', ['-f', ndLocation]),
        backupnd = spawn('tar', ['cf', tarName, ndLocation]);
      
      if (fileCheck(ndBackupLocation, `${this.ndName}.tar.gz`) === false) {
        backupnd.stdout.on('data', () => {
          console.log(`Before moving, ND was backed up at ${tarName}.`);
        });

        backupnd.stderror.on('data', () => {
          console.error('Before removing, an attempt was made to back up the ND and the following error occurred: ' + data);
        });

        rmnd.stdout.on('data', () => {
          console.log(`${this.ndName} was removed.`);
        });
     
        rmnd.stderr.on('data', () => {
          console.error(`While trying to remove ${this.ndName}, the following error was encountered: ` + data);
        });
      }  // end nested IF   
    }  else {
      console.error(`Backup already exists for ${this.ndName} or it has already been removed.`);
    } // end IF/ELSE
  }; // end remove()

  restore() {
    let backupLocation = "/root/DDNS/backups/nd/";
    let ndBackup = `${this.ndName}.tar.gz`;
    if (fileCheck(backupLocation, ndBackup) === true) {
      const spawn = require('child_process').spawn;
        mvtar = spawn('mv', [backupLocation + ndBackup, '/root/DDrive/']);
        untar = spawn('tar', ['-xvf', `/root/DDrive/${ndBackup}`]);
        rmtar = spawn('rm', [`/root/DDrive/${ndBackup}`]);
      
      mvtar.stdout.on('data', () => {
        console.log(`${this.ndName} backup file moved to default dDrive.`);
      });

      mvtar.stderr.on('data', () => {
        console.error(`While moving the backup file for ${this.ndName}, the following error was encountered: ` + data);
      });

      untar.stdout.on('data', () => {
        console.log(`${this.ndName} backup has been restored!`);
      });

      untar.stderr.on('data', () => {
        console.error(`While attempting to untar the backup, the following error was encountered: ` + data);
      });

      rmtar.stdout.on('data', () => {
        console.log("ND restoration process has completed successfully!");
      });

      rmtar.stderr.on('data', () => {
        console.error('While attempting to remove the backup file, the following error was encountered: ' + data);
      });
    }  else {
      console.error(`A backup for ${this.ndName} does not exist`);
    }
  }; // end restore()
}