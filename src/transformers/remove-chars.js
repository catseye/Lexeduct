module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                if (cfg.chars.lastIndexOf(str.charAt(i)) === -1) {
                    s += c;
                }
            }
            return s;
        };
    }
};
