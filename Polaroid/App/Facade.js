module.exports = function (app) {
    var _bl = require('./Modules/BL')();

    function redirectToHttps() {
    };

    app.route('/')
    .all(redirectToHttps);
};
