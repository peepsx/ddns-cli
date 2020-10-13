const dwebtrie = require('dwebtrie');

const DWEB_KEY_REGEX = /^[0-9a-f]{64}?$/i;

export default class InsertRecord {
  constructor (nd, domain, record, ttl, rtype, rclass, rdata) {
    this.nd = nd;
    this.domain = domain;
    this.record = record;
    this.ttl = ttl;
    this.rtype = rtype;
    this.rclass = rclass;
    this.rdata = rdata;
  }

  add() {
    let dDriveRoot = process.env.DDRIVE_ROOT;
    let domainDb = `${dDriveRoot}${this.nd}/${this.domain}.db`;
    // create db if it already doesn't exist
    const db = dwebtrie(domainDb, {valueEncoding: 'json'});
    // add record
    let recordKey = `/${this.record}/`;
    db.put(recordKey, this.record, () => {
      console.log(`Added ${this.record} record to the ${this.domain} DB.`);
    });

    // add ttl 
    let ttlKey = `/${this.record}/ttl`;
    db.put(ttlKey, this.ttl, () => {
      console.log(`Added ${this.ttl} TTL for ${this.record}`);
    });

    let typeKey = `/${this.record}/type`;
    if (this.type === "D" ||
         this.type === "CNAME" ||
         this.type === "MINFO" || 
         this.type === "DMAIL" ||
         this.type === "ND" || 
         this.type === "SRV" ||
         this.type === "TXT") {
      db.put(typeKey, this.rtype, () => {
        console.log(`Added type ${this.rtype} for ${this.record}`);
      });
    } else {
        console.error("Record type is invalid. Valid record types include D, CNAME, MINFO, DMAIL, ND, SRV and TXT");
    }

    let rclassKey = `/${this.record}/class`;
    if (this.rclass === "DW" ||
         this.rclass === "DM") {
      db.put(rclassKey, this.rclass, () => {
        console.log(`Added class of ${this.rclass} for ${this.record}`);
      });
    } else {
      console.error("Class type is invalid]. Valid class types include DW and DM.");
    }

    let rdataKey = `/${this.record}/rdata`;
    if (DWEB_KEY_REGEX.test(this.rdata)) {
      db.put(rdataKey, this.rdata, () => {
        console.log(`Added RDATA ${this.rdata} for ${this.record}.`);
      });
    } else {
        console.error('dWeb key is not valid.');
    }
  }; // end add()
}