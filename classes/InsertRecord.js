const dwebtrie = require('dwebtrie');
// TODO: write DWEB_KEY_REGEX
const DWEB_KEY_REGEX = / /;

export default class InsertRecord {
  constructor (nd, domain, recordName, ttl, type, rclass, rdata) {
    this.nd = nd;
    this.domain = domain;
    this.recordName = recordName;
    this.ttl = ttl;
    this.type = type;
    this.rclass = rclass;
    this.rdata = rdata;
  };
  
  add() {
    // create distributed dWeb database, if it doesn't exist
    const db = dwebtrie(`/root/DDrive/${this.nd}/${this.domain}.db`, {valueEncoding: 'json'});
    // add record
    db.put(`/${this.recordName}/`, `${this.recordName}`, () => {
      console.log(`Added ${this.recordName} record to the ${this.domain} DB.`);
    });
    // add ttl
    db.put(`/${this.recordName}/ttl`, `${this.ttl}`, () => {
      console.log(`Added TTL of ${this.ttl} for ${this.recordName}.`);
    });
    // add type
    if ( this.type === "D" || 
         this.type === "CNAME" || 
         this.type === "MINFO" || 
         this.type === "DMAIL" || 
         this.type === "ND" || 
         this.type === "SRV" || 
         this.type === "TXT") {
      db.put(`/${this.recordName}/type`, `${this.type}`, () => {
        console.log(`Added Type of ${this.type} for ${this.recordName}.`);
      });
    } else {
      console.error("Record type is invalid. Valid record types include D, CNAME, MINFO, DMAIL, ND, SRV and TXT");
    };
    // add class
    if ( this.rclass === "DW" || this.rclass  === "DM") {
      db.put(`/${this.recordName}/class`, `${this.rclass}`, () => {
        console.log(`Added Class of ${this.rclass} for ${this.recordName}.`);
      });
    } else {
      console.error('Class type is invalid. Valid Class types include DW and DM');
    }
    // add rdata
    if (DWEB_KEY_REGEX.test(this.rdata)) {
      db.put(`/${this.recordName}/rdata`, `${this.rdata}`, () => {
        console.log(`Added RDATA ${this.rdata} for ${this.recordName}.`);
      });
    }  else {
      console.error("dWeb key is not valid.");
    }    
  }; // end add function
}