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

    var _from = _util.isString(args.from) ? args.from : null;
    Object.defineProperty(this, 'from', {
        get: function () { return _from; },
        set: function (x) {
            if (_util.isString(x)) {
                _from = x;
            }
        },

        enumerable: true
    });

    var _to = _util.isString(args.to) ? args.to : null;
    Object.defineProperty(this, 'to', {
        get: function () { return _to; },
        set: function (x) {
            if (_util.isString(x)) {
                _to = x;
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
