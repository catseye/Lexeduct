module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                s += str.charAt(i);
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    s += cfg.chars.charAt(
                        Math.floor(Math.random() * cfg.chars.length)
                    );
                }
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to select from", ""],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Insert a randomly-selected character after each character"
};
