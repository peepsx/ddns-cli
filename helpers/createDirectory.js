const fs = require('fs');

export default function createDirectory (dir, dtype, cb) {
  if (typeof dtype !== 'string' || typeof dir !== 'string') {
    return console.error('Directory and type must be strings');
  }
  fs.access(dir, fs.F_OK, err => {
    //check if directory exists
    if (!err) {
      return console.log(`${dtype} directory already exists at ${dir}`);
    }

    console.log(`${dtype} directory does not exist, creating it.`);
    fs.mkdir(dir, cb);
  });
}