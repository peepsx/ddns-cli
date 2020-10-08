const dwebtrie = require('dwebtrie');

export default class RemoveRecord {
  constructor (nd, domain, recordName) {
    this.nd = nd;
    this.domain = domain;
    this.recordName = recordName;
  };

  remove() {
    // Connect to DB
    const db = dwebtrie(`/root/DDrive/${this.nd}/${this.domain}`, {valueEncoding: 'json'});
    //remove all associated resources
    // remove batch operation
    db.batch(
      {
        type: 'del',
        key: `/${recordName}/`
      },
      {
        type: 'del',
        key: `/${recordName}/ttl`
      },
      {
        type: 'del',
        key: `/${recordName}/type`
      },
      {
        type: 'del',
        key: `/${recordName}/class`
      },
      {
        type: 'del',
        key: `/${recordName}/rdata`
      }, () => {
       console.log(`${recordName} removed!`);
     });
  }; // end remove()
}  // end RemoveRecord class