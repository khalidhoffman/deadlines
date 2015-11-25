
//var secureServer = require('./core/server-https');
var unsecureServer = require('./core/server-http'),
    config = require('./config.js');

unsecureServer.listen(config.ports.unsecure);

//var secureAddress = secureServer.address();
var unsecureAddress = unsecureServer.address();

console.log("http server is listening on "+unsecureAddress.address+":"+unsecureAddress.port);
//console.log("https server is listening on "+secureAddress.address+":"+secureAddress.port);