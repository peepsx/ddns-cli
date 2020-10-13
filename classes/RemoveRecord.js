const dwebtrie = require('dwebtrie');

export default class RemoveRecord {
  constructor (nd, domain, record) {
    this.nd = nd;
    this.domain = domain;
    this.record = record;
  }

  remove() {
    let dDriveRoot = process.env.DDRIVE_ROOT;
    let dblocation = `${dDriveRoot}${this.nd}/${this.domain}.db`;

    const db = dwebtrie(dblocation, {valueEncoding: 'json'});

    let recordKey = `/${this.record}/`;
    let ttlKey = `/${this.record}/ttl`;
    let typeKey = `/${this.record}/type`;
    let classKey = `/${this.record}/class`;
    let rdataKey = `/${this.record}/rdata`;
    
    let batchArray = [
      { type: 'del', key: recordKey },
      { type: 'del', key: ttlKey },
      { type: 'del', key: typeKey },
      { type: 'del', key: classKey },
      { type: 'del', key: rdataKey }
    ];

    db.batch(batchArray, () => {
      console.log(`${this.record} removed!`);
    });
  }; // end remove()
}