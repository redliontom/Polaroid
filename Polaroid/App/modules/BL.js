function BusinessLayer() {
    var _dal = require('./DAL')();
};

module.exports = function () {
    return new BusinessLayer();
};
