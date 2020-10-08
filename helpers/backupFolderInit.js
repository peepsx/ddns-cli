const checkFile = require('./helpers/fileCheck');
const checkDirectory = require('./helpers/checkDirectory');
const spawn = require('child_process').spawn;

const backupLocation = "/root/DDNS/backups/";
const ndBackupLocation = "/root/DDNS/backups/nd";

export default function backupFolderInit() {
  const mkbdir = spawn('mkdir', [backupLocation]);
  const mkndbdir = spawn('mkdir', [ndBackupLocation]);

  mkbdir.stdout.on('data', () => {
    console.log("Backup directory did not exist, so it was created.");
  });

  mkbdir.stderr.on('data', () => {
    console.error('Backup directory did not exist but when creating, the following error was encountered: ' + data);
  });

  mkndbdir.stdout.on('data', () => {
    console.log("ND backup directory did not exist, so it was created.");
  });

  mkndbdir.stderr.on('data', () => {
    console.error('ND backup directory did not exist and when creating, the following error was encountered: ' + data);
  });
}