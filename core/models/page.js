var _ = require('lodash');

var Page = function (passedArgs) {
    //console.log('passedArgs: ', passedArgs);
    var defaults = {
        title: 'Title',
        charset: 'utf-8',
        url: 'https://localhost', // get host url
        favicon: '//deadlines/favicon.ico',
        body: {
            className: 'bodyclass'
        },
        scripts: [],
        stylesheets: []
    };

    return _.defaults(passedArgs, defaults);
};

module.exports = Page;