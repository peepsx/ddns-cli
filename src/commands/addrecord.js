module.exports = {
    name: 'addrecord',
    command: addrecord,
    help: [
      'Add a record to a domain.',
      'Usage: ddns addrecord'
    ].join('\n'),
    options: []
  };
  
  function addrecord() {
    const { InsertRecord } = require('../../classes/InsertRecord');
    const prompt = require('prompt');
    const chalk = require('chalk');
    
    let welcome = "Add a record to a domain name.";
    console.log(welcome);
  
    var schema = {
      properties: {
        namedrive: {
          description: chalk.magenta('NameDrive Name'),
          message: 'NameDrive where domain is located'
        },
        domain: {
          description: chalk.magenta('Domain Name'),
          message: 'Domain that record is being added to.'
        },
        recordName: {
          description: chalk.magenta('Record Name'),
          message: 'Name of the record being added i.e. www'
        },
        ttl: {
          description: chalk.magenta('TTL'),
          message: 'The time-to-live (TTL) for the record'
        },
        type: {
          description: chalk.magenta('Type'),
          message: 'The record type ex. D, CNAME, MINFO, ND, etc.'
        },
        rclass: {
          description: chalk.magenta('Class'),
          message: 'The record class ex. DW or DM'
        },
        rdata: {
          description: chalk.magenta('RDATA'),
          message: 'The dWeb discovery key related to this record.'
        }
      }
    };
  
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) return exitErr(err);
      let record = new InsertRecord(result.namedrive,
                                                   result.domain,
                                                   result.recordName,
                                                   result.ttl,
                                                   result.type,
                                                   result.class,
                                                   result.rdata);
      record.add();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
      console.error(err);
      process.exit(1);
    };
  }