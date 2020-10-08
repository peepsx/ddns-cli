module.exports = {
    name: 'removend',
    command: removend,
    help: [
      ' Remove a NameDrive (ND)',
      'Usage: ddns removend'
    ].join('\n'),
    options: []
  };
  
  function removend () {
    const { NameDrive } = require('../../classes/NameDrive');
    const prompt = require('prompt');
    const chalk = require('chalk');
  
    let welcome = "Remove a NameDrive (ND)";
    console.log(welcome);
    
    var schema = {
      properties: {
        name: {
          description: chalk.magenta('NameDrive Name'),
          message: 'Enter the name of the NameDrive you are removing'
        }
      }
    };
  
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) return exitErr(err);
      let nd = new NameDrive(result.name);
      nd.remove();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
      console.error(err);
      process.exit(1);
    };
  };