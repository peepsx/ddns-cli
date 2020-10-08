var spawn = require('child_process').spawn,
  mkdir = spawn('mkdir', ['~/DDNS']);

export default function createDefaultDir () {
  mkdir.stdout.on('data', () => {
    console.log('DDNS default directory created');
  });

  mkdir.stderr.on('data', () => {
    console.error('DDNS default directory creation failed: ' + data);
  });
}