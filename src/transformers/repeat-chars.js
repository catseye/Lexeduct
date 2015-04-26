module.exports = {
    makeTransformer: function(cfg) {
        cfg.count = parseInt(cfg.count || "1", 10);
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                s += c;
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    for (var j = 0; j < cfg.count; j++) {
                        s += c;
                    }
                }
            }
            return s;
        };
    },
    parameters: {
        'count': ["How many extra occurrences of the character to insert", "1"],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Insert extra copies of the character after each character"
};
