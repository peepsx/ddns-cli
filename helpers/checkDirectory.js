const fs = require('fs');

export default function checkDirectory (directoryLocation) {
  fs.stat(directoryLocation, function(err, stats) {
    if (err) return false;
    return true;
  });
}