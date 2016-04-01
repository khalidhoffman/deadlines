var fs = require('fs'),
    path = require('path'),

    _ = require('lodash'),

    _config = (function () {
        var localConfig = {},
            localCredentials = {};
        try {
            localConfig = JSON.parse(fs.readFileSync(path.resolve('site-config.json')), {encoding: 'utf8'});
        } catch (err) { console.error(err); }
        try {
            localCredentials = {
                credentials: JSON.parse(fs.readFileSync(path.resolve('credentials.json')), {encoding: 'utf8'})
            }
        } catch (err) { console.error(err); }
        var data = {
            https: false,
            ports: {
                "secure": localConfig['ports']['secure'] || 5001,
                "unsecure": process.env.PORT || localConfig['secure'] || 5000
            },
            credentials: {
                "google": {
                    "client_id": process.env['google_client_id'] || "google_api_console_content",
                    "client_secret": process.env['google_client_secret'] || "google_api_console_content"
                },
                "mongodb": {
                    "address": process.env['mongodb_address'] || "localhost",
                    "username": process.env['mongodb_username'] || "db_username",
                    "password": process.env['mongodb_password'] || "db_password"
                },
                "privateKey": process.env['private_key_location'] || "/path/to/private/key",
                "cert": process.env['cert_location'] || "/path/to/certificate"
            }
        };
        return _.merge(data, localCredentials, localConfig);
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
    assetsPath: '/deadlines',
    isDevMode: isDevMode,
    ports: {
        secure: process.env.PORT || _config.ports.secure,
        unsecure: process.env.PORT || _config.ports.unsecure
    },
    credentials: _config.credentials
};