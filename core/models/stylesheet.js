var path = require('path'),

    config = require('../../config'),

    basePath = config.basePath;

/**
 *
 * @param {String} href
 * @returns {CSS}
 * @constructor
 */
var CSS = function(href){

    this.href = path.join(basePath, href);
    return this;
};

module.exports = CSS;