//node.js deps

//npm deps

//app deps
// const thingShadow = require('..').thingShadow;
const thingShadow = require('../aws-iot-device-sdk-js/thing')
const isUndefined = require('../aws-iot-device-sdk-js/common/lib/is-undefined')
const cmdLineProcess = require('./lib/cmdline');

//begin module

function processTest(args) {

  if (isUndefined(args.thingName)) {
    console.log('thing name must be specified with --thing-name');
    process.exit(1);
  }
  //
  // The thing module exports the thing class through which we
  // can register and unregister interest in thing shadows, perform
  // update/get/delete operations on them, and receive delta updates
  // when the cloud state differs from the device state.
  //
  const thingShadows = thingShadow({
    keyPath: args.privateKey,
    certPath: args.clientCert,
    caPath: args.caCert,
    clientId: args.clientId,
    region: args.region,
    baseReconnectTimeMs: args.baseReconnectTimeMs,
    keepalive: args.keepAlive,
    protocol: args.Protocol,
    port: args.Port,
    host: args.Host,
    debug: args.Debug
  });
  //
  // Register a thing name and listen for deltas.  Whatever we receive on delta
  // is echoed via thing shadow updates.
  //
  thingShadows.register(args.thingName, {
    persistentSubscribe: true
  });

  setInterval(function() {
    thingShadows.update(args.thingName, {
      state: {
        reported: {
          valves: [{
            1: 0.0
          }]
        }
      }
    })
  }, 5000)

  thingShadows
    .on('error', function(error) {
      console.log('error', error);
    });

  thingShadows
    .on('delta', function(thingName, stateObject) {
      console.log('received delta on ' + thingName + ': ' +
        JSON.stringify(stateObject));
      thingShadows.update(thingName, {
        state: {
          reported: stateObject.state
        }
      });
    });

  thingShadows
    .on('timeout', function(thingName, clientToken) {
      console.warn('timeout: ' + thingName + ', clientToken=' + clientToken);
    });
}

module.exports = cmdLineProcess;

if (require.main === module) {
  cmdLineProcess('connect to the AWS IoT service and perform thing shadow echo',
    process.argv.slice(2), processTest, ' ', true);
}
