var pm2 = require('pm2');
var fs = require('fs');

var instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
var maxMemory = process.env.WEB_MEMORY || 512; // " " "

console.log('PM2 Before connect');
pm2.connect(function () {

  console.log('PM2 connected');
  pm2.start('./processes.json', function (err) {
    if (err) return console.error('Error while launching applications', err.stack || err);
    console.log('PM2 and application has been succesfully started');

    if (process.env.DYNO) {
      console.log('This is on Heroku..!!');
      fs.openSync('/tmp/app-initialized', 'w');
    }

    // Display logs in standard output
    pm2.launchBus(function (err, bus) {
      console.log('[PM2] Log streaming started');

      bus.on('log:out', function (packet) {
        console.log('[App:%s] %s', packet.process.name, packet.data);
      });

      bus.on('log:err', function (packet) {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
      });
    });
  });
});
