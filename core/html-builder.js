var path = require('path'),

    _ = require('lodash'),

    content = require('./content');

module.exports = {
    /**
     *
     * @param pagePath
     * @param pageData
     * @returns {string}
     */
    compile: function (pagePath, pageData) {

        var Page = require(path.resolve(__dirname, 'views/', (pagePath || "page")));

        var data = _.defaults(pageData, {
            title: 'Deadlines',
            stylesheets: content.stylesheetList,
            scripts: content.scriptsList
        });

        var generatedPage = new Page(data);

        var compiler = _.template(generatedPage.html);

        var compiledHTML = compiler(generatedPage);

        return compiledHTML;
    }
}