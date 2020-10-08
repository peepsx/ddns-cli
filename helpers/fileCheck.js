const fs = require('fs');

// Used to check for the existence of the system DB, NameDrives and domain databases
export default function fileCheck (location, file) {
    fs.readdirAsync(location).map(filename => {
      if (filename === file) {
        return true;
      } else {
        return false;
      }
    });
  }