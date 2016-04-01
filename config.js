var fs = require('fs'),
    path = require('path'),
    
    _config = (function () {
        var data = {
            https : false,
            ports : {
                "secure" : 5001,
                "unsecure" : 5000
            },
            credentials: {
                "google": {
                    "client_id": "google_api_console_content",
                    "client_secret": "google_api_console_content"
                },
                "mongodb": {
                    "address": "localhost",
                    "username": "db_username",
                    "password": "db_password"
                },
                "privateKey": "/path/to/private/key",
                "cert": "/path/to/certificate"
            }
        };
        try {
            data = JSON.parse(fs.readFileSync(path.resolve('site-config.json')), {encoding: 'utf8'});
            data.credentials = JSON.parse(fs.readFileSync(path.resolve('credentials.json')), {encoding: 'utf8'});
        } catch (err){
            console.error(err);
        }
        return data;
    })(),
    isDevMode = require('os').hostname().toLowerCase().indexOf('kah') > -1,
    hostnames = {
        development: 'localhost',
        production: 'www.khalidhoffman.solutions'
    };


module.exports = {
    https: _config.https,
    hostname: (isDevMode) ? hostnames['development'] : hostnames['production'],
    hostnames: hostnames,
    basePath: '/deadlines',
    isDevMode: isDevMode,
    ports: {
        secure: process.env.PORT || _config.ports.secure,
        unsecure: process.env.PORT || _config.ports.unsecure
    },
    credentials: _config.credentials
};