var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function Conversation() {
    Utility.extend(Subject(), this);

    // TODO: Attribute hinzufügen.
}

module.exports = function () {
    return new Conversation();
};
