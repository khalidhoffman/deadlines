var path = require('path'),

    config = require('../../config'),
    
    assetsBasePath = config.assetsPath;

/**
 * @param {Object} [passedArgs]
 * @param {function|string} [passedArgs.src]
 * @param {string} [passedArgs.placement]
 * @param {Boolean} [passedArgs.placement.isHeader]
 * @param {Boolean} [passedArgs.placement.header]
 * @param {Boolean} [passedArgs.placement.footer]
 * @param {string} [passedArgs.type]
 * @returns {{src: (string), type: (string), placement: {header: boolean, footer: boolean}}}
 * @constructor
 */
module.exports = function(passedArgs){
    var args = passedArgs || {};
    return {
        src: path.join(assetsBasePath, args.src),
        type: args.type || 'text/javascript',
        placement: {
            header : (args.isHeader)?args.isHeader:true,
            footer : (args.isHeader)?!args.isHeader:false
        }
    }
};