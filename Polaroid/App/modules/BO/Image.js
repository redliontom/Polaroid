var Utility = require('../Utility');
var Subject = require('../Patterns/Subject');

function Image() {
    Utility.extend(Subject(), this);

    // TODO: Attribute hinzufügen.
    this.username = '';
    this.name = '';
    this.directory = '';
    this.flash = '';
    this.aperture = '';
    this.exposure = '';
    this.focalDistance = '';
    this.iso = '';
    this.exposureTime = '';
}

module.exports = function () {
    return new Image();
};
