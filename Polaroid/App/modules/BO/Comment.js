/* Message: max 100 Nachrichten aufeinmal bzw irgendein definierter Zeitraum. */

function Comment(args) {
    var _util = require('../Utility');

    if (_util.isNullOrUndefined(args)) {
        args = {};
    }

    var _user = _util.isString(args.user) ? args.user : null;
    Object.defineProperty(this, 'user', {
        get: function () { return _user; },
        set: function (x) {
            if (_util.isString(x)) {
                _user = x;
            }
        },

        enumerable: true
    });

    var _photo = _util.isNumber(args.photo) ? args.photo : null;
    Object.defineProperty(this, 'photo', {
        get: function () { return _photo; },
        set: function (x) {
            if (_util.isNumber(x)) {
                _photo = x;
            }
        },

        enumerable: true
    });

    var _text = _util.isString(args.text) ? args.text : null;
    Object.defineProperty(this, 'text', {
        get: function () { return _text; },
        set: function (x) {
            if (_util.isString(x)) {
                _text = x;
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
    return new Comment(args);
};
