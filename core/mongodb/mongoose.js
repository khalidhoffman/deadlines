var util = require('util'),

    mongoose = require('mongoose'),
    _ = require('lodash'),

    config = require('../../config'),

    dbIdentity = config.credentials.mongodb,
    Task = null,
    User = null;

/**
 *
 * @param {Object} options
 * @param {Boolean} options.isDev
 */
module.exports.connect = function (options) {
    var _options = _.extend({}, options),
        isDevelopment = _options.isDev || config.isDevMode,
        address = dbIdentity.address,
        username = dbIdentity.username,
        password = dbIdentity.password;

    console.log('connecting to mongodb');
    mongoose.connect(util.format('mongodb://%s:%s@%s', username, password, address));

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function (callback) {
        console.log('successfully connected.');
    });

    var TaskSchema = new mongoose.Schema(require('./schemas/task'));
    var UserSchema = new mongoose.Schema(require('./schemas/user'));

    if (isDevelopment) {
        console.log('Running in dev mode.');
        Task = mongoose.model('Task', TaskSchema, 'Deadlines_Development');
        User = mongoose.model('User', UserSchema, 'Deadlines_Users_Development');
    } else {
        Task = mongoose.model('Task', TaskSchema, 'Deadlines');
        User = mongoose.model('User', UserSchema, 'Deadlines_Users');
    }

    return {
        schemas: {
            Task: Task,
            User: User
        }
    }

};