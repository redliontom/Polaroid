var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function User() {
    Utility.extend(Subject(), this);

    // TODO: Attribute hinzufügen.
    this.email = '';
    this.username = '';
    this.forename = '';
    this.surname = '';
    this.status = false;
}

module.exports = function () {
    return new User();
};
