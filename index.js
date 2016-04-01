//var secureServer = require('./core/server-https');
var server = require('./core/server'),
    secureServer = server.https,
    unsecureServer = server.http,
    config = require('./config.js');

secureServer.listen(config.ports.secure);
unsecureServer.listen(config.ports.unsecure);

var unsecureAddress = unsecureServer.address() || 'n/a',
    secureAddress = secureServer.address() || 'n/a';

console.log("server is listening on https://%s:%s & http://%s:%s", secureAddress.address, secureAddress.port, unsecureAddress.address, unsecureAddress.port);