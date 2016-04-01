var path = require('path'),
    fs = require('fs'),

    _ = require('lodash'),

    compiler = _.template(fs.readFileSync(path.resolve(__dirname, 'html/header.html'), {encoding: 'utf8'}));

module.exports = function (compilerData) {
    return {
        innerHTML: compiler(compilerData)
    };
}