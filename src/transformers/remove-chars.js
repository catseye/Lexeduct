module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                if (cfg.chars.indexOf(str.charAt(i)) === -1) {
                    s += c;
                }
            }
            return s;
        };
    },
    parameters: {
        'chars': "The set of characters to select from"
    },
    description: "Remove all occurrences of the specified characters"
};
