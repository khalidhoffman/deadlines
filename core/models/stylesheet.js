var path = require('path'),

    config = require('../../config'),

    assetsBasePath = config.assetsPath;

/**
 *
 * @param {String} href
 * @returns {CSS}
 * @constructor
 */
var CSS = function(href){

    this.href = path.join(assetsBasePath, href);
    return this;
};

module.exports = CSS;