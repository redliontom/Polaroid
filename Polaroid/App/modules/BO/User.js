var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function User() {
    Utility.extend(Subject(), this);

    // TODO: User-Attribute hinzufügen.
}

exports.create = function () {
    return new User();
};
