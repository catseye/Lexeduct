module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    c = c.toUpperCase();
                }
                s += c;
            }
            return s;
        };
    },
    parameters: {
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Convert characters to uppercase"
};
