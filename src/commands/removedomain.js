module.exports = {
    name: 'removedomain',
    command: removedomain,
    help: [
      'Remove a domain from a NameDrive (ND)',
      'Usage: ddns removedomain'
    ].join('\n'),
    options: []
  };
  
  function removedomain() {
    const { Domain } = require('../../classes/Domain');
    const prompt = require('prompt');
    const chalk = require('chalk');
    
    let welcome = "Remove a domain from a NameDrive (ND)";
    console.log(welcome);
  
    var schema = {
      properties: {
        namedrive: {
          description: chalk.magenta('Namedrive Name'),
          message: 'Name of the Namedrive a domain is being removed from.'
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
      domain.remove();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
  
      console.err(err);
      process.exit(1);
    };
  };