exports.extend = function (extension, obj) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
};

exports.isNumber = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object Number]');
};

exports.isString = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object String]');
};

exports.isArray = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object Array]');
};

exports.isFunction = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object Function]');
};

exports.isDate = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object Date]');
};

exports.isBool = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object Boolean]');
};

exports.isNullOrUndefined = function (obj) {
    return (Object.prototype.toString.call(obj) == '[object Null]' || Object.prototype.toString.call(obj) == '[object Undefined]');
};
