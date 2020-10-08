const level = require('level');

export default function checkInitStatus() {
  const db = level('/root/DDNS/ddnsdb');
  db.get('init', function (err, value) {
    if (err) return false;
    else return true;
  });
}
