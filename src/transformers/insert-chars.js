module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = cfg.chars.charAt(Math.floor(Math.random() * cfg.chars.length));
                s += str.charAt(i) + c;
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to select from", ""]
    },
    description: "Insert a randomly-selected character after each character"
};
