module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (cfg.search.indexOf(c) > -1 &&
                    Math.floor(Math.random() * 100) < cfg.chance) {
                    s += cfg.replace.charAt(
                        Math.floor(Math.random() * cfg.replace.length)
                    );
                } else {
                    s += c;
                }
            }
            return s;
        };
    },
    parameters: {
        'search': ["The set of characters to look for", ""],
        'replace': ["The set of characters to substitute in place", ""],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Replace occurrences of the specified characters"
};
