module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                s += str.charAt(i) + " ";
            }
            return s;
        };
    }
};
