const level = require('level');

export default function setDb () {
  let systemDB = process.env.SYSTEM_DB_LOCATION;
  let db = level(systemDB);
  db.put('setND', 'null', (err, value) => {
    if (err) return console.error("Error: Could not initiate setDB");
    console.log("=> System Database Initialized");
  });
}