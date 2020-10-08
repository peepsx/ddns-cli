module.exports = {
    name: 'restorend',
    command: restorend,
    help: [
      'Restore a deleted NameDrive(ND)',
      'Usage: ddns restorend'
    ].join('\n'),
    options: []
  };
  
  function restorend () {
    const { NameDrive } = require('../../classes/NameDrive');
    const prompt = require('prompt');
    const chalk = require('chalk');
    
    let welcome = "Restore a deleted NameDrive (ND)";
    console.log(welcome);
  
    var schema = {
      properties: {
        name: {
          description: chalk.magneta('NameDrive Name'),
          message: 'Name of NameDrive being restored.'
        }
      }
    };
  
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) return exitErr(err);
      let nd = new NameDrive(result.name);
      nd.restore();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
  
      console.error(err);
      process.exit(1);
    };
  };