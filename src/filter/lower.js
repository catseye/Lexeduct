module.exports = {
    makeFilter: function(cfg) {
        return function(line, state) {
            return line.toLowerCase();
        };
    }
};
