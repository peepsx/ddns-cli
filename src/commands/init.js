module.exports = {
    name: 'init',
    command: init,
    help: [
      'Initialize the dDNS system on your local PC.',
      'Usage: ddns init'
    ].join('\n'),
    options: []
  };
  
  function init () {
    const startup = require('../../init/startup');
    startup();
  };