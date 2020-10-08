module.exports = {
    name: 'creatend',
    command: creatend,
    help: [
      'Create an empty NameDrive (ND)',
      'Usage: ddns creatend'
    ].join('\n'),
    options: []
  };
  
  function creatend() {
    const { NameDrive } = require('../../classes/NameDrive');
    const prompt = require('prompt');
    const chalk = require('chalk');
    let welcome = "Create a new NameDrive (ND)";
    console.log(welcome);
  
    var schema = {
      properties: {
        name: {
          description: chalk.magenta('NameDrive Name'),
          message: 'Create a name for this NameDrive ie. nd1'
        }
      }
    };
  
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) return exitErr(err);
      let nd = new NameDrive(result.name);
      nd.create();
    });
  
    function exitErr (err) {
      if (err && err.message === 'canceled') {
        process.exit(0);
      }
      console.error(err);
      process.exit(1);
    };
  };