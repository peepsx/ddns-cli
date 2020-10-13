const level = require('level');

export default function createSystemDb () {
  let dblocation = process.env.SYSTEM_DB_LOCATION;
  let db = level(dblocation);
  console.log('System database successfully created!');
}