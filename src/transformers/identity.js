module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            return str;
        };
    },
    parameters: {},
    description: "Identity transformation: makes no changes"
};
