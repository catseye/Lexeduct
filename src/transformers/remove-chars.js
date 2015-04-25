module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (cfg.chars.indexOf(c) === -1) {
                    s += c;
                }
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to remove", ""]
    },
    description: "Remove all occurrences of the specified characters"
};
