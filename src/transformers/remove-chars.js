module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (cfg.chars.indexOf(c) > -1 &&
                    Math.floor(Math.random() * 100) < cfg.chance) {
                    continue;
                }
                s += c;
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to remove", ""],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Remove all occurrences of the specified characters"
};
