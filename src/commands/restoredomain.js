module.exports = {
    name: 'restoredomain',
    command: restoredomain,
    help: [
      'Restore a deleted domain to a NameDrive (ND)',
      'Usage: ddns restoredomain'
    ].join('\n'),
    options: []
  };
  
  function restoredomain () {
    const { Domain } = require('../../classes/Domain');
    const prompt = require('prompt');
    const chalk = require('chalk');
    
    let welcome = "Remove a domain from a NameDrive (ND)";
    console.log(welcome);
  
    var schema = {
      properties: {
        namedrive: {
          description: chalk.magenta('NameDrive Name'),
          message: 'NameDrive that domain is being restored to'
        },
        domain: {
          description: chalk.magenta('Domain Name'),
          message: 'The domain name being restored.'
        }
      }
    };
    
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) return exitErr(err);
      let domain = new Domain(result.namedrive, result.domain);
      domain.restore();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
      console.err(err);
      process.exit(1);
    };
  };