var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function Picture() {
    Utility.extend(Subject(), this);

    // TODO: User-Attribute hinzufügen.
}

exports.create = function () {
    return new Picture();
};
