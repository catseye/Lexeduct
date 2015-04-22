module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            return str.toLowerCase();
        };
    }
};
