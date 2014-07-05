function Friend() {
    var _util = require('../Utility');

    if (_util.isNullOrUndefined(args)) {
        args = {};
    }

    var _username = _util.isString(args.username) ? args.username : null;
    Object.defineProperty(this, 'username', {
        get: function () { return _username; },
        set: function (x) {
            if (_util.isString(x)) {
                _username = x;
            }
        },

        enumerable: true
    });

    var _forename = _util.isString(args.forename) ? args.forename : null;
    Object.defineProperty(this, 'forename', {
        get: function () { return _forename; },
        set: function (x) {
            if (_util.isString(x)) {
                _forename = x;
            }
        },

        enumerable: true
    });

    var _surname = _util.isString(args.surname) ? args.surname : null;
    Object.defineProperty(this, 'surname', {
        get: function () { return _surname; },
        set: function (x) {
            if (_util.isString(x)) {
                _surname = x;
            }
        },

        enumerable: true
    });

    var _status = _util.isBool(args.status) ? args.status : null;
    Object.defineProperty(this, 'status', {
        get: function () { return _status; },
        set: function (x) {
            if (_util.isBool(x)) {
                _status = x;
            }
        },

        enumerable: true
    });
}

module.exports = function (args) {
    return new User(args);
};
