var fs = require('fs'),
    path = require('path'),

    CSS = require('./models/stylesheet.js'),
    Script = require('./models/script.js'),

    _content = (function () {
        var data = {
            scripts: [
                "/js/modules/vendors/require.js",
                "/js/app.js"
            ],
            stylesheets: [
                "/vendors/materialize-src/stylesheets/materialize.css",
                "/stylesheets/normalize.css",
                "/vendors/timepicker/default.css",
                "/vendors/timepicker/default.date.css",
                "/vendors/timepicker/default.time.css",
                "/stylesheets/style.css",
                "/vendors/semanticui/semantic.css"
            ]
        };
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'site-content.json'), {encoding: 'utf8'}));
        } catch (err){
            console.error(err);
        }
        return data;
    })();


module.exports = {
    scriptsList: _content.scripts.map(function (path, index, arr) {
        return new Script({src: path});
    }),
    stylesheetList: _content.stylesheets.map(function (path, index, arr) {
        return new CSS(path);
    })
};