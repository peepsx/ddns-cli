module.exports = {
    name: 'adddomain',
    command: adddomain,
    help: [
      'Add a domain to a NameDrive (ND)',
      'Usage: ddns adddomain'
    ].join('\n'),
    options: []
  };
  
  function adddomain() {
    const { Domain } = require('../../classes/Domain');
    const prompt = require('prompt');
    const chalk = require('chalk');
    let welcome = "Add a domain to a NameDrive (ND)";
    
    consolve.log(welcome);
  
    var schema = {
      properties: {
        namedrive: {
          description: chalk.magenta('NameDrive Name'),
          message: 'Name of the NameDrive the domain is being added to.'
        },
        domain: {
          description: chalk.magenta('Domain Name'),
          message: 'The domain name being added.'
        }
      }  
    };
  
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) return exitErr(err);
      let domain = new Domain(result.namedrive, result.domain);
      domain.create();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
  
      console.error(err);
      process.exit(1);
    };
  };