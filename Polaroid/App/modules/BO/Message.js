/* Message: max 100 Nachrichten aufeinmal bzw irgendein definierter Zeitraum. */

function Message(args) {
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

    var _fromuser = _util.isString(args.fromuser) ? args.fromuser : null;
    Object.defineProperty(this, 'fromuser', {
        get: function () { return _fromuser; },
        set: function (x) {
            if (_util.isString(x)) {
                _fromuser = x;
            }
        },

        enumerable: true
    });

    var _touser = _util.isString(args.touser) ? args.touser : null;
    Object.defineProperty(this, 'touser', {
        get: function () { return _touser; },
        set: function (x) {
            if (_util.isString(x)) {
                _touser = x;
            }
        },

        enumerable: true
    });

    var _subject = _util.isString(args.subject) ? args.subject : null;
    Object.defineProperty(this, 'subject', {
        get: function () { return _subject; },
        set: function (x) {
            if (_util.isString(x)) {
                _subject = x;
            }
        },

        enumerable: true
    });

    var _text = _util.isString(args.text) ? args.message : null;
    Object.defineProperty(this, 'message', {
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
        get: function () { return _comment; },
        set: function (x) {
            if (_util.isDate(x)) {
                _time = x;
            }
        },

        enumerable: true
    });
}

module.exports = function (args) {
    return new Message(args);
};
