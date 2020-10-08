const level = require('level');
const defaultDir = require('../config/defaultDir');

export default function createSystemDb() {
  var db = level(`${defaultDir}/ddnsdb`);
  console.log('System database created successfully!');
}