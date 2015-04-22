module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            var vowels = "aeiou";
            for (var i = 0; i < str.length; i++) {
                s += str.charAt(i) + vowels.charAt(Math.floor(Math.random() * vowels.length));
            }
            return s;
        };
    }
};
