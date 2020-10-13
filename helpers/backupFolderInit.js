const createDirectory = require('./createDirectory');

export default function backupFolderInit () {
  const backupType = "DDNS CLI backup folder";
  const ndBackupType = "NameDrive (ND) backup folder";
  
  // Create both directories
  createDirectory(process.env.BACKUP_FOLDER, backupType, () => {
    console.log(`=>${backupType} created!`);
  });

  createDirectory(process.env.ND_BACKUP_FOLDER, ndBackupType, () => {
    console.log(`=>${ndBackupType} created!`);
  });
}