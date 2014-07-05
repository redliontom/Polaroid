function DataAccessLayer() {
    var _pg = require('pg');
    var _util = require('./Utility');
    var _sanitizer = require('sanitizer');
    var _connection = 'postgres://admin:admin@localhost:5432/polaroid';

    // BO
    var _user = require('./BO/User');
    var _photo = require('./BO/Photo');
    var _message = require('./BO/Message');
    var _comment = require('./BO/Comment');

    this.getUserStatus = function (username, callback) {
        sql('SELECT status FROM public.user WHERE username=$1', [username], function (error, rows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, rows[0].status);
            }
        });
    };

    this.getUser = function (username, callback) {
        sql('SELECT * FROM public.user WHERE username=$1', [username], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var result = [];

            for (var i in rows) {
                result.push(_user(rows[i]));
            }

            callback(null, result);
        });
    };

    var sql = function (query, args1, args2) {
        var callback = null;
        var args = [];

        if (_util.isArray(args1)) {
            args = args1;
            callback = args2;
        } else if (_util.isFunction(args1)) {
            callback = args1;
        }

        if ((!_util.isString(query) || !_util.isArray(args)) && _util.isFunction(callback)) {
            return callback(new Error('invalid arguments'), null);
        } else if (!_util.isFunction(callback)) {
            throw new Error('no callback provided');
        }

        pg.connect(_connection, function (error, client, done) {
            if (error) {
                return callback(error, null);
            }

            client.query(query, args, function (error, result) {
                if (error) {
                    done(error);
                    return callback(error, null);
                }

                done();
                callback(null, result.rows);
            });
        });
    };
}

module.exports = function () {
    return new DataAccessLayer();
};
