var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function Image(args) {
    var _util = require('../Utility');

    if (_util.isNullOrUndefined(args)) {
        args = {};
    }

    var _id = _util.isNumber(args.id) ? args.id : null;
    Object.defineProperty(this, 'id', {
        get: function () { return _id; },
        set: function (x) {
            if (_util.isNumber(x)) {
                _id = x;
            }
        },

        enumerable: true
    });

    var _user = _util.isNumber(args.user) ? args.user : null;
    Object.defineProperty(this, 'user', {
        get: function () { return _user; },
        set: function (x) {
            if (_util.isString(x)) {
                _user = x;
            }
        },

        enumerable: true
    });

    var _title = _util.isString(args.title) ? args.title : null;
    Object.defineProperty(this, 'title', {
        get: function () { return _title; },
        set: function (x) {
            if (_util.isString(x)) {
                _title = x;
            }
        },

        enumerable: true
    });

    var _description = _util.isString(args.description) ? args.description : null;
    Object.defineProperty(this, 'description', {
        get: function () { return _description; },
        set: function (x) {
            if (_util.isString(x)) {
                _description = x;
            }
        },

        enumerable: true
    });

    var _aperture = _util.isString(args.aperture) ? args.aperture : null;
    Object.defineProperty(this, 'aperture', {
        get: function () { return _aperture; },
        set: function (x) {
            if (_util.isString(x)) {
                _aperture = x;
            }
        },

        enumerable: true
    });

    var _exposuretime = _util.isString(args.exposuretime) ? args.exposuretime : null;
    Object.defineProperty(this, 'exposuretime', {
        get: function () { return _exposuretime; },
        set: function (x) {
            if (_util.isString(x)) {
                _exposuretime = x;
            }
        },

        enumerable: true
    });

    var _iso = _util.isString(args.iso) ? args.iso : null;
    Object.defineProperty(this, 'iso', {
        get: function () { return _iso; },
        set: function (x) {
            if (_util.isString(x)) {
                _iso = x;
            }
        },

        enumerable: true
    });

    var _iso = _util.isString(args.iso) ? args.iso : null;
    Object.defineProperty(this, 'iso', {
        get: function () { return _iso; },
        set: function (x) {
            if (_util.isString(x)) {
                _iso = x;
            }
        },

        enumerable: true
    });

    var _focallength = _util.isString(args.focallength) ? args.focallength : null;
    Object.defineProperty(this, 'focallength', {
        get: function () { return _focallength; },
        set: function (x) {
            if (_util.isString(x)) {
                _focallength = x;
            }
        },

        enumerable: true
    });

    var _flash = _util.isString(args.flash) ? args.flash : null;
    Object.defineProperty(this, 'flash', {
        get: function () { return _flash; },
        set: function (x) {
            if (_util.isString(x)) {
                _flash = x;
            }
        },

        enumerable: true
    });

    var _time = _util.isDate(args.time) ? args.time : null;
    Object.defineProperty(this, 'time', {
        get: function () { return _time; },
        set: function (x) {
            if (_util.isDate(x)) {
                _time = x;
            }
        },

        enumerable: true
    });
}

module.exports = function (args) {
    return new Image(args);
};
