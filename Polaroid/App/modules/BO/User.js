﻿var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function User() {
    Utility.extend(Subject(), this);

    // TODO: Attribute hinzufügen.
}

module.exports = function () {
    return new User();
};
