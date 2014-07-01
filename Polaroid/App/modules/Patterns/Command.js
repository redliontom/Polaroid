function Command() {
    this.execute = function (argument) {
        // ...
    };
}

module.exports = function () {
    return new Command();
};
